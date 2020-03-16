import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() filteredArray: User[] = [];
  CopyArr: User[];

  pageSize = 1;
  pageNums: number;
  hightlightStatus: Array<boolean> = [];
  currentIndex = 0;
  constructor() { }
  ngOnChanges() {
    const itemsinpage = this.filteredArray?.length / this.pageSize;
    this.pageNums = Math.ceil(itemsinpage);
    this.hightlightStatus = [];
    this.hightlightStatus[0] = true;
    if (this.filteredArray?.length >= this.pageSize) {
      this.CopyArr = this.filteredArray.slice(0, this.pageSize);
    } else {
      this.CopyArr = this.filteredArray.slice(
        0,
        this.filteredArray.length
      );
    }
    // console.log(this.filteredArray);
    // console.log(this.CopyArr);

  }
  ngOnInit(): void {


  }
  counter(pgnum: number) {
    return new Array(pgnum);
  }
  displayProductsInPage(i: number) {
    this.hightlightStatus.forEach((val, ind, a) => (a[ind] = false));
    this.hightlightStatus[i] = true;
    this.currentIndex = i;
    if (i !== this.pageNums - 1) {
        this.CopyArr = this.filteredArray.slice(
          this.pageSize * i,
          this.pageSize * i + this.pageSize
        );
      } else {
        this.CopyArr = this.filteredArray.slice(
          this.pageSize * i,
          this.filteredArray.length
        );
      }

  }
  handelNext() {
    this.currentIndex = this.currentIndex + 1 >= this.pageNums ? 0 : this.currentIndex + 1;
    this.displayProductsInPage(this.currentIndex);
  }
  handelPrevious() {
    this.currentIndex = this.currentIndex - 1 < 0 ? this.pageNums - 1 : this.currentIndex - 1;
    this.displayProductsInPage(this.currentIndex);
  }

}
