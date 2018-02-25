import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLandingComponent } from './project-landing.component';

describe('ProjectLandingComponent', () => {
  let component: ProjectLandingComponent;
  let fixture: ComponentFixture<ProjectLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
