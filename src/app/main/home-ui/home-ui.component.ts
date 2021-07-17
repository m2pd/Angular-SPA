import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./home-ui.component.html",
  styleUrls: ["./home-ui.component.scss"]
})
export class HomeUIComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onActivate() {
    window.scroll(0, 0);
  }
}
