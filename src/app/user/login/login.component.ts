import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'
  inSubmission = false;


  constructor(private auth: AngularFireAuth) { }

  async login() {

    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is loging in.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      console.error(e);
      this.alertMsg = 'An error occurred.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success, Your are logged in '
    this.alertColor = 'green'
  }
}
