import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  host: { '[class.ngb-toasts]': 'true' }
})

export class ToastsContainerComponent {
  constructor(public toastService: ToastService) { }
}
