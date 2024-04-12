import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosInformesService {
  data:any[]=[];
  data_informe:any[]=[];
  constructor() { }

  setData(data:any,data_informe:any){
    this.data=data;
    this.data_informe=data_informe;
  }
  getData(){
    return this.data;
  }
  getDataInforme(){
    return this.data_informe;
  }
}
