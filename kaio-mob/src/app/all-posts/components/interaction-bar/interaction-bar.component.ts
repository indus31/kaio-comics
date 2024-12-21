import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interaction-bar',
  templateUrl: './interaction-bar.component.html',
  styleUrls: ['./interaction-bar.component.scss'],
})
export class InteractionBarComponent  implements OnInit {
  showCommentForm: boolean = false;

  constructor() { }

  ngOnInit() {}
  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  

}
