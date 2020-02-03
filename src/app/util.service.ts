import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor() { }

  public copyArray(src: any[]): any[] {
    return JSON.parse(JSON.stringify(src));
  }
}
