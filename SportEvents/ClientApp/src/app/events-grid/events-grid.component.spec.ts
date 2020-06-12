import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventsGridComponent } from './events-grid.component';
import { CrudService } from 'src/app/crud.service';
import { of } from 'rxjs';

describe('EventsGridComponent', () => {
  let component: EventsGridComponent;
  let fixture: ComponentFixture<EventsGridComponent>;

  beforeEach(async(() => {
    const testData = [
      { "id": 1, "name": "Liverpool - Juventus", "oddsForFirstTeam": 1.95, "oddsForDraw": 3.15, "oddsForSecondTeam": 2.20, "eventStartDate": "2022-12-25T20:00:00" },
      { "id": 2, "name": "Grigor Dimitrov - Rafael Nadal", "oddsForFirstTeam": 2.00, "oddsForDraw": 3.05, "oddsForSecondTeam": 2.70, "eventStartDate": "2022-06-06T16:00:00" },
      { "id": 3, "name": "Barcelona - Ludogorets", "oddsForFirstTeam": 1.01, "oddsForDraw": 4.20, "oddsForSecondTeam": 15.20, "eventStartDate": "1055-12-31T16:30:00" }
    ];

    
    const crudService = jasmine.createSpyObj('CrudService', ['getAll', 'setEntity']);
    let loadSpy = crudService.getAll.and.returnValue(of(testData));

    TestBed.configureTestingModule({
      declarations: [EventsGridComponent],
      providers: [
        { provide: CrudService, useValue: crudService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual('Sport Events');
  }));

  it('should start with Edit mode, then switch to Preview mode when toggled', async(() => {
    const modeButton = fixture.nativeElement.querySelector('#mode_btn');
    expect(modeButton.textContent).toEqual('Edit mode');
    modeButton.click();
    fixture.detectChanges();
    expect(modeButton.textContent).toEqual('Preview mode');
  }));

  it('should toggle Edit flag when Mode button is clicked', async(() => {
    const modeButton = fixture.nativeElement.querySelector('#mode_btn');
    expect(fixture.componentRef.instance.editOn).toEqual(false);
    modeButton.click();
    expect(fixture.componentRef.instance.editOn).toEqual(true);
  }));

});
