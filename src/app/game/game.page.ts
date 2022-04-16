import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Food } from '../models/food';
import { Game } from '../models/game';
import { Input } from '../models/input';
import { Snake } from '../models/snake';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  canvas: any;
  context: any;
  interval: any;

  snake: Snake = new Snake();
  food: Food = new Food();
  game: Game = new Game();
  input: Input = new Input();

  constructor(private storage: Storage) {
      this.storage.create();
   }

  async ngOnInit() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width  = window.innerWidth;
    this.game.createScreen(this.canvas);
    this.context = this.canvas.getContext('2d');

    this.game.speed = parseInt(await this.storage.get('selectedSpeedLevel'));
    this.interval = setInterval(this.drawGame.bind(this), 1000 / this.game.speed);
  }

  drawGame(){
    this.snake.move(this.input.nextAxisX, this.input.nextAxisY);

    this.game.verifyGameOver(this.snake);

    if (this.game.gameOver) {
      clearInterval(this.interval);
    }

    this.snake.createPath();
    this.snake.moveTail();

    this.snake.hitScreen(this.game.screenSize);
    
    const eaten = this.snake.ate(this.food.x, this.food.y, this.food.points);
    this.food.wasEaten(eaten, this.game.screenSize);
    this.game.addScorePoints(eaten, this.food.points);

    this.drawScreen();
    this.drawSnake();
    this.drawFood();
  }

  drawScreen() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.context.fillStyle = "red";
    for (let i = 0; i < this.snake.path.length; i++) {
        this.context.fillRect(
          this.snake.path[i].x * this.game.sizePath,
          this.snake.path[i].y * this.game.sizePath,
          this.game.sizePath,
          this.game.sizePath
        );
    }
  }

  drawFood() {
    this.context.fillStyle = "green";
    this.context.fillRect(
      this.food.x * this.game.sizePath, 
      this.food.y * this.game.sizePath,
      this.game.sizePath, this.game.sizePath
    );
  }

  changeDirectionAxleX(axleValue: number) {
    this.input.moveToAxleX(axleValue);
  }

  changeDirectionAxleY(axleValue: number) {
    this.input.moveToAxleY(axleValue);
  }
}
