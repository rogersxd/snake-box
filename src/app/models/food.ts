export class Food {
  public y: number = 15;
  public x: number = 15;
  public points: number = 1;

  public wasEaten(eaten: boolean, screenSize: number) {
    if (! eaten) {
      return;
    }
    
    this.x = Math.floor(Math.random() * screenSize);
    this.y = Math.floor(Math.random() * screenSize);
  }

}