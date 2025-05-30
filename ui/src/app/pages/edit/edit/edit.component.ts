import { Component } from '@angular/core';
import {LoggerService} from '../../../shared/services/logger.service';
import {EpigramService} from '../../../shared/services/epigram.service';
import {Epigram} from '../../../shared/models/epigram';
import {EditableEpigramComponent} from '../../../shared/components/editable-epigram/editable-epigram.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [
    EditableEpigramComponent,
    NgForOf
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  constructor(private epigramService: EpigramService, private logger: LoggerService,) {}

  epigrams: Epigram[] = [];

  ngOnInit(): void {
    this.epigramService.getAllEpigrams().subscribe((epigrams) => { this.epigrams = epigrams; });
  }

  epigramById(index: number, epigram: Epigram) {
    return epigram.id;
  }
}
