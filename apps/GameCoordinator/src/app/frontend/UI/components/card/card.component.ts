import { Component, Input } from '@angular/core';
import { collapse } from '../../../styles/animations/collapse-animate';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [collapse],
})
export class CardComponent {
  @Input() cardTitle: any;
  @Input() isCollapse: boolean = false;
  @Input() smallTitle = false;
  collapse: string = 'on';

  public collapseCard() {
    this.collapse === 'on' ? (this.collapse = 'off') : (this.collapse = 'on');
  }
}
