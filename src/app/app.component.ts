import { Component} from '@angular/core';
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
  files: FileItem[] = FILE_LIST.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === FileType.FOLDER ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  })
  owners: FileOwner[] = OWNERS;
  title = 'file-management';

  showForm: boolean = false;

  onNewClick()
  {
    this.showForm = true;
  }
}
