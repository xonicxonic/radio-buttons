import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Menu } from 'src/app/data/models/menu.model';
import { MenuRule } from 'src/app/data/models/menu-rules.model';
import { data } from './radio-buttons-mock-data'

import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// TODO ADD SERVICE

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
})
export class RadioButtonsComponent implements OnInit {

	menus: Menu[][];
	menuRules : MenuRule;
	menuForm: FormGroup;

 	constructor(
 		private fb: FormBuilder,
 		private changeDet: ChangeDetectorRef,
 		private toastr: ToastrService,
 		) {
 	}

  ngOnInit(): void {
  	this.menus = data.menus
  	this.menuRules = data.rules;

  	let group: any = {};
  	this.menus.forEach((menu, index) => {
  			group['menu-' + (index+1)] = new FormControl('', [Validators.required])
  	});

  	this.menuForm = new FormGroup(group);
  }

  isCompatible(id: number, key: number){
  	if (key === 0){
  		return null;
  	}
  	
  	let value = this.menuForm.get('menu-' + key)?.value;
  	if (this.menuRules && value){
  		if (!this.menuRules[value]?.includes(id)){
  			return null;
  		}
  	}

  	return '';
  }

  resetChoices(key: number): void{
  	for (let i = key; i < this.menus.length; i++) {
  		this.menuForm.controls['menu-' + (i+1)].reset()
  	}
  }

  onSubmit(): void{
  	if (!this.menuForm.valid) {
      return;
    }

    try {
    	this.toastr.success('Success.', 'success');
    }
    catch (err) {
    	this.toastr.error('Something went wrong.', 'Error');
    }
  }

  get IsValid(): boolean{
  	return !this.menuForm.valid;
  }
}
