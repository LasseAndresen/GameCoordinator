export interface IViewFilter {
  property: string;
  operator: ViewFilterOperator;
  operands: IViewFilter[];
  value: string | number | boolean | Date;
  searchString: string;
  sorting: ViewSorting[];
  validate: () => void;
}

export type ViewFilterOperator =
  'And' |
  'Or' |
  'Equal' |
  'NotEqual' |
  'GreaterThan' |
  'GreaterThanEqual' |
  'LessThan' |
  'LessThanEqual' |
  'Like' |
  'WithinGeoRange' |
  'IsNull' |
  'ContainsAny' |
  'ContainsAll';

export interface ViewSorting {
  property: string;
  order: 'asc' | 'desc';
}
