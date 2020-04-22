import {
  observable,
  action,
  computed,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {pipe, map, join} from 'lodash/fp';
import {OandaApi} from '~/api';
import {Instruments, Granularity, CurrencyPair, Segment, Segments, Direction, WeekDay} from '~/entities';
import { Map } from 'immutable'
import { getUpCount, getSegments } from '~/logics';
import  'moment-business-days'
import moment, {Moment} from "moment";
import {v4 as uuid} from 'uuid';
import { saveAs } from 'file-saver';

class LoadingStore {
  @observable pendingNum = 0;
  @action activate = () => {
    this.pendingNum = this.pendingNum + 1;
  }
  @action deactivate = () => {
    this.pendingNum = this.pendingNum - 1;
    if (this.pendingNum < 0) {
      this.pendingNum = 0;
    }
  }

  dispatch = async(callback: () => Promise<void>) => {
    this.activate();
    try {
      await callback();
    } catch(e) {
      console.error('Error caught, no action taken');
      throw e;
    }
    finally {
      this.deactivate();
    }
  }
}

export class AppStore {
  @observable apiKey: string = "";
  @observable url: string = "https://api-fxpractice.oanda.com";
  @observable filterValue: number  = 0.75;
  @observable fromDate:Moment = moment().add(-7, 'days');
  @observable toDate:Moment = moment();
  @observable granularities:Granularity[] = [Granularity.D];
  @observable currencyPairs: CurrencyPair[] = [];
  @observable instruments: Instruments = [];
  @observable segments:Segments = Map();
  @observable weekDay:WeekDay | null = null ;

  constructor() {
    const apiKey = localStorage.getItem('apiKey');
    if(apiKey !== null) {this.apiKey = apiKey; }
    const url = localStorage.getItem('url');
    if(url !== null) {this.url = url; }
  }

  @computed get filterdSegments() {
    return this.segments.filter(x => x.ratio > this.filterValue)
  }

  @action setApiKey = (value: string) => {
    this.apiKey = value;
    localStorage.setItem('apiKey', value);
  }

  @action setUrl = (value: string) => { 
    this.url = value
    localStorage.setItem('url', value);
  }

  @action toggleGranularity = (value: Granularity) => { 
    if (this.granularities.includes(value)){
      this.granularities = this.granularities.filter(x => x!== value)
    }else{
      this.granularities = [...this.granularities, value]
    }
  }

  @action setToDate = (value: Moment) => { 
    if (value > moment()){
      this.toDate = moment()
    }else{
      this.toDate = value
    }
    localStorage.setItem('toDaate', value.format());
  }

  @action setFromDate = (value: Moment) => { 
    this.fromDate = value
    localStorage.setItem('fromDate', value.format());
  }

  @action setFilterValue = (value: number) => { 
    if (value < 0){
      this.filterValue = 0
    }else if(value > 1){
      this.filterValue = 1
    }else{
      this.filterValue = value
    }
  }

  @action toggleCurrencyPairs = (value: CurrencyPair) => { 
    if (this.currencyPairs.includes(value)){
      this.currencyPairs = this.currencyPairs.filter(x => x!== value)
    }else{
      this.currencyPairs = [...this.currencyPairs, value]
    }
  }

  @action toggleWeekday = (value: WeekDay) => { 
    if (this.weekDay === value){
      this.weekDay = null
    }else{
      this.weekDay = value
    }
  }

  @action submit = async () => { 
    const args:{currencyPair:CurrencyPair, granularity:Granularity}[] = [];
    this.currencyPairs.forEach(x => {
      this.granularities.forEach( y => {
        args.push({
          currencyPair:x,
          granularity:y,
        })
      })
    })
    await Promise.all(
      args.map(x => loadingStore.dispatch(async () => this.fetchSegment(x.currencyPair, x.granularity)))
    )
  }

  @action clear = () => { 
    this.segments = this.segments.clear()
  }

  @action delete = (id: string) => { 
    this.segments = this.segments.delete(id)
  }

  @action fetchSegment = async (currencyPair:CurrencyPair, granularity:Granularity) => { 
    const api = new OandaApi(
      this.apiKey,
      this.url,
    )
    let candles = await api.getCandels(
      granularity, 
      currencyPair,
      this.fromDate,
      this.toDate,
    )
    if (candles === undefined){return}
    if(this.weekDay !== null){
      candles = candles.filter(x => this.weekDay === x.time.format('dddd') as WeekDay)
    }
    const segments = getSegments(
      candles,
      currencyPair,
      granularity,
      this.fromDate,
      this.toDate,
      this.weekDay
    )
    this.segments = this.segments.merge(segments)
    this.segments = this.segments.sortBy(x => x.timeOfDay).sortBy(x => - x.ratio)
  }

   jsonToCsv = (rows: (string|number)[][], columns: string[] = [] ) =>  {
    const body = pipe(
      map(join(', ')),
      join('\n'),
    )(rows);
    const header = `${join(', ')(columns)}\n`;
    return `${header}${body}`;
  }

  @action outputCsv =  () => {
    const columns = [
      '時刻',
      '通貨ペア',
      '方向',
      '確率',
      'ローソク足',
      '開始日',
      '終了日',
      '曜日',
      '件数',
    ];
    const fmt = 'YYYY-MM-DD';

    const rows = this.filterdSegments
      .toList()
      .map(x => {
        return [
          x.timeOfDay,
          x.currencyPair,
          x.direction,
          x.ratio,
          x.fromDate.format(fmt),
          x.toDate.format(fmt),
          x.weekDay,
          x.count
        ];
      });
    const data = this.jsonToCsv(rows.toJS(), columns);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, data], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'fx-filter.csv');
  }
}

const store = new AppStore();
export default store;
export const loadingStore = new LoadingStore(); 



