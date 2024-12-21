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
  constructor() { }

  ngOnInit() {}

}
