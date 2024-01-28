import {IView} from '../../interfaces/IView';
import {IViewFilter} from '../../interfaces/IViewFilter';
import {ViewBoardGame} from '@gc-shared';

export class WeaviateView implements IView {
  columns: string[];
  rows: ViewBoardGame[];
  filter: IViewFilter;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
