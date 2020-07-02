import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {path: 'formulario_cliente', component: NewUserComponent},
  {path: '', component: NewUserComponent},
  {path: '**', redirectTo:'formulario_cliente', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
