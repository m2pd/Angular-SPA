export class AppConsts {

    static remoteServiceBaseUrl: string;
    static sysRemoteServiceBaseUrl:string;
    static eduRemoteServiceBaseUrl:string;
    static ssoRemoteServiceBaseUrl:string;
    static loginUrl: string;
    static appBaseHref: string;
    static applicationId: string;
    static listLanguage = [];
    static signalrRemoteServiceBaseUrl: string;
    
    static tenantProfile = {
        tenantName: "",
        hotline: "",
        tel: "",
        fax: "",
        email: "",
        address: "",
        logo: "",
        website: "",
        coQuanQuanLy: "",
        note: "",
        id: ""
    };


    static tenantId: number = 1;
    static IdZero: string = '00000000-0000-0000-0000-000000000000'
    static MCE_API_KEY: string;

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'EM'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token',
        abpAuthToken: 'Abp.AuthToken'
    };

    static summernoteFullConfig = {
        height: '300px',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontsize', ['fontname', 'fontsize', 'color']],
            ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
            ['insert', ['table', 'picture', 'link', 'video', 'hr']],
            ['misc', ['codeview', 'undo', 'redo', 'fullscreen', 'codeBlock']]
        ],
    }

    static summernoteBasicConfig = {
        tabsize: 2,
        height: '60px',
        toolbar: [
          ['style', ['bold', 'italic']],
          ['fontsize', ['color']],
        ],
        fontNames: [],
    }
}
