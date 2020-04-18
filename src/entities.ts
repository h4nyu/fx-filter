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
export type Granularity = "M1" | "M5"
export type CurrencyPair = "EUR_USD"
