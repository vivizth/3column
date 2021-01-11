import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('toInteger', ()=> {
    it('should be 1 if input is minus', () => {
      const res = app.toInteger(-2);
      expect(res).toBe(1);
    });

    it('should round if input is decimal', () => {
      const res = app.toInteger(33.33);
      expect(res).toBe(33);
    });
  });
  
});
