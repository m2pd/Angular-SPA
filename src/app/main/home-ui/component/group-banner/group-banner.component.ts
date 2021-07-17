import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-banner',
  templateUrl: './group-banner.component.html',
  styleUrls: ['./group-banner.component.scss']
})
export class GroupBannerComponent implements OnInit {
  @Input() imageSrc;
  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
