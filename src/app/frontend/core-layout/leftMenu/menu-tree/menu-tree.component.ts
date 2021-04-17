import { Component, Input, OnInit } from '@angular/core';
import { collapse } from '../../../styles/animations/collapse-animate';
import { MenuItem } from '../models/menuItem';

@Component({
  selector: 'menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
  animations: [collapse]
})
export class MenuTreeComponent implements OnInit {
  @Input()
  public items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
  }

  public onItemClicked(item: MenuItem) {
    console.log('clicking');
    if (item.children?.length > 0) {
      console.log('Toggling expand');
      item.expanded = !item.expanded;
    }
  }

}
