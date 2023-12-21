import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent{
  @Input() name: string;

  @Input() image: string;

  @Input() playerActiv: boolean = false;

  constructor(){
    this.name = '';
    this.image = '1.webp';
  }

}
