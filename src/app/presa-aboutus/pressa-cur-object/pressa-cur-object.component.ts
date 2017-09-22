import {Component, Input, OnInit} from '@angular/core';
import {PressaAboutUs} from '../../dtd/pressa-about-us.model';

@Component({
  selector: 'app-pressa-cur-object',
  templateUrl: './pressa-cur-object.component.html',
  styleUrls: ['./pressa-cur-object.component.css']
})
export class PressaCurObjectComponent implements OnInit {

  @Input() pressaOnject: PressaAboutUs;

  isThereMedia: boolean;
  isThereDownload: boolean;
  isThereFolder: boolean;

  constructor() { }

  ngOnInit() {
  }

}
