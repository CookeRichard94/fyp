import { Component, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  @Input() fileUrl: string;
  @Input() docId: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  error: boolean = false;

  constructor(private storage: AngularFireStorage, private backend_Service: BackendService) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
        this.error = true;
        console.log('unsupporterd file type');
        return;
    } else {
        this.error = false;
    }
    const filePath = 'fyp/ecommerce/' + this.fileUrl + '/' + new Date().getTime();
    
      const task = this.storage.upload(filePath, file);
      this.percentage = task.percentageChanges();

      this.task = this.storage.upload(filePath, file);
      this.percentage = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
          finalize(() => {
          return this.backend_Service.setProductPic(filePath, this.fileUrl, this.docId);
          })
        ).subscribe();
    }

    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
