import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent {

  @Input('diameter') diameter: number = 24;
  @Input('strokeWidth') strokeWidth: number = 3;

  constructor() { }
}
