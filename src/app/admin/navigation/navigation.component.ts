import { Component, OnInit, ViewChild } from '@angular/core';
import { faUser, faUserPlus, faUsersCog, faChessKing, faCogs, faEnvelopeSquare, faListAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  faAdmin = faChessKing;
  faUsers = faUsersCog;
  faListUsers = faUser;
  faAddUser = faUserPlus;
  faCogs = faCogs;
  faEnvelopeSquare = faEnvelopeSquare;
  faListAlt = faListAlt;
  faTrashAlt = faTrashAlt

  options = {
    top: 74,
    bottom: 60,
    fixed: true,
  };
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
