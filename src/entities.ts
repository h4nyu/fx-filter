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
    l: number, o: number, },
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
  weekDay: WeekDay | null,
  timeOfDay: string,
}

export type Segments = Map<string, Segment>;

export type Instruments = Instrument[];

export enum Granularity {
  M15 = "M15",
  M5 = "M5",
  H1 = "H1",
  H4 = "H4",
  D = "D",
}

export enum CurrencyPair {
  AUD_JPY = "AUD_JPY",
  AUD_NZD = "AUD_NZD",
  AUD_USD = "AUD_USD",
  CAD_JPY = "CAD_JPY",
  CHF_JPY = "CHF_JPY",
  EUR_AUD = "EUR_AUD",
  EUR_GBP = "EUR_GBP",
  EUR_JPY = "EUR_JPY",
  EUR_USD = "EUR_USD",
  GBP_AUD = "GBP_AUD",
  GBP_JPY = "GBP_JPY",
  GBP_USD = "GBP_USD",
  NZD_JPY = "NZD_JPY",
  NZD_USD = "NZD_USD",
  USD_CAD = "USD_CAD",
  USD_CHF = "USD_CHF",
  USD_JPY = "USD_JPY",
}

export enum Direction {
  High = "High",
  Low = "Low",
}

export enum WeekDay {
  Sunday = "Sunday",
  Monday = "Monday", 
  Tuesday = "Tuesday", 
  Wednesday = "Wednesday", 
  Thursday = "Thursday", 
  Friday = "Friday",  
  Saturday = "Saturday",
}

export const weekDayLabels:Map<WeekDay,string> = Map([
  [WeekDay.Monday, "月"],
  [WeekDay.Tuesday, "火"],
  [WeekDay.Wednesday, "水"],
  [WeekDay.Thursday, "木"],
  [WeekDay.Friday, "金"],
  [WeekDay.Saturday, "土"],
])
