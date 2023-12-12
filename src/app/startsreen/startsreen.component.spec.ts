import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsreenComponent } from './startsreen.component';

describe('StartsreenComponent', () => {
  let component: StartsreenComponent;
  let fixture: ComponentFixture<StartsreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartsreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartsreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
