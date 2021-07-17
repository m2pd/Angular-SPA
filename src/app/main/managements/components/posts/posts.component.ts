import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudComponent } from '@app/shared/components/dialogs/crud/crud.component';
import { FormService } from '@app/shared/provider/services/form.service';
import { LanguageService } from '@app/shared/provider/services/language.service';
import { StatusService } from '@app/shared/provider/services/status.service';
import { UtilityService } from '@app/shared/provider/services/utility.service';
import { ModalConfigFormInputModel, InitFormModel } from '@app/shared/_models/form';
import { TableHeaderModel, TableFilterModel } from '@app/shared/_models/table';
import { ToastrService } from '@core/services/toastr.service';
import { AppConsts } from '@shared/AppConsts';
import { CategoryServiceProxy, PostServiceProxy, CategoryGuidGetDto, PostGuidGetDto, PostDtoPagedResultDto, PostDto, PostInputDto, FileDto } from '@shared/service-proxies/service-proxies';
import { CriteriaRequestDto, GuidEntityDto } from '@shared/service-proxies/sso-service-proxies';
import { SysCategoryServiceProxy } from '@shared/service-proxies/sys-service-proxies';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    postContent: any[] = [];
    headers: TableHeaderModel[] = [];
    /* #region  new */
    @ViewChild('noiDungTemplate') noiDungTemplate: TemplateRef<any>;
    @ViewChild('toggleButton') toggleButton: TemplateRef<any>;
    @ViewChild('content') content: TemplateRef<any>;
    /* #endregion */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.headers = [
                {
                    key: 'code',
                    value: 'Mã bài viết',
                    order: 'asc',
                    style: {
                        width: '130',
                    }
                },
                {
                    key: 'name',
                    value: 'Tiêu đề',
                    order: 'asc',
                    style: {
                        width: '500',
                    }
                },
                {
                    key: 'number1',
                    value: 'Vị trí',
                    order: 'asc',
                    style: {
                        width: '100',
                        align: 'center',
                    }
                },
                {
                    templateChild: this.toggleButton,
                    value: '',
                    style: {
                        width: '90',
                        align: 'center'
                    },
                }
            ];
        })
    }
    config: any = {
        airMode: false,
        tabDisable: true,
        popover: {
            table: [
                ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
                ["delete", ["deleteRow", "deleteCol", "deleteTable"]]
            ],
            image: [
                ["image", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
                ["float", ["floatLeft", "floatRight", "floatNone"]],
                ["remove", ["removeMedia"]]
            ],
            link: [["link", ["linkDialogShow", "unlink"]]],
            air: [
                [
                    "font",
                    [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "superscript",
                        "subscript",
                        "clear"
                    ]
                ]
            ]
        },
        height: "400px",
        toolbar: [
            ["fontsize", ["fontname", "fontsize", "color"]],
            [
                "font",
                [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "superscript",
                    "subscript",
                    "clear"
                ]
            ],
            ["para", ["style0", "ul", "ol", "paragraph", "height"]],
            ["insert", ["table", "picture", "link", "video", "hr"]],
            ["misc", ["codeview", "undo", "redo", "codeBlock", "fullscreen"]]
        ],
        codeviewFilter: true,
        codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
        codeviewIframeFilter: true
    };

    form: FormGroup;
    listObject = [];
    listStatus = [];
    configLayout: ModalConfigFormInputModel[] = [];
    listFilter: TableFilterModel[] = [];
    listLanguage: any[] = [];
    title = null;
    storagePost: Post[] = [];
    // data: any;

    constructor(
        private readonly _statusService: StatusService
        , private readonly _form: FormService
        , private readonly _md: BsModalService
        , private readonly _sysCategoryServiceProxy: SysCategoryServiceProxy
        , private readonly _postServiceProxy: PostServiceProxy
        , private readonly _toastr: ToastrService
        , public readonly _ut: UtilityService
        , private _languageService: LanguageService
    ) { }

    ngOnInit() {
        this.listStatus = this._statusService.getListStatus();
        this.listLanguage = this._languageService.getAllLanguage();

        this.listFilter = [
            {
                key: 'categoryId',
                header: 'Chuyên đề',
                listSelect: [
                    {
                        id: '',
                        name: 'Tất cả'
                    }
                ],
                callBack: () => {
                    this.getlistPost(this.listFilter[0].idSelect)
                },
            }
        ];

        forkJoin([
            this.getListCategory(`${AppConsts.tenantId}-HELPSEDUMOBILE`)
        ]).subscribe(res => {
            this.listFilter[0].listSelect = this.listFilter[0].listSelect.concat(res[0]);
            this.listObject = res[0];
            this.listFilter[0].idSelect = this.listFilter[0].listSelect[0].id;
            this.listFilter[0].nameSelect = this.listFilter[0].listSelect[0].name;
            this.getlistPost(this.listFilter[0].idSelect);
        })
    }

    getListCategory(type: string) {
        let input = new CategoryGuidGetDto();
        input.criterias = [new CriteriaRequestDto()];
        input.criterias[0].propertyName = "groupCode";
        input.criterias[0].operation = 0;
        input.criterias[0].value = type;

        input.sorting = "Code ASC";

        return this._sysCategoryServiceProxy.getList(input);
    }

    getlistPost(categoryId?: string) {
        let input = new PostGuidGetDto();
        input.criterias = categoryId
            ? [
                new CriteriaRequestDto({
                    propertyName: "categoryId",
                    operation: 0,
                    value: categoryId,
                }),
            ]
            : [];
        input.sorting = "number1 ASC";
        return this._postServiceProxy.getAll(input).subscribe((rs) => {
            this.storagePost = rs.items;
            this.storagePost.forEach(e => {
                e.listFile = e.files ? JSON.parse(e.files) : [];
                e.isToggle = false;
            });
        });
    }

    buildLayout() {
        this.configLayout = [
            {
                name: 'Vị trí',
                key: 'number1',
                placeholder: 'Nhập vị trí',
                type: 'number',
                style: {
                    stackCss: 'col-xs-2',
                    type: 'vertical',
                }
            },
            {
                name: 'Chuyên đề',
                key: 'categoryId',
                listError: [{
                    key: 'categoryId.required',
                    value: 'Chuyên đề không để trống.'
                }],
                type: 'select',
                listSelect: this.listObject,
                style: {
                    stackCss: 'col-xs-4',
                    type: 'vertical'
                }
            },
            {
                name: 'Ngôn ngữ',
                key: 'language',
                listError: [{
                    key: 'language.required',
                    value: 'Ngôn ngữ không để trống.'
                }],
                type: 'select',
                listSelect: this.listLanguage,
                style: {
                    stackCss: 'col-xs-3',
                    type: 'vertical'
                }
            },
            {
                name: 'Trạng thái',
                key: 'status',
                listError: [{
                    key: 'status.required',
                    value: 'Trạng thái không để trống.'
                }],
                type: 'select',
                listSelect: this.listStatus,
                style: {
                    stackCss: 'col-xs-3',
                    type: 'vertical'
                }
            },
            {
                name: 'Mã ',
                key: 'code',
                placeholder: 'Nhập mã',
                type: 'text',
                style: {
                    stackCss: 'col-xs-2',
                    type: 'vertical',
                }
            },
            {
                name: 'Tiêu đề',
                key: 'name',
                placeholder: 'Nhập tiêu đề',
                type: 'text',
                style: {
                    stackCss: 'col-xs-6',
                    type: 'vertical',
                }
            },
            {
                name: 'Ngày áp dụng ',
                placeholder: 'Chọn ngày',
                key: 'value4',
                listError: [{
                    key: 'value4.required',
                    value: 'Ngày không để trống.'
                }],
                type: 'date',
                style: {
                    stackCss: 'col-xs-2',
                    type: 'vertical'
                }
            },
            {
                name: 'Ngày hết hạn ',
                placeholder: 'Chọn ngày',
                key: 'value5',
                listError: [{
                    key: 'value5.required',
                    value: 'Ngày không để trống.'
                }],
                type: 'date',
                style: {
                    stackCss: 'col-xs-2',
                    type: 'vertical'
                }
            },
            {
                name: 'Trích dẫn ',
                placeholder: 'Nhập trích dẫn',
                key: 'description',
                type: 'text',
                style: {
                    stackCss: 'col-xs-12',
                    type: 'vertical'
                }
            },
            {
                name: 'Nội dung ',
                key: 'content',
                template: this.noiDungTemplate,
                style: {
                    stackCss: 'col-xs-12',
                    type: 'vertical'
                }
            },
        ];
    }

    buildForm(data: any) {
        var listControl: InitFormModel[] = [];
        this._form.addConfigControl(listControl, 'id', ['required']);
        this._form.addConfigControl(listControl, 'number1', ['required']);
        this._form.addConfigControl(listControl, 'categoryId', ['required']);
        this._form.addConfigControl(listControl, 'language', ['required']);
        this._form.addConfigControl(listControl, 'status', ['required']);
        this._form.addConfigControl(listControl, 'code', ['required']);
        this._form.addConfigControl(listControl, 'name', ['required']);
        // this._form.addConfigControl(listControl, 'value3');
        this._form.addConfigControl(listControl, 'value4');
        this._form.addConfigControl(listControl, 'value5');
        this._form.addConfigControl(listControl, 'description');
        this._form.addConfigControl(listControl, 'content');
        this._form.addConfigControl(listControl, 'listFile');

        if (data)
            this.form = this._form.initForm(listControl, data);
        else {

            this.form = this._form.initForm(listControl, {
                'id': AppConsts.IdZero,
                'number1': null,
                'categoryId': null,
                'language': null,
                'status': 'ACTIVE',
                'code': null,
                'name': null,
                // 'value3': null,
                'value4': null,
                'value5': null,
                'description': null,
                'content': null,
                'listFile': []
            });
        }
    }

    togglePost(data: Post) {
        data.isToggle = !data.isToggle;
        if (data.isToggle) {
            this.getContent(data.id).subscribe(p => {
                data.content = p.content;
            });
        }
    }

    getContent(id: string) {
        let input = new GuidEntityDto();
        input.id = id;
        return this._postServiceProxy.getPost(input);
    }

    preOpenDialog(data?: any) {
        this.buildLayout();
        if (data) {
            this.getContent(data.id).subscribe(p => {
                if (p.value4)
                    p.value4 = moment(p.value4).format('DD/MM/YYYY');
                if (p.value5)
                    p.value5 = moment(p.value5).format('DD/MM/YYYY');
                p.listFile = p.files ? JSON.parse(p.files) : [];
                this.buildForm(p);
                this.openDialog(p);
            });
        } else {
            this.buildForm(data);
            this.openDialog(data);
        }
    }

    openDialog(data?: any) {

        var modal = this._md.show(CrudComponent, {
            backdrop: 'static',
            keyboard: false,
            class: 'modal-lg'
        });

        modal.content.form = this.form;
        modal.content.title = !data ? 'Thêm mới bài viết' : 'Cập nhật bài viết';
        modal.content.configLayout = this.configLayout;
        modal.content.isNew = data ? false : true;
        modal.content.onSave.subscribe(res => {
            let value4 = this.form.value.value4;
            let value5 = this.form.value.value5;
            if (value4) {
                this.form.value.value4 = value4.toString();
            }
            if (value5) {
                this.form.value.value5 = value5.toString();
            }

            this.save(this.form);
        });
        modal.content.onDelete.subscribe(res => {
            this.delete(this.form);
        });
    }

    save(form: FormGroup) {
        if (form.status != "VALID") return;
        var url = form.value.id != AppConsts.IdZero ? this._postServiceProxy.update(PostInputDto.fromJS(form.value))
            : this._postServiceProxy.create(PostInputDto.fromJS(form.value));
        return url.subscribe((res) => {
            this._toastr.success();
            this.getlistPost(this.listFilter[0].idSelect);
        });
    }

    delete(form: FormGroup) {
        let input = new GuidEntityDto();
        input.id = form.value.id;
        return this._postServiceProxy.delete(input).subscribe((res) => {
            this._toastr.success();
            this.getlistPost(this.listFilter[0].idSelect);
        });
    }
    /* #endregion */

    // reverseString(str) {
    //     return str.split("/").reverse().join("/");
    // }
}

class Post extends PostDto {
    isToggle?: boolean;
    listFile?: FileDto[];
}
