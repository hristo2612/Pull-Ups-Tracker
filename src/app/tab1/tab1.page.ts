import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  count: number = 0;

  history: any[] = [];

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('history').then((val) => {
      if (val && val.length) {
        this.history = val;
        if (this.history[val.length - 1].date === this.getCurrentDay()) {
          this.count = val[val.length - 1].count;
        }
      }
    });
  }

  onAdd() {
    if (this.count < 10000) {
      this.count++;
      this.setLastHistory();
    }
  }

  onRemove() {
    if (this.count > 0) {
      this.count--;
      this.setLastHistory();
    }
  }

  getCurrentDay() {
    let today: any = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }

  setLastHistory() {
    if (this.history.length && this.history[this.history.length - 1].date === this.getCurrentDay()) {
      this.history[this.history.length - 1] = { count: this.count, date: this.getCurrentDay() };
      this.storage.set('history', this.history);
    } else {
      this.history.push({ count: this.count, date: this.getCurrentDay() });
      this.storage.set('history', this.history);
    }
  }

}
