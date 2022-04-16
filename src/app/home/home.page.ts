import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  levels: Array<any> = [
    {name: 1, speed: 8},
    {name: 2, speed: 16},
    {name: 3, speed: 32},
  ];

  constructor(private storage: Storage) {
    this.storage.create();
  }

  changeLevel(speedLevel: number) {
    this.storage.set('selectedSpeedLevel', speedLevel);
  }
}
