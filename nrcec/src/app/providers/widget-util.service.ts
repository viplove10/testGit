import { Injectable } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  constructor(private toastController: ToastController, private platform: Platform,
    private loadingController: LoadingController) { }

    loading: any = {};

  async presentToast(message){
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      showCloseButton: true,
      position: this.platform.is('desktop') ? 'top' : 'bottom'
    });
    toast.present();
  }

  async presentErrorToast(message){
    const toast = await this.toastController.create({
      message,
      showCloseButton: true,
      position: this.platform.is('desktop') ? 'top' : 'bottom'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
    });
    await this.loading.present();
  }

  async dismissLoader(){
    await this.loading.dismiss();
  }
}
