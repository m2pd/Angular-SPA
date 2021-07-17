import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';
import { BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { validator } from 'jquery';
import { CrudComponent } from '@app/shared/components/dialogs/crud/crud.component';
import { FormService } from '@app/shared/provider/services/form.service';
import { ModalConfigFormInputModel, InitFormModel } from '@app/shared/_models/form';

@Component({
  selector: 'app-test-content',
  templateUrl: './test-content.component.html',
})
export class TestContentComponent implements OnInit {

  @ViewChild('child_template') child_template:TemplateRef<any>;

  form:FormGroup;
  o = 0;
  constructor(
    private readonly _md:BsModalService,
    private readonly _form:FormService
  ) { }

  ngOnInit() {
  }

  openDialog(){

    // var configLayout:ModalConfigFormInputModel[] = [
    //   {
    //     name: 'Tên',
    //     key: 'name',
    //     placeholder: '2222222222',
    //     listError: [{
    //       key: 'name.required',
    //       display: 'Tên không để trống.'
    //     }],
    //     type: 'text',
    //     style: {
    //       stackCss: 'col-xs-6',
    //       type: 'vertical'
    //     }
    //   },
    //   {
    //     name: 'age',
    //     key: 'age',
    //     listSelect: [{id: 's', value: '22'}],
    //     listError: [],
    //     // type: 'text',
    //     template: this.child_template,
    //     style: {
    //       stackCss: 'col-xs-6',
    //       type: 'vertical'
    //     }
    //   },
    //   {
    //     name: 'age2',
    //     key: 'age2',
    //     listError: [],
    //     type: 'text',
    //     style: {
    //       stackCss: 'col-xs-12',
    //       type: 'vertical'
    //     }
    //   }
    // ];


    // this.form = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   age: new FormControl(null, Validators.required),
    //   age2: new FormControl(null, Validators.required),
    // });
 
    var listControl:InitFormModel[] = [
      {
        name: 'name',
        validators: ['required']
      },
      {
        name: 'age',
        validators: []
      },
      {
        name: 'age2',
        validators: ['email']
      },
    ];
    
    this.form = this._form.initForm(listControl, {});
    var modal = this._md.show(CrudComponent, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-md'
    });

    modal.content.form = this.form;
    modal.content.title = 'World';
    // modal.content.configLayout = configLayout;

    modal.content.onSave.subscribe(res => {
      alert(res);
    });

  }

  abc(data){
    this.o++;
    this.form.controls.name.setValue('222');
    $('#_name').find('input').val('222');
  }
}
