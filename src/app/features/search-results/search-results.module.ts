import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { ConnectListComponent } from './connect-list/connect-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchResultsComponent,
    ConnectListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SearchResultsComponent,
    ConnectListComponent
  ]
})
export class SearchResultsModule { }
