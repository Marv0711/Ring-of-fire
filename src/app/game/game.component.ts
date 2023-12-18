import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: any = '';
  games:any;
  unsubGames;


  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute ,public dialog: MatDialog) {
    this.unsubGames = this.subGameList();
  }

  async UpdateGame(currentGame:any, gameID:string) {
    let gameRef = this.getSingelDocRef("ringoffire", gameID);
    await updateDoc(gameRef, this.getcleanJSON(currentGame)).catch(
      (err) => { console.error(err) }
    );
  };

  getcleanJSON(currentGame:any){
    return{
      currentPlayer: currentGame.currentPlayer,
      playedCards: currentGame.playedCards,
      players: currentGame.players,
      stack: currentGame.stack
    }
  }

  getSingelDocRef(colId:string, docID:string){
    return doc(collection(this.firestore, colId), docID);
  }

   subGameList() {
    return onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        this.games = element.data();
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'ringoffire');
  }

  async addNote(game:any) {
    const docRef = await addDoc((this.getGameRef()), {
      game
    });
    console.log("Document written with ID: ", docRef.id);
  }

  ngOnDestroy() {
    this.unsubGames();
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.UpdateGame(this.game.toJson(), params['id']);
    })
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation) {
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
      if (name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }
}

