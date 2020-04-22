import axios, {AxiosInstance} from 'axios';
import moment, {Moment} from "moment";
import {range, floor, reduce, toArray, first} from 'lodash';
import {OandaAccount, Instrument, Granularity, Candle, CurrencyPair} from '~/entities'


const DATE_FORMAT = 'YYYY-MM-DD';
const DURATIONS = {
  [Granularity.D]:  moment.duration(1*5000, "days"),
  [Granularity.M5]: moment.duration(5*5000, "minutes"),
  [Granularity.M15]: moment.duration(15*5000, "minutes"),
  [Granularity.H1]: moment.duration(1*5000, "hours"),
  [Granularity.H4]: moment.duration(4*5000, "hours"),
}

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

  private getCandelChunks = async (
    granularity: Granularity,
    currencyPair: CurrencyPair,
    fromDate:Moment,
    toDate:Moment,
  ):Promise<Candle[]> => {
    const res = await this.axios.get(`/v3/instruments/${currencyPair}/candles`, {
      params:{
        granularity,
        from:fromDate.format(),
        to:toDate.format(),
      }
    });

    const data = res.data as {candles:any[]}
    return data.candles.map(x => ({
      time: moment(x.time),
      volume: x.volume,
      mid: {
        o: parseFloat(x.mid.o),
        c: parseFloat(x.mid.c),
        h: parseFloat(x.mid.h),
        l: parseFloat(x.mid.l),
      }
    }))
  }

  getCandels = async (
    granularity: Granularity,
    currencyPair: CurrencyPair,
    fromDate:Moment,
    toDate:Moment,
  ):Promise<Candle[]> => {
    let current = fromDate.clone();
    let rows:Candle[] = [];
    while (current < toDate) {
      const chunkFromDate = current.clone()
      const nextToDate = current.clone().add(DURATIONS[granularity])
      const chunkToDate = nextToDate < toDate ? nextToDate.clone(): toDate.clone()
      const res = await this.getCandelChunks(
        granularity,
        currencyPair,
        chunkFromDate,
        chunkToDate,
      )
      current = chunkToDate
      if (res === undefined) {return []}
      rows = rows.concat(res)
    }
    return rows
  }
}
