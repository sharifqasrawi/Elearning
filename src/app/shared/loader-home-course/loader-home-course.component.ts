import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-home-course',
  templateUrl: './loader-home-course.component.html',
  styleUrls: ['./loader-home-course.component.css']
})
export class LoaderHomeCourseComponent implements OnInit {

  @Input() count = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
