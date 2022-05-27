import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export type dropdownItem = { id: number; itemText: string };
@Component({
  selector: 'dropdown',
  template: ` <ng-multiselect-dropdown
    [placeholder]="placeHolder"
    [settings]="dropdownSettings"
    [data]="dropdownList"
    [(ngModel)]="selectedItems"
    (onSelect)="onItemSelect($event)"
    (onSelectAll)="onSelectAll($event)"
  >
  </ng-multiselect-dropdown>`,
})
export default class DropdownComponent {
  @Input('place-holder') placeHolder: string = '';
  @Input('dropdown-list') dropdownList: dropdownItem[] = [];
  @Output('selected-item-changed') selectedItemChanged = new EventEmitter();
  @Output('selected-items') selectedItems: any[] = [];
  dropdownSettings = {};

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'itemText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    this.selectedItemChanged.emit(this.selectedItems);
  }
  onSelectAll(items: any[]) {
    console.log(items);
  }
  onItemDeSelect(item: any) {
    console.log(item);
  }
}
