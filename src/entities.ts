import {Moment} from 'moment';
import {Map} from 'immutable';

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

export type Candles = Candle[];

export type Segment = {
  id: string,
  currencyPair: CurrencyPair,
  granularity: Granularity,
  direction: Direction,
  fromDate: Moment,
  toDate: Moment,
  ratio: number,
}

export type Segments = Map<string, Segment>;

export type Instruments = Instrument[];

export enum Granularity {
  M5 = "M5",
  H1 = "H1",
  D = "D",
}

export enum CurrencyPair {
  EUR_JPY = "EUR_JPY",
  USD_JPY = "USD_JPY",
  AUD_JPY = "AUD_JPY",
}

export enum Direction {
  High = "High",
  Low = "Low",
}
