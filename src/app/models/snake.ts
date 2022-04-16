export class Snake {
  public defaultSizeTail: number = 3;
  public sizeTail: number = 3;
  public path: Array<any> = [];
  public snakePath: Array<any> = [];
  public axisX: number = 10;
  public axisY: number = 10;

  public move(nextAxisX: number, nextAxisY: number) {
    this.axisX += nextAxisX;
    this.axisY += nextAxisY;
  }

  public createPath() {
    this.path.push({
      x: this.axisX,
      y: this.axisY
    });

    this.snakePath.push({
      x: this.axisX,
      y: this.axisY
    });
  }

  public moveTail() {
    while (this.path.length > this.sizeTail){
      this.path.shift(); 
    }
  }

  public hitScreen(screenSize: number) {

    if (this.axisX < 0){
      this.axisX = screenSize -1;
    }
    
    if (this.axisX > screenSize - 1){
      this.axisX = 0;
    }
    
    if (this.axisY < 0){
      this.axisY = screenSize -1;
    }
    
    if (this.axisY > screenSize - 1){
      this.axisY = 0;
    }
  }

  public ate(foodX: number, foodY: number, foodPoints: number) {
    if (this.axisX == foodX && this.axisY == foodY) {
      this.sizeTail += foodPoints;
      return true;
    }
    
    return false;
  }
}