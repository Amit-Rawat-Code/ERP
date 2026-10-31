app.UserMobilePermissionController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#ddlUserName');
    $scope.selectedModuleCount = 0;

    $scope.AllModule = function () {
        angular.forEach($scope.ModulesList, function (BI) {
            BI.IsActive = $scope.chkAllModule;
        });
    }
    $scope.onChange = function (flag, obj) {
        obj.Chk = flag;
        obj.IsAdd = flag;
        obj.IsEdit = flag;
        obj.IsDelete = flag;
        obj.IsPrint = flag;
        if (flag == false) {
            $scope.chkSelectAll = flag;
        }
    }

    $scope.CheckAll = function (flag) {
        $.each($scope.NavMenuList, function (index, obj) {
            $scope.onChange(flag, obj);
        });
    }

    $scope.CheckUnCheckAll = function (val, flag) {
        $.each($scope.NavMenuList, function (index, obj) {
            obj[val] = flag;
        });
        $scope.chkChange();
    }

    $scope.chkChange = function () {
        if ($scope.NavMenuList.length > 0) {
            $scope.chkSelectAll = true;
            $scope.chkAdd = true;
            $scope.chkAdd = true;
            $scope.chkEdit = true;
            $scope.chkDelete = true;
            $scope.chkPrint = true;
        }
        $.each($scope.NavMenuList, function (index, obj) {
            if (!obj.Chk)
                $scope.chkSelectAll = false;
            if (!obj.IsAdd)
                $scope.chkAdd = false;
            if (!obj.IsEdit)
                $scope.chkEdit = false;
            if (!obj.IsDelete)
                $scope.chkDelete = false;
            if (!obj.IsPrint)
                $scope.chkPrint = false;

            if (obj.IsAdd || obj.IsEdit || obj.IsDelete || obj.IsPrint) {
                obj.Chk = true;
            }
        });
    };

    $scope.ddl_ModulesChange = function () {
        $scope.GetMenuFromRoleOption();
    }

    $scope.GetMobileModule = function () {
       
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/MasterApi/GetMobileModules', collectionobj);
        getData.then(function (response) {
            $scope.ModulesList = response.data;
        });
    }

    $scope.GetMenuFromRoleOption = function ()
    {
     
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.UserId = $scope.UserName;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId; 
        collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
        var getData = myService.methode('POST', '../Api/UserMobileMasterApi/GetUserMobileRolePermission', collectionobj);
        getData.then(function (response)
        {
           
           // $scope.NavMenuList = response.data;
            $scope.NavMenuList = [];
            var obj1 = [];
           // var namearray = response.data.map(function (el) { return JSON.parse(el.SubMenu); });
            angular.forEach(response.data, function (obj)
            {
               angular.forEach(JSON.parse(obj.SubMenu), function (obj1)
               {
                   $scope.NavMenuList.push(obj1);
               });
            });
            $scope.chkChange();
        });
       
    }

    $scope.ddl_UserChange = function ()
    {
       
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.UserId = $scope.UserName;
        var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetUserMobileRolePermission', collectionobj);
        getData.then(function (response) {
        $scope.ModulesList = response.data;
            $scope.GetMenuFromRoleOption();
        });
        $scope.GetUserDetails($scope.UserName);
        //$scope.GetMenuFromRoleOption();
     }

   
    $scope.SaveRecord = function () {
        
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.NavMenuList = JSON.stringify($filter('filter')($scope.NavMenuList, { Chk: true }));
            collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
            collectionobj.UserId = $scope.UserName;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../api/UserMobileMasterApi/InsertUpdateDeleteUserMobilePermission', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.UserId = userid;
        collectionobj.SessionId = sessionId;
        collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
        var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetUserMobileRolePermission', collectionobj);
        getData.then(function (response)
        {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            //$scope.UserPermissionList = response.data;
            //loadDataUsingPreDefinedColumn(tblheader, response.data);
           
            $scope.UserPermissionList = response.data;
            $scope.UserPermissionList1 = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.UserName = $(this).find('#hdProfileName').val();
                $scope.UserPermissionList1 = $filter('filter')($scope.UserPermissionList1, { UserId: $scope.UserName });

                collectionobj.Action = "6";
                collectionobj.SessionId = sessionId;
                collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
                collectionobj.UserId = $scope.hfId;
                var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetUserMobileRolePermission', collectionobj);
                getData.then(function (response) {
                    debugger
                    $scope.ModulesList = response.data;
                    $scope.GetMenuFromRoleOption();

                    //$scope.chkChange();
                    $scope.hideLoader();
                    $scope.Save = "Edit";
                    $scope.disableDelete = false;
                    $scope.$applyAsync();
                    //collapse box
                    $('.br-pageheader').fadeIn();
                    $('#collapseinputbox').fadeIn();
                    $('#CollapseSearchTableList').fadeOut();
                    $scope.SetFocus('#ddlUserName', true);

                });


                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlRoles', true);
            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.GroupId = $scope.hfId;
        var getData = myService.methode('POST', '../Api/MasterApi/InsertUpdateDeleteGroupMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.ModuleId = "";
        $scope.UserName = "";
        $scope.ModulesList = [];
        $scope.NavMenuList = [];
        $scope.UserDetails = [];
        $scope.$applyAsync();
        $scope.SetFocus('#ddlUser');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $(document).on("click", ".RefreshSearchTable", function (e) {

        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.UserPermissionList, window.document.title);
    };

}