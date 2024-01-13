import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CardComponent {
  @Input()
  public cardTitle: string;
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

  public onCardClicked() {
    if (!this.clickable) {
      return;
    }
    this.onClick.emit();
  }
}
