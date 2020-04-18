import {
  observable,
  action,
} from 'mobx';
import {sortBy, filter, toNumber, toString} from 'lodash';
import {OandaApi} from '~/api';
import {Instruments} from '~/entities';
import {Map } from 'immutable'
import  'moment-business-days'
import moment, {Moment} from "moment";

export class AppStore {
  @observable apiKey: string = "69c0bef088a04d1c592365d9140a5ebe-18b94723790177e9d42e9116916727ef";
  @observable url: string = "https://api-fxpractice.oanda.com";
  @observable accountId: string = "mp816178";
  @observable duration: number = 5;
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

  @action setAccountId = (value: string) => { 
    this.accountId = value
    localStorage.setItem('projectId', value);
  }

  @action setDuration = (value: number) => { 
    this.duration = value
    localStorage.setItem('duration', toString(value));
  }

  @action submit = async () => { 
    const api = new OandaApi(
      this.apiKey,
      this.url,
    )
    const res = await api.getAccounts();
    if (res === undefined){return}

    this.setAccountId(res.id)
    const instruments = await api.getInstruments(this.accountId);
    if (instruments === undefined){return}
    this.instruments = instruments;

    const candles = await api.getCandels(10, "M5", "EUR_USD")
    if (candles === undefined){return}
    console.log(candles)
  }
}

const store = new AppStore();
export default store;
