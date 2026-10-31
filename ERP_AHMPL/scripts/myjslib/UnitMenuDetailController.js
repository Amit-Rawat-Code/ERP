app.UnitMenuDetailController = function ($scope, $element, $filter, myService)
{

    $scope.GetLayoutMaster = function ()
    {
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

    $scope.GetLayoutAccordingMenu = function (MenuId)
    {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.MenuId = MenuId;
        
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response)
        {
            
            if (response.data.length > 0) {

                $scope.LayoutCode = response.data[0]['LayoutCode'];
                
                $scope.GetLayoutPart($scope.LayoutCode);
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath']; 
            }
              
        });
    };

    $scope.GetTab = function (UnitId)
    {
        
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
                $scope.FacebookLink = response.data[0]['FacebookLink'];
                $scope.TwitterLink = response.data[0]['TwitterLink'];
                $scope.YoutubeLink = response.data[0]['YoutubeLink'];
                $scope.HomeVideoLink = response.data[0]['VideoLink'];
            }
        });
    };

    $scope.GetUnitTypePerm = function ()
    {
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

    $scope.GetddlMenu = function (TabId)
    {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.TabId = TabId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetMenuMaster", collectionobj);
        getData.then(function (response) {
            $scope.Menus = response.data;
        });
    };


    $scope.GetddlSubMenu = function (MenuId)
    {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.MenuId = MenuId; 
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetWebSubMenuMaster", collectionobj);
        getData.then(function (response) {
            $scope.SubMenus = response.data;
        });
    };

    $scope.GetLayoutPart = function (LayoutCode)
    {
        
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.LayoutCode = $scope.LayoutCode;
        collectionobj.UserId = userid;
        collectionobj.RelationshipId = relationshipId;
        $scope.imgfileInput = "";
        var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/GetLayoutPart", collectionobj);
        getData.then(function (response)
        {
       
            $scope.GetLayoutParts = response.data;
            if (response.data[0]['LayoutDemoImagePath'] != null)
            {
                $scope.imgfileInput = response.data[0]['LayoutDemoImagePath'];
            }
            else
            {
                $('#imgfileInput').attr('src', '/Content/noimage.png');
            }
        });
    };

    $("#ddlMenu").removeClass('validate');
    $("#ddlSubMenu").removeClass('validate');
    $scope.setAllValue = function (url, LayoutPartId, LayoutAbbreviationName, LayoutPart)
    {
        if (isValidate())
        {
            
            sessionStorage.setItem('MenuDetailUnitId', $scope.UnitId);
            sessionStorage.setItem('MenuDetailLayoutId', $scope.LayoutCode);
            sessionStorage.setItem('MenuDetailLayoutPartId', LayoutPartId);
            sessionStorage.setItem('MenuDetailLayoutPartAbbreviationName', LayoutAbbreviationName);
            sessionStorage.setItem('MenuDetailTabId', $scope.TabId);
            sessionStorage.setItem('MenuDetailMenuId', $scope.MenuId);
            sessionStorage.setItem('MenuDetailSubMenuId', $scope.SubMenuId);
            $scope.SelectIframoutiframe('/DynamicWebsite/'+url + '/' + $scope.UnitId + '-' + $scope.TabId, LayoutPart);
            //window.open(url + '/' + $scope.UnitId + '-' + $scope.TabId);
        }
    };
}