import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor() { }

  copyArray(src: any[]): any[] {
    return JSON.parse(JSON.stringify(src));
  }
}
