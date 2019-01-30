import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export type GameState
  = 'usersRequired' | 'selectWinningColor' | 'playingGame' | 'gameEnded';

export interface StateDetails {
  state: GameState;
  title: string;
  message: () => string;
}

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  $gameStateChanged: Observable<GameState>;
  stateDetails = new Map<GameState, StateDetails>();

  private activePlayer: string;
  private stateBroadcast = new ReplaySubject<GameState>();
  private winningColor: string;

  constructor() {
    this.stateDetails['usersRequired'] = {
      state: 'usersRequired',
      title: 'Users Required',
      message: () => 'Add at least two players to begin...'
    };    
    this.stateDetails['selectWinningColor'] = {
      state: 'selectWinningColor',
      title: 'Select Winning Color',
      message: () => 'Have players cover their eyes, and then the "referee" select the winning color.'
    };
    this.stateDetails['playingGame'] = {
      state: 'playingGame',
      title: 'Game Active',
      message: () => `"${this.activePlayer}" please choose your color.`
    };
    this.stateDetails['gameEnded'] = {
      state: 'gameEnded',
      title: 'Game Over',
      message: () => `Congratulations... "${this.activePlayer}" has won the game!`
    };

    this.$gameStateChanged =
      this.stateBroadcast.asObservable();
  }

  isWinningColor(color: string) {
    return this.winningColor === color;
  }

  setWinningColor(color: string) {
    this.winningColor = color;
  }

  changeState(state: GameState) {
    this.stateBroadcast.next(state);
  }

  setActivePlayer(player: string) {
    this.activePlayer = player;
  }

  reset() {
    this.changeState('selectWinningColor');
  }
}
