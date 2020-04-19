import {
  observable,
  action,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {OandaApi} from '~/api';
import {Instruments, Granularity, CurrencyPair} from '~/entities';
import {Map } from 'immutable'
import  'moment-business-days'
import moment, {Moment} from "moment";

export class AppStore {
  @observable apiKey: string = "69c0bef088a04d1c592365d9140a5ebe-18b94723790177e9d42e9116916727ef";
  @observable url: string = "https://api-fxpractice.oanda.com";
  @observable fromDate:Moment = moment();
  @observable toDate:Moment = moment();
  @observable issues: any[] = [];
  @observable instruments: Instruments = [];
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

  @action setToDate = (value: Moment) => { 
    this.toDate = value
    localStorage.setItem('toDaate', value.format());
  }

  @action setFromDate = (value: Moment) => { 
    this.fromDate = value
    localStorage.setItem('fromDate', value.format());
  }

  @action submit = async () => { 
    const api = new OandaApi(
      this.apiKey,
      this.url,
    )
    const candles = await api.getCandels(
      10, 
      Granularity.M5, 
      CurrencyPair.EUR_USD,
      this.fromDate,
      this.toDate,
    )
    if (candles === undefined){return}
  }
}

const store = new AppStore();
export default store;
