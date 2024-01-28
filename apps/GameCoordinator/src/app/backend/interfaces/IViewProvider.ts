export interface IViewProvider {
  getView: () => Promise<unknown>;
}
