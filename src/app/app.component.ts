import { Component, Input, OnInit } from '@angular/core';
import { ThePostService } from './data/the-post.service';
import { Post } from './data/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'postEditor';

  @Input() thePost;

  constructor(private thePostService: ThePostService) {}

  ngOnInit() {
    this.thePost = this.thePostService.getThePostData();
  }
}
