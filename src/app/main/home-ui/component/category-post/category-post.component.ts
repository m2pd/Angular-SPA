import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-category-post',
  templateUrl: './category-post.component.html',
  styleUrls: ['./category-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryPostComponent implements OnInit {
  @Input() category;
  @Input() wapSection;
  constructor() { }

  ngOnInit() {
  }

}
