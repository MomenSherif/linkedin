import { SignupComponent } from "./core/signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsFeedComponent } from "./features/news-feed/news-feed.component";
import { LoginComponent } from "./core/login/login.component";

const routes: Routes = [
  { path: "", component: SignupComponent, pathMatch: "full" },
  {
    path: "news-feed",
    loadChildren: () =>
      import("./features/news-feed/news-feed.module").then(
        m => m.NewsFeedModule
      )
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./features/profile/profile.module").then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
