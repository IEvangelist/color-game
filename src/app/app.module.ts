import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAllModule } from './material-all.module';
import { GameBoardComponent } from './game-board/game-board.component';
import { ColorBlockComponent } from './color-block/color-block.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ColorBlockComponent,
    InstructionsComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
