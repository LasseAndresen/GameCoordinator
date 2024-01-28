import {IViewFilter, ViewFilterOperator, ViewFilterValueType, ViewSorting} from '../../interfaces/IViewFilter';

export class WeaviateFilter implements IViewFilter {
  property: string;
  operator: ViewFilterOperator;
  operands: IViewFilter[];
  value: ViewFilterValueType;
  searchString: string;
  sorting: ViewSorting[];

  public validate(): void {

  }
}
