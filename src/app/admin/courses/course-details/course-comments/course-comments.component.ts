import { TranslateService } from '@ngx-translate/core';
import { SignalRCommentsService } from './../../../../courses/course-view/course-comments/services/signalr-comments-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../../store/app.reducer';
import * as CoursesActions from '../../store/courses.actions';
import { Comment } from './../../../../models/comment.model';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-comments',
  templateUrl: './course-comments.component.html',
  styleUrls: ['./course-comments.component.css']
})
export class CourseCommentsComponent implements OnInit {


  faTrash = faTrash;

  courseId: number = null;
  courseAuthor: string = null;


  comments: Comment[] = null;
  loadedComments: Comment[] = null;
  count = 0;
  displayedCommentsCount = 5;
  addedCommentsCount = 5;
  showLoadMoreBtn = true;
  showLoadLessBtn = false;

  deleting = false;
  loading = false;
  loadingComments = false;
  loadingCourses = false;
  errors: string[] = null;


  showReplies: { [key: number]: boolean } = {};

  isAuthenticated = false;
  userId: string = null;

  currentUrl: string = null;


  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private tranlate: TranslateService,
    signalRCommentsService: SignalRCommentsService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;


      this.store.select('courses').subscribe(state => {
        const course = state.courses.find(c => c.id === this.courseId);
        if (course) {
          this.comments = [...course.comments];
          this.loadedComments = this.comments.slice(0, this.displayedCommentsCount);
          this.count = this.comments ? this.comments.length : 0;
          this.courseAuthor = course.createdBy;
        }
      });


    });

  }



  onDelete(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.tranlate.get(['COMMON.DELETE_CONFIRMATION', 'COURSE.DELETE_COMMENT']).subscribe(trans => {
      alertHeader = trans['COMMON.DELETE_CONFIRMATION'];
      alertMsg = trans['COURSE.DELETE_COMMENT'];
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CoursesActions.DeleteCommentStart(id));

      }
    });
  }

  onShowReplies(index: number) {
    for (let x in this.showReplies) {
      this.showReplies[x] = false;
    }

    this.showReplies[index] = true;
  }

  onHideReplies(index: number) {
    this.showReplies[index] = false;
  }

  loadMore() {
    if (this.comments.length > this.displayedCommentsCount) {
      this.showLoadLessBtn = true;
      this.displayedCommentsCount += this.addedCommentsCount;
      this.loadedComments = this.comments.slice(0, this.displayedCommentsCount).reverse();
    }

    if (this.comments.length === this.loadedComments.length) {
      this.showLoadMoreBtn = false;
    }
  }

  loadLess() {
    if (this.displayedCommentsCount > this.addedCommentsCount) {
      this.showLoadMoreBtn = true;
      this.displayedCommentsCount -= this.addedCommentsCount;
      this.loadedComments = this.comments.slice(0, this.displayedCommentsCount).reverse();
    }
    if (this.loadedComments.length === this.addedCommentsCount) {
      this.showLoadLessBtn = false;
    }
  }

}
