import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCardUserComponent } from './search-card-user.component';

describe('SearchCardUserComponent', () => {
  let component: SearchCardUserComponent;
  let fixture: ComponentFixture<SearchCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCardUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCardUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
