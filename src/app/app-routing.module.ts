import { SignupComponent } from "./core/signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsFeedComponent } from "./features/news-feed/news-feed.component";
import { LoginComponent } from "./core/login/login.component";
import { AuthGuardService } from "./_services/auth-guard.service";

const routes: Routes = [
  { path: "", component: SignupComponent, pathMatch: "full" },
  { path: "log-in", component: LoginComponent },
  {
    path: "news-feed",
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("./features/news-feed/news-feed.module").then(
        m => m.NewsFeedModule
      )
  },
  {
    path: "profile",
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("./features/profile/profile.module").then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
