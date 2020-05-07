import { Component, OnInit, Input } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export interface Link {
  url?: string,
  label: string,
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  faHome = faHome;

  @Input() links: Link[];

  constructor() { }

  ngOnInit(): void {
  }

}
