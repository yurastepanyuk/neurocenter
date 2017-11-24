import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {QuestionDto} from '../question-dto';
import {OnlineConsultationService} from '../online-consultation.service';
import {AuthService} from '../../shared/auth.service';
import {AnswerDto} from '../answer-dto';
import {AnswerI} from '../answer-i';
import {UserI} from '../../dtd/userI';
import {QuestionI} from '../question-i';
import {ajaxGetJSON} from 'rxjs/observable/dom/AjaxObservable';

@Component({
  selector: 'app-questions-view',
  templateUrl: './questions-view.component.html',
  styleUrls: ['./questions-view.component.css']
})
export class QuestionsViewComponent implements OnInit {

  public curDatePipe: DatePipe;

  _questionObject: QuestionDto;
  isItEditing: Boolean;
  @Input()
  set questionObject(questionObject: QuestionDto) {
    this._questionObject = questionObject;
    this.initObject();
  }

  showAnswersToUser: Boolean = false;
  errorMessage: String;

  deleteAnswerw;

  constructor(private ocs: OnlineConsultationService,
              public auth: AuthService) {
    this.curDatePipe = new DatePipe('ru-RU');
  }

  ngOnInit() {
    this.isItEditing = false;
  }

  initObject(): void {
    console.log('initObject: ', this._questionObject);
  }

  showAnswers(): void {
    this.showAnswersToUser = !this.showAnswersToUser;
  }

  editItem() {
    this.isItEditing = true;
  }

  closeEdit() {
    this.isItEditing = false;
  }

  deleteItem() {
    const delObject = {
      idObject: this._questionObject.id,
    };

    this.ocs.deleteObject(delObject).subscribe( deletedObject => {
        console.log('deletedObject: ');
        console.log(deletedObject);
        this.ocs.updateParentComponent(deletedObject);
      },
      error => console.log(<any>error) );
  }

  filterByObject(element, index, array) {
    if (element.dateCreated === this.deleteAnswerw.dateCreated) {
      return index;
    }
  }
  deleteAnswer(answeDel: any) {
    const delAnswObj = new AnswerDto(answeDel);
    console.log('DELETE Answer Object ', delAnswObj );

    for ( let i = 0; i < this._questionObject.answers.length; i++ ) {
      console.log(this._questionObject.answers[i]);
      if (this._questionObject.answers[i].dateCreated === delAnswObj.dateCreated) {
        this._questionObject.answers.splice(i, 1);
        console.log('DELETED Answer Object with IDX', i);
      }
    }

    console.log('you want this obj to update into DB :', this._questionObject);

    const idEdit = this._questionObject.id;

    const curUserQuestion: UserI = {
      username: this._questionObject.user.username,
      userview: this._questionObject.user.userview,
      email: this._questionObject.user.email
    }
    const updObj: QuestionI = {
      user: curUserQuestion,
      context: this._questionObject.context,
      answers: this._questionObject.answers,
      dateCreated: this._questionObject.dateCreated
    }
    const body = {
      idObject: idEdit,
      data: updObj
    };

    const updatedItem = this.ocs.updateContent(idEdit, body).subscribe( updItem => {
        console.log('updItem: ');
        console.log(updItem);
        // this.addedItem.emit(updItem);
        // this.ocs.needUpdateParent.emit(updItem);
      },
      error => this.errorMessage = <any>error);
  }

  addNewAnswer(answer: String) {
    const curUser: UserI = {
      username: this.auth.getUser().username,
      userview: this.auth.getUser().userview,
      email: this.auth.getUser().email
    }
    const newAswer: AnswerI = {
      user: curUser,
      context: answer.toString(),
      dateCreated: new Date().toISOString()
    }
    this._questionObject.answers.push(newAswer);
    console.log('you want this obj to update into DB :', this._questionObject);

    const idEdit = this._questionObject.id;

    const curUserQuestion: UserI = {
      username: this._questionObject.user.username,
      userview: this._questionObject.user.userview,
      email: this._questionObject.user.email
    }
    const updObj: QuestionI = {
      user: curUserQuestion,
      context: this._questionObject.context,
      answers: this._questionObject.answers,
      dateCreated: this._questionObject.dateCreated
    }
    const body = {
      idObject: idEdit,
      data: updObj
    };

    const updatedItem = this.ocs.updateContent(idEdit, body).subscribe( updItem => {
        console.log('updItem: ');
        console.log(updItem);
        // this.addedItem.emit(updItem);
        // this.ocs.needUpdateParent.emit(updItem);
      },
      error => this.errorMessage = <any>error);
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  getDateQuestionView(): String {
    return this.curDatePipe.transform(this._questionObject.dateCreated, 'dd/MM/yyyy HH:mm');
  }


}
