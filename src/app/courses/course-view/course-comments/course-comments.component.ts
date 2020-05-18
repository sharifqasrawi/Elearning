import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { faReply, faHeart, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Comment } from './../../../models/comment.model';
import * as fromApp from '../../../store/app.reducer';
import * as HomeCommentsActions from './store/comments.actions';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import {  SignalRCommentsService } from './services/signalr-comments-service.service';

@Component({
  selector: 'app-course-comments',
  templateUrl: './course-comments.component.html',
  styleUrls: ['./course-comments.component.css']
})
export class CourseCommentsComponent implements OnInit {

  faReply = faReply;
  faHeart = faHeart;
  faTrash = faTrash;
  faEdit = faEdit;

  courseId: number = null;
  courseAuthor: string = null;


  comments: Comment[] = null;
  loadedComments: Comment[] = null;
  count = 0;
  displayedCommentsCount = 5;
  addedCommentsCount = 5;
  showLoadMoreBtn = true;
  showLoadLessBtn = false;

  creating = false;
  updating = false;
  deleting = false;
  loading = false;
  loadingComments = false;
  loadingCourses = false;
  errors: string[] = null;

  form: FormGroup;

  replyForm: FormGroup;
  showReplyForm: { [key: number]: boolean } = {};
  showEditReplyForm: { [key: number]: boolean } = {};
  showReplies: { [key: number]: boolean } = {};

  editForm: FormGroup;
  showEditForm: { [key: number]: boolean } = {};

  isAuthenticated = false;
  userId: string = null;
  isUserLikeComment: { [key: number]: boolean } = {};

  currentUrl: string = null;

  test: Comment[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private signalRService: SignalRCommentsService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.courseId = +params.courseId;
    });

    this.store.dispatch(new HomeCommentsActions.FetchStart(this.courseId));

    this.form = new FormGroup({
      text: new FormControl(null, [Validators.required])
    });

    this.editForm = new FormGroup({
      editedText: new FormControl(null, [Validators.required])
    });

    this.replyForm = new FormGroup({
      commentId: new FormControl(null),
      text: new FormControl(null, [Validators.required])
    });


    this.store.select('homeComments').subscribe(state => {
      this.comments = state.comments;
      this.loadedComments = state.comments.slice(0, this.displayedCommentsCount).reverse();
      this.count = state.comments.length;
      this.loadingComments = state.loading;
      this.loading = this.loadedComments && this.loadingCourses;
      this.creating = state.creating;
      this.updating = state.updating;
      this.deleting = state.deleting;
      this.errors = state.errors;

      if (state.created) {
        this.form.reset();
      }

      if (state.updated) {
        this.editForm.reset();
        for (let x in this.showEditForm) {
          this.showEditForm[x] = false;
        }

        this.editForm.reset();
        for (let x in this.showEditReplyForm) {
          this.showEditReplyForm[x] = false;
        }
      }

      if (state.created) {
        this.replyForm.reset();
        for (let x in this.showReplyForm) {
          this.showReplyForm[x] = false;
        }
      }

    });


    this.store.select('login')
      .subscribe(state => {
        this.isAuthenticated = state.isAuthenticated;
        if (state.user) this.userId = state.user.id;
      });


    this.store.select('homeCourses').subscribe(state => {
      this.loadingCourses = state.loading;
      this.loading = this.loadedComments && this.loadingCourses;

      const course = state.courses.find(c => c.id === this.courseId);
      if (course) this.courseAuthor = course.createdBy;

    });


    this.currentUrl = this.router.url.replace('?courseId=' + this.courseId, '');
  }


  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new HomeCommentsActions.CreateStart({
      courseId: this.courseId,
      text: this.form.value.text
    }));
  }

  onSubmitEdit(id: number) {
    if (!this.editForm.valid)
      return;

    this.store.dispatch(new HomeCommentsActions.UpdateStart({
      id: id,
      text: this.editForm.value.editedText
    }));
  }


  onSubmitReply(id: number) {
    if (!this.replyForm.valid)
      return;

    this.store.dispatch(new HomeCommentsActions.CreateStart({
      courseId: this.courseId,
      text: this.replyForm.value.text,
      commentId: id
    }));
  }

  onReply(index: number) {
    for (let x in this.showReplyForm) {
      this.showReplyForm[x] = false;
    }

    this.showReplyForm[index] = true;
  }

  onCancelReply(index: number) {
    this.showReplyForm[index] = false;
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


  onEdit(index: number, text: string) {
    for (let x in this.showEditForm) {
      this.showEditForm[x] = false;
    }

    this.showEditForm[index] = true;
    this.editForm.patchValue({
      editedText: text
    });
  }

  onCancelEdit(index: number) {
    this.showEditForm[index] = false;
  }


  onEditReply(index: number, text: string) {
    for (let x in this.showEditReplyForm) {
      this.showEditReplyForm[x] = false;
    }

    this.showEditReplyForm[index] = true;
    this.editForm.patchValue({
      editedText: text
    });
  }

  onCancelEditReply(index: number) {
    this.showEditReplyForm[index] = false;
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { header: 'Delete Confirmation', message: 'Are you sure you wish to delete this comment ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new HomeCommentsActions.DeleteStart(id));

      }
    });
  }

  onLike(commentId: number, action: string) {
    this.store.dispatch(new HomeCommentsActions.LikeStart({
      commentId: commentId,
      action: action
    }));
  }

  checkUserLikeComment(commentId: number, index: number, replyId?: number) {
    const comment = this.loadedComments.find(c => c.id === commentId);
    if (replyId) {
      const reply = comment.replies.find(r => r.id === replyId);
      for (let like of reply.likes) {
        if (like.userId === this.userId) {

          return true;
        }
      }
    }
    else {
      for (let like of comment.likes) {
        if (like.userId === this.userId) {
          this.isUserLikeComment[index] = true;
          return true;
        }
      }
    }
  }


  // checkUserLikeReply(commentId: number, replyId: number) {
  //   const comment = this.comments.find(c => c.id === commentId);
  //   for (let like of comment.likes) {
  //     if (like.userId === this.userId) {
  //       return true;
  //     }
  //   }
  // }

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
