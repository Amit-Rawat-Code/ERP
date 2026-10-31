app.ContactUsContentMasterController = function ($scope, $element, $filter, myService)
{

    $scope.disableDelete = true;
    $scope.disablePrint = true;
    var userid = sessionStorage.getItem("userid");
    $scope.hfUnitId = (sessionStorage.getItem("MenuDetailUnitId"));
    $scope.hfLayoutId = (sessionStorage.getItem("MenuDetailLayoutId"));
    $scope.hfLayoutPartId = (sessionStorage.getItem("MenuDetailLayoutPartId"));
    $scope.hfTabId = (sessionStorage.getItem("MenuDetailTabId"));
    $scope.hfMenuId = (sessionStorage.getItem("MenuDetailMenuId"));
    $scope.hfSubMenuId = (sessionStorage.getItem("MenuDetailSubMenuId"));
    /*Save-Edit Button Click Event*/



    $scope.SaveRecord = function ()
    {
        debugger
        if ($scope.hfTabId == 'undefined')
            $scope.hfTabId = null;
        if ($scope.hfMenuId == 'undefined')
            $scope.hfMenuId = null;
        if ($scope.hfSubMenuId == 'undefined')
            $scope.hfSubMenuId = null;

        var collectionobj = {};
        collectionobj.Code = $scope.Code;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.LayoutCode = $scope.hfLayoutId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.MenuId = $scope.hfMenuId;
        collectionobj.SubMenuId = $scope.hfSubMenuId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.IsApproved = 1;        
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.BodyContentMobileNoText = $scope.MobileNoText;
        collectionobj.BodyContentEmailText = $scope.EmailText;
        collectionobj.BodyContentTimingText = $scope.TimingText;
        collectionobj.BodyContentAddressText = $scope.AddressText;

        collectionobj.SkypeAddress = $scope.SkypeAddress;
        collectionobj.FacebookLink = $scope.FacebookLink;
        collectionobj.InstaLink = $scope.InstagramLink;
        collectionobj.LinkedInLink = $scope.LinkedInLink;
        collectionobj.YoutubeLink = $scope.YoutubeLink;
    
        if ($scope.Save == "Save")
        {
            collectionobj.Action = 1;
        }
        else {
            collectionobj.Action = 2;
        }
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteContactUsMaster", collectionobj);

        getData.then(function (response)
        {
            if (showMsgBox(response.data))
            {
                $scope.ClearControl(1);
            }
        });

    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.BodyContentList = [];
    $scope.ResetControl = function (flag)
    {
        debugger;
        $scope.Save = "Save";       
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.MobileNoText = "";
        $scope.EmailText = "";
        $scope.TimingText = "";
        $scope.AddressText = "";
        $scope.BodyContentList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
        $scope.$applyAsync();
    }

    $scope.BodyContentList = []; 
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.Search();
    };

    $scope.Search = function ()
    {
        debugger
        $scope.showLoader();
        if ($scope.hfTabId == 'undefined')
            $scope.hfTabId = null;
        if ($scope.hfMenuId == 'undefined')
            $scope.hfMenuId = null;
        if ($scope.hfSubMenuId == 'undefined')
            $scope.hfSubMenuId = null;
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.UnitId = $scope.hfUnitId;
        collectionobj.TabId = $scope.hfTabId;
        collectionobj.MenuId = $scope.hfMenuId;
        collectionobj.SubMenuId = $scope.hfSubMenuId;
        collectionobj.LayoutPartId = $scope.hfLayoutPartId;
        collectionobj.LayoutPartAbbreviationName = $scope.hfLayoutPartAbbreviationName;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/GetContactUsMaster", collectionobj);
        getData.then(function (response) {
            debugger;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mobile No Text", "HeaderValue": "BodyContentMobileNoText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Email Text", "HeaderValue": "BodyContentEmailText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Timing Text", "HeaderValue": "BodyContentTimingText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Address Text", "HeaderValue": "BodyContentAddressText", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Skype Address", "HeaderValue": "SkypeAddress", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Facebook Link", "HeaderValue": "FacebookLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Instagram Link", "HeaderValue": "InstagramLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "LinkedIn Link", "HeaderValue": "LinkedInLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Youtube Link", "HeaderValue": "YoutubeLink", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                   
                ];

            $scope.BodyContentList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            debugger
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.BodyContentList = $filter('filter')($scope.BodyContentList, { 'Code': $scope.Code });                
                $scope.MobileNoText = $scope.BodyContentList[0].BodyContentMobileNoText;
                $scope.EmailText = $scope.BodyContentList[0].BodyContentEmailText;
                $scope.TimingText = $scope.BodyContentList[0].BodyContentTimingText;
                $scope.AddressText = $scope.BodyContentList[0].BodyContentAddressText;

                $scope.SkypeAddress = $scope.BodyContentList[0].SkypeAddress;
                $scope.FacebookLink = $scope.BodyContentList[0].FacebookLink;
                $scope.InstagramLink = $scope.BodyContentList[0].InstagramLink;
                $scope.LinkedInLink = $scope.BodyContentList[0].LinkedInLink;
                $scope.YoutubeLink = $scope.BodyContentList[0].YoutubeLink;
                
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

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = 4;
            collectionobj.UnitId = $scope.hfUnitId;
            collectionobj.TabId = $scope.hfTabId;
            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteContactUsMaster", collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };



}