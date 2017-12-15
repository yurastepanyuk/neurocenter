import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api.service';
import {OfflineConsultationI} from './offline-consultation-i';
import {UserDto} from '../user/user-dto';

@Injectable()
export class OfflineConsultationService  implements OnInit  {

  public needUpdateParent: EventEmitter<any>;
  public scheduleOfOrganisation: any[];
  // scheduleOfDay: Map< string, OfflineConsultationI>;
  scheduleOfDay: EventEmitter<Map< string, OfflineConsultationI>>;
  constructor(private api: ApiService) {
    this.getScheduleOfOrganisation();
    this.needUpdateParent = new EventEmitter();
    this.scheduleOfDay = new EventEmitter();
  }

  ngOnInit(): void {
  }

  getScheduleOfOrganisation() {
    // this.schedule = new Map< string, any>();
    const data$ = this.api.getHttpClient<any[]>('schedule').map((data: any) => {
      return data.map(this.toSchedule);
    } ).subscribe(valueSvhedule => {
        this.scheduleOfOrganisation = this.sortedbyNumberOfDate(valueSvhedule);
        console.log('scheduleOfOrganisation: ', this.scheduleOfOrganisation); },
      error => {
        this.api.handleError(error);
      });
  }

  getListOfflineConsultation(params: any): Observable<OfflineConsultationI[]>  {
    const data$ = this.api.getHttpClient<OfflineConsultationI[]>('offline-consultation', params).map((data: any) => {
      return data.map(this.toOfflineConsultation);
    } );

    return data$;
  }

  public toOfflineConsultation(item?: any): OfflineConsultationI {
    const curQuestion: OfflineConsultationI = {
      user: item && item.user && new UserDto(item.user) || null,
      dateConsultation: item && item.dateConsultation || '',
      timeConsultation: item && item.timeConsultation  || '',
      description: item && item.description  || '',
      dateCreated: item && item.dateCreated  || ''
    };
    console.log('Parsed Question: ', curQuestion);
    return curQuestion;
  }

  toSchedule(item: any) {
    if (!item) {
      return {};
    }
    if (item.day === 0) {
      return {
        day: item.day,
        globalOption: item.globalOption,
        highDsay: item.highDsay,
        offDays: item.offDays,
        minPerPerson: item.minPerPerson
      };
    } else {
      return {
        day: item.day,
        doctor: item.doctor,
        pause: item.pause,
        start: item.start,
        finish: item.finish,
        dayOff: item.dayOff
      };
    }
  }

  getScheduleOfDay(date: string) {
    let result: Map< string, OfflineConsultationI>;
    result = new Map< string, OfflineConsultationI>();
    let listOfflineConsultation: OfflineConsultationI[];
    const params = {
      dateStart: date,
      dateEnd: date
    };
    this.getListOfflineConsultation(params).subscribe(
      (results) => { // on sucesss
        listOfflineConsultation = this.sortedbyTimeConsultation(results);
        console.log('list offline consultation: ', results);
        console.log('scheduleOfOrganisation: ', this.scheduleOfOrganisation);
        if (!this.scheduleOfOrganisation) {
          console.log('setTimeout: waiting scheduleOfOrganisation');
          setTimeout(() => {}, 300);
        }
        const dateSchedule = new Date(date);
        const dateOfWeek = dateSchedule.getDay() - 1;
        const scheduleCurDay = this.scheduleOfOrganisation[dateOfWeek];
        const globalSchedule = this.scheduleOfOrganisation[0];
        console.log('globalSchedule: ', globalSchedule);
        console.log('scheduleCurDay: ', scheduleCurDay);
        const minPerPerson = globalSchedule.minPerPerson;
        const isItOffDay = scheduleCurDay.dayOff;
        // _
        const startHour = scheduleCurDay.start.hour;
        const startMin = scheduleCurDay.start.min;
        const finishHour = scheduleCurDay.finish.hour;
        const finishMin = scheduleCurDay.finish.min;

        for ( let hour = startHour; hour <= finishHour && hour < 24 ; hour++ ) {
          const minForLoop = hour === startHour ? startMin : 0;
          for ( let min = minForLoop; min < 60; min = min + minPerPerson ) {
            const curTime = hour.toString() + ':' + (min.toString() + '0').slice(0, 2);
            console.log('curTime: ', curTime);
            const curTimeFound = listOfflineConsultation.filter((element, index, array) => element.timeConsultation === curTime, curTime);
            console.log('curTime found: ', curTimeFound);
            if (curTimeFound.length === 0) {
              result.set(curTime, this.toOfflineConsultation({timeConsultation: curTime, dateConsultation: date}));
            } else {
              result.set(curTime, this.toOfflineConsultation(curTimeFound[0]));
            }
          }
        }
        console.log('getScheduleOfDay: ', result);
        setTimeout(() => this.scheduleOfDay.emit(result), 0);
        // this.scheduleOfDay.emit(result);
      },
      error => {
        this.api.handleError(error);
      });
  }

  saveOffConsultation(newObj: OfflineConsultationI): Observable<OfflineConsultationI> {
    return this.api.postHttpClient('offline-consultation', JSON.stringify(newObj)).catch(this.api.handleError);
  }

  // handleError (obj: any) {
  //   this.api.handleError(obj);
  // }

  sendEmail(data: any): Observable<any> {
    return this.api.postHttpClient('sendmail', JSON.stringify(data)).catch(this.handleError);
  }

  handleError(error: any) {
    console.log(error.message || error || `We couldn't retrieve your offline-consultation  data!`);
    return Observable.throw(error.message || error);
  }

  sortedbyTimeConsultation(input: any[]): any[] {
    return input.sort((a: any, b: any) => (-1) * Number.parseInt(b.timeConsultation.replace(':', '')) + Number.parseInt(a.timeConsultation.replace(':', '')));
  }

  sortedbyNumberOfDate(input: any[]): any[] {
    return input.sort((a: any, b: any) => (-1) * Number.parseInt(b.day) + Number.parseInt(a.day));
  }


}
