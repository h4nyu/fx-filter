import {Moment} from 'moment';
export type OandaAccount = {
  id: string,
  tags: string[],
};

export type Instrument = {
  name: string,
  displayName: string,
};

export type Candle = {
  mid: {
    c: number,
    h: number,
    l: number,
    o: number,
  },
  time: Moment,
  volume: number,
};


export type Instruments = Instrument[];

export enum Granularity {
  M1 = "M1",
  M5 = "M5",
}
export enum CurrencyPair {
  EUR_USD = "EUR_USD",
}
