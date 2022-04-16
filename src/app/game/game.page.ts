import { Component, OnInit } from '@angular/core';
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
  score: number = 0;
  speed: number = 8;
  nextAxisY: number = 0;
  nextAxisX: number = 1;
  screenSize: number = 100;
  sizePath: number = 10;
  foodY: number = 15;
  foodX: number = 15;
  foodPoints: number = 1;
  gameOver: boolean = false;

  constructor() {
     this.interval = setInterval(this.drawGame.bind(this), 1024 / this.speed);
   }

  ngOnInit() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width  = window.innerWidth;
    this.screenSize = this.canvas.width / this.sizePath;
    this.context = this.canvas.getContext('2d');
  }

  drawGame(){
    this.moveSnake();
    this.moveTail();
    this.verifyHitScreen();
    this.feedSnake();
    this.drawScreen();
    this.drawSnake();
    this.drawFood();
  }

  moveSnake() {
    this.snake.axisX += this.nextAxisX;
    this.snake.axisY += this.nextAxisY;

    for (let i = 0; i < this.snake.path.length; i++) {
      if (this.snake.path[i].x == this.snake.axisX && this.snake.path[i].y == this.snake.axisY){
          clearInterval(this.interval);
          this.gameOver = true;
      }
    }

    this.snake.path.push({
      x: this.snake.axisX,
      y: this.snake.axisY
    });
  }

  moveTail() {
    while (this.snake.path.length > this.snake.sizeTail){
      this.snake.path.shift(); 
    }
  }

  verifyHitScreen() {
    if (this.snake.axisX < 0){
      this.snake.axisX = this.screenSize -1;
    }
    
    if (this.snake.axisX > this.screenSize - 1){
      this.snake.axisX = 0;
    }
    
    if (this.snake.axisY < 0){
      this.snake.axisY = this.screenSize -1;
    }
    
    if (this.snake.axisY > this.screenSize - 1){
      this.snake.axisY = 0;
    }
  }

  feedSnake() {
    if (this.snake.axisX == this.foodX && this.snake.axisY == this.foodY){
      this.snake.sizeTail += this.foodPoints;
      this.score += this.foodPoints;
      this.foodX = Math.floor(Math.random() * this.screenSize);
      this.foodY = Math.floor(Math.random() * this.screenSize);
    }
  }

  drawScreen() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.context.fillStyle = "red";
    for (let i = 0; i < this.snake.path.length; i++) {
        this.context.fillRect(
          this.snake.path[i].x * this.sizePath,
          this.snake.path[i].y * this.sizePath,
          this.sizePath,
          this.sizePath
        );
    }
  }

  drawFood() {
    this.context.fillStyle = "green";
    this.context.fillRect(
      this.foodX * this.sizePath, 
      this.foodY * this.sizePath,
      this.sizePath, this.sizePath
    );
  }

  changeDirectionAxleX(axleValue: number) {
    if (this.nextAxisX > 0 && axleValue < 0) {
      return;
    }
    this.nextAxisX = axleValue;
    this.nextAxisY = 0;
  }

  changeDirectionAxleY(axleValue: number) {
    if (this.hasPermissionToChangeDirectionAxleY(axleValue)) {
      return;
    }
    this.nextAxisY = axleValue;
    this.nextAxisX = 0;
  }

  hasPermissionToChangeDirectionAxleY(axleValue: number) {
    return (this.nextAxisY > 0 && axleValue < 0) 
      || (this.nextAxisY < 0 && axleValue > 0);
  }

  hasPermissionToChangeDirectionAxleX(axleValue: number) {
    return (this.nextAxisX > 0 && axleValue < 0) 
      || (this.nextAxisX < 0 && axleValue > 0);
  }
}
