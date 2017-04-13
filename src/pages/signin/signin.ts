import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";

import { AuthService } from "../../services/auth";
import { Recipe } from "../../models/recipe";
import { RecipesService } from "../../services/recipes";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private recipesService: RecipesService,
  			  private http: Http) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.http.get('http://119.97.204.209:8002/GetTJWebService.asmx?op=Login')
      .map((response: Response) => {
      	response.json();
      	console.log(response)
      
      });
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data)
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
