import { SignupComponent } from './core/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { HomeComponent } from './core/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignupComponent },
  { path: 'log-in', component: LoginComponent },
  {
    path: 'news-feed',
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import('./features/news-feed/news-feed.module').then(
        m => m.NewsFeedModule
      )
  },
  {
    path: 'profile',
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import('./features/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
