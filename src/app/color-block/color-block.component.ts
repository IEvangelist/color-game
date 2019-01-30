import { Component, Input } from '@angular/core';
import { GameEngineService, GameState } from '../services/game-engine.service';

@Component({
  selector: 'color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.scss']
})
export class ColorBlockComponent {
  @Input() classes: string[];
  @Input() color: string;

  get allClasses() {
    return this.isSelected
      ? this.isWinningColor
        ? [...this.classes, 'winner']
        : [...this.classes, 'selected' ]
      : this.classes;
  }

  isSelected: boolean = false;

  private currentState: GameState;
  private isWinningColor = false;

  constructor(private readonly gameEngine: GameEngineService) {
    this.gameEngine
      .$gameStateChanged
      .subscribe((state: GameState) => {
        this.currentState = state;
        if (state === 'selectWinningColor') {
          this.isWinningColor = false;
          this.isSelected = false;
        }
      });
  }

  onClick() {
    if (this.currentState === 'selectWinningColor') {
      this.gameEngine.setWinningColor(this.color);
      this.gameEngine.changeState('playingGame');
    } else if (this.currentState === 'playingGame') {
      this.isSelected = true;
      if (this.gameEngine.isWinningColor(this.color)) {
        this.isWinningColor = true;
        this.gameEngine.changeState('gameEnded');
      } else {
        this.gameEngine.changeState('playingGame');
      }
    }
  }
}