import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'poll',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/poll.svg')); 
    iconRegistry.addSvgIcon(
      'friends',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/people.svg'));
  }
}
