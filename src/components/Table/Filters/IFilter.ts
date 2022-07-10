export interface IFilter<T = any> {
  check(value: T): boolean;
}