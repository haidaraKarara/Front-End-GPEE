import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader'; 

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gpee';
  public spinkit = Spinkit; //loader

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $('.ui.dropdown').dropdown()
  }
}
