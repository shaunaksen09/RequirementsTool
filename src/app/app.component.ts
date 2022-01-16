import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private bnIdle: BnNgIdleService) { // initiate it in your component constructor
    this.bnIdle.startWatching(30).subscribe((res) => {
      if(res) {
          console.log("session expired");
      }
    })
  }
}
