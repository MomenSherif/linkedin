import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchResultsComponent } from "./search-results.component";
import { ConnectListComponent } from "./connect-list/connect-list.component";

@NgModule({
  declarations: [SearchResultsComponent, ConnectListComponent],
  imports: [CommonModule],
  exports: [SearchResultsComponent, ConnectListComponent]
})
export class SearchResultsModule {}
