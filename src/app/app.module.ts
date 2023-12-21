import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartsreenComponent } from './startsreen/startsreen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { GameInfoComponent } from './game-info/game-info.component';
import {MatCardModule} from '@angular/material/card';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { EditPlayerComponent } from './edit-player/edit-player.component';

@NgModule({
  declarations: [
    AppComponent,
    StartsreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-237a9","appId":"1:111835705752:web:95beed982c8a81a3e87bed","storageBucket":"ring-of-fire-237a9.appspot.com","apiKey":"AIzaSyC1-UyKbR5f2qTPy64vEpSGIK4renoYCfg","authDomain":"ring-of-fire-237a9.firebaseapp.com","messagingSenderId":"111835705752","measurementId":"G-KK6P3WDLYW"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
