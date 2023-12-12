import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startsreen',
  templateUrl: './startsreen.component.html',
  styleUrl: './startsreen.component.scss'
})
export class StartsreenComponent {
  
  constructor(private router: Router) {}

  newGame(){
    this.router.navigateByUrl('/game')
  }
}
