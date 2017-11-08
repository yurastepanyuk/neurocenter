import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../feedback.service';
import {FeedbackI} from '../feedback-i';
import {UserDto} from '../../user/user-dto';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.css']
})
export class FeedbackEditComponent implements OnInit {

  feedbackForm: FormGroup;
  public _initParametres: Map<string, any>;
  @Output() public addedItem: EventEmitter<any>;
  errorMessage: String;

  _contentObject: any;
  @Input()
  set contentObject(contentObject: any) {
    if ((contentObject) && (contentObject.id)) {
      this._contentObject = contentObject;
      console.log('set feedbackObject ' + contentObject.toString());
      this.initObject();
    }
  }

  @Input()
  set initParametres(param: Map<string, any>) {
    this._initParametres = param;
  }

  constructor(fb: FormBuilder,
              private sf: FeedbackService,
              private auth: AuthService ) {
    this.feedbackForm = fb.group({
      'context':  ['', Validators.required]
    });
    this.addedItem = new EventEmitter();
  }

  ngOnInit() {
  }

  private initObject() {
    this.feedbackForm.patchValue({context: this._contentObject.context});
  }
  closeEdit() {
    this._initParametres.get('context').closeEdit();
  }

  onSubmit() {
    if (!this._contentObject) {
      const newObj: FeedbackI = {
        user: new UserDto({
          username: this.auth.getUser().username,
          userview: this.auth.getUser().userview
        }),
        context: this.feedbackForm.get('context').value,
        dateCreated: new Date().toISOString()
      };

      console.log('you want to add new Feedback into DB :', newObj);

      const addeddItem = this.sf.saveFeedback(newObj).subscribe(addedItem => {
          console.log('added Feedback: ', addedItem);
          this.addedItem.emit(addedItem);
          this.sf.needUpdateParent.emit(addedItem);
        },
        error => this.errorMessage = <any>error);
    }
  }

}
