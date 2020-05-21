import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

import * as fromApp from '../../../../../store/app.reducer';
import * as CoursesActions from '../../../store/courses.actions';

export interface DialogData {
  classId: string
}

export interface userData {
  id: string,
  fullName: string
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  listUsers: userData[] = null;
  filteredUsers: Observable<userData[]>;
  loadingUsers = false;
  errors: string[] = [];

  userControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new CoursesActions.FetchNonClassMembersStart(this.data.classId));

    this.store.select('courses').subscribe(state => {
      this.listUsers = state.nonClassMembers;
      this.loadingUsers = state.loadingMembers;

      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  onSubmit() {
    this.errors = [];
    const user = this.listUsers.find(u => u.fullName === this.userControl.value);
    const userId = user ? user.id : null;

    if (userId && this.data.classId) {
      this.store.dispatch(new CoursesActions.EnrollUserStart({
        classId: this.data.classId,
        userId: userId,
        action: 'enroll'
      }));

      if (this.errors.length === 0) {
        this.dialogRef.close();
      }
    }
    else {
      this.errors.push('Error adding member to class');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _filter(value: string): userData[] {
    const filterValue = value.toLowerCase();

    return this.listUsers.filter(option => option.fullName.toLowerCase().indexOf(filterValue) === 0);
  }
}
