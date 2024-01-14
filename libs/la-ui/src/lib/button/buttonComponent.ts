import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'la-button',
  templateUrl: './buttonComponent.html',
  styleUrls: ['./buttonComponent.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonComponent implements OnInit {
  @Input()
  public text: string;

  @Input()
  public icon: string;

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class')
  public class = 'd-flex';

  constructor() {}

  ngOnInit() {}

  public click() {
    this.onClick.emit();
  }
}
