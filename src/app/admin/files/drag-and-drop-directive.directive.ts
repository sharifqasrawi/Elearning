import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDropDirective]'
})
export class DragAndDropDirectiveDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
