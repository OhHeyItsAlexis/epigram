import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpigramComponent } from './epigram.component';

describe('EpigramComponent', () => {
  let component: EpigramComponent;
  let fixture: ComponentFixture<EpigramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpigramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
