import {Candles} from '~/entities';

export const getUpCount = (candles:Candles) => {
  return candles.filter(x => {
    return x.mid.o > x.mid.c
  }).length;
}
