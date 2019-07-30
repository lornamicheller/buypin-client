import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'ad', loadChildren: './ad/ad.module#AdPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'add-address', loadChildren: './add-address/add-address.module#AddAddressPageModule' },
  { path: 'shipping-address', loadChildren: './shipping-address/shipping-address.module#ShippingAddressPageModule' },
  { path: 'address-resume', loadChildren: './address-resume/address-resume.module#AddressResumePageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'thankyou-splash', loadChildren: './thankyou-splash/thankyou-splash.module#ThankyouSplashPageModule' },
  { path: 'rating', loadChildren: './rating/rating.module#RatingPageModule' },
  { path: 'component', loadChildren: './component/component.module#ComponentPageModule' },
  { path: 'history-order', loadChildren: './history-order/history-order.module#HistoryOrderPageModule' },
  { path: 'payment-method', loadChildren: './payment-method/payment-method.module#PaymentMethodPageModule' },
  { path: 'edit-payment', loadChildren: './edit-payment/edit-payment.module#EditPaymentPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' }
  // { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
