export interface IViewFilter {
  property: string;
  operator: ViewFilterOperator;
  operands: IViewFilter[];
  value: ViewFilterValueType;
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

export type ViewFilterValueType =
  'valueInt' |
  'valueBoolean' |
  'valueText' |
  'valueNumber' |
  'valueDate';

export interface ViewSorting {
  property: string;
  order: 'asc' | 'desc';
}
