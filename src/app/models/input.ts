export class Input {
  nextAxisY: number = 0;
  nextAxisX: number = 1;
  
  moveToAxleX(axleValue: number) {
    if (this.nextAxisX > 0 && axleValue < 0) {
      return;
    }
    this.nextAxisX = axleValue;
    this.nextAxisY = 0;
  }

  moveToAxleY(axleValue: number) {
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