import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AgroService} from '@modules/dashboard/services';
import {Field} from '@modules/dashboard/models';
import {Store, select} from '@ngrx/store';

import * as fromStore from '@modules/dashboard/+state'

@Component({
  selector: 'ap-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.css'],
  host: { class: 'field-root' }
})
export class FieldContainerComponent implements OnInit {

  public fields$: Observable<any[]>;
  public currentFieldId$: Observable<number>;

  constructor(
    private agroService: AgroService,
    private store: Store<fromStore.DashboardState>
  ) { }

  ngOnInit() {
    this.fields$ = this.store.pipe(select(fromStore.selectField));
    this.currentFieldId$ = this.store.pipe(select(fromStore.selectCurrentFieldId));

    this.store.dispatch(new fromStore.GetFieldList());
  }
}
