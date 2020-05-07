import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './dropdown.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { DiscardChangesComponent } from './discard-changes/discard-changes.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';

import { MaterialModule } from '../material-module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderHomeCategoryComponent } from './loader-home-category/loader-home-category.component';
import { LoaderHomeCourseComponent } from './loader-home-course/loader-home-course.component';
import { LoaderCourseInfoComponent } from './loader-course-info/loader-course-info.component';
import { FilePickerComponent } from './file-picker/file-picker.component';

@NgModule({
    declarations: [
        DropdownDirective,
        ConfirmDialogComponent,
        NotFoundComponent,
        DiscardChangesComponent,
        ImgViewerComponent,
        PdfViewerModalComponent,
        ImagePickerComponent,
        BreadcrumbComponent,
        LoaderHomeCategoryComponent,
        LoaderHomeCourseComponent,
        LoaderCourseInfoComponent,
        FilePickerComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        PdfViewerModule,
        FontAwesomeModule,
        RouterModule
    ],
    exports: [
        DropdownDirective,
        BreadcrumbComponent,
        LoaderHomeCategoryComponent,
        LoaderHomeCourseComponent,
        LoaderCourseInfoComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ]
})
export class SharedModule { }