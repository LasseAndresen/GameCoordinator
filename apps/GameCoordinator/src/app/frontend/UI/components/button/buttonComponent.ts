import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gc-button',
  templateUrl: './buttonComponent.html',
  styleUrls: ['./buttonComponent.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  public text: string;

  @Input()
  public icon: string;

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public click() {
    this.onClick.emit();
  }
}
