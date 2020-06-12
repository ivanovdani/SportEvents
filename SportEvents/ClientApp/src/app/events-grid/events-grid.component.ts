import { Component } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: [ './events-grid.component.css']
})

export class EventsGridComponent {
  public sportEvents: SportEvent[];
  public editOn: boolean;
  public modeName: string;
  public editableRow: number;
  private cs: CrudService;

  constructor(cs: CrudService) {
    this.editOn = false;
    this.editableRow = -1;
    this.modeName = "Edit mode";
    this.cs = cs;
    this.cs.setEntity("SportEvent");
    this.load();
  }

  isPassedDate(date: string): boolean {
    return moment.utc(date) < moment.utc()
  }

  getLocalDate(date: string): string {
    return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
  }

  logOdds(sportEvent: SportEvent, oddType: string, event: any) {
    console.log(`${sportEvent.id}, ${oddType}, ${sportEvent[oddType]}`);
  }

  toggleMode() {
    this.editOn = !this.editOn;
    this.modeName = this.editOn ? "Preview mode" : "Edit mode";
  }

  changeField(index: number, property: string, event: any) {
    let editField;
    if (typeof this.sportEvents[index][property] === "number") {
      editField = parseFloat(event.target.textContent);
    }
    else if (property === "eventStartDate") {
      //keep dates in utc iso
      editField = moment(event.target.textContent).utc().toISOString();
    }
    else {
      editField = event.target.textContent;
    }
    this.sportEvents[index][property] = editField;
  }

  add() {
    const entity: SportEvent = {
      eventStartDate: moment.utc().toDate()
    };
    this.cs.create(entity).subscribe(() => {
      this.load();
    }, error => console.error(error));
  }

  edit(index: number, event: any) {
    this.editableRow = index;
  }

  delete(index: any) {
    this.cs.delete(this.sportEvents[index].id).subscribe(() => {
      this.sportEvents.splice(index, 1);
    }, error => console.error(error));
  }

  load() {
    this.cs.getAll<SportEvent[]>().subscribe(result => {
      this.sportEvents = result;
    }, error => console.error(error));
  }

  save(index: number) {

    this.cs.update(this.sportEvents[index].id, this.sportEvents[index]).subscribe(() => {
      this.editableRow = -1;
    }, error => console.error(error));
  }
  
}

interface SportEvent {
  id?: number;
  name?: string;
  oddsForFirstTeam?: number;
  oddsForDraw?: number;
  oddsForSecondTeam?: number;
  eventStartDate: Date;
}
