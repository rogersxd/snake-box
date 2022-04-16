import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  canvas: any;
  context: any;
  interval: any;

  score: number = 0;
  speed: number = 8;
  defaultSizeTail: number = 3;
  sizeTail: number = 3;
  snakePath: Array<any> = [];
  snakeTail: Array<any> = [];
  snakeAxisX: number = 10;
  snakeAxisY: number = 10;
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
    this.snakeAxisX += this.nextAxisX;
    this.snakeAxisY += this.nextAxisY;

    for (let i = 0; i < this.snakePath.length; i++) {
      if (this.snakePath[i].x == this.snakeAxisX && this.snakePath[i].y == this.snakeAxisY){
          clearInterval(this.interval);
          this.gameOver = true;
      }
    }

    this.snakePath.push({
      x: this.snakeAxisX,
      y: this.snakeAxisY
    });
  }

  moveTail() {
    while (this.snakePath.length > this.sizeTail){
      this.snakePath.shift(); 
    }
  }

  verifyHitScreen() {
    if (this.snakeAxisX < 0){
      this.snakeAxisX = this.screenSize -1;
    }
    
    if (this.snakeAxisX > this.screenSize - 1){
      this.snakeAxisX = 0;
    }
    
    if (this.snakeAxisY < 0){
      this.snakeAxisY = this.screenSize -1;
    }
    
    if (this.snakeAxisY > this.screenSize - 1){
      this.snakeAxisY = 0;
    }
  }

  feedSnake() {
    if (this.snakeAxisX == this.foodX && this.snakeAxisY == this.foodY){
      this.sizeTail += this.foodPoints;
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
    for (let i = 0; i < this.snakePath.length; i++) {
        this.context.fillRect(
          this.snakePath[i].x * this.sizePath,
          this.snakePath[i].y * this.sizePath,
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
