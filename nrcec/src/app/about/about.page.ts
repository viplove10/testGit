import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService, 
    private widgetUtilService: WidgetUtilService,
    private router: Router) {}

    ngOnInit() {
    }

logout(){
  try{
    const result = this.firebaseAuthService.logout();
    result.then(reason => {
      console.log('logout reponse: '+reason);
    });
    this.widgetUtilService.presentToast('Logout Success!');
    this.router.navigate(['/login']);
  }catch(error){
    this.widgetUtilService.presentErrorToast(error.message);
    throw new Error(error);
  }
}
goToProfile(){
  this.router.navigate(['/profile']);
}

}
