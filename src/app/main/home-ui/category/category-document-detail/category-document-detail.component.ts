import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-category-document-detail',
  templateUrl: './category-document-detail.component.html',
  styleUrls: ['./category-document-detail.component.scss']
})
export class CategoryDocumentDetailComponent implements OnInit {
  name = 'Set iframe source';
  url: string = "https://tcu.edu.vn/assets/web/libs/pdfjs/web/viewer.html?file=/public/upload/Documents/Giao%20trinh/Giao%20trinh%20giao%20duc%20quoc%20phong-tap%201.pdf";
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
