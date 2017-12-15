import {Component, Input, OnInit} from '@angular/core';
import {OfflineConsultationI} from '../offline-consultation-i';

@Component({
  selector: 'app-offline-consultation-list',
  templateUrl: './offline-consultation-list.component.html',
  styleUrls: ['./offline-consultation-list.component.css']
})
export class OfflineConsultationListComponent implements OnInit {

  // _offlineConsultationMap: Map< string, OfflineConsultationI>;
  _offlineConsultationMap: any[];
  isItEditing: Boolean;
  @Input()
  set offlineConsultationMap(oflineConsultationMap: any[]) {
    this._offlineConsultationMap = oflineConsultationMap;
    this.initObject();
  }

  constructor() { }

  ngOnInit() {
  }

  private initObject() {
  }
}
