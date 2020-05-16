import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import * as MemberActions from '../store/member.actions';
import * as fromApp from '../../store/app.reducer';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {


  constructor(
  ) { }

  ngOnInit(): void {

  }


}
