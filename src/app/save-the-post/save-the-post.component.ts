import { Component, OnInit } from '@angular/core';
import { ThePostService } from '../data/the-post.service';
import { Post } from '../data/post.model';
import { PostService } from '../data/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-the-post',
  templateUrl: './save-the-post.component.html',
  styleUrls: ['./save-the-post.component.css']
})
export class SaveThePostComponent implements OnInit {

  thePostData: Post;

  constructor(private thePostService: ThePostService, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.thePostData = this.thePostService.getThePostData();
    console.log(this.thePostData);
  }


  save() {
    const newPost = this.thePostData;
    console.log(`New Project: ${newPost}`);
    this.postService.addPost(newPost).subscribe(result => {
      if (result) {
        this.router.navigate(['/posts']);
        this.thePostService.resetThePostData();
      }
    })
  }

}
