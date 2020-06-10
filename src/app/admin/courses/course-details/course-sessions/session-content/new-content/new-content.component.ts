import { VideoPickerComponent } from './../../../../../../shared/video-picker/video-picker.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { ImagePickerComponent } from './../../../../../../shared/image-picker/image-picker.component';
import { FilePickerComponent } from './../../../../../../shared/file-picker/file-picker.component';
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
  note?: string,
  content_FR?: string
}

@Component({
  selector: 'app-new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.css']
})
export class NewContentComponent implements OnInit, OnDestroy {


  faPlusCircle = faPlusCircle;

  languages = [
    'bat', 'c', 'coffeescript', 'cpp', 'csharp', 'css', 'dockerfile', 'fsharp', 'go', 'graphql', 'html', 'ini', 'java', 'javascript', 'json',
    'kotlin', 'less', 'markdown', 'mysql', 'objective-c', 'pascal', 'perl', 'pgsql', 'php', 'plaintext', 'powershell', 'python', 'r',
    'razor', 'redis', 'scss', 'shell', 'sql', 'swift', 'twig', 'typescript', 'xml', 'yaml'
  ];

  public Editor = ClassicEditor;
  codeEditorOptions = {
    theme: 'vs-dark',
    language: this.languages[0]
  };

  updated = false;
  updating = false;
  errors: string[] = null;

  editMode = false;

  form: FormGroup;
  wasFormChanged = false;

  contentTypes = ['Text', 'Code', 'Image', 'Video',  'Resource'];
  imageType = false;
  videoType = false;
  textType = false;
  codeType = false;
  resourceType = false;

  siteLanguages = ['en', 'fr'];
  currentLang: string = null;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NewContentComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private translate: TranslateService) { }



  ngOnInit(): void {
    this.editMode = this.data.editMode;
    this.currentLang = this.translate.currentLang;

    if (!this.editMode) {
      this.form = new FormGroup({
        order: new FormControl(this.data.order, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        content: new FormControl(null, [Validators.required]),
        content_FR: new FormControl(null),
        note: new FormControl(null),
        currentLang: new FormControl(this.currentLang)
      });
    }
    else {
      this.form = new FormGroup({
        order: new FormControl(this.data.order, [Validators.required]),
        type: new FormControl(this.data.type, [Validators.required]),
        content: new FormControl(this.data.content, [Validators.required]),
        content_FR: new FormControl(this.data.content_FR),
        note: new FormControl(this.data.note),
        currentLang: new FormControl(this.currentLang)
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
        sessionId: this.data.editedSessionId,
        type: this.form.value.type,
        content: this.form.value.content,
        content_FR: this.form.value.content_FR,
        order: this.form.value.order,
        note: this.form.value.note
      }));
    } else {
      this.store.dispatch(new SessionContentsActions.CreateStart({
        sessionId: this.data.editedSessionId,
        type: this.form.value.type.toLowerCase(),
        content: this.form.value.content,
        content_FR: this.form.value.content_FR,
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
        this.imageType = false;
        this.videoType = false;
        this.codeType = false;
        this.resourceType = false;
        this.textType = true;
        break;
      case 'code':
        this.imageType = false;
        this.videoType = false;
        this.codeType = true;
        this.resourceType = false;
        this.textType = false;
        break;
      case 'image':
        this.imageType = true;
        this.videoType = false;
        this.textType = false;
        this.codeType = false;
        this.resourceType = false;
        break;
        case 'video':
          this.imageType = false;
          this.videoType = true;
          this.textType = false;
          this.codeType = false;
          this.resourceType = false;
          break;
      case 'resource':
        this.imageType = false;
        this.videoType = false;
        this.textType = false;
        this.codeType = false;
        this.resourceType = true;
        break;

      default:
        this.imageType = false;
        this.videoType = false;
        this.resourceType = false;
        this.textType = true;
        this.codeType = false;
    }
  }

  onSelectLanguage() {
    this.codeEditorOptions = {
      ...this.codeEditorOptions,
      language: this.form.value.note
    };
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

  selectVideo() {
    var dialogRef = this.dialog.open(VideoPickerComponent,
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

  onChangeLang() {
    const lang = this.form.value.currentLang;

    this.currentLang = lang;
  }


  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }
}
