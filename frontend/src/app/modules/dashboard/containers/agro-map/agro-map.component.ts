import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import {AgmMap} from '@agm/core';

import {Subscriber} from 'rxjs/Subscriber';
import {AgroService} from '@modules/dashboard/services';

import { Field } from '@modules/dashboard/models';

import * as R from 'ramda';

import {} from 'googlemaps';

@Component({
  selector: 'ap-agro-map',
  templateUrl: './agro-map.component.html',
  styleUrls: ['./agro-map.component.css']
})
export class AgroMapComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public activeColor: string = 'red';
  public defaultColor: string = '#000000';

  @ViewChild('someMap') mapView: AgmMap;

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
    this.fields = [
      {
        id: 1,
        path: [
          { lat: 50.46211613431092, lng: 26.020553904663075 },
          { lat: 50.47271487565699, lng: 26.018236476074208 },
          { lat: 50.460203737291565, lng: 26.04338486779784 },
          { lat: 50.46249860443564, lng: 26.020725566040028 },
          { lat: 50.46173366109317, lng: 26.020124751220692 }
        ]
      }
    ];
    this.currentField = this.fields[0];

    this.onPolygonComplete = this.onPolygonComplete.bind(this);
    this.onPolygonClickWrapper = ((self) => {
      return function () {
        self.onPolygonClick(this);
      };
    })(this);
  }

  public onPolygonClickWrapper() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.mapSubscriber = this.mapView.mapReady.subscribe(map => {
      this.map = map;

      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }
      });
      this.drawingManager.setMap(this.map);

      this.drawingManager.addListener('polygoncomplete', this.onPolygonComplete);

      this.fields = this.fields.map(field => {
        field.polygon = new google.maps.Polygon({
          paths: field.path
        });
        field.polygon.set('id', field.id);
        field.polygon.addListener('click', this.onPolygonClickWrapper);
        field.polygon.setMap(this.map);
        return  field;
      });
    });
  }

  ngOnDestroy() {
    this.mapSubscriber.unsubscribe();
  }

  onPolygonClick(polygon: google.maps.Polygon) {
    if (this.currentField) {
      this.currentField.polygon.setOptions({ fillColor: this.defaultColor });
      this.currentField.polygon.setMap(this.map);
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
    const id = 33;

    polygon.getPath().forEach(latlng => path.push(latlng.toJSON()));
    polygon.set('id', id);
    polygon.addListener('click', this.onPolygonClickWrapper);

    this.fields.push({ id, path, polygon });
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
  }

  finishEditPolygonMode() {
    this.isPolygonEdit = false;
    this.currentField.polygon.setEditable(false);

    this.fields.find(field => field.id === this.currentField.polygon.get('id'));

    const path = [];
    this.currentField.polygon.getPath().forEach(latlng => path.push(latlng.toJSON()));
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

  get currentFieldId() {
    return R.prop('id', this.currentField);
  }
}
