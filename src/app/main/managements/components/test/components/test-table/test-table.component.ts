import { Component, OnInit, TemplateRef, Input, ViewChild } from '@angular/core';
// import { SSOServiceProxy } from '@shared/service-proxies/sso-service-proxies';
import { TableHeaderModel, TableFilterModel } from '@app/shared/_models/table';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {

  headers:TableHeaderModel[] = [];
  listFilter:TableFilterModel[] = [];

  @ViewChild('abctemplate') abctemplate:TemplateRef<any>;
  @ViewChild('childtemplate') childtemplate:TemplateRef<any>;

  listData = [];
  constructor(
    // private readonly s:SSOServiceProxy
  ) { }

  ngOnInit() {
    this.headers = [
      {
        key: 'name',
        value: 'Tên',
        order: 'asc',
        style:{
          frozen: false,
          width: '80',
          hidden: false

        },
        template: this.abctemplate,
        // templateChild: this.childtemplate
      },
      {
        key: 'index',
        value: 'Vị trí',
        order: 'asc',
        style: {
          align: 'center',
          width: '100',
        }
      },
      {
        key: 'code',
        value: 'Vị trí',
      },
    ];

    this.listFilter = [{
      key: 'abc',
      header: 'Chức danh',
      idSelect: null,
      nameSelect: null,
      template: null,
      listSelect: [
        {
          id: 'abc',
          name: '23232 asd as',
        },
        {
          id: 'abc2',
          name: '23232 asd as',
        },
        {
          id: 'abc3',
          name: '23232 asd as',
        },
        {
          id: 'abc4',
          name: '23232 asd as',
        }
      ],
      callBack: (valueA, valueB, valueC) => {
        alert(1);
      },
    }];
    // for(var i = 0; i < 30; i++){
    //   this.headers.push(      {
    //     key: 'code',
    //     value: 'Vị trí' + i,
    //   });
    // }
    // this.s.getListOrganization().subscribe(res => {
    //   this.listData = res;
    // })
  }
  abc(data){
    console.log(data);
  }

}
