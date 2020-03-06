import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { CopyrightComponent } from './core/copyright/copyright.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    CopyrightComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
