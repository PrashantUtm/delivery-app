import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'delivery-list',
    pathMatch: 'full'
  },
  {
    path: 'delivery-list',
    children: [
      { path:'', loadChildren: () => import('./pages/delivery-list/delivery-list.module').then( m => m.DeliveryListPageModule) },
      { path:':deliveryid', loadChildren: () => import('./pages/delivery-details/delivery-details.module').then( m => m.DeliveryDetailsPageModule) }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
