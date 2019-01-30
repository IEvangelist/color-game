import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    'game-board { display:flex;justify-content:center;align-items:center;height:92%; }'
  ],
  template: `
    <mat-toolbar color='primary'>
      <mat-icon>face</mat-icon> &nbsp;
      <span>Color Game</span>
    </mat-toolbar>
    <game-board></game-board>
  `
})
export class AppComponent {
  title = 'color-game';
}