import { Snake } from "./snake";

export class Game {
  public score: number = 0;
  public speed: number = 30;
  public screenSize: number = 100;
  public sizePath: number = 10;
  public gameOver: boolean = false;

  public createScreen(canvas: any) {
    this.screenSize = canvas.width / this.sizePath;
  }

  public addScorePoints(eaten: boolean, points: number) {
    if (!eaten) {
      return;
    }
    this.score += points;
  }
  
  public verifyGameOver(snake: Snake) {
    for (let i = 0; i < snake.path.length; i++) {
      if (snake.path[i].x == snake.axisX && snake.path[i].y == snake.axisY) {
          this.gameOver = true;
      }
    }
  }
}