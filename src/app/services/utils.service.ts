import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  get_host_server_local(){
    const serverAddress = window.location.host;
    return serverAddress
  }
}
