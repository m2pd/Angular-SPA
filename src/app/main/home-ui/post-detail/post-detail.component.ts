import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import {
  CriteriaRequestDto,
  PostClientServiceProxy,
  PostGuidGetDto,
  PostOutputDto
} from "@shared/service-proxies/service-proxies";
import * as _ from "lodash";


@Component({
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"]
})
export class PostDetailComponent implements OnInit {
  post: PostOutputDto;
  relatedPosts = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postClientServiceProxy: PostClientServiceProxy
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params): void => {
      const input = new PostGuidGetDto();
      input.id = params["id"];
      input.tenantId = 1;
      this.postClientServiceProxy.getPost(input).subscribe((res) => {
        this.post = res;

        let postInput = new PostGuidGetDto();
        postInput.sorting = "creationTime DESC";
        postInput.criterias = [
          new CriteriaRequestDto({
            propertyName: "categoryId",
            operation: 0,
            value: this.post.categoryId
          })
        ];
        postInput.tenantId = 1;

        this.postClientServiceProxy.getAll(postInput).subscribe((res) => {
          this.relatedPosts = _.map(res.items, (i) => {
            return { id: i.id, name: i.name };
          });
        });
      });
    });
  }
}
