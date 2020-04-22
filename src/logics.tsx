import {v4 as uuid} from 'uuid';
import {Moment} from 'moment';
import {Candles, Candle, Segments, Segment, CurrencyPair, Granularity, WeekDay, Direction} from '~/entities';
import {chain, keyBy} from 'lodash';
import {Map} from 'immutable';


export const getUpCount = (candles:Candles) => {
  return candles.filter(x => {
    return x.mid.o > x.mid.c
  }).length;
}

export const getSegments = (
  candles:Candles,
  currencyPair: CurrencyPair,
  granularity: Granularity,
  fromDate: Moment,
  toDate: Moment,
  weekDay: WeekDay | null,
): Segments => {
  const rows = chain(candles)
    .groupBy((x:Candle) => x.time.format("HH:mm"))
    .map((x:Candles, key:string) => {
      const count = x.length;
      const upCount = count > 0 ? getUpCount(x): 0
      const upRatio = count > 0 ? upCount/count : 0;
      return {
        id:uuid(),
        currencyPair,
        granularity,
        fromDate,
        toDate,
        weekDay,
        count:count,
        ratio: upRatio > 0.5 ? upRatio : 1 - upRatio,
        direction: upRatio > 0.5 ? Direction.High : Direction.Low,
        timeOfDay: key,
      }
    })
    .keyBy(x => x.id)
    .value();
  return Map(rows)
}
