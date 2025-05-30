import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableEpigramComponent } from './editable-epigram.component';

describe('EditableEpigramComponent', () => {
  let component: EditableEpigramComponent;
  let fixture: ComponentFixture<EditableEpigramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableEpigramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableEpigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
