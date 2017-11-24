import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnlineConsultationService} from '../online-consultation.service';
import {AuthService} from '../../shared/auth.service';
import {UserDto} from '../../user/user-dto';
import {QuestionI} from '../question-i';
import {UserI} from '../../dtd/userI';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.css']
})
export class QuestionsEditComponent implements OnInit {

  questionForm: FormGroup;
  public _initParametres: Map<string, any>;
  @Output() public addedItem: EventEmitter<any>;
  errorMessage: String;

  _contentObject: any;
  @Input()
  set contentObject(contentObject: any) {
    if ((contentObject) && (contentObject.id)) {
      this._contentObject = contentObject;
      console.log('set questionObject ' + contentObject.toString());
      this.initObject();
    }
  }

  @Input()
  set initParametres(param: Map<string, any>) {
    this._initParametres = param;
  }

  constructor(fb: FormBuilder,
              private ocs: OnlineConsultationService,
              private auth: AuthService ) {
    this.questionForm = fb.group({
      'context':  ['', Validators.required]
    });
    this.addedItem = new EventEmitter();
  }

  ngOnInit() {
  }

  private initObject() {
    this.questionForm.patchValue({context: this._contentObject.context});
  }
  closeEdit() {
    this._initParametres.get('context').closeEdit();
  }

  onSubmit() {
    if (!this._contentObject) {
      const curUser: UserI = {
        username: this.auth.getUser().username,
        userview: this.auth.getUser().userview,
        email: this.auth.getUser().email
      };
      const newObj: QuestionI = {
        user: curUser,
        context: this.questionForm.get('context').value,
        answers: [],
        dateCreated: new Date().toISOString()
      };

      console.log('you want to add new Questions into DB p:', newObj);

      const addeddItem = this.ocs.saveQuestion(newObj).subscribe(addedItem => {
          console.log('added Feedback: ', addedItem);
          this.addedItem.emit(addedItem);
          this.ocs.needUpdateParent.emit(addedItem);
          },
        error => this.errorMessage = <any>error);
      const sendmail = this.ocs.sendEmail(newObj).subscribe(answerServer => {
          console.log('Email sent: ', answerServer);
        },
        error => this.errorMessage = <any>error);
    }
  }

  // this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
  // if(data.json().success) {
  //   this.http.post('http://localhost:3333/sendmail', emailid, {headers: headers}).subscribe((data) => {
  //     if(data.json().success) {
  //       console.log('Sent successfully');
  //     }
  //   })

}
