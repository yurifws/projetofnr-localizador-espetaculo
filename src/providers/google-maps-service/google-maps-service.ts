import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/*
  Generated class for the GoogleMapsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapsServiceProvider {

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  constructor(
    public geolocation: Geolocation) {
  }

  // Note: Call this method on ngAfterViewInit
  create(element: ElementRef) {
    this.getGeolocationPosition().then(position => {
      const mapOptions = {
        center: position,
        zoom: 15,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        disableDefaultUI: true
      };  
      this.map = new google.maps.Map(element.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
    })    
  }

  centerToGeolocation() {
    return this.getGeolocationPosition().then((position) => {
      return this.centerToPosition(position);
    }, error => {
      return Promise.reject(error);
    });
  }

  getGeolocationPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((position) => {
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        resolve(latLng);
      }, error => {
        reject(error);
      });
    });
  }

  centerToPosition(latLng: any, zoom?: number, tilt?: number) {
    const cameraPosition = {
      target: latLng,
      zoom: zoom || 18,
      tilt: tilt || 10
    };
    return this.map.animateCamera(cameraPosition);
  }

  addMarker(position, title: string, infoClickCallback, animated = true) {
    const markerOptions = {
      position,
      title,
      animation: animated ? google.maps.Map.BOUNCE : null,
      infoWindowAnchor: infoClickCallback
    };

    return this.map.addMarker(markerOptions);
  }

  addMarkerToGeolocation(title: string, infoClickCallback, animated?: boolean) {
    this.getGeolocationPosition().then(position => {
      this.addMarker(position, title, infoClickCallback, animated);
    });
  }

  calculateRoute(lat, lng) {
    this.getGeolocationPosition().then((position) => {
      if(lng && lat) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: position,
        destination: new google.maps.LatLng(lat, lng),
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  });

}

traceRoute(service: any, display: any, request: any) {
  service.route(request, function (result, status) {
    if (status == 'OK') {
      display.setDirections(result);
    }
  });
}

}
