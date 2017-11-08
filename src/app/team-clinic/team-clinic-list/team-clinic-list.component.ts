import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamClinicDto} from '../team-clinic-dto';
import {TeamClinicService} from '../team-clinic.service';
import {AuthService} from '../../shared/auth.service';
import {ContentEditI} from '../../presa-aboutus/content-edit/content-edit-i';
import {ContentService} from '../../shared/content.service';

@Component({
  selector: 'app-team-clinic-list',
  templateUrl: './team-clinic-list.component.html',
  styleUrls: ['./team-clinic-list.component.css']
})
export class TeamClinicListComponent implements OnInit {

  viewnewnopic: boolean;

  public myForm: FormGroup;

  teamList: TeamClinicDto[];
  loading: Boolean = false;
  public newTeamClinic: TeamClinicDto = null;

  public keysKindsOfMedia: string[];

  errorMessage: String;

  constructor(fb: FormBuilder,
              private ts: TeamClinicService,
              private cs: ContentService,
              @Inject('mapKindsOfMedia') public mapKindsOfMedia: Map<string, string>,
              public auth: AuthService) {

    this.viewnewnopic = false;
    this.myForm = fb.group({
      'headerTopic': ['', Validators.required],
      'context': ['', Validators.required],
      'typecontent': ['', Validators.required],
      'mediaContent': ['', Validators.required]
    });

    ts.needUpdateParent.subscribe((obj: any) => {
      this.updateView();
    });
  }

  updateView() {
    this.ts.getData().subscribe(
      (results) => { // on sucesss
        this.teamList = this.cs.sortedbyDateCreated(results);
        for (let i = 0; i < this.teamList.length; i++) {
          console.log(this.teamList[i]);
        }
      });
  }

  ngOnInit() {
    this.updateView();
  }

  showNewTopic(): void {
    if (!this.viewnewnopic) {
      this.viewnewnopic = true;
    }
  }

  onSubmit(form: any): void {
    this.loading = true;

    console.log('you submitted value from form:', form);
    if (!this.myForm.valid) {
      return;
    }

    console.log('you submitted value from this.myform:', this.myForm);


    const newObj: ContentEditI = {
      headerTopic: this.myForm.get('headerTopic').value,
      context: this.myForm.get('context').value,
      typecontent: this.myForm.get('typecontent').value,
      idcontent: this.cs.parseMediaContentLink(this.myForm.get('mediaContent').value, this.myForm.get('typecontent').value),
      dateCreated: new Date().toISOString()
    };

    console.log('you want this obj to save into DB :', newObj);

    const addeddItem = this.ts.saveNewTeamClinic(newObj).subscribe( addedItem => {
        console.log('addedItem: ');
        console.log(addedItem);
        this.newTeamClinic = addedItem;
        this.updateView();
      },
      error => this.errorMessage = <any>error);

    this.viewnewnopic = false;
    this.loading = false;
    this.errorMessage = null;
  }

  getEmptyTeamClinic(): TeamClinicDto {
    return new TeamClinicDto();
  }

  getParametresMap() {
    const parametres: Map< string, any> =  new Map< string, any>();
    parametres.set('typeContent', 'team-clinic');
    parametres.set('urlMediaContent', '');
    parametres.set('context', this);
    parametres.set('view', true);
    return parametres;
  }

  closeEdit(): void {
    this.viewnewnopic = false;
  }

}
