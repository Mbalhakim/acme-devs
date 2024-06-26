import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = ''; // Voeg de variabele message toe

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post<any>('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe(response => {
        console.log(response); // Behandel de respons zoals nodig
        this.router.navigate(['/home']);
      }, error => {
        console.error('Login failed', error);
        this.message = 'Invalid username or password. Please try again.'; // Stel de message in bij een fout
      });
  }
}
