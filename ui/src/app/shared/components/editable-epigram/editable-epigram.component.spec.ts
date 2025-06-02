import { ComponentFixture, TestBed } from '@angular/core/testing';


import { EditableEpigramComponent } from './editable-epigram.component';
import {EpigramService} from '../../services/epigram.service';
import {HttpClient} from '@angular/common/http';
import {provideRouter, RouterModule} from '@angular/router';

describe('EditableEpigramComponent', () => {
  let component: EditableEpigramComponent;
  let fixture: ComponentFixture<EditableEpigramComponent>;
  let contentText: HTMLElement;
  let deleteButton: HTMLElement;

  beforeEach(async () => {

    const epigramServiceSpy = jasmine.createSpyObj('EpigramService', ['deleteEpigram']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);

    TestBed.configureTestingModule({
      imports: [EditableEpigramComponent],

      providers: [provideRouter([]),
        { provide: EpigramService, useValue: epigramServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },],
    });

    const epigramService = TestBed.inject(EpigramService) as jasmine.SpyObj<EpigramService>
    const httpService = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    fixture = TestBed.createComponent(EditableEpigramComponent);
    component = fixture.componentInstance;
    component.epigram = {
      id: -1,
      content: "I am an epigram!",
    }
    fixture.detectChanges();
    contentText = fixture.nativeElement.querySelector('#epigram-content');
    deleteButton = fixture.nativeElement.querySelector('#delete-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the epigram contents', () => {
    expect(contentText.innerText).toContain("I am an epigram!");
  });

  it('should display the delete button', () => {
    expect(deleteButton.innerText).toContain("🗑");
  });

  describe('clicking the delete button', () => {
      let confirmButton: HTMLElement;
      let cancelButton: HTMLElement;
      let warningMessage: HTMLElement;

      beforeEach(() => {
        console.log(deleteButton);
        deleteButton.click();
        fixture.detectChanges();
        confirmButton = fixture.nativeElement.querySelector('#confirm-delete');
        cancelButton = fixture.nativeElement.querySelector('#cancel-delete');
        warningMessage = fixture.nativeElement.querySelector('#delete-warning');
      });

      it('should show warning and buttons to confirm', () => {
        expect(confirmButton.innerText).toContain("✔️");
        expect(cancelButton.innerText).toContain("❌");
        expect(warningMessage.innerText).toContain("Do you really want to forget this wisdom?");
      });
  });
});

class MockEpigramService {
  isLoggedIn = true;
  user = { name: 'Test User' };
}
