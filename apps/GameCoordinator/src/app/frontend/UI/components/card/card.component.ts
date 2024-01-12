import { Component, Input, Output, EventEmitter } from '@angular/core';
import { collapse } from '../../../styles/animations/collapse-animate';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [collapse],
})
export class CardComponent {
  protected _collapsed: string = 'on';

  @Input()
  public cardTitle: any;
  @Input()
  public isCollapse: boolean = false;
  @Input()
  public smallTitle = false;
  @Input()
  public centerTitle = false;
  @Input()
  public clickable = false;

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter<void>();

  public collapseCard() {
    this._collapsed === 'on' ? (this._collapsed = 'off') : (this._collapsed = 'on');
  }

  public onCardClicked() {
    if (!this.clickable) {
      return;
    }
    this.onClick.emit();
  }
}
