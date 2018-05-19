import { NativeGeocoderResultModel } from './../../models/nativeGeocoderResult';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, NavParams, Keyboard } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Observable } from 'rxjs/Observable';


declare var google: any;


@Component({
  selector: 'page-novo-evento-mapa',
  templateUrl: 'novo-evento-mapa.html',
})
export class NovoEventoMapaPage {

  geocoder: any;
  autocompleteItems: any;
  autocomplete: { input: string; };
  GoogleAutocomplete: any;
  tituloPagina: string;
  map: any;
  infowindowMinhaLocalizacao: any;
  markerMinhaLocalizacao: any;

  infowindowLocalizacaoDoEvento: any;
  markerLocalizacaoDoEvento: any;

  resultadoEndereco: NativeGeocoderResultModel;
  evento: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private plataform: Platform,
    public nativeGeocoder: NativeGeocoder,
    public alertCtrl: AlertController,
    public zone: NgZone,
    public keyboard: Keyboard) {

    this.evento = this.navParams.data.evento || {};
    this.setarTituloPagina();

    this.geocoder = new google.maps.Geocoder;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  setarTituloPagina() {
    if (this.evento.key) {
      this.tituloPagina = 'Alterar local do evento'
    } else {
      this.tituloPagina = 'Local do evento'
    }
  }




  ngAfterViewInit() {
    this.plataform.ready().then(() => {
      this.initPage();

    }).catch((error: any) => {
      console.log(error)
    });
  }

  initPage() {
    this.geolocation.getCurrentPosition().then((retorno: any) => {
      this.loadMap(retorno.coords.latitude, retorno.coords.longitude);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  loadMap(lat, lng) {
    function addInfoWindow(descricao: string) {
      return new google.maps.InfoWindow({
        content: '<div>' + descricao + '</div>'
      });
    }

    function addMarker(position, map) {
      return new google.maps.Marker({
        position: position,
        map: map
      });
    }

    let latLng: any;
    let latLngMinhaLocalizacao = new google.maps.LatLng(lat, lng)

    if (this.evento.key) {
      latLng = new google.maps.LatLng(this.evento.latitude, this.evento.longitude);
    } else {
      latLng = new google.maps.LatLng(lat, lng);
    }

    const mapOptions = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);


    this.markerMinhaLocalizacao = addMarker(latLngMinhaLocalizacao, this.map);
    this.infowindowMinhaLocalizacao = addInfoWindow('<p>Minha localização</p>')

    this.map.addListener('idle', () => {

      if (!this.keyboard.isOpen()) {
        
        if (this.markerLocalizacaoDoEvento == null) {
          this.markerLocalizacaoDoEvento = addMarker(this.map.getCenter(), this.map);
          this.infowindowLocalizacaoDoEvento = addInfoWindow('<p>Minha localização</p>');
        } else {
          this.markerLocalizacaoDoEvento.setMap(null);
          this.markerLocalizacaoDoEvento = addMarker(this.map.getCenter(), this.map);
        }

        this.nativeGeocoder.reverseGeocode(this.map.getCenter().lat(), this.map.getCenter().lng())
          .then((result: NativeGeocoderReverseResult) => {
            this.resultadoEndereco = JSON.parse(JSON.stringify(result[0]));

            let enderecoInfoWindow: string = '<p>' + result[0].thoroughfare + '<br/>' +
              'Bairro: ' + result[0].subLocality + ', CEP: ' + result[0].postalCode + '<br/>' +
              result[0].locality + '/' + result[0].administrativeArea + '<br/>' +
              result[0].countryName + '(' + result[0].countryCode + ')</p>'
            this.infowindowLocalizacaoDoEvento.setMap(null);

            this.infowindowLocalizacaoDoEvento = addInfoWindow(enderecoInfoWindow);
            this.infowindowLocalizacaoDoEvento.open(this.map, this.markerLocalizacaoDoEvento);

          }).catch((error: any) => {

            console.error(error)
          });
      }
    });

    // this.map.addListener('center_changed', () => {
    //   this.infowindowMinhaLocalizacao.close();
    //   this.infowindowLocalizacaoDoEvento.close();
    // });

    // this.markerMinhaLocalizacao.addListener('click', () => {
    //   this.infowindowMinhaLocalizacao.open(this.map, this.markerMinhaLocalizacao);
    // });

    //   this.markerLocalizacaoDoEvento.addListener('click', () => {
    //     this.infowindowLocalizacaoDoEvento.open(this.map, this.markerLocalizacaoDoEvento);
    //   });
  }

  openPage() {
    let alert = this.alertCtrl.create({
      title: 'Confirmação de local do evento',
      message: 'Confirma o endereço: ' + this.resultadoEndereco.thoroughfare +
        ', Bairro: ' + this.resultadoEndereco.subLocality + ', CEP: ' + this.resultadoEndereco.postalCode +
        ', ' + this.resultadoEndereco.locality + '/' + this.resultadoEndereco.administrativeArea +
        ', ' + this.resultadoEndereco.countryName + '(' + this.resultadoEndereco.countryCode + ')',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.preecherLocalEvento();
            this.navCtrl.push('NovoEventoInformacoesPage', { evento: this.evento });
          }
        }
      ]
    });
    alert.present();

  }

  preecherLocalEvento() {
    this.evento.subEstado = this.resultadoEndereco.subAdministrativeArea;
    this.evento.cep = this.resultadoEndereco.postalCode;
    this.evento.cidade = this.resultadoEndereco.locality;
    this.evento.bairro = this.resultadoEndereco.subLocality;
    this.evento.subLogradouro = this.resultadoEndereco.subThoroughfare;
    this.evento.codigoPais = this.resultadoEndereco.countryCode;
    this.evento.nomePais = this.resultadoEndereco.countryName;
    this.evento.estado = this.resultadoEndereco.administrativeArea;
    this.evento.logradouro = this.resultadoEndereco.thoroughfare;
    this.evento.latitude = this.map.getCenter().lat();
    this.evento.longitude = this.map.getCenter().lng();
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    this.autocompleteItems = [];
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

}
