import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsFeedComponent } from "./features/news-feed/news-feed.component";

const routes: Routes = [{ path: "news-feed", component: NewsFeedComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
