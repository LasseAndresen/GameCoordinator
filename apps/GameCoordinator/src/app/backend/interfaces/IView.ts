import {IViewFilter} from './IViewFilter';

export interface IView {
  columns: string[];
  rows: object[];
  filter: IViewFilter;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
