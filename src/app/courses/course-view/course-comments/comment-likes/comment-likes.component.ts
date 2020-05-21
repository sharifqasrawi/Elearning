import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { Like } from './../../../../models/like.model';

export interface DialogData {
  likes: Like[],
}

@Component({
  selector: 'app-comment-likes',
  templateUrl: './comment-likes.component.html',
  styleUrls: ['./comment-likes.component.css']
})
export class CommentLikesComponent implements OnInit {

  faThumbsUp = faThumbsUp;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentLikesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

}
