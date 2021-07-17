import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CategoryClientServiceProxy,
  CategoryGuidGetDto,
  CriteriaRequestDto,
  PostClientServiceProxy,
  PostGuidGetDto,
  ValuePostDtoPagedResultDto
} from "@shared/service-proxies/service-proxies";
import { NgImageSliderComponent } from "ng-image-slider";

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import * as _ from "lodash";
import { SysCategoryClientServiceProxy } from "@shared/service-proxies/sys-service-proxies";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  images: any;
  imageSlides: any;
  imageObject;
  connectPage: any = [];
  categories = [];
  sliders: any;
  slidersConfig: any;
  imagesSlider : any;
  thumbnailsSlider : any;
  imagesSliderFeature : any;
  thumbnailsSliderFeature : any;

  dateObj: any = new Date();
  month: any = this.dateObj.getUTCMonth() + 1; //months from 1-12
  day: any = this.dateObj.getUTCDate();
  year: any = this.dateObj.getUTCFullYear();


  galleryOptions: NgxGalleryOptions[];
  galleryOptions2: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @ViewChild("nav") slider: NgImageSliderComponent;

  constructor(
    private sysCategoryClientServiceProxy: SysCategoryClientServiceProxy,
    private postClientServiceProxy: PostClientServiceProxy
  ) {}

  ngOnInit() {
    // let input = new CategoryGuidGetDto();
    // input.criterias = [];
    // input.tenantId = 1;
    // this.sysCategoryClientServiceProxy.getList(input).subscribe((categories) => {
    //   let postInput = new PostGuidGetDto();
    //   postInput.sorting = "creationTime DESC";
    //   postInput.criterias = [
    //     new CriteriaRequestDto({
    //       propertyName: "categoryId",
    //       operation: 0,
    //       value: null
    //     })
    //   ];
    //   postInput.tenantId = 1;

    //   _.forEach(categories, (item) => {
    //     postInput.criterias[0].value = item.id;
    //     this.postClientServiceProxy
    //       .getAll(postInput)
    //       .subscribe((posts: ValuePostDtoPagedResultDto) => {
    //         _.forEach(posts.items, (p) => {
    //           if (p.files) {
    //             p.files = JSON.parse(p.files);
    //           }
    //           p.value10 = p.files && p.files.length && p.files[0].fileUrl;
    //         });
    //         this.categories.push({
    //           name: item.name,
    //           posts: _.take(posts.items, 4)
    //         });
    //       });
    //   });
    // });

    // let postInput = new PostGuidGetDto();
    // postInput.skipCount = 0;
    // postInput.maxResultCount = 2;
    // postInput.sorting = "creationTime DESC";
    // postInput.criterias = [];
    // postInput.tenantId = 1;

    // this.postClientServiceProxy
    //   .getAll(postInput)
    //   .subscribe((posts: ValuePostDtoPagedResultDto) => {
    //     _.forEach(posts.items, (p) => {
    //       if (p.files) {
    //         p.files = JSON.parse(p.files);
    //       }
    //       p.value10 = p.files && p.files.length && p.files[0].fileUrl;
    //     });
    //     this.images = posts.items;
    //   });

    // this.images = [
    //   {
    //     title:
    //       "Tiếp tục củng cố, nâng cao hiệu quả hợp tác quốc phòng Việt Nam - Cam-pu-chia",
    //     shortDescription:
    //       "Sáng 8/1, Đại tướng Ngô Xuân Lịch, Ủy viên Bộ Chính trị, Bộ trưởng Bộ Quốc phòng Việt Nam và Đại tướng Samdech Pị-chây Sê-na Tia Banh, Phó Thủ tướng Chính phủ, Bộ trưởng Bộ Quốc phòng Cam-pu-chia đồng chủ trì Hội đàm trực tuyến và Lễ ký Kế hoạch hợp tác năm 2021 giữa Bộ Quốc phòng Việt Nam và Bộ Quốc phòng Cam-pu-chia theo hình thức trực tuyến.",
    //     url: "assets/images/web/Cong ty TNHH Valley Campus.png"
    //   },
    //   {
    //     title:
    //       "Quân Giải phóng miền Nam Việt Nam - Vai trò, ý nghĩa và bài học lịch sử",
    //     shortDescription:
    //       "Nhân dịp kỷ niệm 60 năm Ngày thành lập Quân Giải phóng miền Nam Việt Nam (15/2/1961 - 15/2/2021), sáng 8/1, tại thành phố Biên Hòa (tỉnh Đồng Nai), Bộ Quốc phòng phối hợp với Tỉnh ủy Đồng Nai tổ chức Hội thảo khoa học “Quân Giải phóng miền Nam Việt Nam - Vai trò, ý nghĩa và bài học lịch sử”.",
    //     url: "assets/images/web/TTCNTTgiai doan 2 vao hoat dong.png"
    //   }
    // ];
    setTimeout(() => {
      console.log(this.categories);
      console.log(this.images);
    }, 5000);

    this.categories = [
      {
        name: "TIN TỨC - SỰ KIỆN",
        posts: [
          {
            time: '06/08/2020',
            type: 'time',
            src:
              "assets/images/web/large-ho-so-thi-quan-doi-2019-gom-nhung-gi-1552637948.jpg",
            title: "Điểm sàn xét tuyển vào 17 trường Quân đội cao nhất 23 điểm",
            shortDescription:
              "Theo đó, điểm sàn xét tuyển vào 17 trường Quân đội dao động từ 15 đến 23 điểm. Thí sinh nữ ở miền Bắc đăng ký xét tuyển vào Học viên hậu cần có điểm sàn 23 điểm- đây cũng là mức cao nhất"
          },
          {
            time: '07/08/2020',
            type: 'time',
            src:
              "assets/images/web/6510810823806544622023416769152506158120960n-1565417456011785298854-crop-1565417463831789456612.jpg",
            title:
              "Các trường quân đội xét tuyển bổ sung, mức điểm nhận hồ sơ từ 15 điểm",
            shortDescription:
              "Sau khi điểm chuẩn 18 trường quân đội năm 2019 được Bộ Quốc phòng chính thức công bố vào ngày 8/8. Hôm nay,  Ban Tuyển sinh quân sự Bộ Quốc phòng đã thông báo mức điểm nhận hồ sơ đăng ký xét tuyển nguyện vọng bổ sung vào các học viện, trường Quân đội năm 2019"
          },
          {
            time: '08/08/2020',
            type: 'time',
            src: "assets/images/web/c4.jpg",
            title:
              "Trường Sĩ quan Thông tin tặng máy sát khuẩn các trường trên địa bàn tỉnh Khánh Hòa",
            shortDescription:
              "Trường Sĩ quan Thông tin vừa tổ chức trao máy phun dung dịch sát khuẩn tay tự động tặng các trường trên địa bàn tỉnh Khánh Hòa nhân dịp học sinh đi học trở lại sau thời gian nghỉ vì dịch Covid-19."
          },
          {
            time: '09/08/2020',
            type: 'time',
            src: "assets/images/web/05042011son17201100550.jpg",
            title:
              "Đại tướng Phùng Quang Thanh kiểm tra tập huấn và tham quan trình diễn các sản phẩm khoa học-công nghệ cao",
            shortDescription:
              "Ngày 5-4, Đại tướng Phùng Quang Thanh, Ủy viên Bộ Chính trị, Phó Bí thư Quân ủy Trung ương, Bộ trưởng Bộ Quốc phòng đã đến kiểm tra tập huấn, tham quan các sản phẩm khoa học-công nghệ trưng bày và trình diễn báo cáo tại Trung tâm Huấn luyện Miếu Môn (Cục Quân huấn, Bộ Tổng tham mưu)..."
          }
        ]
      },
      {
        name: "THÔNG TIN ĐÀO TẠO",
        posts: [
          {
            src: "assets/images/web/trao-co-luu-niem.png",
            title:
              "Hội thi giảng viên dạy giỏi môn giáo dục quốc phòng an ninh lần thứ 5",
            shortDescription:
              "Triển khai thực hiện kế hoạch số 457/KH-BGDĐT ngày 30/5/2019 của Bộ giáo dục và đào tạo về tổ chức hôi thi giảng viên dạy giỏi môn học giáo dục quốc phòng và an ninh các trung tâm giáo dục quốc phòng an ninh lần thứ 5, năm 2019."
          },
          {
            src: "assets/images/web/200818-101845.png",
            title: "Những trải nghiệm quý giá từ môi trường quân đội",
            shortDescription:
              "Cùng ăn, cùng ở, cùng giao lưu văn nghệ, thể dục thể thao, được tận mắt chứng kiến cán bộ, chiến sĩ của Sư đoàn 2 thực hành một số động tác chiến thuật cá nhân tổng hợp để tiêu diệt địch… đó là một trong những nét mới của đợt tập huấn giáo viên giảng dạy môn Giáo dục Quốc phòng và An ninh (GDQPAN) tỉnh Gia Lai năm học 2019- 2020"
          },
          {
            src:
              "assets/images/web/large-ho-so-thi-quan-doi-2019-gom-nhung-gi-1552637948.jpg",
            title:
              "Hướng dẫn đăng ký vào các trường đại học, cao đẳng trong Quân đội",
            shortDescription:
              "Ban Tuyển sinh quân sự (TSQS) Bộ Quốc phòng vừa ban hành văn bản hướng dẫn các cơ quan, đơn vị, các học viện, trường thực hiện việc đăng ký sơ tuyển, đăng ký dự Kỳ thi trung học phổ thông (THPT) quốc gia. Theo đó, năm 2020, các học viện, trường trong Quân đội tiếp tục thực hiện tuyển sinh theo phương án: Sử dụng kết quả Kỳ thi THPT quốc gia, để xét tuyển sinh đại học, cao đẳng quân sự"
          },
          {
            src: "assets/images/web/k32buongkhukhuan1.jpg",
            title: "Học viện KTQS thiết kế thành công buồng khử khuẩn UV MTA",
            shortDescription:
              "Việc kiểm soát nhiễm khuẩn nói chung và khử khuẩn nói riêng đóng vai trò hết sức quan trọng trong việc giảm thiểu nguy cơ lây nhiễm bệnh cho các nhân viên y tế làm việc tại bệnh viện. Số lượng dụng cụ y tế, trang phục y tế và thiết bị phụ trợ như"
          }
        ]
      },
      {
        name: "TIN GIÁO DỤC QPAN",
        posts: [
          {
            type: 'list',
            src: "assets/images/web/200818-154557.png",
            title: "An ninh mạng trong giáo dục và đào tạo",
            shortDescription:
              "Hiện tại, ở Việt Nam có khoảng 50 triệu người sử dụng Internet, chủ yếu tham gia các trang mạng xã hội như: Youtube (chia sẻ Video), Facebook (mạng xã hội), Twitter (tiểu Blog),… trong đó, thành phần tham gia chủ yếu là giới trẻ, học sinh, sinh viên - đây cũng là lực lượng tham gia nhiều nhất vào sự mất an toàn, an ninh trên mạng Internet, gây ảnh hưởng tiêu cực không nhỏ trong đời sống xã hội"
          },
          {
            type: 'list',
            src: "assets/images/web/26092019vthuy66.jpg",
            title: "Thành công nhờ ứng dụng khoa học công nghệ",
            shortDescription:
              "Nam Định hiện đang là một trong những tỉnh dẫn đầu toàn quốc về xây dựng nông thôn mới (NTM). Toàn tỉnh có 209/209 xã được công nhận đạt chuẩn NTM; 10/10 huyện, thành phố được Thủ tướng Chính phủ quyết định công nhận đạt chuẩn NTM và hoàn thành nhiệm vụ NTM."
          },
          {
            type: 'list',
            src:
              "assets/images/web/large-ho-so-thi-quan-doi-2019-gom-nhung-gi-1552637948.jpg",
            title:
              "Hướng dẫn đăng ký vào các trường đại học, cao đẳng trong Quân đội",
            shortDescription:
              "Ban Tuyển sinh quân sự (TSQS) Bộ Quốc phòng vừa ban hành văn bản hướng dẫn các cơ quan, đơn vị, các học viện, trường thực hiện việc đăng ký sơ tuyển, đăng ký dự Kỳ thi trung học phổ thông (THPT) quốc gia. Theo đó, năm 2020, các học viện, trường trong Quân đội tiếp tục thực hiện tuyển sinh theo phương án: Sử dụng kết quả Kỳ thi THPT quốc gia, để xét tuyển sinh đại học, cao đẳng quân sự"
          },
          {
            type: 'list',
            src: "assets/images/web/k32buongkhukhuan1.jpg",
            title: "Học viện KTQS thiết kế thành công buồng khử khuẩn UV MTA",
            shortDescription:
              "Việc kiểm soát nhiễm khuẩn nói chung và khử khuẩn nói riêng đóng vai trò hết sức quan trọng trong việc giảm thiểu nguy cơ lây nhiễm bệnh cho các nhân viên y tế làm việc tại bệnh viện. Số lượng dụng cụ y tế, trang phục y tế và thiết bị phụ trợ như"
          }
        ]
      }
    ];

    this.sliders = [
      {img: "http://placehold.it/350x150/000000"},
      {img: "http://placehold.it/350x150/111111"},
      {img: "http://placehold.it/350x150/333333"},
      {img: "http://placehold.it/350x150/666666"}
    ];

    this.slidersConfig = {"slidesToShow": 1, "slidesToScroll": 1};

    this.imageObject = [
      {
        image: "assets/images/web/BO-QPVN.png",
        thumbImage: "assets/images/web/BO-QPVN.png",
        alt: "alt of image"
      },
      {
        image: "assets/images/web/connect-2.png",
        thumbImage: "assets/images/web/connect-2.png",
        alt: "Image alt"
      },
      {
        image: "assets/images/web/BOGDDT.png",
        thumbImage: "assets/images/web/BOGDDT.png",
        alt: "Image alt"
      },
      {
        image: "assets/images/web/BO-KHCN .png",
        thumbImage: "assets/images/web/BO-KHCN .png",
        alt: "Image alt"
      }
    ];

    this.imageSlides = [
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        alt: "alt of image",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/2.png",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/2.png",
        alt: "Image alt",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/IMG_20210130_152820.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/IMG_20210130_152820.jpg",
        alt: "Image alt",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        alt: "Image alt",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        alt: "alt of image",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/2.png",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/2.png",
        alt: "Image alt",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/IMG_20210130_152820.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/IMG_20210130_152820.jpg",
        alt: "Image alt",
        time: this.dateObj
      },
      {
        image: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        thumbImage: "https://tcu.edu.vn/public/upload/Gallery/Slide%20trang%20chu/TuyenSinh2021.jpg",
        alt: "Image alt",
        time: this.dateObj
      }
    ];

    this.galleryOptions = [
      {
        width: "100%",
        height: "360px",
        thumbnailsColumns: 3,
        thumbnailsRows: 3,

        thumbnailMargin: 2,
        thumbnailsMargin: 2,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryOptions2 = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.imagesSlider = {
      speed:300,
      loop: true,
      slidesToShow:1,
      slidesToScroll:1,
      cssEase:'linear',
      fade:true,
      autoplay: false,
      draggable:true,
      prevArrow:'.client-feedback .prev-arrow',
      nextArrow:'.client-feedback .next-arrow',
      asNavFor:".thumbs",
    };
    this.thumbnailsSlider = {
      speed:300,
      loop: true,
      slidesToShow:5,
      slidesToScroll:1,
      cssEase:'linear',
      autoplay: true,
      // centerMode:true,
      draggable:false,
      focusOnSelect:true,
      asNavFor:".feedback",
      prevArrow:'.client-thumbnails .prev-arrow',
      nextArrow:'.client-thumbnails .next-arrow',
    };

    this.imagesSliderFeature = {
      speed:300,
      loop: true,
      slidesToShow:1,
      slidesToScroll:1,
      cssEase:'linear',
      fade:true,
      autoplay: true,
      draggable:true,
    };
    this.thumbnailsSliderFeature = {
      speed:300,
      loop: true,
      slidesToShow:2,
      slidesToScroll:2,
      cssEase:'linear',
      autoplay: true,
      // centerMode:true,
      draggable:true,
      focusOnSelect:true,
    };

    this.connectPage = [
      {
        img: "assets/images/web/1.png",
        title: 'Đào tạo'
      },
      {
        img: "assets/images/web/b.png",
        title: 'Khảo thi'
      },
      {
        img: "assets/images/web/c.png",
        title: 'Giảng dạy'
      },
      {
        img: "assets/images/web/d.png",
        title: 'Học tập'
      },
      {
        img: "assets/images/web/4.png",
        title: 'Dữ liệu'
      },
      {
        img: "assets/images/web/2.png",
        title: 'Quản lý nội dung'
      },
      {
        img: "assets/images/web/3.png",
        title: 'Hệ thống'
      },

    ];

    const galleryImages = [
      "assets/images/web/Be giang khoa dao tao tieng Anh.jpg",
      "assets/images/web/Giang vien .jpg",
      "assets/images/web/gioi thieu san pham Phan mem chu ky so.jpg",
      "assets/images/web/mit-tinh ky niem Ngay KH&CN Viet Nam.jpg",
      "assets/images/web/khoa dao tao tieng Anh trinh do B1.jpg",
      "assets/images/web/Cong ty TNHH Valley Campus.png",
      "assets/images/web/rut kinh nghiem cong tac giang day CT.jpg",
      "assets/images/web/TTCNTTgiai doan 2 vao hoat dong.png",
      "assets/images/web/3.jpg"
    ];

    this.galleryImages = [];
    galleryImages.forEach((item) => {
      this.galleryImages.push(<any>{ small: item, medium: item, big: item });
    });
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
