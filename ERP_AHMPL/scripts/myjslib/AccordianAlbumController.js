app.AccordianAlbumController = function ($scope, $element, $filter, myService) {
    $scope.GetLayoutMaster = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            $scope.GetLayouts = response.data;
        });
    };

    $scope.GetLayoutAccordingTab = function (TabId) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.TabId = TabId;

        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {

                $scope.LayoutId = response.data[0]['LayoutCode'];

                $scope.GetLayoutPart($scope.LayoutId);
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath'];
            }

        });
    };

    $scope.GetLayoutAccordingMenu = function (MenuId) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.MenuId = MenuId;

        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {

                $scope.LayoutId = response.data[0]['LayoutCode'];

                $scope.GetLayoutPart($scope.LayoutId);
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath'];
            }

        });
    };

    $scope.GetLayoutAccordingSubMenu = function (MenuId,SubMenuId) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.MenuId = MenuId;
        collectionobj.SubMenuId = SubMenuId;

        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {

                $scope.LayoutId = response.data[0]['LayoutCode'];

                $scope.GetLayoutPart($scope.LayoutId);
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath'];
            }

        });
    };

    $scope.GetTab = function (UnitId) {

        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');//sac
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 8;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? (splitsids.length > 0 ? splitsids[1] : undefined) : UnitId);
        collectionobj.RelationshipId = sessionStorage.getItem('relationshipId');
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetTabMaster", collectionobj);
        getData.then(function (response) {
            $scope.Tabs = response.data;
            if (response.data.length > 0) {
                //debugger
                $scope.FacebookLink = response.data[0]['FacebookLink'];
                $scope.TwitterLink = response.data[0]['TwitterLink'];
                $scope.YoutubeLink = response.data[0]['YoutubeLink'];
                $scope.HomeVideoLink = response.data[0]['VideoLink'];
            }
        });
    };

    $scope.GetUnitTypePerm = function () {
        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;

        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitTypeMaster", collectionobj);
        getData.then(function (response) {

            $scope.GetUnitTypePerms = response.data;
            if ($scope.GetUnitTypePerms.length > 0)
                if (loginTypeId == '1') {
                    $scope.UnitTypeCode = $scope.GetUnitTypePerms[0].UnitTypeCode.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
                else {
                    $scope.UnitTypeCode = $scope.GetUnitTypePerms[0].UnitTypeCode.toString();
                    $scope.GetUnitPerm(loginTypeId);
                }
        });
    };
    $scope.GetUnitPerm = function (defaultselection) {

        var collectionobj = {};
        if (loginTypeId == '1')
            collectionobj.Action = 4;
        else
            collectionobj.Action = 5;
        collectionobj.UnitTypeCode = $scope.UnitTypeCode;
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetUnitMaster", collectionobj);
        getData.then(function (response) {

            $scope.GetUnitPerms = response.data;
            if ($scope.GetUnitPerms.length > 0)
                if (loginTypeId == '1') {
                    if (defaultselection == '1')
                        $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                    //if (IsFunctionDefined('GetTab'))
                    $scope.GetTab($scope.UnitId);
                    //if (IsFunctionDefined('fnApproved'))
                    if ($scope.fnApproved != undefined)
                        $scope.fnApproved($scope.UnitId);
                }
                else {
                    $scope.UnitId = $scope.GetUnitPerms[0].Code.toString();
                    //if (IsFunctionDefined('GetTab'))
                    $scope.GetTab($scope.UnitId);
                    //if (IsFunctionDefined('fnApproved'))
                    if ($scope.fnApproved != undefined)
                        $scope.fnApproved($scope.UnitId);
                }
        });
    };

    $scope.GetMenu = function (TabId, index) {

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
        collectionobj.TabId = JSON.stringify(TabId);
        collectionobj.RelationshipId = sessionStorage.getItem('relationshipId');
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {

            $scope.Menus[index] = response.data;
        });
    };

    $scope.GetddlMenu = function (TabId) {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.TabId = TabId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.Menus = response.data;
            if ($scope.Menus.length == 0)
            {
                $scope.GetLayoutAccordingTab(TabId);
            }
            else {
                //$scope.LayoutId = "";
            }
        });
    };


    $scope.GetddlSubMenu = function (MenuId) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.MenuId = MenuId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetWebSubMenuMaster", collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.SubMenus = response.data;
            if ($scope.SubMenus.length == 0) {
                $scope.GetLayoutAccordingMenu(MenuId);
            }
            else
            {
                //$scope.LayoutId = "";
            }
        });
    };

    $scope.GetLayoutPart = function (LayoutCode) {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.LayoutCode = $scope.LayoutId;
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        $scope.imgfileInput = "";
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetLayoutPart", collectionobj);
        getData.then(function (response) {

            $scope.GetLayoutParts = response.data;
            if (response.data[0]['LayoutDemoImagePath'] != null) {
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath'];
            }
            else {
                $('#imgfileInput').attr('src', '/Content/noimage.png');
            }
        });
    };

    $("#ddlMenu").removeClass('validate');
    $("#ddlSubMenu").removeClass('validate');
    $scope.setAllValue = function (url, LayoutPartId, LayoutAbbreviationName, LayoutPart) {
        if (isValidate()) {

            sessionStorage.setItem('MenuDetailUnitId', $scope.UnitId);
            sessionStorage.setItem('MenuDetailLayoutId', $scope.LayoutId);
            sessionStorage.setItem('MenuDetailLayoutPartId', LayoutPartId);
            sessionStorage.setItem('MenuDetailLayoutPartAbbreviationName', LayoutAbbreviationName);
            sessionStorage.setItem('MenuDetailTabId', $scope.TabId);
            sessionStorage.setItem('MenuDetailMenuId', $scope.MenuId);
            sessionStorage.setItem('MenuDetailSubMenuId', $scope.SubMenuId);
            $scope.SelectIframoutiframe('/DynamicWebsite/' + url + '/' + $scope.UnitId + '-' + $scope.TabId, LayoutPart);
            //window.open(url + '/' + $scope.UnitId + '-' + $scope.TabId);
        }
    };

    $scope.SaveRecord = function () {
        //debugger
        if (isValidate()) {
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.UnitTypeCode = $scope.UnitTypeCode;
            collectionobj.UnitId = $scope.UnitId;
            collectionobj.TabId = $scope.TabId;
            collectionobj.MenuId = $scope.MenuId;
            collectionobj.SubMenuId = $scope.SubMenuId;
            collectionobj.LayoutCode = $scope.LayoutId;
            collectionobj.SeqNo = $scope.SequenceNo;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.AccordianName = $scope.AccordianName;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteAccordianLayout', collectionobj);
            getData.then(function (response) {
                //debugger
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    showMsgBox(response.data);
                }
            });
        }
    }

    $scope.AccordianHeaderList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        //debugger
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetAccordianLayout', collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Unit Code", "HeaderValue": "UnitCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Name", "HeaderValue": "UnitName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Tab Code", "HeaderValue": "TabCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Tab Name", "HeaderValue": "TabName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu Code", "HeaderValue": "MenuCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Menu Name", "HeaderValue": "MenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sub Menu Code", "HeaderValue": "SubMenuCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Sub Menu Name", "HeaderValue": "SubMenuName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Layout Code", "HeaderValue": "LayoutCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "LayoutName", "HeaderValue": "LayoutName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SeqNo", "HeaderValue": "OrderBy", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.AccordianHeaderList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {

                //debugger

                $scope.GetUnitTypePerm();

                var row = $('#example').DataTable().row(this).data();
                $scope.GetTab(row[1]);
                $scope.GetMenu(row[3], 1);
                $scope.GetddlMenu(row[3]);
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.AccordianHeaderList = $filter('filter')($scope.AccordianHeaderList, { 'Code': $scope.Code });
                $scope.UnitTypeCode = $scope.AccordianHeaderList[0].UnitTypeId;
                $scope.GetUnitPerm($scope.UnitTypeCode);
                $scope.UnitId = $scope.AccordianHeaderList[0].UnitCode;
                $scope.TabId = $scope.AccordianHeaderList[0].TabCode.toString();
                $scope.MenuId = row[5];                
                if ($scope.SubMenus.length == 0) {
                    $scope.GetddlSubMenu($scope.MenuId);
                }
                $scope.SubMenuId = row[7];
                $scope.LayoutId = row[9];
                $scope.SequenceNo = row[11];
                $scope.IsApproved = row[12];
                //$scope.IsActive = (row[18] == "Yes" ? "true" : "0");                
                $scope.AccordianName = $scope.AccordianHeaderList[0].AccordianName;
                //$scope.AccordianHeaderList = response.data;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

            });
        });
    };


    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function () {

            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteAccordianLayout", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
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
    $scope.ResetControl = function (flag) {

        $scope.Save = "Save";
        $scope.GetUnitPerms = "";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.GetUnitTypePer = "";        
        $scope.IsApproved = "";
        $scope.hfId = "";
        $scope.UnitTypeCode = "";
        $scope.TabId = "";
        $scope.MenuId = "";
        $scope.SubMenuId = "";
        $scope.SequenceNo = "";
        $scope.AccordianName = "";
        $scope.LayoutId = "";
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };

    }
}