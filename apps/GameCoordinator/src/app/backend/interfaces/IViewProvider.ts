import {IViewFilter} from './IViewFilter';

export interface IViewProvider {
  getView: (filter: IViewFilter, pageSize: number) => Promise<unknown>;
}
