import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private toasts: any[] = [];

  public show(text: string, options: any = {}): void {
    console.log('123');
    this.toasts.push({ text, ...options });
  }

  public remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
