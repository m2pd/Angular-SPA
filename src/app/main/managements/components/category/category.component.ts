import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryServiceProxy, CategoryOutputDto, CategoryGuidGetDto, CriteriaRequestDto, GuidEntityDto } from '@shared/service-proxies/service-proxies';
import { TableHeaderModel } from '@app/shared/_models/table';
import { FormService } from '@app/shared/provider/services/form.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StatusService } from '@app/shared/provider/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@core/services/toastr.service';
import { ValidatorsService } from '@app/shared/provider/services/validators.service';
import { UtilityService } from '@app/shared/provider/services/utility.service';
import * as _ from 'lodash';
import { InitFormModel, ModalConfigFormInputModel } from '@app/shared/_models/form';
import { AppConsts } from '@shared/AppConsts';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CrudComponent } from '@app/shared/components/dialogs/crud/crud.component';
import { SysCategoryServiceProxy } from '@shared/service-proxies/sys-service-proxies';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {
    list: any[] = [];
    configLayout: ModalConfigFormInputModel[] = [];
    form: FormGroup;
    group = null;
    parent = null;
    title = null;
    headers: TableHeaderModel[] = [];

    @ViewChild('tree_parent_template') tree_parent_template: TemplateRef<any>;
    @ViewChild('add_child_template') add_child_template: TemplateRef<any>;
    constructor(
        private readonly _md: BsModalService
        , private readonly _form: FormService
        , private readonly _statusService: StatusService
        , private readonly _sysCategoryServiceProxy: SysCategoryServiceProxy
        , private readonly _activatedRoute: ActivatedRoute
        , private readonly _toastr: ToastrService
        , private readonly _validatorService: ValidatorsService
        , public readonly _ut: UtilityService
    ) { }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.headers = [
                {
                    key: 'codeData',
                    keySub: 'name',
                    value: 'Mã - Tên',
                    order: 'asc',
                    style: {

                    }
                },
                {
                    key: 'index',
                    value: 'Vị trí',
                    order: 'asc',
                    style: {
                        width: '130',
                        align: 'center'
                    }
                },
                {
                    key: 'description',
                    value: 'Mô tả',
                    style: {
                        width: '300'
                    }
                },
                {
                    key: 'statusName',
                    value: 'Trạng thái',
                    style: {
                        width: '130',
                        align: 'center'
                    }
                },
                {
                    templateChild: this.add_child_template,
                    style: {
                        width: '130',
                        align: 'center'
                    }
                },
            ];
        }, 500);
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        let input = new CategoryGuidGetDto();
        input.sorting = "Code ASC";

        return this._sysCategoryServiceProxy.getList(input).subscribe(res => {
            this.list = res;
            _.each(this.list, item => {
                item.statusName = (this._ut.findValueOject(this._statusService.getListStatus(), 'id', item.status)).name;
            })
        });
    }

    /* #endregion */

    /* #region  build layout */

    buildForm(data) {
        var listControl: InitFormModel[] = [];
        this._form.addConfigControl(listControl, 'id', ['required']);
        this._form.addConfigControl(listControl, 'parentId');
        this._form.addConfigControl(listControl, 'code');
        this._form.addConfigControl(listControl, 'order');
        this._form.addConfigControl(listControl, 'codeData', ['required']);
        this._form.addConfigControl(listControl, 'name', ['required']);
        this._form.addConfigControl(listControl, 'index', ['required']);
        this._form.addConfigControl(listControl, 'status', ['required']);
        this._form.addConfigControl(listControl, 'description', []);
        this._form.addConfigControl(listControl, 'group');
        this._form.addConfigControl(listControl, 'groupCode');
        this._form.addConfigControl(listControl, 'bool1');

        if (data)
            this.form = this._form.initForm(listControl, data);
        else {

            this.form = this._form.initForm(listControl, {
                'id': AppConsts.IdZero,
                'groupCode': 'HELPSEDUMOBILE',
                'group': 'Trợ giúp -Edu Mobile',
                'index': 0,
                'order': 0,
                'parentId': this.parent,
                'status': 'ACTIVE',
                'bool1': true
            });
        }

        this.form.get('index').setValidators([Validators.required, Validators.min(0), this._validatorService.setValidatorIndex(this.form.get('parentId') as FormControl, _.cloneDeep(this.list), this.form.get('id') as FormControl)]);
        this.form.get('parentId').valueChanges.subscribe(res => {
            this._validatorService.resetValidation(this.form.get('index') as FormControl);
        });
        this.form.get('id').valueChanges.subscribe(res => {
            this._validatorService.resetValidation(this.form.get('index') as FormControl);
        });

    }

    buildLayout() {
        this.configLayout = [];
        this._form.buildLayoutForm(this.configLayout, 'parentId', 'Danh mục cha', null, null, null, this.tree_parent_template);
        this._form.buildLayoutForm(this.configLayout, 'status', 'Trạng thái', 'select', null, null, null, {
            stackCss: 'col-md-3 col-xs-12',
            type: 'vertical'
        }, this._statusService.getListStatus(), null);


        this._form.buildLayoutForm(this.configLayout, 'codeData', 'Mã danh mục', 'text', null, null, null, {
            stackCss: 'col-md-3 col-xs-12',
            type: 'vertical',
        }, this._statusService.getListStatus(), [{
            key: 'codeData.required',
            value: 'Mã không để trống.'
        }]);

        this._form.buildLayoutForm(this.configLayout, 'name', 'Tên danh mục', 'text', null, null, null, {
            stackCss: 'col-md-6 col-xs-12',
            type: 'vertical'
        }, this._statusService.getListStatus(), [
            {
                key: 'name.required',
                value: 'Tên không để trống.'
            },
        ]);

        this._form.buildLayoutForm(this.configLayout, 'index', 'Vị trí', 'number', null, null, null, {
            stackCss: 'col-xs-3 col-xs-12',
            type: 'vertical'
        }, this._statusService.getListStatus(), [
            {
                key: 'index.required',
                value: 'Vị trí không để trống.'
            },
            {
                key: 'index.duplicate',
                value: 'Vị trí trùng.'
            },
            {
                key: 'index.min',
                value: 'Vị trí phải lớn hơn 0.',
            }
        ]);


        this._form.buildLayoutForm(this.configLayout, 'description', 'Mô tả', 'text', null, null, null, {
            stackCss: 'col-xs-12',
            type: 'vertical'
        });

    }

    /* #endregion */

    /* #region  write */
    openDialog(data?, parent?) {
        this.parent = parent;
        this.buildLayout();
        this.buildForm(data);

        var modal = this._md.show(CrudComponent, {
            backdrop: 'static',
            keyboard: false,
            class: 'modal-md'
        });

        modal.content.form = this.form;
        modal.content.title = !data ? 'Tạo danh mục' : 'Cập nhật danh mục';
        this.form.setValidators
        modal.content.configLayout = this.configLayout;
        modal.content.isNew = !data ? true : false;
        modal.content.onSave.subscribe(res => {
            this.save(this.form);
        });
        modal.content.onDelete.subscribe(res => {
            this.delete(this.form);
        })

    }

    save(form) {

        if (form.status != "VALID") return;

        var url = form.value.id != AppConsts.IdZero ? this._sysCategoryServiceProxy.update(form.value) : this._sysCategoryServiceProxy.create(form.value);

        return url.subscribe((res) => {
            this._toastr.success();
            this.ngOnInit();
        });

    }

    delete(form) {
        let input = new GuidEntityDto();
        input.id = form.value.id;
        return this._sysCategoryServiceProxy.delete(input).subscribe((res) => {
            this._toastr.success();
            this.ngOnInit();
        });
    }
}
