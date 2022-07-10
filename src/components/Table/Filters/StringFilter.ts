import { IFilter } from "./IFilter";

export class NumberFilter implements IFilter<string> {
  private currentValue: string;
  
  constructor(currentValue: string) {
    this.currentValue = currentValue;
  }

  public check(value: string): boolean {
    if (this.currentValue === "") return true;
    return value === this.currentValue;
  }
}