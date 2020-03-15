import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { ProfileModule } from "./features/profile/profile.module";
import { HomeModule } from "./core/home/home.module";
import { SharedModule } from "./shared/shared.module";
import { NewsFeedModule } from "./features/news-feed/news-feed.module";
import { SearchResultsModule } from "./features/search-results/search-results.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./core/signup/signup.component";
import { LoginComponent } from "./core/login/login.component";
import { FooterComponent } from "./core/footer/footer.component";
import { CopyrightComponent } from "./core/copyright/copyright.component";
import { ExperienceSectionService } from './shared/experience-section/experience-section.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule,
    HomeModule,
    NewsFeedModule,
    SearchResultsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AngularFirestore,
    ExperienceSectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
