import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AnswerDto} from '../answer-dto';
import {OnlineConsultationService} from '../online-consultation.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.css']
})
export class AnswerViewComponent implements OnInit {
  curDatePipe: DatePipe;
  _answerObject: AnswerDto;
  isItEditing: Boolean;
  @Input()
  set answerObject(answerObject: AnswerDto) {
    this._answerObject = answerObject;
    this.initObject();
  }

  // this.curDatePipe = new DatePipe('ru-RU');
  @Output() delAnswerDto: EventEmitter<any>;

  constructor(private ocs: OnlineConsultationService,
              public auth: AuthService) {
    this.delAnswerDto = new EventEmitter();
  }

  ngOnInit() {
    this.isItEditing = false;
    this.curDatePipe = new DatePipe('ru-RU');
  }

  initObject(): void {
    console.log('initObject: ', this._answerObject);
  }

  editItem() {
    this.isItEditing = true;
  }

  closeEdit() {
    this.isItEditing = false;
  }

  deleteItem() {
    console.log('Will try delete answer ' + this._answerObject);
    this.delAnswerDto.emit(this._answerObject);

    // const delObject = {
    //   idObject: this._answerObject.id,
    // };
    //
    // this.ocs.deleteObject(delObject).subscribe( deletedObject => {
    //     console.log('deletedObject: ');
    //     console.log(deletedObject);
    //     this.ocs.updateParentComponent(deletedObject);
    //   },
    //   error => console.log(<any>error) );
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  getDateAnswerView(): String {
    return this.curDatePipe.transform(this._answerObject.dateCreated, 'dd/MM/yyyy HH:mm');
    // return this._answerObject.dateCreated;
  }

}
