import { FilePickerComponent } from './../../../../../../shared/file-picker/file-picker.component';
import { ImagePickerComponent } from './../../../../../../shared/image-picker/image-picker.component';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { DiscardChangesComponent } from './../../../../../../shared/discard-changes/discard-changes.component';
import * as fromApp from '../../../../../../store/app.reducer';
import * as SessionContentsActions from '../store/session-contents.actions';

export interface DialogData {
  editMode: boolean,
  editedSessionId: number,
  order: number,
  type: string,
  content: string,
  id: number,
  note?: string
}

@Component({
  selector: 'app-new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.css']
})
export class NewContentComponent implements OnInit, OnDestroy {

  foralaButtonOptions = {
    'moreText': {
      'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    'moreParagraph': {
      'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    'moreRich': {
      'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
    },
    'moreMisc': {
      'buttons': ['undo', 'redo', 'fullscreen', 'selectAll', 'html']
    },
  };

  froalaOptions = {
    heightMin: 160,
    heightMax: 160,
    placeholderText: 'Enter session content',
    toolbarButtons: { ...this.foralaButtonOptions }
  };

  faPlusCircle = faPlusCircle;

  updated = false;
  updating = false;
  errors: string[] = null;

  editMode = false;

  form: FormGroup;
  wasFormChanged = false;

  contentTypes = ['Text', 'Code', 'Image', 'Resource'];
  imageType = false;
  textType = false;
  resourceType = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewContentComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }



  ngOnInit(): void {
    this.editMode = this.data.editMode;

    if (!this.editMode) {
      this.form = new FormGroup({
        order: new FormControl(this.data.order, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        content: new FormControl(null, [Validators.required]),
        note: new FormControl(null)
      });
    }
    else {
      this.form = new FormGroup({
        order: new FormControl(this.data.order, [Validators.required]),
        type: new FormControl(this.data.type, [Validators.required]),
        content: new FormControl(this.data.content, [Validators.required]),
        note: new FormControl(this.data.note)
      });
      this.onChangeType(this.data.type);
    }
  }

  onSubmit() {
    this.markAsDirty(this.form);

    if (!this.form.valid)
      return;

    if (this.editMode) {
      this.store.dispatch(new SessionContentsActions.UpdateStart({
        id: this.data.id,
        session: {
          id: this.data.editedSessionId
        },
        type: this.form.value.type,
        content: this.form.value.content,
        order: this.form.value.order,
        note: this.form.value.note
      }));
    } else {
      this.store.dispatch(new SessionContentsActions.CreateStart({
        session: {
          id: this.data.editedSessionId
        },
        type: this.form.value.type.toLowerCase(),
        content: this.form.value.content,
        order: this.form.value.order,
        note: this.form.value.note
      }));
    }

    // if (this.created)
    this.dialogRef.close();

  }

  onChangeType(type: string) {
    switch (type.toLowerCase()) {
      case 'text':
      case 'code':
        this.imageType = false;
        this.resourceType = false;
        this.textType = true;
        break;
      case 'image':
        this.imageType = true;
        this.textType = false;
        this.resourceType = false;
        break;
      case 'resource':
        this.imageType = false;
        this.textType = false;
        this.resourceType = true;
        break;

      default:
        this.imageType = false;
        this.resourceType = false;
        this.textType = true;
    }
  }


  selectImage() {
    var dialogRef = this.dialog.open(ImagePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { imagePath: string }) => {
      if (data) {
        this.form.patchValue({
          content: data.imagePath
        });
      }
    });

  }

  selectFile() {
    var dialogRef = this.dialog.open(FilePickerComponent,
      {
        width: '650px',
        height: '500px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe((data: { filePath: string }) => {
      if (data) {
        this.form.patchValue({
          content: data.filePath
        });
      }
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new SessionContentsActions.ClearErrors());
    this.store.dispatch(new SessionContentsActions.ClearStatus());
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  openDialog(): void {
    if (this.form.dirty) {
      const dialogRef = this.dialog.open(DiscardChangesComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }
}
