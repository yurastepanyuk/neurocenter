///<reference path="../question-dto.ts"/>
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuestionDto} from '../question-dto';
import {OnlineConsultationService} from '../online-consultation.service';
import {AuthService} from '../../shared/auth.service';
import {ContentService} from '../../shared/content.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  viewnewnopic: boolean;

  public myForm: FormGroup;

  questionsList: QuestionDto[];
  loading: Boolean = false;
  public newQuestionDto: QuestionDto = null;

  errorMessage: String;

  constructor(fb: FormBuilder,
              private ocs: OnlineConsultationService,
              private cos: ContentService,
              public auth: AuthService) {
    this.viewnewnopic = false;

    ocs.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  ngOnInit() {
    this.updateView();
  }

  updateView() {
    this.ocs.getData().subscribe(
      (results) => { // on sucesss
        this.questionsList = this.cos.sortedbyDateCreated(results);
      });
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }
  }

  closeForm(): void {
    this.viewnewnopic = false;
  }
  closeEdit(): void {
    this.viewnewnopic = false;
  }

  getEmptyQuestionObject(): QuestionDto {
    return new QuestionDto();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

}
