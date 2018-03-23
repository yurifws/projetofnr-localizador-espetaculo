
export class Evento{
    //informacoes do evento
    nome: string
    sinopse: string
    classificacao: string
    data: string
    duracao: string

    //imagem do evento
    url: string
    fullPath: string

    //endereco baseado em latitude e longitude
    subEstado: string
    cep: number
    cidade: string
    bairro: string
    subLogradouro: string
    codigoPais: string
    nomePais: string
    estado: string
    logradouro: string

    //latitude e longitude
    latitude: number
    longitude: number


    constructor() {
        //informacoes do evento
        this.nome = '';
        this.sinopse = '';
        this.classificacao = '';
        this.data = '';
        this.duracao = '';
        //imagem do evento
        this.url = '';
        this.fullPath = '';
        //endereco baseado em latitude e longitude
        this.subEstado= '';
        this.cep = 0;
        this.cidade = '';
        this.bairro = '';
        this.subLogradouro = '';
        this.codigoPais = '';
        this.nomePais = '';
        this.estado = '';
        this.logradouro = '';
        //latitude e longitude
        this.latitude = 0;
        this.longitude = 0;
    }

    // popularLocalEvento(nativeGeocoderResultModel:NativeGeocoderResultModel, 
    //     latitude: number, 
    //     longitude: number){
    //     this.subEstado = nativeGeocoderResultModel.subAdministrativeArea;
    //     this.cep = nativeGeocoderResultModel.postalCode;
    //     this.cidade = nativeGeocoderResultModel.locality;
    //     this.bairro = nativeGeocoderResultModel.subLocality;
    //     this.subLogradouro = nativeGeocoderResultModel.subThoroughfare;
    //     this.codigoPais = nativeGeocoderResultModel.countryCode;
    //     this.nomePais = nativeGeocoderResultModel.countryName;
    //     this.estado =  nativeGeocoderResultModel.administrativeArea;
    //     this.logradouro = nativeGeocoderResultModel.thoroughfare;
    //     this.latitude = latitude;
    //     this.longitude = longitude; 

    // } 

    // popularInformacoesEvento(informacoesEvento: InformacoesEvento){
    //    this.nome = informacoesEvento.nome;
    //    this.sinopse = informacoesEvento.sinopse;
    //    this.classificacao = informacoesEvento.classificacao;
    //    this.data = informacoesEvento.data;
    //    this.duracao = informacoesEvento.duracao;
    // }


    
}