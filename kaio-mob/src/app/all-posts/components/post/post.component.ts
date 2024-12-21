import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PostType } from 'src/app/core/model/post/postType'
import { UserType } from 'src/app/core/model/user.type'
//import { InternService } from 'src/app/core/services/intern.service'
import { PostService } from 'src/app/core/services/post/post.service'


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {

  
  @Input()
  public post!: PostType
  @Input()
  public index!:number
  @Input()
  public user!:UserType

  private _subscription!: Subscription

  constructor(
    private _service: PostService // Dependency Injection
  ) {}

 
  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    
  }
}
