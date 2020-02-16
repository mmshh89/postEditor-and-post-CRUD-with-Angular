import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../data/post.model';
import { PostService } from '../data/post.service';
import { ActivatedRoute } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe((post) => {
      this.post = post;
    });
  }

}
