import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import * as AboutActions from './store/about.actions';
import * as fromApp from '../../store/app.reducer';
import { About } from './../../models/about.model';
import { ImagePickerComponent } from '../../shared/image-picker/image-picker.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  public Editor = ClassicEditor;

  about: About = null;
  loading = false;
  saving = false;
  saved = false;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;

  languages = ['en', 'fr'];
  currentLang: string = null;
  editLang: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.editLang = this.translate.currentLang;
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      info: new FormControl(null, [Validators.required]),
      info_FR: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      title_FR: new FormControl(null),
      email1: new FormControl(null, [Validators.required, Validators.email]),
      email2: new FormControl(null),
      phoneNumber: new FormControl(null),
      website: new FormControl(null),
    });


    this.store.dispatch(new AboutActions.FetchStart());
    this.store.select('about').subscribe(state => {
      this.loading = state.loading;
      this.saving = state.saving;
      this.saved = state.saved;
      this.about = state.about;

      if (!state.loading && state.about) {
        this.form.setValue({
          name: state.about.name,
          imagePath: state.about.imagePath,
          info: state.about.info,
          info_FR: state.about.info_FR,
          title: state.about.title,
          title_FR: state.about.title_FR,
          email1: state.about.email1,
          email2: state.about.email2,
          phoneNumber: state.about.phoneNumber,
          website: state.about.website
        });
      }

    });
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
          imagePath: data.imagePath
        });
      }
    });

  }


  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new AboutActions.UpdateStart({
      name: this.form.value.name,
      imagePath: this.form.value.imagePath,
      info: this.form.value.info,
      info_FR: this.form.value.info_FR,
      title: this.form.value.title,
      title_FR: this.form.value.title_FR,
      email1: this.form.value.email1,
      email2: this.form.value.email2,
      phoneNumber: this.form.value.phoneNumber,
      website: this.form.value.website
    }));
  }
}
