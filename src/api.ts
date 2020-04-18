import axios, {AxiosInstance} from 'axios';
import moment, {Moment} from "moment";
import {range, floor, reduce, toArray, first} from 'lodash';
import {OandaAccount, Instrument, Granularity, Candle, CurrencyPair} from '~/entities'


const DATE_FORMAT = 'YYYY-MM-DD';

export class OandaApi {
  axios: AxiosInstance
  constructor(token: string, url: string) {
    this.axios = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  getAccounts = async ()  => {
    const res = await this.axios.get(`/v3/accounts`);
    const data = res.data as {accounts:OandaAccount[]};
    return first(data.accounts)
  }
  getInstruments = async (
    accountId:string,
  )  => {
    const res = await this.axios.get(`/v3/accounts/${accountId}/instruments`);
    const data = res.data as {instruments:Instrument[]};
    return data.instruments
  }

  getCandels = async (
    count:number,
    granularity: Granularity,
    currencyPair: CurrencyPair,
  ):Promise<Candle[]> => {
    const res = await this.axios.get(`/v3/instruments/${currencyPair}/candles`, {
      params:{
        granularity,
      }
    });
    const data = res.data as {candles:any[]}
    return data.candles.map(x => ({
      time: moment(x.time),
      volume: x.volume,
      mid: {
        o: parseInt(x.mid.o),
        c: parseInt(x.mid.c),
        h: parseInt(x.mid.h),
        l: parseInt(x.mid.l),
      }
    }))
  }
}
