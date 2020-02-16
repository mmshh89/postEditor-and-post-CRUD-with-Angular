import { Component, OnInit } from '@angular/core';
import { Post } from '../data/post.model';
import { PostService } from '../data/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  editPost(index: number) {
    console.log(index);
    this.router.navigate(['/postEdit', index]);
  }

  deletePost(post: Post) {
    //console.log(post);  
    this.posts = this.posts.filter(p => p !== post);
    this.postService.deletePost(post).subscribe();    
  }

  goToThePost(index: number) {
    this.router.navigate(['/post', index]);
  }

}
