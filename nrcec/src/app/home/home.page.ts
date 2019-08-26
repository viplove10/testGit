import { Component } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private firebaseAuthService: FirebaseAuthService, 
    private widgetUtilService: WidgetUtilService,
    private router: Router) {}

async logout(){
  try{
    await this.firebaseAuthService.logout();
    this.widgetUtilService.presentToast('Logout Success!');
    this.router.navigate(['/login']);
  }catch(error){
    this.widgetUtilService.presentToast(error.message);
    throw new Error(error);
  }
}

}
