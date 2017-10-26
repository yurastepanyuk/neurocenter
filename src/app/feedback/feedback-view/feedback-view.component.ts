import {Component, Input, OnInit} from '@angular/core';
import {FeedbackDto} from '../feedback-dto';
import {FormBuilder} from '@angular/forms';
import {FeedbackService} from '../feedback.service';
import {AuthService} from '../../shared/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css']
})
export class FeedbackViewComponent implements OnInit {
  public curDatePipe: DatePipe;

  _feedbackObject: FeedbackDto;
  isItEditing: Boolean;
  @Input()
  set feedbackObject(feedbackObject: FeedbackDto) {
    this._feedbackObject = feedbackObject;
    this.initObject();
  }

  constructor(fb: FormBuilder, private sf: FeedbackService,
              public auth: AuthService) {
    this.curDatePipe = new DatePipe('ru-RU');
  }

  ngOnInit() {
    this.isItEditing = false;
  }

  initObject(): void {
    console.log('initObject: ', this.feedbackObject);
  }

  editItem() {
    this.isItEditing = true;
  }

  closeEdit() {
    this.isItEditing = false;
  }

  deleteItem() {
    const delObject = {
      idObject: this._feedbackObject.id,
    };

    this.sf.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject: ');
        console.log(deletedObject);
        this.sf.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'feedback');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  getDateFeedbackView(): String {
    // const curDate = new Date(this._feedbackObject.dateCreated);
    return this.curDatePipe.transform(this._feedbackObject.dateCreated, 'dd/MM/yyyy HH:mm');
  }

}
