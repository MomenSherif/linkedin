import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfileInfoComponent, AboutComponent],
  imports: [
CommonModule,
SharedModule,
  ],
  exports: [AboutComponent, ProfileInfoComponent]
})
export class ProfileModule { }
