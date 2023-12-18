import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit{
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: any = '';
  games = [];
  unsubGames;


  firestore: Firestore = inject(Firestore);
  

  constructor(public dialog: MatDialog) {
    this.unsubGames = this.subGameList();
  }

  subGameList(){
    return onSnapshot(this.getGameRef(), (list) => {
      this.games = [];
      list.forEach(element => {
        console.log(element.data());
      });
    });
  }

  getGameRef(){
    return collection(this.firestore, 'ringoffire');
  }

  ngOnDestroy(){
    this.unsubGames();
  }
  
  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    
  }

  pickCard(){
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);
    }

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1500);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name)
      }
    });
  }
}

