import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {Epigram} from '../../models/epigram';
import {NgIf} from '@angular/common';
import {EpigramService} from '../../services/epigram.service';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-editable-epigram',
  imports: [
    NgIf
  ],
  templateUrl: './editable-epigram.component.html',
  styleUrl: './editable-epigram.component.scss'
})
export class EditableEpigramComponent {
  @Input() epigram!: Epigram;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  isDeleted: boolean = false;

  @ViewChild('content') newContent: ElementRef<HTMLTextAreaElement> | undefined;

  constructor(private epigramService: EpigramService, private logger: LoggerService) {}

  onClick(event: MouseEvent): void {
    this.isEditing = true;
  }

  onBlur(event: FocusEvent): void {
   this.submit()
  }

  onKeyDown(event: KeyboardEvent): void {
    if(event.which === 13 && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  submit(): void {
    this.epigram.content = this.newContent!.nativeElement.value;
    this.epigramService.updateEpigram(this.epigram).subscribe(e => this.epigram = e);
    this.isEditing = false;
  }

  clickDelete(e: MouseEvent): void {
    this.isDeleting = true;
    this.isEditing = false;
  }

  confirmDelete(e: MouseEvent): void {
    this.isDeleted = true;
  }

  cancelDelete(e: MouseEvent): void {
    this.isDeleting = false;
  }
}
