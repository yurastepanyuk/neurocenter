import {Component, Input, OnInit} from '@angular/core';
import {OfflineConsultationI} from '../offline-consultation-i';
import {OfflineConsultationService} from '../offline-consultation.service';
import {AuthService} from '../../shared/auth.service';
import {UserI} from '../../dtd/userI';
import {MailSendI} from '../../shared/mail-send-i';

@Component({
  selector: 'app-offline-consultation-time-view',
  templateUrl: './offline-consultation-time-view.component.html',
  styleUrls: ['./offline-consultation-time-view.component.css']
})
export class OfflineConsultationTimeViewComponent implements OnInit {

  isFree: boolean;
  _offlineConsultationObject: OfflineConsultationI;
  isItEditing: Boolean;
  wantConsultation: Boolean;
  @Input()
  set offlineConsultationObject(offlineConsultationObject: OfflineConsultationI) {
    this._offlineConsultationObject = offlineConsultationObject;
    this.initObject();
  }

  description: string = '';

  constructor(private offcs: OfflineConsultationService,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.isFree = this._offlineConsultationObject.user ? false : true;
  }

  initObject(): void {
    console.log('initObject: ', JSON.stringify(this._offlineConsultationObject));
  }

  wantHaveConsultation() {
    this.wantConsultation = true;
  }

  SubmitConsultation(descriptionn: any) {
    console.log('description', descriptionn);
    console.log('this.description', this.description);
    // const ddd = {
    //   "user": {"username": "user", "userview": "User U. U."},
    //   "dateCreated": "2017-12-01T14:24:41.688Z",
    //   "dateConsultation": "2017-12-05T14:24:41.688Z",
    //   "timeConsultation": "9:30",
    //   "description": "Болит нога"
    // };
    const curUser: UserI = {
      username: this.auth.getUser().username,
      userview: this.auth.getUser().userview,
      email: this.auth.getUser().email
    }
    const newOffConsultation: OfflineConsultationI = {
      user: curUser,
      dateCreated: new Date().toISOString(),
      dateConsultation: this._offlineConsultationObject.dateConsultation,
      timeConsultation: this._offlineConsultationObject.timeConsultation,
      description: this.description
    };
   const mailSend: MailSendI  = {
      organization: 'Neurocenter',
      header: 'Offline consultation',
      context: newOffConsultation.dateConsultation.substr(0, 10).concat('\n')
        .concat(newOffConsultation.timeConsultation).concat('\n').concat(newOffConsultation.description),
      user: curUser
    }
    const addeddItem = this.offcs.saveOffConsultation(newOffConsultation).subscribe(addedItem => {
        console.log('added OffConsultation: ', addedItem);
        this.offcs.needUpdateParent.emit(addedItem);
      },
      error => this.offcs.handleError(error));
    const sendmail = this.offcs.sendEmail(mailSend).subscribe(answerServer => {
        console.log('Email sent: ', answerServer);
      },
      error => this.offcs.handleError(error));
  }


}
