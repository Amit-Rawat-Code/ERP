app.LayoutController = function ($scope, $sce,$filter, myService) {
    $scope.Menus = [];
    $scope.SubMenus = [];
    $scope.Menuss = [];
    $scope.SubMenuss = [];
    $scope.bgimageLeft = '';
    $scope.bgimageRight = '';
    $scope.ImageContentPageData = [];
    $scope.AccordianContentPageData = [];
   
    $scope.GetThemeMasterData = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', "/api/GetTheme", collectionobj);
        getData.then(function (response)
        {
            $scope.GetThemeData = response.data;
        });
        

    };


    $scope.loadTarget = function (obj) {
        
        $('#AMenu' + obj.MenuId).attr('target', function () {
            if (obj.URLType != 'T' && $('#AMenu' + obj.MenuId).attr('data-toggle') == 'none') return '_blank'
            else return '_self'
        });
    }

    $scope.UpdateVisitorCounter = function () {

        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.VisitorCount = $scope.GetThemeData[0].VisitorCount + 1;

        var getData = myService.methode('POST', "/api/UpdateVisitorCount", collectionobj);
        getData.then(function (response) {
            
            $scope.LoadCounterscript();
        });
    }
    $scope.LoadCounterscript = function () {
        
        var counterContainer = $(".website-counter");
        var nums = $scope.GetThemeData[0].VisitorCount.toString().split('').map(Number);
        for (var i of nums) {
            counterContainer.append("<span class='counter-item'>" + i + "</span>");
        }
    }
    $scope.$on('principalImgFun', function () {
        $("#load2").addClass("hide-display");

    });

    $scope.HideShow = function (data) {
        if (data == null || data == undefined) {
            return false
        }
        else {
            return true;
        }
    }

    $scope.flyerImgSrc = "";
    $scope.SetDetailData = function (data)
    {
        
        $.each(data, function (i, item)
        {
            $scope.RelationshipId = item.RelationShipId;
            if ($scope.RelationshipId == '14') { //DPS Saharanpur
                $scope.flyerImgSrc = "/content/images/DPS-saharanpur.jpg";
                setTimeout(function () {
                    $('#modal-subscribe').modal("show")
                    var maxheight = $(window).height() * 0.9;
                    $('.modal-img').attr('style', 'height:' + maxheight + 'px;width:100%;');
                }, 1000)
            }
            else if ($scope.RelationshipId == '23') { //DPS Indira Nagar
                $scope.flyerImgSrc = "/content/images/DPS-indira-nagar.jpg";
                setTimeout(function () {
                    $('#modal-subscribe').modal("show")
                    var maxheight = $(window).height() * 0.9;
                    $('.modal-img').attr('style', 'height:' + maxheight + 'px;width:100%;');
                }, 1000)
            }
            else if ($scope.RelationshipId == '25') { //DPS Gomti Nagar
                $scope.flyerImgSrc = "/content/images/DPS-gomti-nagar.jpg";
                setTimeout(function () {
                    $('#modal-subscribe').modal("show")
                    var maxheight = $(window).height() * 0.9;
                    $('.modal-img').attr('style', 'height:' + maxheight + 'px;width:100%;');
                }, 1000)
            }
            $scope.DisplayCode = item.DisplayCode;
            if (item.RelationShipId != null && item.DisplayCode != null)
            {
                //debugger
                sessionStorage.setItem("RelationshipId", item.RelationShipId);
                sessionStorage.setItem("DisplayCode", item.DisplayCode);
                sessionStorage.setItem("SessionId", item.SessionId);
                $scope.init();
                
                $scope.BindBanner();
                $scope.BindAllNotice();
                $scope.BindHomePageOurProgramsSlider();
                $scope.BindHomePageKidsCornerSlider();
                $scope.BindHomePageAchievementSlider();
                //$scope.BindHomeEventsSlider();
                $scope.GetLogoImage();
                $scope.GetMediaGallery();
                $scope.BindHomePageTestimonialSlider();
                $scope.GetContactUsContentMaster();
                $scope.GetThemeMasterData();
                $scope.GetOurGroupOfSchool();
                $scope.GetSession();
                $scope.GetClasses();
                $scope.GetVideoList();
                $scope.GetDocsAndInfo();
                $scope.GetTopHeaderDataLeft();
                $scope.GetTopHeaderDataRight();                
                $scope.GetLeftSidebarLink();
                $scope.GetRightSidebarLink();
                $scope.GetAboutUs();
                $scope.YoutubeFeedUrl();
                $scope.FacebookFeedUrl();
                $scope.GetAccordian();
                $scope.GetImageGallery();
                $scope.GetVideoGallery();
                $scope.GetBannerDetail();
                $scope.GetBannerData();
                $scope.GetMediaNewsDetail();
                $scope.GetMediaNewsData();
                //$scope.PhotoSlider();
               
            }
            else
            {
                alert("Display Code or RelationshipId Not Found.");
            }
        });
    };

    $scope.GetSession = function () {
        var collectionobj = {};
        collectionobj.Action = 11;
        var getData = myService.methode('POST', "/api/GetSession", collectionobj);
        getData.then(function (response) {
            $scope.SessionList = response.data;
        });
    };
    $scope.GetClasses = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.SessionId = sessionStorage.getItem("SessionId");
        var getData = myService.methode('POST', '/api/GetClass', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.ClassList = response.data;
        });
    };

    $scope.GetClassesN = function (defaultselection) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        if (defaultselection == 1) {
            collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
            collectionobj.SessionId = $scope.ddlSession;
        }
        else {
            collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
            collectionobj.SessionId = sessionStorage.getItem("SessionId");
        }
        var getData = myService.methode('POST', '/api/GetClass', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.CList = response.data;
        });
    };

    $scope.GetTab = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3)
        {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 5;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetTabMaster', collectionobj);
        getData.then(function (response) {
            $scope.Tabs = response.data;
            if (response.data.length > 0) {
                $scope.FacebookLink = response.data[0]['FacebookLink'];
                $scope.TwitterLink = response.data[0]['TwitterLink'];
                $scope.YoutubeLink = response.data[0]['YoutubeLink'];
                $scope.HomeVideoLink = response.data[0]['VideoLink'];
            }
        });
    };
    $scope.GetAboutUs = function ()
    {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 10;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        var getData = myService.methode('POST', "/Api/GetBodyContent", collectionobj);
        getData.then(function (response)
        {
            //debugger
            if (response.data.length > 0)
            {
                $scope.ImageContentPageData = response.data;
            }
            else {
                $scope.GetAboutUsById();
            }
        });
    };
    $scope.GetAccordian = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 6;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        var TID = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.TabId = TID;
        var MID = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.MenuId = MID;
        var SID = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        collectionobj.SubMenuId = SID;
        if (splitsids.length == 3) {
            $scope.AccordianID = TID;
        }
        else if (splitsids.length == 4) {
            $scope.AccordianID = MID;
        }
        else if (splitsids.length == 5) {
            $scope.AccordianID = SID;
        }
        var getData = myService.methode('POST', "/Api/GetAccordianContentLayout", collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.AccordianContentPageData = response.data;

                if (splitsids.length == 3) {
                    $scope.AccName = ($filter('filter')($scope.AccordianContentPageData, { TabCode: $scope.AccordianID }, true))[0].AccordianName;

                    $scope.AccordianDetailList = $filter('filter')($scope.AccordianContentPageData, { 'TabCode': $scope.AccordianID });                    
                }
                else if (splitsids.length == 4) {
                    $scope.AccName = ($filter('filter')($scope.AccordianContentPageData, { MenuCode: $scope.AccordianID }, true))[0].AccordianName;
                    
                    $scope.AccordianDetailList = $filter('filter')($scope.AccordianContentPageData, { 'MenuCode': $scope.AccordianID });
                }
                else if (splitsids.length == 5) {
                    $scope.AccName = ($filter('filter')($scope.AccordianContentPageData, { SubMenuCode: $scope.AccordianID }, true))[0].AccordianName;
                    $scope.AccordianDetailList = $filter('filter')($scope.AccordianContentPageData, { 'SubMenuCode': $scope.AccordianID });
                }                                                
            }
            else {
                
            }
        });
    };

    $scope.GetAdmissions = function ()
    {

        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 15;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);  
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        var getData = myService.methode('POST', "/Api/GetBodyContent", collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0)
            {
                $scope.AdmissionPageData = response.data;
            }          
        });
    };
    $scope.ContactUsPageData = [];
    $scope.GetContactUsContentMaster = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 3;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        var getData = myService.methode('POST', "/Api/GetContactUsContentMaster", collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0)
            {
                $scope.ContactUsPageData = response.data;
            }
        });
    };

    $scope.CenterContentWithSlider = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3)
        {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
            {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 14;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        var getData = myService.methode('POST', "/Api/GetBodyCenterContentWithSlider", collectionobj);
        getData.then(function (response)
        {
            
            $scope.ContentWithSlider = response.data["Table"];                
        });
    };
    $scope.RightSliderWithBottomSlider = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 16;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        var getData = myService.methode('POST', "/Api/GetBodyCenterContentWithSlider", collectionobj);
        getData.then(function (response)
        {
            $scope.BottomSliderWithRightSlider = response.data["Table"];
        });
    };

    $scope.BindAllImage = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.PGTransId = "10000001";
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetUploadedPhotoList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AllImage = response.data;
            }
        });
    }
    $scope.BindBanner = function ()
    {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 8;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.BannerImage = response.data;

        });
    }

    $scope.$on('ModernSlider', function () {
        $(".Modern-Slider").slick({
            autoplay: true,
            autoplaySpeed: 10000,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: false,
            dots: true,
            pauseOnDotsHover: true,
            cssEase: 'linear',
            // fade:true,
            draggable: false,
            prevArrow: '<a class="PrevArrow"></a>',
            nextArrow: '<a class="NextArrow"></a>',
        });
        $("#load1").addClass("hide-display");

    });

    $scope.BindHomePageOurProgramsSlider = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 22;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response)
        {
            
            if (response.data.length > 0)
            {
                $scope.SliderImages = response.data;
            }
        });
    }
    $scope.BindHomePageWinningLaurelsSlider = function () {
        
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 10;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0) {
                $scope.WinningLaurelsSliderImages = response.data;
            }
        });
    }
    $scope.$on('eventslider', function () {
        function bannerSwitcher() {
            next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
            if (next.length) next.prop('checked', true);
            else $('.sec-1-input').first().prop('checked', true);
        }

        var bannerTimer = setInterval(bannerSwitcher, 5000);

        $('nav .controls label').click(function () {
            clearInterval(bannerTimer);
            bannerTimer = setInterval(bannerSwitcher, 5000)
        });

        $("#load10").addClass("hide-display");

    });
    $scope.BindHomePageOurHappyParentsSlider = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 11;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.OurHappyParentsSliderImages = response.data;
            }
        });
    }
    $scope.BindHomeEventsSlider = function ()
    {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3)
        {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
            {
                collectionobj.Language = splitsids[0];
                var values = window.location.search.split('?');
                if (values.length > 1)
                    collectionobj.Code = values[1];
            }
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 12;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response)
        {
            if (response.data.length > 0)
            {
                $scope.EventsSliderImages = response.data;
            }
        });
    }
    $scope.BindAllNotice = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetDigitalNoticeBoard', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AllNotice = response.data;
            }
        });
    }
    $scope.$on('allNoticeFun', function () {
        $(".demo1").bootstrapNews({
            newsPerPage: 2,
            autoplay: true,
            pauseOnHover: true,
            direction: 'up',
            newsTickerInterval: 4000,
            onToDo: function () {
                //console.log(this);
            }
        });
        
        $("#load3").addClass("hide-display");

    });
    $scope.hideAboutUsDiv = function () {
        if (window.location.href.split('?').length > 1)
            return true;
        else return false;
    }
    $scope.GetAboutUsById = function () {
        var collectionobj = {};
        collectionobj.Action = 13;
        collectionobj.BodyContentId = window.location.href.split('?')[1];
        var getData = myService.methode('POST', "/Api/GetBodyContent", collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0)
                $scope.AboutUsHomeById = response.data[0].BodyContent;
        });
    };

    $scope.GetTab1 = function () {

        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }

        collectionobj.Action = 7;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetTabMaster', collectionobj);

        getData.then(function (response) {

            $scope.Tabs1 = response.data;
            if (response.data.length > 0) {
                $scope.FacebookLink = response.data[0]['FacebookLink'];
                $scope.TwitterLink = response.data[0]['TwitterLink'];
                $scope.YoutubeLink = response.data[0]['YoutubeLink'];
                $scope.HomeVideoLink = response.data[0]['VideoLink'];
            }
        });
    };
    $scope.init = function () {
        $scope.GetTab();
        $scope.GetTab1();
    }

    $scope.trustAsHtml = function (html) {

        return $sce.trustAsHtml(html);
    }
    $scope.GetMenu = function (Code, index) {
        //debugger
        var url = window.location.pathname;
        var splits = url.split('/');
        var collectionobj = {};
        if (splits.length > 3) {
            var laststring = splits[3];
            var splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }

        collectionobj.Action = 6;
        collectionobj.TabId = Code;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetMenuMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.Menus[index] = response.data;
        });
    };
    $scope.GetMenu1 = function (Code, index)
    {
        
        var url = window.location.pathname;
        var splits = url.split('/');
        var collectionobj = {};
        if (splits.length > 3) {
            var laststring = splits[3];
            var splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 6;
        collectionobj.TabId = Code;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetMenuMaster', collectionobj);
        getData.then(function (response) {
            
            $scope.Menuss[index] = response.data;
        });
    };

    $scope.GetSubMenu = function (MenuId, index)
    {
        var url = window.location.pathname;
        var splits = url.split('/');
        var collectionobj = {};
        if (splits.length > 3) {
            var laststring = splits[3];
            var splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 5;
        /*collectionobj.MenuId = JSON.stringify(MenuId);*/
        collectionobj.MenuId = MenuId;
        var getData = myService.methode('POST', '/Api/GetWebSubMenuMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.SubMenus[MenuId] = response.data;
            //$scope.$applyAsync();
        });
    };
    $scope.GetDetailBySubMenuId = function (Code)
    {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.Code = Code;
        var getData = myService.methode('POST', '/Api/GetWebSubMenuMaster', collectionobj);
        getData.then(function (response) {
            $scope.DetailBySubMenuId = response.data;
        });
    };

    $scope.GetEventUrl = function (Code)
    {
        var scurl = "";
        var url = window.location.pathname;
        var splits = url.split('/');
        if (splits.length > 3) {
            var laststring = splits[3];
            var values = laststring.split('_')

            scurl = '/Site/Layout6/' + laststring + '?' + Code;
        }
        return $sce.trustAsUrl(scurl);
    }

    $scope.BindHomePageKidsCornerSlider = function () {

        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 20;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.ImageKidsCornerSlider = response.data;
            }
        });
    }
    $scope.$on('KidsCornerSlider', function () {
        $("#news-slider6").owlCarousel({
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsMobile: [768, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });

        $("#load8").addClass("hide-display");

    });

    $scope.BindHomePageAchievementSlider = function () {

        var collectionobj = {};
        collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 19;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.AchievementSlider = response.data;
            }
        });
    }
    $scope.$on('achSlider', function () {
        $("#news-slider4").owlCarousel({
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsMobile: [768, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });

        $("#load7").addClass("hide-display");

    });
    $scope.BindHomePageTestimonialSlider = function () {
        var collectionobj = {};
        collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 21;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            
            if (response.data.length > 0) {
               
                $scope.TestimonialSlider = response.data;
            }
        });
    }

    $scope.$on('TestSlider', function () {
        var testim = document.getElementById("testim"),
            testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
            testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
            testimLeftArrow = document.getElementById("left-arrow"),
            testimRightArrow = document.getElementById("right-arrow"),
            testimSpeed = 4500,
            currentSlide = 0,
            currentActive = 0,
            testimTimer,
            touchStartPos,
            touchEndPos,
            touchPosDiff,
            ignoreTouch = 30;
        ;
        // Testim Script
        function playSlide(slide) {
            for (var k = 0; k < testimDots.length; k++) {
                testimContent[k].classList.remove("active");
                testimContent[k].classList.remove("inactive");
                testimDots[k].classList.remove("active");
            }

            if (slide < 0) {
                slide = currentSlide = testimContent.length - 1;
            }

            if (slide > testimContent.length - 1) {
                slide = currentSlide = 0;
            }

            if (currentActive != currentSlide) {
                testimContent[currentActive].classList.add("inactive");
            }
            testimContent[slide].classList.add("active");
            testimDots[slide].classList.add("active");

            currentActive = currentSlide;

            clearTimeout(testimTimer);
            testimTimer = setTimeout(function () {
                playSlide(currentSlide += 1);
            }, testimSpeed)
        }

        

        testimLeftArrow.addEventListener("click", function () {
            playSlide(currentSlide -= 1);
        })

        testimRightArrow.addEventListener("click", function () {
            playSlide(currentSlide += 1);
        })

        for (var l = 0; l < testimDots.length; l++) {
            testimDots[l].addEventListener("click", function () {
                playSlide(currentSlide = testimDots.indexOf(this));
            })
        }

        playSlide(currentSlide);

        // keyboard shortcuts
        document.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 37:
                    testimLeftArrow.click();
                    break;

                case 39:
                    testimRightArrow.click();
                    break;

                case 39:
                    testimRightArrow.click();
                    break;

                default:
                    break;
            }
        })

        testim.addEventListener("touchstart", function (e) {
            touchStartPos = e.changedTouches[0].clientX;
        })

        testim.addEventListener("touchend", function (e) {
            touchEndPos = e.changedTouches[0].clientX;

            touchPosDiff = touchStartPos - touchEndPos;

            console.log(touchPosDiff);
            console.log(touchStartPos);
            console.log(touchEndPos);


            if (touchPosDiff > 0 + ignoreTouch) {
                testimLeftArrow.click();
            } else if (touchPosDiff < 0 - ignoreTouch) {
                testimRightArrow.click();
            } else {
                return;
            }

        })
        //alert('Chal Gya');
        $("#load12").addClass("hide-display");

    });

    $scope.GetImageGallery = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '12';
        //collectionobj.Action = 14;
        //collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.IsApprovedBY = $scope.IsApprovedBY;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetImageGallery', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.ImageGalleryData = response.data;
            }
        });
    };

    $scope.GetVideoGallery = function () {
        var collectionobj = {};
        collectionobj.Action = 14;
        //collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.IsApprovedBY = $scope.IsApprovedBY;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetImageGallery', collectionobj);
        getData.then(function (response) {
            
            if (response.data.length > 0) {
                $scope.VideoGalleryData = response.data;
            }
        });
    };

    //$scope.GetOurGroupOfSchool = function () {
    //    var collectionobj = {};
    //    collectionobj.Action = 14;
    //    collectionobj.isActive = '1';
    //    var url = window.location.pathname;
    //    var splits = url.split('/');
    //    var splitsids = [];
    //    if (splits.length > 3) {
    //        splitsids = splits[3].split('_');
    //        if (splitsids.length > 0)
    //            collectionobj.Language = splitsids[0];
    //    }
    //    collectionobj.IsApprovedBY = $scope.IsApprovedBY;
    //    collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
    //    collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
    //    collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
    //    collectionobj.BannerType = 'Slider';
    //    collectionobj.PageBannerCategoryCode = $scope.PageBannerCategoryCode;
    //    var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
    //    getData.then(function (response) {
    //        if (response.data.length > 0) {
    //            $scope.OurGroupOfSchool = response.data;



    //        }

    //    });
    //}
   
    $scope.GetVideoList = function () {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetUploadedVideoList', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.AllVideo = response.data;
                $scope.youtubeUrl = $sce.trustAsResourceUrl($scope.AllVideo[0].VideoUrl);
                $("#load5").addClass("hide-display");
            }
        });
    }
    $scope.GetUrl = function ()
    {
        //debugger
        var scurl = $(location).attr('host');
        var collectionobj = {};
        collectionobj.BranchUrl = scurl;
        var getDetails = myService.methode('POST', '/api/ConnectionConnector', collectionobj);
        getDetails.then(function (response) {
            //debugger
            $scope.SetDetailData(response.data);
        });
    };

    $scope.ChangeVideoUrl2 = function (url) {
        $scope.youtubeUrl = $sce.trustAsResourceUrl(url);
    }

    $scope.GetOurGroupOfSchool = function () {
        var collectionobj = {};
        collectionobj.Action = 18;
        collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.IsApprovedBY = $scope.IsApprovedBY;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.BannerType = 'Slider';
        collectionobj.PageBannerCategoryCode = $scope.PageBannerCategoryCode;
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.OurGroupOfSchool = response.data;
            }
        });
    }
    $scope.$on('GroupSlider', function () {
        $("#news-slider3").owlCarousel({
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [980, 2],
            itemsMobile: [600, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });

        $("#load6").addClass("hide-display");

    });

    $scope.GetMediaGallery = function (MenuId)
    {
        var collectionobj = {};        
        //collectionobj.Action = 14;
        collectionobj.isActive = '1';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
                if (splitsids.length > 4) {
                    collectionobj.Action = '10';
                    collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
                    collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
                    collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 0 ? splitsids[2] : undefined) : MenuId);
                    collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 0 ? splitsids[3] : undefined) : SubMenuId);
                }
                else {
                    collectionobj.Action = '5';
                    collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
                    collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
                    collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 0 ? splitsids[2] : undefined) : MenuId);
                }
            }
        }
        collectionobj.IsApprovedBY = $scope.IsApprovedBY;        
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.BannerType = 'Slider';
        collectionobj.PageBannerCategoryCode = $scope.PageBannerCategoryCode;
        var getData = myService.methode('POST', '/Api/GetMediaGallery', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.MediaGalleryData = response.data;
            }
        });
    }
    $scope.clearFilter = function () {
        $scope.searchText = {};
    }
    $scope.GetDocsAndInfo = function () {
      
        var collectionobj = {};
        collectionobj.Action = '5';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 0 ? splitsids[2] : undefined) : MenuId);
        var getData = myService.methode('POST', '/Api/GetDocsData', collectionobj);
        getData.then(function (response) {
        
            if (response.data.length > 0) {
                
                $scope.DocsAndInfoData = response.data;
            }
        });

    }

    $scope.YoutubeFeedUrl = function (url) {
        
        $scope.YoutubeFeedLink = $sce.trustAsResourceUrl(url);
    }

    $scope.FacebookFeedUrl = function (url) {
        $scope.FacebookFeedLink = $sce.trustAsResourceUrl(url);
    }

    $scope.ChangeLinkedInUrl = function (url) {
        $scope.LinkedInLink = $sce.trustAsResourceUrl(url);
    }
    $scope.ChangeFacebookUrl = function (url) {
        $scope.FacebookLink = $sce.trustAsResourceUrl(url);
    }
    $scope.AlbumIcon1 = [];
    $scope.showPdf = function (input) {
        $scope.AlbumIcon1 = [];
        $scope.getPdfFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                if (input.files[i].size < 5242880) {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon1 = (e.target.result).replace(/^data:image\/[a-z]+;base64,/, "");
                    }
                    filerdr.readAsDataURL(input.files[i]);
                }

            };
        }
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.readAsDataURL(input.files[0]);
            filerdr.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var sizes = {
                        width: this.width,
                        height: this.height
                    };
                    if (input.files[0].size >= 2097152) {
                        alert("File is more than 2 mb");
                        $('#file').val() = "";
                        $scope.AlbumIcon1 = "";
                        return;
                    }
                    else if (sizes.width > 640 || sizes.height > 480) {
                        alert("File width is more than 640 px Or height is more than 480 px");
                        $('#file').val("");
                        $scope.AlbumIcon1 = "";
                        return;
                    }
                }
            }
        };
    };

    $scope.getPdfFiledetails = function () {
        var x = document.getElementById("fileInput");
        var txt = "";
        var files = $('#fileInput')[0].files;
        var len = $('#fileInput').get(0).files.length;

        for (var i = 0; i < len; i++) {

            f = files[i];
            var ext = f.name.split('.').pop().toLowerCase();

            if ($.inArray(ext, ['pdf']) == -1) {
                alert("Oops! Please Select Pdf Files Only");
                return;
            }
        }

        if ('files' in x) {
            if (x.files.length == 0) {
                alert("Please Select A Pdf File.");
            }
            else {
                var totalSize = 0;
                var MaxSize = 2097152;
                for (var i = 0; i < x.files.length; i++) {
                    var file = x.files[i];
                    if ('name' in file) {
                        totalSize += file.size
                    }
                    //-------------5 mb 
                }
                if (totalSize >= MaxSize) {
                    alert("Oops! Max Size of File is:2 MB");
                    $('#dvdata').attr('Style', 'DISPLAY:NONE');
                    $('#fileInput').val('');
                    return;
                }
                $('#dvdata').attr('Style', 'DISPLAY:block');
                var MaxSizePdf = 0;
                var a = 0;
                txt = "<table id='thetable' class='table compact table-hover table-striped table-bordered'><thead><tr><th>Sr.No.</th><th>Image Name</th><th>Image Size</th><th>Status</th></tr></thead><tbody>"
                for (var i = 0; i < x.files.length; i++) {

                    var a = a + 1;
                    txt += "<tr class='tab-tr" + a + "'>";
                    var file = x.files[i];

                    if ('name' in file) {
                        MaxSizePdf += file.size
                        var pdfinmb = (file.size / (1024 * 1024)).toFixed(2)
                        var color = pdfinmb > 1 ? '#f78989' : '#95e695';
                        var stat = pdfinmb > 1 ? 'Not Approved' : 'Approved';
                        var s = i + 1;
                        txt += "<td class='tab-td1' name='record' style='background-color:" + color + "'>" + (i + 1) + ". </td><td class='tab-td2' style='background-color:" + color + "'>" + file.name + "</td> <td class='tab-td3' style='background-color:" + color + "'> " + pdfinmb + " mb</td><td style='background-color:" + color + "'>" + stat + "</td> </tr>";
                        if (MaxSizePdf > 2097152) {
                            alert("Oops! Max Size of Photo:2 MB");
                        }
                    }
                }
                txt += "</tbody></table>"
            }
        }
        else {
            if (x.value == "") {
                alert("Please Select a Pdf File.");
            }
            else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property.
            }
        }
    }
    $scope.SaveRecord = function () {
        var collectionobj = {};
        collectionobj.Name = $scope.Name;
        collectionobj.Email = $scope.Email;
        //collectionobj.Subject = "Enquiry";
        //collectionobj.Message = "Testing";
        collectionobj.Class = $scope.ClassCode;
        collectionobj.Contact = $scope.Contact;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.SessionId = ($filter('filter')($scope.SessionList, { IsActive: true }, true))[0].SessionId;
        collectionobj.AcademicSessionId = $scope.ddlSession;
        collectionobj.CountryCode = $scope.CountryCode;
        collectionobj.StateCode = $scope.StateCode;
        collectionobj.CityCode = $scope.CityCode;
        collectionobj.Remark = $scope.Remark
        if ($scope.Save == "Save") {
            if (($scope.Name != "") && ($scope.Email != "")) {
                var getData = myService.methode('POST', '/Api/InsertContactUs', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.Name = "";
                        $scope.Email = "";
                        $scope.Subject = "";
                        $scope.Message = "";
                        $scope.ClassCode = "";
                        $scope.Contact = "";
                        $scope.ddlSession = "";
                        $scope.Remark = "";
                        showMsgBox("999", "Enquiry Submitted Successfully", "Thanks for contacting us. We will get back to you shortly!!!", 'success', "btn-success");
                        //alert("Thanks for contacting us. We will get back to you shortly!!!");
                    }
                });
            }
            else {
                alert("Please fill Name or Email.");
            }
        }
    };
    $scope.SendEmail = function () {
        var collectionobj = {};
        collectionobj.Name = $scope.ConName;
        collectionobj.Email = $scope.ConEmail;
        collectionobj.Subject = $scope.ConSubject;
        collectionobj.Message = $scope.Discription;
        collectionobj.Class = $scope.Class;
        collectionobj.Contact = $scope.ConContact;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.SessionId = $scope.ddlSession;
        if ($scope.Save == "Save") {
            if (($scope.Name != "") && ($scope.Email != "")) {
                var getData = myService.methode('POST', '/Api/SendEmail', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.Name = "";
                        $scope.Email = "";
                        $scope.Subject = "";
                        $scope.Message = "";
                        $scope.Class = "";
                        $scope.Contact = "";
                        alert("We will get back to you soon.Thanks for contact us.");
                    }
                });
            }
            else {
                alert("Please fill Name or Email.");
            }
        }
    };
    $scope.SaveCareerEnquiry = function (Name, Contact, Email, Skills, MediafileUrl, Save) {
        //debugger
        var collectionobj = {};
        collectionobj.Name = this.Name;
        collectionobj.Email = this.Email;
        collectionobj.Contact = this.Contact;
        collectionobj.Skills = this.Skills;
        collectionobj.MediafileUrl = this.AlbumIcon1;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.DisplayCode = sessionStorage.getItem("DisplayCode");

        if (this.Save == 'Save') {
            if ((this.Name != "") && (this.Email != "") && (this.Contact != "") && (this.Skills != "")) {
                var getData = myService.methode('POST', '/Api/InsertCareer', collectionobj);
                getData.then(function (response) {
                    //debugger
                    var value = typeof (response.data);
                    if (response.data > 0) {                        
                        document.getElementById("Name").value = "";
                        document.getElementById("Email").value = "";
                        document.getElementById("Contact").value = "";
                        document.getElementById("Skills").value = "";
                        document.getElementById("fileInput").value = "";
                        alert("We will get back to you soon.Thanks for contact us.");
                    }
                    else {
                        alert(response.data);
                    }
                });
            }
            else {

                alert("Please fill Name or Email or Contact No..");
            }
        }
    };
    $scope.GetErpLogin = function () {

        var collectionobj = {};
        collectionobj.BranchUrl = $(location).attr("host");
        collectionobj.Action = '7';
        var getDetails = myService.methode('POST', '/api/GetErpLogin', collectionobj);
        getDetails.then(function (response) {

            $scope.SetErpLoginUrl = response.data;
        });
    };

    $scope.GetTopHeaderDataLeft = function () {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 8;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetTopHeaderData', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.TopHeaderDataLeft = response.data;
            }
        });

    }
    $scope.GetTopHeaderDataRight = function () {

        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 9;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetTopHeaderData', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.TopHeaderDataRight = response.data;
            }
        });

    }
    $scope.GetLogoImage = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 9;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetLogoImage', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.LogoImagePath = response.data;
            }
        });
    }
    $scope.GetLeftSidebarLink = function () {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 8;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetSidebarLinkData', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.GetLeftLink = response.data;
            }
        });

    }
    $scope.GetRightSidebarLink = function () {
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        //collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.Action = 9;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetSidebarLinkData', collectionobj);
        getData.then(function (response) {

            if (response.data.length > 0) {
                $scope.GetRightLink = response.data;
            }
        });

    }
    $scope.GetCountry = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '/Api/GetCountry', collectionobj);
        getData.then(function (response) {
            $scope.Countrylist = response.data
            $scope.DefaultCountry = $filter('filter')($scope.Countrylist, { CountryName: 'India' }, true);
            if ($scope.DefaultCountry.length > 0) {
                $scope.CountryCode = $scope.DefaultCountry[0].Code;
                $scope.GetState($scope.CountryCode);
            }
        });
    };

    $scope.GetState = function (countrycode, objName) {
        // function (countrycode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        // collectionobj.CountryCode = countrycode;   
        collectionobj.CountryCode = countrycode;
        var getData = myService.methode('POST', '/Api/GetState', collectionobj);
        getData.then(function (response) {
            if (objName == null || objName == undefined) {
                $scope.Statelist = response.data
                $scope.DefaultState = $filter('filter')($scope.Statelist, { StateName: 'Uttar Pradesh' }, true);

                if ($scope.DefaultState.length > 0) {
                    $scope.StateCode = $scope.DefaultState[0].Code;
                    $scope.GetCity($scope.StateCode)
                }
            }
            else {
                $scope[objName] = response.data
            }
        });
    };

    $scope.GetCity = function (statecode, objName) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StateCode = statecode;
        var getData = myService.methode('POST', '/Api/GetCity', collectionobj);
        getData.then(function (response) {
            if (objName == null || objName == undefined) {
                $scope.Citylist = response.data;
            }
            else {
                $scope[objName] = response.data
            }

            //$scope.DefaultCity = $filter('filter')($scope.Citylist, { CityName: 'Kanpur' }, true);
            //if ($scope.DefaultCity.length > 0) {
            //    $scope.CityCode = $scope.DefaultCity[0].Code;

            //    $scope.GetCityArea($scope.CityCode)
            //}    
        });
    };

    $scope.GetImageData = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '11';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];

        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.PGTransId = (typeof (Code) === 'undefined' ? (splitsids.length > 0 ? splitsids[splitsids.length-1] : undefined) : Code);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetImageData', collectionobj);
        getData.then(function (response) {

            if (response.data.Table.length > 0) {
                $scope.ImageContent = response.data.Table;
            }
            if (response.data.Table.length > 0) {
                $scope.ImageData = response.data.Table1;

            }
        });

    }
    $scope.$on('galleryLoadFun', function () {

        $("#lightgallery").lightGallery({
            pager: true
        });
    });

    $scope.GetEventUrl = function (Code, Count) {
        var scurl = "";
        var url = window.location.pathname;
        var splits = url.split('/');
        if (splits.length > 3) {
            var laststring = splits[3];
            var values = laststring.split('_')

            if (Count.length != 0) {
                scurl = '/Site/PhotoCollectionPage/' + laststring + '_' + Code;
            }
            else {
                alert('No Images');
            }
        }
        return $sce.trustAsUrl(scurl);
    }

    $scope.SendVideoUrl = function (Code) {
        
        var scurl = '';
        var url = window.location.pathname;
        var splits = url.split('/');
        if (splits.length > 3) {
            var laststring = splits[3];
            var values = laststring.split('_')
            scurl = '/Site/VideoPage/' + laststring +'_'+ Code;
        }
        return $sce.trustAsUrl(scurl);
    }

    $scope.GetVideoData = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '11';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];

        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            var Length = splitsids.length;
            if (Length > 0)
                collectionobj.Code = splitsids[Length-1];
        }
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[0] : undefined) : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : TabId);
        collectionobj.PGTransId = (typeof (Code) === 'undefined' ? (splitsids.length > 0 ? splitsids[Length - 1] : undefined) : Code);
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetUploadedVideoList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.VideoContent = response.data;
                var url = $scope.VideoContent[0].VideoUrl;
                $scope.YoutubePageUrl = $sce.trustAsResourceUrl(url);
            }
        });

    }
    $scope.GetBannerDetail = function () {
       
        var collectionobj = {};
        collectionobj.Action = '26';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];

        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.BannerTitle = splitsids[splitsids.length - 1].split('-')[1];
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.BannerDetailList = response.data;
            }
        });
    }

    $scope.GetBannerData = function () {
       //debugger
        var collectionobj = {};
        collectionobj.Action = '27';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Code = splitsids[splitsids.length - 2];
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetBanner', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.BannerDataList = response.data;
            }
        });

    }

    $scope.TitleReadMore = function (str) {
        //debugger
        var str1 = str.Title
        var max = 8;
        if ($.trim(str1).length > max) {
            var newstr = str1.substring(0, max);
            str.TitStr = newstr.concat(" ", "....");
        }
    }

    $scope.VenueReadMore = function (str) {
       // debugger
        var str1 = str.Venue
        var max = 8;
        if ($.trim(str1).length > max) {
            var newstr = str1.substring(0, max);
            str.VenStr = newstr.concat(" ", "...");
        }
    }

    $scope.DiscriReadMore = function (str) {
        //debugger
        var str1 = str.Discription2
        var max = 20;
        if ($.trim(str1).length > max) {
            var newstr = str1.substring(0, max);
            str.DescStr = newstr.concat(" ", "......");
        }
    }

    $scope.AdjustLength = function (str,maxLength) {
        var str1 = str;
        var max = maxLength;
        if ($.trim(str1).length > max) {
            var newstr = str1.substring(0, max);
            return newstr.concat(" ", "......");
        }
        else {
            return str1;
        }
    }

    $scope.GetAchievementUrl = function (Code, BannerAltText) {
        var acurl = "";

        var url = window.location.pathname;
        var splits = url.split('/');
        if (splits.length > 3) {
            var laststring = splits[3];
            var values = laststring.split('_')
            acurl = '/Site/LayoutBanner/' + laststring + '_' + Code + '_' + BannerAltText;
        }
        return $sce.trustAsUrl(acurl);
    }

    $scope.BacktoBannerLayoutPage = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 4)
                $scope.BackUrl = '/Site/BannerDetailLayout/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3] + '_' + splitsids[4];
            if (splitsids.length == 4)
                $scope.BackUrl = '/Site/BannerDetailLayout/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3];
        }        
    }

    $scope.BacktoVideoGallery = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 4)
                $scope.BackUrl = '/Site/VideoGallery/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3] + '_' + splitsids[4];
            if (splitsids.length == 4)
                $scope.BackUrl = '/Site/VideoGallery/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3];
        }
    }

    $scope.BacktoPhotoGallery = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 4)
                $scope.BackUrl = '/Site/PhotoGallary/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3] + '_' + splitsids[4];
            if (splitsids.length == 4)
                $scope.BackUrl = '/Site/PhotoGallary/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3];
        }
    }

    $scope.GetMediaNewsDetail = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '13';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];

        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Title = splitsids[splitsids.length - 1].split('-')[1];
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetMediaGallery', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.MediaDetailList = response.data;
            }
        });
    }

    $scope.GetMediaNewsData = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = '14';
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Code = splitsids[splitsids.length - 2];
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        var getData = myService.methode('POST', '/Api/GetMediaGallery', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.MediaDataList = response.data;
            }
        });

    }

    $scope.GetMediaNewsUrl = function (Code, BannerAltText) {
        
        var acurl = "";

        var url = window.location.pathname;
        var splits = url.split('/');
        if (splits.length > 3) {
            var laststring = splits[3];
            var values = laststring.split('_')
            acurl = '/Site/ViewBook/' + laststring + '_' + Code + '_' + BannerAltText;
        }
        return $sce.trustAsUrl(acurl);
    }

    $scope.BacktoMediaNewsDetailPage = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 4)
                $scope.BackUrl = '/Site/MediaLayout/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3] + '_' + splitsids[4];
            if (splitsids.length == 4)
                $scope.BackUrl = '/Site/MediaLayout/' + splitsids[0] + '_' + splitsids[1] + '_' + splitsids[2] + '_' + splitsids[3];
        }
    }

    $scope.PhotoSlider = function () {
        //debugger
        $scope.PhotoSliderList = [{
            Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//art.jpg",
            width:"2292px",height:"696px"
        },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga2.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga3.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga4.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga5.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga6.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga7.jpg",
                width: "237px", height: "133px"
            },
            {
                Pic: "http://localhost:2962//Uploads//Site//DPSAA1//smart_class//big//yoga8.jpg",
                width: "237px", height: "133px"
            },
        ]
    }

    $scope.GetAboutUsNew = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 5;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        var getData = myService.methode('POST', "/Api/GetBodyContentNew", collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.ImageContentPageDataNew = response.data;
            }
            else {
                $scope.GetAboutUsById();
            }
        });
    };

    $scope.GetAboutUsPageLink = function () {
        //debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0) {
                collectionobj.Language = splitsids[0];
            }
        }
        collectionobj.Action = 6;
        collectionobj.RelationshipId = sessionStorage.getItem("RelationshipId");
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[0] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[1]) ? null : splitsids[1]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : SubMenuId);
        var getData = myService.methode('POST', "/Api/GetBodyContentNew", collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.PageLinkDataList = response.data;
            }
            else {
                $scope.GetAboutUsById();
            }
        });
    };

    $scope.GetPageLinkList = function (SerialString, PlinkString, LNameString, SeqNo) {
        //debugger
        if (PlinkString != null) {
            var Serial = SerialString.split(',');
            var Plink = PlinkString.split(',');
            var LName = LNameString.split(',');
            if (Serial != null && Plink != null && LName != null) {
                $scope.PageLinkList(Serial, Plink, LName, SeqNo);
                var vvvvv = $scope.PLSettingList;
            }
        }
    }    

    $scope.PLSettingList = [];
    $scope.PageLinkList = function (Serial, Plink, LName, SeqNo) {
        $.each(Serial, function (i, val) {
            $.each(Plink, function (j, x) {
                if (i == j) {
                    $.each(LName, function (k, y) {
                        if (j == k) {
                            $scope.PLSettingList.push({
                                Srno: val,
                                PageLink: x,
                                LinkName: y,
                                SPNo: SeqNo
                            })
                        }

                    });
                }

            });
        })
    }
    $scope.ImageUrlLinkList = [];
    $scope.GetImageList = function (InitialPathString, ImgPathString, Banner, Slider,SeqNo) {
        //debugger
        if (ImgPathString != null) {
            var IsBanner = Banner;
            var IsSlider = Slider;
            var ImgPathList = ImgPathString.split(',');
            var InitialPath = InitialPathString;
            $scope.ImageUrlLink(InitialPath, ImgPathList, IsBanner, IsSlider, SeqNo);
            var uuu = $scope.ImageUrlLinkList;
        }
    }        
    $scope.ImageUrlLink = function (InitialPath, ImgPathList, Banner, Slider, SeqNo) {
        $.each(ImgPathList, function (i, val) {
            $scope.ImageUrlLinkList.push({
                ImgPath: InitialPath + val,
                IsBanner: Banner,
                IsSlider: Slider,
                SNo: SeqNo
            })
        })
    }
};