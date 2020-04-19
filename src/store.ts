import {
  observable,
  action,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {OandaApi} from '~/api';
import {Instruments, Granularity, CurrencyPair, Segment, Segments} from '~/entities';
import {Map } from 'immutable'
import { getUpCount } from '~/logics';
import  'moment-business-days'
import moment, {Moment} from "moment";

export class AppStore {
  @observable apiKey: string = "69c0bef088a04d1c592365d9140a5ebe-18b94723790177e9d42e9116916727ef";
  @observable url: string = "https://api-fxpractice.oanda.com";
  @observable fromDate:Moment = moment();
  @observable toDate:Moment = moment();
  @observable granularity:Granularity = Granularity.D;
  @observable currencyPairs: CurrencyPair[] = [CurrencyPair.USD_JPY, CurrencyPair.EUR_JPY];
  @observable instruments: Instruments = [];
  @observable segments:Segments = Map();
  constructor() {
    const apiKey = localStorage.getItem('apiKey');
    if(apiKey !== null) {this.apiKey = apiKey; }
    const url = localStorage.getItem('url');
    if(url !== null) {this.url = url; }
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
    this.toDate = value
    localStorage.setItem('toDaate', value.format());
  }

  @action setFromDate = (value: Moment) => { 
    this.fromDate = value
    localStorage.setItem('fromDate', value.format());
  }

  @action toggleCurrencyPairs = (value: CurrencyPair) => { 
    if (this.currencyPairs.includes(value)){
      this.currencyPairs = this.currencyPairs.filter(x => x!== value)
    }else{
      this.currencyPairs = [...this.currencyPairs, value]
    }
  }

  @action submit = async () => { 
    this.segments = this.segments.clear()
    await Promise.all(
      this.currencyPairs.map(x => this.fetchSegment(x))
    )

  }

  @action fetchSegment = async (currencyPair:CurrencyPair) => { 
    const api = new OandaApi(
      this.apiKey,
      this.url,
    )
    const candles = await api.getCandels(
      this.granularity, 
      currencyPair,
      this.fromDate,
      this.toDate,
    )
    if (candles === undefined){return}
    const upCount = getUpCount(candles)
    const count = candles.length;
    const segment:Segment = {
      currencyPair,
      candles: candles,
      count: count,
      upRatio: upCount/count,
      downRatio: (count - upCount)/count,
    }
    this.segments = this.segments.set(segment.currencyPair, segment)
  }
}

const store = new AppStore();
export default store;
