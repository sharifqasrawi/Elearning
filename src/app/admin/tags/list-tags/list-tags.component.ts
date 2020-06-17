import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import * as fromApp from '../../../store/app.reducer';
import * as TagsActions from '../store/tags.actions';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Tag } from './../../../models/tag.model';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  editMode = false;
  editedTagId: number = null;

  tags: Tag[] = null;
  errors: string[] = null;
  loading = false;
  creating = false;
  created = false;

  form: FormGroup;

  count = 0;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Tag>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit(): void {

    this.translate.get(['ADMINISTRATION.TAGS_MANAGEMENT.TAGS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.TAGS_MANAGEMENT.TAGS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['ADMINISTRATION.TAGS_MANAGEMENT.TAGS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.TAGS_MANAGEMENT.TAGS']}`);
      });
    });


    this.store.dispatch(new TagsActions.FetchStart());

    this.store.select('tags').subscribe(state => {
      this.tags = state.tags;
      this.loading = state.loading;
      this.creating = state.creating;
      this.created = state.created;
      this.errors = state.errors;

      this.setTable();

    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    if (this.editMode) {

      this.store.dispatch(new TagsActions.UpdateStart({
        id: this.editedTagId,
        name: this.form.value.name
      }));

    } else {

      this.store.dispatch(new TagsActions.CreateStart(this.form.value.name));
    }
    this.form.reset();

    if (this.editMode) {
      this.editMode = false;
      this.editedTagId = null;
    }

  }

  onEdit(id: number, name: string) {
    this.editMode = true;
    this.editedTagId = id;
    this.form.patchValue({
      name: name
    })
  }


  onDelete(id: number) {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_ACTION', 'COMMON.DELETE_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_ACTION'];
      alertMsg = trans['COMMON.DELETE_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new TagsActions.DeleteStart(id));
    });

  }

  onRefresh() {
    this.store.dispatch(new TagsActions.FetchStart());
    this.setTable();

  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.tags);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
