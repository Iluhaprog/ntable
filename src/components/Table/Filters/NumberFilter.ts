import { IFilter } from "./IFilter";

export class NumberFilter implements IFilter<number> {
  private currentValue: number;
  
  constructor(currentValue: number) {
    this.currentValue = currentValue;
  }

  public check(value: number): boolean {
    if (this.currentValue === 0) return true;
    return value === this.currentValue;
  }
}