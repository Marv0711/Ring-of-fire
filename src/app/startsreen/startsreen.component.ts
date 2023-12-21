import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startsreen',
  templateUrl: './startsreen.component.html',
  styleUrl: './startsreen.component.scss'
})
export class StartsreenComponent {
  game: Game = new Game();
  id:any;
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router) {}

  newGame(){
    this.addNote().then( () => {
      this.router.navigateByUrl('/game/' + this.id)
    });
  }

  async addNote() {
      const docRef = await addDoc(this.getGameRef(), {
        currentPlayer: this.game.currentPlayer,
        images: this.game.images,
        playedCards:  this.game.playedCards,
        players: this.game.players,
        stack: this.game.stack,
        pickCardAnimation: this.game.pickCardAnimation,
        currentCard: this.game.currentCard
      });
      this.id = docRef.id;
  }

  getGameRef() {
    return collection(this.firestore, 'ringoffire');
  }
}

