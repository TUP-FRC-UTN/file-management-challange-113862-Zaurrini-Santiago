import { Component } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { FILE_LIST, OWNERS } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: (FileItem & { selected: boolean})[] = FILE_LIST.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === FileType.FOLDER ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  }).map(file => ({ ...file, selected: false }));
  owners: FileOwner[] = OWNERS;
  title = 'file-management';

  showForm: boolean = false;

  onNewClick()
  {
    this.showForm = true;
  }

  onFormClosed() {
    this.showForm = false; 
  }

  saveForm(file: FileItem) {
    this.files.push({ ...file, selected: false });
    this.files.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.FOLDER ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  deleteFiles()
  {
    const selectedFiles = this.files.filter(file => file.selected);

    if(selectedFiles.length === 0){
      alert('Please select at least one file to delete');
      console.log('No file selected');
      return;
    }

    if(selectedFiles.length > 1 ){
      const confirmDelete = confirm('Seguro que quiere borrar?');

      if(confirmDelete){
        this.files = this.files.filter(file => !file.selected);
        console.log('Files deleted', selectedFiles);
      }
    } else{
      this.files = this.files.filter(file => !file.selected);
      console.log('File deleted', selectedFiles);
    }   
  }
}
