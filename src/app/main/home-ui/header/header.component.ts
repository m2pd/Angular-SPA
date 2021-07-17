import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  menus: { title: string }[];

  constructor() {}

  ngOnInit() {
    this.menus = [
      { title: "Giới thiệu" },
      { title: "Tin tức - sự kiện" },
      { title: "Đào tạo" },
      { title: "Khoa học quân sự" },
      { title: "Học viên dân sự" },
      { title: "Học viên quân sự" },
      { title: "Học liệu điện tử" }
    ];
  }
}
