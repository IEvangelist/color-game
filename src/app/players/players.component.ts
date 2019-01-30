import { Component } from '@angular/core';
import { GameEngineService, GameState } from '../services/game-engine.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: string[] = [ 'Lennyx', 'Londyn', 'Lyric' ];
  player: string;

  private activePlayerIndex = 0;

  get nextPlayer() {
    if (this.activePlayerIndex >= this.players.length) {
      this.activePlayerIndex = 0;
    }

    const player = this.players[this.activePlayerIndex];
    this.activePlayerIndex += 1;
    return player;
  }

  constructor(private readonly gameEngine: GameEngineService) {
    this.gameEngine.changeState('selectWinningColor');
   }

  addPlayer(player: string) {
    if (!player) {
      return;
    }

    this.player = null;
    this.players.push(player);
    if (this.players.length >= 2) {
      this.gameEngine.changeState('selectWinningColor');
    }
  }

  removePlayer(player: string) {
    if (this.players.length) {
      this.players =
        this.players.filter(p => p !== player);
    }

    if (this.players.length < 2) {
      this.gameEngine.changeState('usersRequired');
    }
  }
}
