import { Component } from '@angular/core';
import { GameEngineService, GameState, StateDetails } from '../services/game-engine.service';

@Component({
  selector: 'instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  currentState: GameState;

  get message() {
    return this.details.message();
  }

  get title() {
    return this.details.title;
  }

  get isGameOver() {
    return this.currentState === 'gameEnded';
  }

  private get details(): StateDetails {
    return this.gameEngine.stateDetails[this.currentState];
  }

  constructor(private readonly gameEngine: GameEngineService) {
    this.gameEngine
      .$gameStateChanged
      .subscribe((state: GameState) => {
        this.currentState = state;
      });
  }

  resetGame() {
    this.gameEngine.reset();
  }
}
