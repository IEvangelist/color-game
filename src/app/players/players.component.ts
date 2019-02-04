import { Component, OnInit } from '@angular/core';
import { GameEngineService, GameState } from '../services/game-engine.service';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: string[] = [];
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

  constructor(
    private readonly gameEngine: GameEngineService,
    private readonly dataStore: DataStoreService) {
    this.gameEngine.changeState('selectWinningColor');
  }

  async ngOnInit() {
    const players = await this.dataStore.getAll();
    this.players = players.map(p => p.name);
  }

  async addPlayer(player: string) {
    if (!player) {
      return;
    }

    this.player = null;
    await this.dataStore.set(player);
    this.players.push(player);
    if (this.players.length >= 2) {
      this.gameEngine.changeState('selectWinningColor');
    }
  }

  async removePlayer(player: string) {
    if (this.players.length) {
      await this.dataStore.delete(player)
      this.players =
        this.players.filter(p => p !== player);
    }

    if (this.players.length < 2) {
      this.gameEngine.changeState('usersRequired');
    }
  }
}