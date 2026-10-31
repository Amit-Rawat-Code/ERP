app.ThemeMasterController = function ($scope,  $filter,$element, myService)
{
    $scope.ColorPicker = function ()
    {
        
        $('#cp-component').colorpicker();
    }
    $scope.SaveRecord = function ()
    {
        debugger
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.TopHeaderFirstLineColour = $scope.TopHeaderFirstLineColour;
            collectionobj.TopHeaderFirstLineTextColour = $scope.TopHeaderFirstLineTextColour;
            collectionobj.TopHeaderFirstLineIconColour = $scope.TopHeaderFirstLineIconColour;
            collectionobj.TopHeaderSecondLineColour = $scope.TopHeaderSecondLineColour;
            collectionobj.TopHeaderSecondLineTextColour = $scope.TopHeaderSecondLineTextColour;
            collectionobj.TopHeaderSecondLineIconColour = $scope.TopHeaderSecondLineIconColour;
            collectionobj.BannerBottomLineTextColour =    $scope.BannerBottomLineTextColour;
            collectionobj.WhyChooseHeadingTextColour = $scope.WhyChooseHeadingTextColour;
            collectionobj.OurProgramsHeadingTextColour = $scope.OurProgramsHeadingTextColour;
            collectionobj.OurProgramsSliderHeadingTextColour = $scope.OurProgramsSliderHeadingTextColour;
            collectionobj.ClassesHeadingTextColour = $scope.ClassesHeadingTextColour;
            collectionobj.ClassesImageHeadingTextColour = $scope.ClassesImageHeadingTextColour;
            collectionobj.EventsHeadingTextColour = $scope.EventsHeadingTextColour;
            collectionobj.EventsSliderHeadingTextColour = $scope.EventsSliderHeadingTextColour;
            collectionobj.WinningLaurelsHeadingTextColour = $scope.WinningLaurelsHeadingTextColour;
            collectionobj.BulletinHeadingTextColour = $scope.BulletinHeadingTextColour;
            collectionobj.OurHappyParentsHeadingTextColour = $scope.OurHappyParentsHeadingTextColour;
            collectionobj.OurGroupInstitutionsHeadingTextColour = $scope.OurGroupInstitutionsHeadingTextColour;
            collectionobj.FacebookfeedssHeadingTextColour = $scope.FacebookfeedssHeadingTextColour;
            collectionobj.YouTubeHeadingTextColour = $scope.YouTubeHeadingTextColour;
            collectionobj.ContactUsHeadingTextColour = $scope.ContactUsHeadingTextColour;
            collectionobj.VisitorCount = $scope.VisitorCount;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.CreatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/ThemeMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }
    /*Search Button Click Event*/
    $scope.ThemeMasterList = [];
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetTheme', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [

                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Top Header First Line Colour", "HeaderValue": "TopHeaderFirstLineColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Top Header First Line Text Colour", "HeaderValue": "TopHeaderFirstLineTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Top Header First Line Icon Colour", "HeaderValue": "TopHeaderFirstLineIconColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Top Header Second Line Colour", "HeaderValue": "TopHeaderSecondLineColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Top Header Second Line Text Colour", "HeaderValue": "TopHeaderSecondLineTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Top Header Second Line Icon Colour", "HeaderValue": "TopHeaderSecondLineIconColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "BannerBottomLineTextColour", "HeaderValue": "BannerBottomLineTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Why Choose Heading Text Colour", "HeaderValue": "WhyChooseHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Our Programs Heading Text Colour", "HeaderValue": "OurProgramsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Our Programs Slider Heading Text Colour", "HeaderValue": "OurProgramsSliderHeadingTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes Heading Text Colour", "HeaderValue": "ClassesHeadingTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes ImageHeading Text Colour", "HeaderValue": "ClassesImageHeadingTextColour", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "EventsHeadingTextColour", "HeaderValue": "EventsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Events Slider Heading Text Colour", "HeaderValue": "EventsSliderHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Winning Laurels Heading Text Colour", "HeaderValue": "WinningLaurelsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Bulletin Heading Text Colour", "HeaderValue": "BulletinHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Our Happy Parents Heading Text Colour", "HeaderValue": "OurHappyParentsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Our Group Institutions Heading Text Colour", "HeaderValue": "OurGroupInstitutionsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Facebook Feeds Heading Text Colour", "HeaderValue": "FacebookfeedssHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "YouTube Heading Text Colour", "HeaderValue": "YouTubeHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Contact Us Heading Text Colour", "HeaderValue": "ContactUsHeadingTextColour", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                   
                ];

            $scope.ThemeMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                //debugger
                var row = $('#example').DataTable().row(this).data();               
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.ThemeMasterList = $filter('filter')($scope.ThemeMasterList, { 'Code': $scope.Code });              
                
                $scope.TopHeaderFirstLineColour = $scope.ThemeMasterList[0].TopHeaderFirstLineColour;
                $scope.TopHeaderFirstLineTextColour = $scope.ThemeMasterList[0].TopHeaderFirstLineTextColour;
                $scope.TopHeaderFirstLineIconColour = $scope.ThemeMasterList[0].TopHeaderFirstLineIconColour;
                $scope.TopHeaderSecondLineColour = $scope.ThemeMasterList[0].TopHeaderSecondLineColour;
                $scope.TopHeaderSecondLineTextColour = $scope.ThemeMasterList[0].TopHeaderSecondLineTextColour;
                $scope.TopHeaderSecondLineIconColour = $scope.ThemeMasterList[0].TopHeaderSecondLineIconColour;
                $scope.BannerBottomLineTextColour = $scope.ThemeMasterList[0].BannerBottomLineTextColour;
                $scope.WhyChooseHeadingTextColour = $scope.ThemeMasterList[0].WhyChooseHeadingTextColour;
                $scope.OurProgramsHeadingTextColour = $scope.ThemeMasterList[0].OurProgramsHeadingTextColour;
                $scope.OurProgramsSliderHeadingTextColour = $scope.ThemeMasterList[0].OurProgramsSliderHeadingTextColour;
                $scope.ClassesHeadingTextColour = $scope.ThemeMasterList[0].ClassesHeadingTextColour;
                $scope.ClassesImageHeadingTextColour = $scope.ThemeMasterList[0].ClassesImageHeadingTextColour;
                $scope.EventsHeadingTextColour = $scope.ThemeMasterList[0].EventsHeadingTextColour;
                $scope.EventsSliderHeadingTextColour = $scope.ThemeMasterList[0].EventsSliderHeadingTextColour;
                $scope.WinningLaurelsHeadingTextColour = $scope.ThemeMasterList[0].WinningLaurelsHeadingTextColour;
                $scope.BulletinHeadingTextColour = $scope.ThemeMasterList[0].BulletinHeadingTextColour;
                $scope.OurHappyParentsHeadingTextColour = $scope.ThemeMasterList[0].OurHappyParentsHeadingTextColour;
                $scope.OurGroupInstitutionsHeadingTextColour = $scope.ThemeMasterList[0].OurGroupInstitutionsHeadingTextColour;
                $scope.FacebookfeedssHeadingTextColour = $scope.ThemeMasterList[0].FacebookfeedssHeadingTextColour;
                $scope.YouTubeHeadingTextColour = $scope.ThemeMasterList[0].YouTubeHeadingTextColour;
                $scope.ContactUsHeadingTextColour = $scope.ThemeMasterList[0].ContactUsHeadingTextColour;              
                $scope.VisitorCount = $scope.ThemeMasterList[0].VisitorCount;              
                $scope.IsActive = ($scope.ThemeMasterList[0].IsActive == "Yes" ? "true" : "0");                
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();                
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
            });
        });
    };
    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.TopHeaderFirstLineColour = "";
        $scope.TopHeaderFirstLineTextColour = "";
        $scope.TopHeaderFirstLineIconColour = "";
        $scope.TopHeaderSecondLineColour = "";
        $scope.TopHeaderSecondLineTextColour = "";
        $scope.TopHeaderSecondLineIconColour = "";
        $scope.BannerBottomLineTextColour = "";
        $scope.WhyChooseHeadingTextColour = "";
        $scope.OurProgramsHeadingTextColour = "";
        $scope.OurProgramsSliderHeadingTextColour = "";
        $scope.ClassesHeadingTextColour = "";
        $scope.ClassesImageHeadingTextColour = "";
        $scope.EventsHeadingTextColour = "";
        $scope.EventsSliderHeadingTextColour = "";
        $scope.WinningLaurelsHeadingTextColour = "";
        $scope.BulletinHeadingTextColour = "";
        $scope.OurHappyParentsHeadingTextColour = "";
        $scope.OurGroupInstitutionsHeadingTextColour = "";
        $scope.FacebookfeedssHeadingTextColour = "";
        $scope.YouTubeHeadingTextColour = "";
        $scope.ContactUsHeadingTextColour = "";
        $scope.VisitorCount = "";
        $scope.ThemeMasterList = []; 
        
        if (flag == 0)
        {
            showMsgBox('4');
        };

        $scope.$applyAsync();
    }
    $scope.DeleteRecord = function ()
    {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.UpdatedBy = userid;
            collectionobj.RelationshipId = relationshipId;           
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/ThemeMaster", collectionobj);
            getData.then(function (response)
            {
                debugger
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        });
    };
}