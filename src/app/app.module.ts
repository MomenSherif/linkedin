import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './features/profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { NewsFeedModule } from './features/news-feed/news-feed.module';
import { SearchResultsModule } from './features/search-results/search-results.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { CopyrightComponent } from './core/copyright/copyright.component';
import { SearchPageComponent } from './features/search-results/search-page/search-page.component';

import { ExperienceSectionService } from './shared/experience-section/experience-section.service';
import { HomeComponent } from './core/home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    CopyrightComponent,
    SearchPageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule,
    NewsFeedModule,
    SearchResultsModule,
    SharedModule,
    // AngularFireDatabaseModule
  ],
  providers: [
    AngularFirestore,
    ExperienceSectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
