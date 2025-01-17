import { Component, Input, OnInit } from '@angular/core';
import { PostType } from 'src/app/core/model/post/postType';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent  implements OnInit {
  @Input()
  postContent!: PostType
  isExpanded = false;
  constructor() { }

  ngOnInit() {
    console.log(this.postContent.media)
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  isTextTooLong(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }
}
