import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSearchField = new EventEmitter<number>();

  focus: false;
  searchFields = ['People', 'Jobs', 'Company', 'Country'];
  constructor() { }

  ngOnInit(): void {
  }
  filterProducts(inputVal: string) {
    this.onSearch.next(inputVal.toLocaleLowerCase());
  }
  searchByField(i: number) {
    this.onSearchField.next(i);
  }
}
