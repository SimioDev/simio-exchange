import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simio Exchange';

  alertVisible = false; 

  showAlert() {
    this.alertVisible = true;
    setTimeout(() => {
      this.alertVisible = false;
    }, 5000);
  }
}
