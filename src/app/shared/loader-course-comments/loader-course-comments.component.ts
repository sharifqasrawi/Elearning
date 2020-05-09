import { faReply, faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-course-comments',
  templateUrl: './loader-course-comments.component.html',
  styleUrls: ['./loader-course-comments.component.css']
})
export class LoaderCourseCommentsComponent implements OnInit {

  faReply = faReply;
  faHeart = faHeart;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

}
