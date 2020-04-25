import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { faTag, faTimesCircle, faPlusCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Tag } from './../../../../models/tag.model';

import * as fromApp from '../../../../store/app.reducer';
import * as TagsActions from '../../../tags/store/tags.actions';
import * as CoursesActions from '../../../courses/store/courses.actions';

@Component({
  selector: 'app-course-tags',
  templateUrl: './course-tags.component.html',
  styleUrls: ['./course-tags.component.css']
})
export class CourseTagsComponent implements OnInit {

  faTag = faTag;
  faTimesCircle = faTimesCircle;
  faPlusCircle = faPlusCircle;
  faPlus = faPlus;
  faTrash = faTrash;

  @Input() tags: Tag[];
  @Input() courseId: number;

  allTags: Tag[] = null;
  courseTags: Tag[] = [];
  otherTags: Tag[] = [];

  updating = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new TagsActions.FetchStart());


    this.store.select('tags').subscribe(state => {
      this.allTags = state.tags;

      this.otherTags = this.allTags.filter(this.comparer(this.tags));
    });

    this.store.select('courses').subscribe(state => {
      this.updating = state.updating;
      if (state.updated)
        this.otherTags = this.allTags.filter(this.comparer(this.tags));
    });

  }

  onAddRemoveTag(tagId: number, action: string) {
    this.store.dispatch(new CoursesActions.AddRemoveTagStart({
      courseId: +this.courseId,
      tagId: tagId,
      action: action
    }));
  }

  onRefresh() {
    this.otherTags = this.allTags.filter(this.comparer(this.tags));
  }

  comparer(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.id === current.id
      }).length == 0;
    }
  }

}