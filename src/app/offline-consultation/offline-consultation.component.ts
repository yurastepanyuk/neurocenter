import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-offline-consultation',
  templateUrl: './offline-consultation.component.html',
  styleUrls: ['./offline-consultation.component.css']
})
export class OfflineConsultationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
}
