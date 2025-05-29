import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Epigram} from '../../shared/models/epigram';
import {EpigramService} from '../../shared/services/epigram.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  constructor(private epigramService: EpigramService, private router: Router) {
  }

  epigramForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    let epigram = new Epigram();
    Object.assign(epigram, this.epigramForm.value);
    this.epigramService.createEpigram(epigram).subscribe((e: Epigram) => this.router.navigate(['epigram', epigram.id.toString()]));
  }
}
