import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeedbackDto} from '../feedback-dto';
import {FeedbackService} from '../feedback.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
  providers: [FeedbackService]
})export class FeedbackListComponent implements OnInit {

  viewnewnopic: boolean;

  public myForm: FormGroup;

  feedbackList: FeedbackDto[];
  loading: Boolean = false;
  public newFeedbackDto: FeedbackDto = null;

  errorMessage: String;

  constructor(fb: FormBuilder,
              private sf: FeedbackService,
              public auth: AuthService) {
    this.viewnewnopic = false;

    sf.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  ngOnInit() {
    this.updateView();
    console.log('USER ' + this.auth.getUser());
  }

  updateView() {
    this.sf.getData().subscribe(
      (results) => { // on sucesss
        this.feedbackList = this.sortedFeedbackList(results);
        for (let i = 0; i < this.feedbackList.length; i++) {
          console.log(this.feedbackList[i]);
        }
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

  sortedFeedbackList(input: FeedbackDto[]): FeedbackDto[] {
    return input.sort((a: FeedbackDto, b: FeedbackDto) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated));
  }

  getEmptyPresaObject(): FeedbackDto {
    return new FeedbackDto();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  getEmptyFeedback() {
    return new FeedbackDto();
  }

}
