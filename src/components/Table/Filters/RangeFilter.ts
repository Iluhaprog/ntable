import { IFilter } from "./IFilter";

export type TRange = {
  from: number | Date,
  to: number | Date,
}

export class RangeFilter implements IFilter<TRange> {
  private currentValue: TRange;
  
  constructor(currentValue: TRange) {
    this.currentValue = currentValue;
  }

  public check(value: TRange): boolean {
    return value.from >= this.currentValue.from && value.to <= this.currentValue.to;
  }
}