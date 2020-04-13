import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        DropdownDirective,
        ConfirmDialogComponent,
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        DropdownDirective
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ]
})
export class SharedModule { }