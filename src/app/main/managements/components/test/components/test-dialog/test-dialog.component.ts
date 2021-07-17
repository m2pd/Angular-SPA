import { Component, OnInit, Injector, ViewChild, TemplateRef } from '@angular/core';
import { BaseModalComponent } from '@app/shared/_base/_modal.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '@app/shared/provider/services/form.service';
import { BsModalService } from 'ngx-bootstrap';
import { CrudComponent } from '@app/shared/components/dialogs/crud/crud.component';
import { ModalConfigFormInputModel, InitFormModel } from '@app/shared/_models/form';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
})
export class TestDialogComponent implements OnInit {

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
    //       type: 'vertical_icon',
    //       icon: 'fa fa-user'
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

    // var listControl:InitFormModel[] = [
    //   {
    //     name: 'name',
    //     validators: ['required']
    //   },
    //   {
    //     name: 'age',
    //     validators: []
    //   },
    //   {
    //     name: 'age2',
    //     validators: ['email']
    //   },
    // ];
    
    // this.form = this._form.initForm(listControl, {});
    // var modal = this._md.show(CrudComponent, {
    //   backdrop: 'static',
    //   keyboard: false,
    //   class: 'modal-md'
    // });

    // modal.content.form = this.form;
    // modal.content.title = 'World';
    // modal.content.configLayout = configLayout;

    // modal.content.onSave.subscribe(res => {
    //   alert(res);
    // });

  }

  abc(data){
    this.o++;
    this.form.controls.name.setValue('222');
    $('#_name').find('input').val('222');
  }
}
