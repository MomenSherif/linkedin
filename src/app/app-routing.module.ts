import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedComponent } from './features/news-feed/news-feed.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home-page/home-page.component';
import { SearchPageComponent } from './features/search-results/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignupComponent},
  { path: 'log-in', component: LoginComponent},
  { path: 'search-page', component: SearchPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
