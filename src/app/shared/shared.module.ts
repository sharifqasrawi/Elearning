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

@NgModule({
    declarations: [
        DropdownDirective,
        ConfirmDialogComponent,
        NotFoundComponent,
        DiscardChangesComponent,
        ImgViewerComponent,
        PdfViewerModalComponent,
        ImagePickerComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        PdfViewerModule
    ],
    exports: [
        DropdownDirective
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ]
})
export class SharedModule { }