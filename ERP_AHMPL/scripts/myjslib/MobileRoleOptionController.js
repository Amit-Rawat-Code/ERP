app.MobileRoleOptionController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlRoles');
    $scope.selectedModuleCount = 0;
    
     //$scope.GetModules();
    

    $scope.GetMobileModules = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";     
        var getData = myService.methode('POST', '../api/MasterApi/GetMobileModules', collectionobj);
        getData.then(function (response)
        {
        $scope.ModulesList = response.data;
        });
    }

    $scope.AllModule = function () {
        debugger
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
        $scope.chkChange();
    }
    $scope.CheckAll = function (flag) {
        $.each($scope.SubMenuesList, function (index, obj) {
            $scope.onChange(flag, obj);
        });
        if ($scope.SubMenuesList.length > 0) {
            $scope.chkSelectAll = flag;
            $scope.chkAdd = flag;
            $scope.chkAdd = flag;
            $scope.chkEdit = flag;
            $scope.chkDelete = flag;
            $scope.chkPrint = flag;
        }

    }

    $scope.CheckUnCheckAll = function (val, flag) {
        $.each($scope.SubMenuesList, function (index, obj) {
            obj[val] = flag;
        });
    }

    $scope.chkChange = function () {
        if ($scope.SubMenuesList.length > 0) {
            $scope.chkSelectAll = true;
            $scope.chkAdd = true;
            $scope.chkAdd = true;
            $scope.chkEdit = true;
            $scope.chkDelete = true;
            $scope.chkPrint = true;
        }
        $.each($scope.SubMenuesList, function (index, obj) {
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
    }

   
    $scope.GetMobileMenuFromRoleOption = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
        collectionobj.RoleId = $scope.RoleId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetMobileNavigationMenuForRole', collectionobj);
        getData.then(function (response) {
            debugger
            $scope.SubMenuesList = response.data.Table;
        });

    }
    $scope.ddl_ModulesChange = function () {
        $scope.GetMobileMenuFromRoleOption();
    }

    $scope.ddl_RoleChange = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetMobileNavigationMenuForRole', collectionobj);
        getData.then(function (response) {
            //debugger
            //if (response.data.Table1 > 0) {
                $scope.ModulesList = $filter('filter')(response.data.Table1, { RoleId: Number($scope.RoleId) }, true);
                
            //} else
            //{
            //    $scope.ModulesList = $filter('filter')(response.data.Table1, { RoleId: Number($scope.RoleId) }, false);                                 
            //}
            $scope.GetMobileMenuFromRoleOption();
            
        });
    }

    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.RoleId = $scope.RoleId;
            collectionobj.ModuleId = JSON.stringify($filter('filter')($scope.ModulesList, { IsActive: true }));
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SubMenuesList = JSON.stringify($filter('filter')($scope.SubMenuesList, { Chk: true }));
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../api/UserMobileMasterApi/InsertUpdateDeleteMobileNavigationMenuForRole', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.GroupMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../api/UserMobileMasterApi/GetMobileNavigationMenuForRole', collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "RoleId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Role", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "LevelName", "HeaderValue": "LevelName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Module", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.RoleOptionList = response.data.Table;
            $scope.RoleOptionList1 = response.data.Table1;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                
                var row = $('#example').DataTable().row(this);
               
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.RoleOptionList1 = $filter('filter')($scope.RoleOptionList1, { RoleId: Number($scope.hfId) }, true);
                $scope.RoleId = $scope.hfId;

                $scope.ModulesList = $scope.RoleOptionList1;
                debugger
               // $scope.GetSubMenuFromRoleOption();
                $scope.GetMobileMenuFromRoleOption();

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

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.GroupId = $scope.hfId;
        collectionobj.SessionId = sessionId;
        debugger
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
        $scope.GetMobileModules();
        $scope.RoleId = "";
        $scope.SubMenuesList = [];
        $scope.$applyAsync();
        $scope.SetFocus('#GroupCode');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    /*Refresh Search Table Record*/
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
                { "HeaderText": "Sr.No.", "Value": "GroupId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Role", "HeaderValue": "GroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Module", "HeaderValue": "GroupAddress", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RoleOptionList, window.document.title);
    };
}