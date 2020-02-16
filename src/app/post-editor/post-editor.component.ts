import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { ThePost, Post } from '../data/post.model';
import { ThePostService } from '../data/the-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {



  // @ViewChild('textEditor', {static: false}) editTag;
  editTag: HTMLElement;
  defaultTag: string;
  // postLisnr: Subject<string>;
  direction: string;
  modeCheckCon: boolean;

  thePost: ThePost;
  // setThePost: Post;
  // int: string;



  constructor(private thePostService: ThePostService, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.editTag = document.getElementById('textEditor');
    if (this.modeCheckCon) {
      this.htmlCheckedMode(true);
    }
    this.defaultTag = this.editTag.innerHTML;
    this.thePost = this.thePostService.getThePost();
    // this.thePost.postInnerHtml = this.editTag.innerHTML;
    if(this.thePost.postInnerHtml) {
      this.editTag.innerHTML = this.thePost.postInnerHtml;
      this.renderer.setStyle(this.editTag, 'direction', this.thePost.direction);
    }
  }

  setter() {
    this.thePost.postInnerHtml = this.editTag.innerHTML;
  }

  reform(action, sVlue) {
    if (this.validation) {
      document.execCommand(action, false, sVlue);
      this.editTag.focus();
    }
  }

  checkCon(e) {
    console.log(e);
    console.log(e.target.checked);
    this.modeCheckCon = e.target.checked;
    this.htmlCheckedMode(this.modeCheckCon);
  }

  validation() {
    if (!this.modeCheckCon) {
      return true;
    }

    alert("Uncheck \"Show HTML\".");
    this.editTag.focus();
    return false;
  }

  frtl(direction) {
    if (this.validation()) {
      this.renderer.setStyle(this.editTag, 'direction', direction);
      this.thePost.direction = direction;
    }
  }

  clean() {
    if (this.validation() && confirm('Are you sure?')) {
      this.editTag.innerHTML = this.defaultTag;
    }
  }

  hyperlink() {
    var sLnk = prompt('Write the URL here', 'http:\/\/');
    if (sLnk && sLnk != '' && sLnk != 'http://') {
      this.reform('createlink', sLnk);
    }
  }


  insertImgUrl: any[];
  takeImg(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.insertImgUrl = e.target.result;
        this.reform('insertImage', this.insertImgUrl);
      }
      reader.readAsDataURL(e.target.files[0]);
    }    
  }

  htmlCheckedMode(checkToSrc) {
    var tagHtmlContect;
    if (checkToSrc) {
      tagHtmlContect = document.createTextNode(this.editTag.innerHTML);
      this.editTag.innerHTML = "";
      var tagHtmlPre = document.createElement("pre");
      this.editTag.contentEditable = "false";
      tagHtmlPre.id = "srcText";
      tagHtmlPre.contentEditable = "true";
      tagHtmlPre.appendChild(tagHtmlContect);
      this.editTag.appendChild(tagHtmlPre);
      document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
      if (document.all) {
        this.editTag.innerHTML = this.editTag.innerText;
      } else {
        tagHtmlContect = document.createRange();
        tagHtmlContect.selectNodeContents(this.editTag.firstChild);
        this.editTag.innerHTML = tagHtmlContect.toString();
      }
      this.editTag.contentEditable = "true";
    }
    this.editTag.focus();
  }

  chkContoSave(thePostInrhtml: any): boolean {
    if (!thePostInrhtml) {
      return false;
    }

    this.thePostService.setThePost(this.thePost);
    return true;
  }

  toSave() {
    if (this.chkContoSave(this.thePost.postInnerHtml)) {
      console.log('routing to saveThePost component');
      this.router.navigate(['/postSaveView']);
    }
  }

}
