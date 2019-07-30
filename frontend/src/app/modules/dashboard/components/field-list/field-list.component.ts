import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromStore from '@modules/dashboard/+state'

@Component({
  selector: 'ap-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css'],
  host: { class: 'field-list-root' }
})
export class FieldListComponent implements OnInit {

  public fields$: Observable<any[]>;

  constructor(
    private store: Store<fromStore.DashboardState>
  ) {}

  ngOnInit() {
    this.fields$ = this.store.pipe(select(fromStore.selectField));
  }

  setCurrentField(id: number) {
    this.store.dispatch(new fromStore.SetCurrentField(id))
  }
}
