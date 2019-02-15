import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {AgmMap} from '@agm/core';

import {Subscriber} from 'rxjs/Subscriber';
import {AgroService} from '@modules/dashboard/services';

import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs";

import { Field } from '@modules/dashboard/models';

import * as R from 'ramda';

import {} from 'googlemaps';

@Component({
  selector: 'ap-agro-map',
  templateUrl: './agro-map.component.html',
  styleUrls: ['./agro-map.component.css']
})
export class AgroMapComponent implements OnInit, AfterViewInit, OnDestroy {

  public drawingManagerOptions = {
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    }
  };

  public activeColor: string = 'red';
  public defaultColor: string = '#000000';

  @ViewChild('someMap') mapView: AgmMap;

  public fields$: Observable<any[]>;
  public fields: Field[];
  public currentField: Field;

  public isPolygonEdit: boolean = false;
  public map: google.maps.Map;
  public mapMode = null;
  public mapSubscriber: Subscriber<any>;

  public lat = 50.4650055;
  public lng = 26.033686;

  public drawingManager: google.maps.drawing.DrawingManager;

  constructor(
    private ref: ChangeDetectorRef,
    private agroService: AgroService
  ) {}

  ngOnInit() {
    this.fields$ = this.agroService.getAllField();

    this.onPolygonComplete = this.onPolygonComplete.bind(this);
    this.onPolygonClickWrapper = ((self) => {
      return function () {
        self.onPolygonClick(this);
      };
    })(this);

    combineLatest(this.mapView.mapReady, this.fields$).subscribe(
      ([map, fields]) => {

        this.fields = fields.map(f => ({...f, path: JSON.parse(f.path)})); // TODO: make model to remap string to lat/lng obj

        this.fields.map((f) => this.applyPolygonToMap(f, <google.maps.Map>map))
      }
    );
  }

  ngAfterViewInit() {
    this.mapSubscriber = this.mapView.mapReady.subscribe(map => {
      this.map = map;
      this.createDrawingManager(this.drawingManagerOptions);
    });
  }

  ngOnDestroy() {
    this.mapSubscriber.unsubscribe();
  }

  onPolygonClickWrapper() {}

  applyPolygonToMap(field: Field, map: google.maps.Map) {
    field.polygon = new google.maps.Polygon({
      paths: field.path
    });
    field.polygon.set('id', field.id);
    field.polygon.addListener('click', this.onPolygonClickWrapper);
    field.polygon.setMap(map);
  }

  createDrawingManager(options) {
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(this.map);
    this.drawingManager.addListener('polygoncomplete', this.onPolygonComplete);
  }

  onPolygonClick(polygon: google.maps.Polygon) {
    if (this.currentField) {
      this.currentField.polygon.setMap(null);
      this.currentField.polygon.setOptions({ fillColor: this.defaultColor });
      this.currentField.polygon.setMap(this.map);
      this.currentField = null;
    }

    polygon.setMap(null);
    polygon.setOptions({ fillColor: 'red' });
    polygon.setMap(this.map);

    const field = this.fields.find(field => field.id === polygon.get('id'));

    if (field) {
      this.currentField = Object.assign({}, {...field});
      this.ref.detectChanges();
    }
  }

  onPolygonComplete(polygon: google.maps.Polygon) {
    const path = [];
    const name = "name";
    const description = "description";

    polygon.getPath().forEach(latlng => path.push(latlng.toJSON()));
    polygon.addListener('click', this.onPolygonClickWrapper);

    this.agroService.createField({ name, description, path: JSON.stringify(path) }).subscribe(
      (field) => {
        field.polygon = polygon;
        polygon.set('id', field.id);

        this.fields.push(field);
      }
    );

    this.setViewMode();
  }

  setCreateMode() {
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    this.mapMode = google.maps.drawing.OverlayType.POLYGON;
  }

  setViewMode() {
    this.drawingManager.setDrawingMode(null);
    this.mapMode = null;
  }

  setEditPolygonMode() {
    this.isPolygonEdit = true;
    this.currentField.polygon.setEditable(true);
    this.ref.detectChanges();
  }

  finishEditPolygonMode() {
    this.isPolygonEdit = false;

    this.fields.find(field => field.id === this.currentField.polygon.get('id'));

    const path = [];
    this.currentField.polygon.getPath().forEach(latlng => path.push(latlng.toJSON()));

    this.agroService.updateFiled(this.currentField.id, {
      id: this.currentField.id,
      name: this.currentField.name,
      description: this.currentField.description,
      path: JSON.stringify(path)
    }).subscribe(
      (field) => {
        field = Object.assign(field, { polygon: this.currentField.polygon, path, id: +field.id });

        this.fields = [...this.fields.filter(f => f.id != this.currentField.id), field];

        this.currentField.polygon.setEditable(false);
        this.ref.detectChanges();
      }
    )
  }

  removeField() {
    this.agroService.deleteFiled(this.currentField.id).subscribe(
      () => {
        this.fields = this.fields.filter(f => f.id != this.currentField.id);
        this.currentField.polygon.setMap(null);
        this.currentField = null;
        this.ref.detectChanges();
      }
    );
  }

  get isViewMode(): boolean {
    return R.equals(this.mapMode, null);
  }

  get isCreateMode(): boolean {
    return R.equals(this.mapMode, google.maps.drawing.OverlayType.POLYGON);
  }

  get isFieldSelected(): boolean {
    return !!this.currentField;
  }
}
