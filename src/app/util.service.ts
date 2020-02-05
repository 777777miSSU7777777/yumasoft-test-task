import { Injectable } from '@angular/core';
import matchAll from 'string.prototype.matchall';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor() {
   }

  public copyArray(src: any[]): any[] {
    return JSON.parse(JSON.stringify(src));
  }

  public parseCustomJSON(str: string): any[] {
    const pairs: Iterable<string> = matchAll(str, /([\w]+):/g);
        
    const keys: Set<string> = new Set<string>();

    for (let pair of pairs) {
      keys.add(pair[1]);
    }

    for (let key of keys) {
      const reg = new RegExp(key, "g");
      str = str.replace(reg, (item) => `"${item}"`);
    }

    return JSON.parse(str);
  }
}