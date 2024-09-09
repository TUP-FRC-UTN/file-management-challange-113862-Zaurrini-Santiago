import { Component, EventEmitter, Output } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { OWNERS } from '../../data/file.storage';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {  
  owners: FileOwner[] = OWNERS;
  selectedOwners: FileOwner[] = [];

  filetype = FileType;
  fileItem: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    owners: [{ name: '', avatarUrl: '' }],
    type: FileType.FILE,
    parentId: undefined,
  };

  @Output() formClosed = new EventEmitter<void>();
  @Output() enviadoEmit = new EventEmitter<FileItem>();

  save(form: NgForm) {
    if (form.valid) {
      console.log(this.fileItem.name, " ", this.fileItem.creation)
      this.fileItem.id = Math.random().toString(36).substr(2, 9);
      this.enviadoEmit.emit(this.fileItem);
      this.formClosed.emit();
      console.log(this.fileItem);
    }
    else{
      alert('Llene los campos');
      console.log(this.fileItem);
    }
  }

  onClose() {
    this.formClosed.emit(); // Emite el evento cuando se presiona "Volver"
  }
}
