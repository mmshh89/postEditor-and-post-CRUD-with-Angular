import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { SaveThePostComponent } from './save-the-post/save-the-post.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  { path: 'postEditor', component: PostEditorComponent },

  { path: 'postSaveView', component: SaveThePostComponent },

  { path: 'posts', component: PostsComponent },

  { path: 'postEdit/:id', component: EditPostComponent },

  { path: 'post/:id', component: PostComponent },

  { path: '', redirectTo: '/posts', pathMatch: 'full' },

  { path: '**', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
