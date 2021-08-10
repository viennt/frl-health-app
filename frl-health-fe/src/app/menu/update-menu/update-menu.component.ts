import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { faArrowLeft, faCheck, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { askForServer, SERVER_URL } from '../../../constants';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
})
export class UpdateMenuComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;

  id: number;
  name: string;
  description: string;
  quantity: string;
  medicalConditions: any[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = +params.params.id;
      this.getList();
    });
  }

  ngOnInit() {
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

    this.http.put(
      SERVER_URL + '/menus/' + this.id,
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

  getDetail(id) {
    this.http.get(
      SERVER_URL + '/menus/' + id,
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1 && response.data) {
          this.name = response.data.name;
          this.quantity = response.data.quantity;
          this.description = response.data.description;
          this.medicalConditions = this.medicalConditions.map(medicalCondition => {
            const result = response.data.conditions.find(
              condition => condition.id === medicalCondition.id
            );
            return {
              id: medicalCondition.id,
              name: medicalCondition.name,
              description: medicalCondition.description,
              isAssigned: !!result
            };
          });
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

  getList() {
    this.http.get(
      SERVER_URL + '/conditions',
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.medicalConditions = response.data;
          this.getDetail(this.id);
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
