import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent } from './news-feed.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { SearchResultsModule } from '../search-results/search-results.module';
import { ConnectListComponent } from '../search-results/connect-list/connect-list.component';



@NgModule({
  declarations: [
    PostComponent,
    CommentsComponent,
    NewsFeedComponent,
    AddPostComponent,
    ProfileSectionComponent,
   
    
    ],
  imports: [
    CommonModule,
    SearchResultsModule
  ],
  exports:[
    NewsFeedComponent

  ]
})
export class NewsFeedModule { }
