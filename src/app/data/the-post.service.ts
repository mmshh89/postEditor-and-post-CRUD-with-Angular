import { Injectable } from '@angular/core';
import { Post, ThePost } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class ThePostService {

  thePostData: Post = new Post();
  postValidation: boolean = false;

  constructor() { }

  getThePost(): ThePost {
    var thePost: ThePost = {
      postInnerHtml: this.thePostData.postInnerHtml,
      direction: this.thePostData.direction
    };
    return thePost;
  }

  setThePost(thePost: ThePost) {
    this.postValidation = true;
    this.thePostData.postInnerHtml = thePost.postInnerHtml;
    this.thePostData.direction = thePost.direction;
  }

  getThePostData() {
    return this.thePostData;
  }

  resetThePostData() {
    this.thePostData.clear();
    this.postValidation = false;
    return this.thePostData;
  }


  isThePostValid() {
    return this.postValidation;
  }

}
