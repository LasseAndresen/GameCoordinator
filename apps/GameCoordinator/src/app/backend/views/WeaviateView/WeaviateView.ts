import {IView} from '../../interfaces/IView';
import {IViewFilter} from '../../interfaces/IViewFilter';

export class WeaviateView implements IView {
  columns: string[];
  rows: object[];
  filter: IViewFilter;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
