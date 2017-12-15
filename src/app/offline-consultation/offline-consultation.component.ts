import {ChangeDetectorRef, Component, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {OfflineConsultationService} from './offline-consultation.service';
import {OfflineConsultationI} from './offline-consultation-i';

@Component({
  selector: 'app-offline-consultation',
  templateUrl: './offline-consultation.component.html',
  styleUrls: ['./offline-consultation.component.css']
})
export class OfflineConsultationComponent implements OnInit {
  selectDateForView: Date;
  scheduleOfCompany: any[];
  // scheduleOfDay: Map< string, OfflineConsultationI> = new Map< string, OfflineConsultationI>();
  scheduleOfDay: any[];

  constructor(private ofcs: OfflineConsultationService, private _cdr: ChangeDetectorRef) {
    this.ofcs.scheduleOfDay.subscribe((obj: Map< string, OfflineConsultationI>) => {
      // this.scheduleOfDay = obj;
      // this._cdr.detectChanges();
      // this.scheduleOfDay.clear();
      const result = new Array();
       obj.forEach((value, key) =>  result.push(value));
      // console.log('new Map(obj) ', this.scheduleOfDay);
      this.scheduleOfDay = result;
    });
    this.selectDateForView = new Date();
    ofcs.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
    // this._cdr.detectChanges();
    // Promise.resolve(null).then(() => console.log('this.updateView().Promise.resolve'));
  }

  ngOnInit() {
    // this.updateView();
    setTimeout(() => this.updateView(), 0);
    // this._cdr.detectChanges();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.selectDateForView = new Date(event.value);
    this.updateView();
  }

  showToday() {
    this.selectDateForView = new Date();
    setTimeout(() => this.updateView(), 0);
    }

  showTomorrow() {
    const curDate = new Date();
    const curYear = curDate.getFullYear;
    const curMonth = curDate.getMonth;
    const curDayOfWeek = curDate.getDay;
    const curDayOfMonth = curDate.getDate;
    // const newDate = curDayOfMonth + Number(1);
    const tomorrow = curDate.setDate(curDate.getDate() + 1);
    console.log('newDate = ${new Date(tomorrow)}', tomorrow);
    this.selectDateForView = new Date(tomorrow);

    setTimeout(() => this.updateView(), 0);
  }
  getScheduleForSelectedDate() {
  }
  updateView() {
    const curDate = this.selectDateForView ;
    // today
    // const today = curDate.valueOf();
    const todayYear = curDate.getFullYear();
    const todayMonth = curDate.getMonth();
    const todayDayOfMonth = curDate.getDate();
    console.log('selectDateForView', this.selectDateForView);
    console.log('todayDayOfMonth', todayDayOfMonth);
    // const todayForGet = new Date(todayYear, todayMonth, todayDayOfMonth).valueOf();
    // const tomorrow = new Date(todayYear, todayMonth, todayDayOfMonth).setDate(todayDayOfMonth + 1).valueOf();
    // console.log('today', new Date(todayForGet));
    // console.log('tomorrow', new Date(tomorrow));
    const todayForGet = new Date(todayYear, todayMonth, todayDayOfMonth + 1).toISOString();
    // const tomorrow = new Date((new Date(todayYear, todayMonth, todayDayOfMonth).setDate(todayDayOfMonth + 2))).toISOString();
    // const params = {
    //   dateStart: todayForGet,
    //   dateEnd: todayForGet
    // }
    // let result: Map< string, OfflineConsultationI>;
    // result = new Map< string, OfflineConsultationI>();
    // let listOfflineConsultation: OfflineConsultationI[];
    // this.ofcs.getListOfflineConsultation(params).subscribe(
    //   (results) => { // on sucesss
    //     listOfflineConsultation = this.ofcs.sortedbyTimeConsultation(results);
    //     console.log('list offline consultation: ', results);
    //     console.log('scheduleOfOrganisation: ', this.ofcs.scheduleOfOrganisation);
    //
    //     const dateSchedule = new Date(todayForGet);
    //     const dateOfWeek = dateSchedule.getDay() - 1;
    //     const scheduleCurDay = this.ofcs.scheduleOfOrganisation[dateOfWeek];
    //     const globalSchedule = this.ofcs.scheduleOfOrganisation[0];
    //     console.log('globalSchedule: ', globalSchedule);
    //     console.log('scheduleCurDay: ', scheduleCurDay);
    //     const minPerPerson = globalSchedule.minPerPerson;
    //     const isItOffDay = scheduleCurDay.dayOff;
    //     // _
    //     const startHour = scheduleCurDay.start.hour;
    //     const startMin = scheduleCurDay.start.min;
    //     const finishHour = scheduleCurDay.finish.hour;
    //     const finishMin = scheduleCurDay.finish.min;
    //
    //     for ( let hour = startHour; hour <= finishHour && hour < 24 ; hour++ ) {
    //       const minForLoop = hour === startHour ? startMin : 0;
    //       for ( let min = minForLoop; min < 60; min = min + minPerPerson ) {
    //         const curTime = hour.toString() + ':' + (min.toString() + '0').slice(0, 2);
    //         console.log('curTime: ', curTime);
    //         const curTimeFound = listOfflineConsultation.filter((element, index, array) => element.timeConsultation === curTime, curTime);
    //         console.log('curTime found: ', curTimeFound);
    //         if (curTimeFound.length === 0) {
    //           result.set(curTime, this.ofcs.toOfflineConsultation(null));
    //         } else {
    //           result.set(curTime, this.ofcs.toOfflineConsultation(curTimeFound[0]));
    //         }
    //       }
    //     }
    //     console.log('getScheduleOfDay: ', result);
    //     // setTimeout(() => this.scheduleOfDay.emit(result), 0);
    //     this.scheduleOfDay = result;
    //     this._cdr.detectChanges();
    //   },
    //   error => {
    //     // this.api.handleError(error);
    //   });

    this.ofcs.getScheduleOfDay(todayForGet);
  }
}
