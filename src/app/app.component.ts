import { Component, Inject, forwardRef, OnInit, AfterViewInit } from '@angular/core';

import '../../assets/styles.css';

import { Language } from '../core';

@Component({
  selector: 'app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.style.css']
})
export class AppComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() { }
}
