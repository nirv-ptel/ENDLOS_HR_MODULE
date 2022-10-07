import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';

@Component({
  selector: 'ngx-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  admin: boolean = false;
  CalenderForm: FormGroup;
  @Input() EventDate: string;
  constructor(
    protected ref: NbDialogRef<CalenderComponent>,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private _auth: LoginService,
  ) { }

  ngOnInit(): void {
    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
        this.admin = true;
    }

    this.CalenderForm = this.fb.group({
      title: [null],
      date: [null],
      color: [null]
    })
    console.warn(this.EventDate);
  }

  dismiss() {
    this.ref.close();
}

  onCalenderFormSubmit() {

  }

}
