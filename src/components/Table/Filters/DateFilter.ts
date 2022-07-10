import { IFilter } from "./IFilter";

export class DateFilter implements IFilter<Date> {
  private currentValue: Date;
  
  constructor(currentValue: Date) {
    this.currentValue = currentValue;
  }

  public check(value: Date): boolean {
    return value === this.currentValue;
  }
}