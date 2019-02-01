import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import * as Highcharts from 'highcharts';

import {} from 'googlemaps';
import {AgmMap} from "@agm/core";

@Component({
  selector: 'ap-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('someMap') map: AgmMap;

  public paths: google.maps.LatLng[] = [
    new google.maps.LatLng(25.774, -80.190),
    // new google.maps.LatLng(18.466, -66.118),
    // new google.maps.LatLng(32.321, -64.757),
    // new google.maps.LatLng(25.774, -80.190)
  ];


  // title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;

  // public highcharts = Highcharts;
  // public chartConstructor = 'chart'; // optional string, defaults to 'chart'
  // public chartOptions = {
  //   series: [{
  //     data: [1, 2, 3, 45, 22, -1212, 0, 1000]
  //   }]
  // };
  // public updateFlag = false; // optional boolean
  // public oneToOneFlag = true; // optional boolean, defaults to false

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const poly = new google.maps.Polygon({
      paths: this.paths,
      // editable: true
    });
    const map = this.map.mapReady.subscribe(map => {
      poly.setMap(map);

      map.editable = true;
      let drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }
      });
      console.log(google.maps.drawing.DrawingManager)
      drawingManager.setMap(map);
    });



  }

  handleMapClick($event) {
    const coords: google.maps.LatLng = $event.coords;
  }
}
