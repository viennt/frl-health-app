import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { faArrowLeft, faCheck, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import {askForServer, SERVER_URL} from '../../../constants';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
})
export class AddMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;

  name: string;
  quantity: string;
  description: string;

  medicalConditions: any[];

  constructor(private router: Router, private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onAssignMedicalCondition(index: number, isAssigned: boolean) {
    this.medicalConditions[index].isAssigned = isAssigned;
  }

  onClickSaveMenu() {
    if (!this.name || !this.name.trim()) {
      this.notify.title = 'Name is required';
      this.notify.show();
      return;
    }
    if (!this.quantity || !this.quantity.trim()) {
      this.notify.title = 'Quantity is required';
      this.notify.show();
      return;
    }

    this.http.post(
      SERVER_URL + '/menus',
      {
        name: this.name,
        quantity: this.quantity,
        description: this.description,
        conditions: this.medicalConditions.filter(medicalCondition => medicalCondition.isAssigned)
      },
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = 'Save success!';
          this.notify.type = 'success';
          this.notify.show();
          this.router.navigate(['/menus']);
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
