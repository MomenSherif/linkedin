import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './features/profile/profile.module';
import { HomeModule } from './core/home/home.module';


import { AppComponent } from './app.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { CopyrightComponent } from './core/copyright/copyright.component';
import { NavMainComponent } from './core/nav-main/nav-main.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    CopyrightComponent,
    NavMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
