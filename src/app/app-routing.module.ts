import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadioButtonsComponent } from './modules/radio-buttons/radio-buttons.component';

const routes: Routes = [
	{path : '', component : RadioButtonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
