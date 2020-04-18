import { Directory } from './directory.model';

export class UploadedFile {
    constructor(
        public id?: number,
        public downloadPath?: string,
        public uploadDirectory?: Directory,
        public fileType?: string,
        public uploadDateTime?: Date,
    ) { }
}