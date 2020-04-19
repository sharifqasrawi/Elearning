import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { DiscardChangesComponent } from './discard-changes/discard-changes.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    declarations: [
        DropdownDirective,
        ConfirmDialogComponent,
        NotFoundComponent,
        DiscardChangesComponent,
        ImgViewerComponent,
        PdfViewerModalComponent,
    ],
    imports: [
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