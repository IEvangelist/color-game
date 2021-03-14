import { Component, Input } from '@angular/core';
import { GameEngineService, GameState } from '../services/game-engine.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.scss'],
  animations: [
    trigger('wasClicked', [
      state('idle', style({
        transform: 'scale(1)'
      })),
      state('clicked', style({
        transform: 'scale(1.2)'
      })),
      transition('idle => clicked', [
        animate('0.4s')
      ]),
      transition('clicked => idle', [
        animate('0.1s')
      ]),
    ]),
  ],
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

  isClicked = false;
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
    this.isClicked = true;
    setTimeout(() => this.isClicked = false, 100);

    if (this.currentState === 'selectWinningColor') {
      this.gameEngine.setWinningColor(this.color);
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