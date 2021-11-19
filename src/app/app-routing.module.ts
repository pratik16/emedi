import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketLayoutComponent } from './layout/market-layout/market-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MarketLayoutComponent,
        children: [
          //{ path: '', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)  },
          { path: 'auth', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)  },
          { path: '', loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule)  },

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
