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
  count: number,
}

export type Segments = Map<string, Segment>;

export type Instruments = Instrument[];

export enum Granularity {
  M15 = "M15",
  M5 = "M5",
  H1 = "H1",
  D = "D",
}

export enum CurrencyPair {
  CAD_AUD = "CAD_AUD",
  CHF_AUD = "CHF_AUD",
  EUR_AUD = "EUR_AUD",
  GBP_AUD = "GBP_AUD",
  JPY_AUD = "JPY_AUD",
  NZD_AUD = "NZD_AUD",
  USD_AUD = "USD_AUD",
  AUD_CAD = "AUD_CAD",
  CHF_CAD = "CHF_CAD",
  EUR_CAD = "EUR_CAD",
  GBP_CAD = "GBP_CAD",
  JPY_CAD = "JPY_CAD",
  NZD_CAD = "NZD_CAD",
  USD_CAD = "USD_CAD",
  AUD_EUR = "AUD_EUR",
  CHF_EUR = "CHF_EUR",
  CAD_EUR = "CAD_EUR",
  GBP_EUR = "GBP_EUR",
  JPY_EUR = "JPY_EUR",
  NZD_EUR = "NZD_EUR",
  USD_EUR = "USD_EUR",
  AUD_GBP = "AUD_GBP",
  CAD_GBP = "CAD_GBP",
  CHF_GBP = "CHF_GBP",
  EUR_GBP = "EUR_GBP",
  JPY_GBP = "JPY_GBP",
  NZD_GBP = "NZD_GBP",
  USD_GBP = "USD_GBP",
  AUD_JPY = "AUD_JPY",
  CAD_JPY = "CAD_JPY",
  CHF_JPY = "CHF_JPY",
  EUR_JPY = "EUR_JPY",
  GBP_JPY = "GBP_JPY",
  NZD_JPY = "NZD_JPY",
  USD_JPY = "USD_JPY",
  AUD_NZD = "AUD_NZD",
  CAD_NZD = "CAD_NZD",
  CHF_NZD = "CHF_NZD",
  EUR_NZD = "EUR_NZD",
  GBP_NZD = "GBP_NZD",
  JPY_NZD = "JPY_NZD",
  USD_NZD = "USD_NZD",
  AUD_USD = "AUD_USD",
  CAD_USD = "CAD_USD",
  CHF_USD = "CHF_USD",
  EUR_USD = "EUR_USD",
  GBP_USD = "GBP_USD",
  // JPY_USD = "JPY_USD",
  NZD_USD = "NZD_USD",
}

export enum Direction {
  High = "High",
  Low = "Low",
}
