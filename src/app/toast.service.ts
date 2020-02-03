import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  toasts: any[] = [];

  show(text: string, options: any = {}): void {
    this.toasts.push({ text, ...options });
  }

  remove(toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
