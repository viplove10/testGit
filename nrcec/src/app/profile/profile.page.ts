import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileInfo: any = {};
  profileAvailable: boolean = false;

  constructor(private firebaseAuthService: FirebaseAuthService, 
    private widgetUtilService: WidgetUtilService,
    private router: Router) {
      this.getUserProfile();
    }

    ngOnInit() {
    }

    getUserProfile(){
      this.firebaseAuthService.getAuthState().subscribe(user => {
        if(user){
          this.profileInfo = user.toJSON();
        }
        this.profileAvailable = true;
      },(error) => {
        this.profileAvailable = true;
        this.widgetUtilService.presentErrorToast(error.message);
      });
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
}
