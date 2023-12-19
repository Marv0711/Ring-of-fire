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
  unsubCurrentGame;


  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute ,public dialog: MatDialog) {
    this.unsubGames = this.subGameList();
    this.unsubCurrentGame = this.subCurrentGame("WlklxbHIj01LDR7iVS6Z");
  }

  subCurrentGame(gameID:string){
    return onSnapshot(this.getSingelDocRef("ringoffire", gameID), (list) => {
      //this.trashNotes = [];
      list.data(element => {
        console.log(this.setNoteObject(element.data(), element.id));
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
        console.log(this.games);
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'ringoffire');
  }

  async addNote() {
    const docRef = await addDoc((this.getGameRef()), {
      currentPlayer: this.game.currentPlayer,
      playedCards:  this.game.playedCards,
      players: this.game.players,
      stack: this.game.stack
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
     this.UpdateGame(this.game, params['id']);
    })
  }

  newGame() {
    //this.addNote();
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

