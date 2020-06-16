import { Component, ViewChild } from '@angular/core';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('barChart') barChart;

  history: any = [];
  constructor(private storage: Storage) { }

  ionViewDidEnter() {
    TimeAgo.addLocale(en);
    this.storage.get('history').then((val) => {
      if (val && val.length) {
        this.history = val;
        val.forEach((item, index) => {
          const timeAgo = new TimeAgo('en-US');
          this.history[index] = { ...this.history[index], date: timeAgo.format(new Date(item.date)) }
        });
      }
    });
  }
}
