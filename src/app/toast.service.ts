import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private toasts: any[] = [];

  private show(text: string, options: any = {}): void {
    this.toasts.push({ text, ...options });
  }

  public showError(text: string, duration: number) {
    this.show(text, { classname: 'bg-danger text-light', delay: 1000 * duration })
  }

  public remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
