import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Epigram} from '../../shared/models/epigram';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  epigramForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    let epigram = new Epigram();
    Object.assign(epigram, this.epigramForm.value);
    console.warn(epigram);
  }
}
