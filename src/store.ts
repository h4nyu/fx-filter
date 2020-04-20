import {
  observable,
  action,
  computed,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {OandaApi} from '~/api';
import {Instruments, Granularity, CurrencyPair, Segment, Segments, Direction, WeekDay} from '~/entities';
import { Map } from 'immutable'
import { getUpCount } from '~/logics';
import  'moment-business-days'
import moment, {Moment} from "moment";
import {v4 as uuid} from 'uuid';

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
  @observable filterValue: number  = 0;
  @observable fromDate:Moment = moment();
  @observable toDate:Moment = moment();
  @observable granularity:Granularity = Granularity.D;
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

  @action setGranularity = (value: Granularity) => { 
    this.granularity = value
    localStorage.setItem('granularity', value);
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
    this.filterValue = value
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
    await Promise.all(
      this.currencyPairs.map(x => loadingStore.dispatch(async () => this.fetchSegment(x)))
    )
  }

  @action clear = () => { 
    this.segments = this.segments.clear()
  }

  @action delete = (id: string) => { 
    this.segments = this.segments.delete(id)
  }

  @action fetchSegment = async (currencyPair:CurrencyPair) => { 
    const api = new OandaApi(
      this.apiKey,
      this.url,
    )
    let candles = await api.getCandels(
      this.granularity, 
      currencyPair,
      this.fromDate,
      this.toDate,
    )
    if (candles === undefined){return}
    if(this.weekDay !== null){
      candles = candles.filter(x => this.weekDay === x.time.format('dddd') as WeekDay)
    }
    const upCount = getUpCount(candles)
    const count = candles.length;
    const upRatio = upCount/count;
    const segment:Segment = {
      id: uuid(),
      currencyPair: currencyPair,
      granularity: this.granularity,
      direction: upRatio > 0.5 ? Direction.High : Direction.Low,
      ratio: upRatio > 0.5 ? upRatio : 1 - upRatio,
      fromDate: this.fromDate,
      toDate:  this.toDate,
      count: candles.length,
    }
    this.segments = this.segments.set(segment.id, segment)
    this.segments = this.segments.sortBy(x => - x.ratio)
  }
}

const store = new AppStore();
export default store;
export const loadingStore = new LoadingStore(); 



