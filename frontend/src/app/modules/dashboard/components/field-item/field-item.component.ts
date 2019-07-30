import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

import * as fromStore from '@modules/dashboard/+state'
import {Observable} from 'rxjs/Observable';
import {withLatestFrom, filter, map} from 'rxjs/operators';
import {race} from 'rxjs';

@Component({
  selector: 'ap-field-item',
  templateUrl: './field-item.component.html',
  styleUrls: ['./field-item.component.css'],
  host: { class: 'field-item-root' }
})
export class FieldItemComponent implements OnInit {

  public fields$: Observable<any[]>;
  public currentFieldId$: Observable<number>;
  public currentField: any;

  constructor(
    private store: Store<fromStore.DashboardState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fields$ = this.store.pipe(select(fromStore.selectField));
    this.currentFieldId$ = race(
      this.store.pipe(
        select(fromStore.selectCurrentFieldId),
        filter(p => !!p)
      ),
      this.route.params.pipe(map(p => +p.id))
    );

    this.fields$.pipe(
      withLatestFrom(this.currentFieldId$),
      filter(([fields, id]) => {
        return !!fields && !!id;
      })
    ).subscribe(([fields, id]) => {
      this.currentField = fields.find(field => field.id === id) || null;
    })
  }
}
