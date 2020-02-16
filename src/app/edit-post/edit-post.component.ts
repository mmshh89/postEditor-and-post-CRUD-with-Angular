import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { PostService } from '../data/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../data/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post: Post;
  editTag: HTMLElement;
  modeCheckCon: boolean;
  

  constructor(private postService: PostService, private route: ActivatedRoute, private renderer: Renderer2, private router: Router) { 
    //console.log('chera' + this.post);
  }

  ngOnInit() {
    this.getPost();
    this.editTag = document.getElementById('textEditor');
    if (this.modeCheckCon) {
      this.htmlCheckedMode(true);
    }
    //this.editTag.innerHTML = this.post.postInnerHtml;
    //this.renderer.setStyle(this.editTag, 'direction', this.post.direction);
    //console.log('chera' + this.post);
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe((post) => {
      this.post = post;
      console.log(this.post)
      this.editTag.innerHTML = this.post.postInnerHtml;
      this.renderer.setStyle(this.editTag, 'direction', this.post.direction);
    });
  }

  setter() {
    this.post.postInnerHtml = this.editTag.innerHTML;
  }

  reform(action, sVlue) {
    if (this.validation) {
      document.execCommand(action, false, sVlue);
      this.editTag.focus();
    }
  }

  checkCon(e) {
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
      this.post.direction = direction;
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
    
    return true;
  }

  toSave() {
    if (this.chkContoSave(this.post.postInnerHtml)) {
      console.log('routing to saveThePost component');
      this.postService.updatePost(this.post).subscribe(() => {
        this.router.navigate(['/post', this.post.id]);
      });      
    }
  }
}
