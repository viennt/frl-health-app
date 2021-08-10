import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faPencilAlt, faPlus, faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { askForServer, SERVER_URL } from '../../../constants';

@Component({
  selector: 'app-list-medical-condition',
  templateUrl: './list-medical-condition.component.html',
})
export class ListMedicalConditionComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  medicalConditions: any[];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onClickRemoveMedicalCondition(medicalConditionId) {
    this.http.delete(
      SERVER_URL + '/conditions/' + medicalConditionId,
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = 'Delete success!';
          this.notify.type = 'success';
          this.notify.show();
          this.getList();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

  getList() {
    this.http.get(
      SERVER_URL + '/conditions',
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.medicalConditions = response.data;
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        if (error && error.statusText === 'Unknown Error') {
          askForServer(SERVER_URL);
        }
        this.notify.title = error;
        this.notify.show();
      });
  }
}
