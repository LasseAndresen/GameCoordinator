import {IViewFilter, ViewFilterOperator, ViewSorting} from '../../interfaces/IViewFilter';

export class WeaviateFilter implements IViewFilter {
  property: string;
  operator: ViewFilterOperator;
  operands: WeaviateFilter[];
  valueType: ViewFilterValueType;
  searchString: string;
  sorting: ViewSorting[];
  private _value: string | number | boolean | Date;
  set value(val: string | number | boolean | Date) {
    this._value = val;
    if (!val) {
      this.valueType = null;
      return;
    }
    this.valueType = val instanceof Date ?
      'valueDate' : Number.isInteger(val) ?
      'valueInt' : !!parseFloat(val.toString()) ?
      'valueNumber' : typeof val === 'boolean' ?
      'valueBoolean' :
      'valueText'
    ;
  }
  get value(): string | number | boolean | Date {
    return this._value;
  }

  public validate(): void {
    if (this.operator === 'And' || this.operator === 'Or') {
      if (!(this.operands?.length > 0)) {
        throw new Error('Expected operands to have a entries');
      }
      if (!!this.property || !!this.value) {
        throw new Error('Expected property and value to be null');
      }
    }
  }
}

export type ViewFilterValueType =
  'valueInt' |
  'valueBoolean' |
  'valueText' |
  'valueNumber' |
  'valueDate';
