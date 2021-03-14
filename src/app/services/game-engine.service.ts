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
      message: () => 'Select "Random Selection", or players cover their eyes, and then the "referee" select the winning color.'
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
    this.changeState('playingGame');
  }

  setRandomWinningColor() {
    const colors = [
      'black', 'white',
      'red', 'blue', 'yellow',
      'orange', 'green', 'purple',
      'teal', 'pink', 'brown', 'gray'
    ];
    this.setWinningColor(
      colors[Math.floor(Math.random() * colors.length)]);
  }

  changeState(state: GameState) {
    this.stateBroadcast.next(state);
    const details = this.stateDetails[state];
    this.speak(details.message());
  }

  speak(message: string) {
    const utterance = new SpeechSynthesisUtterance(message);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name === 'Google US English') || voices[0];
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
  }

  setActivePlayer(player: string) {
    this.activePlayer = player;
  }

  reset() {
    this.changeState('selectWinningColor');
  }
}
