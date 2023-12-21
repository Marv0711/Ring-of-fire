import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game = new Game();
  games:any;
  unsubGames;
  unsubCurrentGame;
  currentParms:any;


  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute ,public dialog: MatDialog) {
    this.unsubGames = this.subGameList();
    this.unsubCurrentGame = this.subCurrentGame();
  }

  subCurrentGame(){
    return onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        if(element.id == this.currentParms['id']){
          this.game.currentPlayer = element.data()['currentPlayer'];
          this.game.images = element.data()['images'];
          this.game.playedCards = element.data()['playedCards'];
          this.game.players = element.data()['players'];
          this.game.stack = element.data()['stack'];
          this.game.pickCardAnimation = element.data()['pickCardAnimation'];
          this.game.currentCard = element.data()['currentCard'];
        }
      });
    });
  }

  setNoteObject(obj: any, id: string){
    return{
      id: id,
      type: obj.type || "",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false 
    }
   }

   UpdateGame() {
    let currentGame = this.game;
    
    let gameID = this.currentParms['id'];
    let gameRef = this.getSingelDocRef("ringoffire", gameID);
     updateDoc(gameRef, this.getcleanJSON(currentGame)).catch(
      (err) => { console.error(err) }
    );
  };

  getcleanJSON(currentGame:any){
    return{
      currentPlayer: currentGame.currentPlayer,
      images: currentGame.images,
      playedCards: currentGame.playedCards,
      players: currentGame.players,
      stack: currentGame.stack,
      pickCardAnimation: currentGame.pickCardAnimation,
      currentCard: currentGame.currentCard
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

  ngOnDestroy() {
    this.unsubGames();
    this.unsubCurrentGame();
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.currentParms = params
    })
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.playedCards.push(this.game.currentCard);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    }
    setTimeout(() => {
      this.game.pickCardAnimation = false;
    }, 1500);
    this.UpdateGame();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.game.images.push('1.webp')
        this.UpdateGame();
      }
    });
  }

  editPlayer(playerId:number){
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if(change){
        this.game.images[playerId] = change;
        this.UpdateGame();
      }
    });
  }
}

