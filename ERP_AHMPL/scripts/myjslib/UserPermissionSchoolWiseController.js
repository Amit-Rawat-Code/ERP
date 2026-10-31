app.UserPermissionSchoolWiseController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlUser');

    $scope.CheckUnCheckAll = function (val, flag) {
        $.each($scope.NavMenuList, function (index, obj) {
            obj[val] = flag;
        });
    }

    $scope.chkChange = function () {
        if ($scope.NavMenuList.length > 0) {
            $scope.chkAdd = true;
            $scope.chkEdit = true;
            $scope.chkDelete = true;
            $scope.chkPrint = true;
        } 
        $.each($scope.NavMenuList, function (index, obj) {
            if (!obj.IsAdd)
                $scope.chkAdd = false;
            if (!obj.IsEdit)
                $scope.chkEdit = false;
            if (!obj.IsDelete)
                $scope.chkDelete = false;
            if (!obj.IsPrint)
                $scope.chkPrint = false;
        });
    }

    $scope.GetSubMenuFromRoleOption = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.SchoolRelationShipId = $scope.SchoolBranchId;
        collectionobj.UserId = $scope.UserName;
        collectionobj.SessionId = sessionId;
        collectionobj.ModuleId = $scope.ModuleId;
    
        var getData = myService.methode('POST', '../api/UserTransactionApi/GetUserPermissionSchoolWise', collectionobj);
        getData.then(function (response) {
            $scope.NavMenuList = response.data;
            $scope.chkChange();
        });
    }
    $scope.ddl_ChangeUserSchoolBranch = function () {
        $scope.GetSubMenuFromRoleOption();
    }

    $scope.ddl_ModulesChange = function () {
        $scope.GetSubMenuFromRoleOption();
    }

    $scope.ddl_UserChange = function () {
        $scope.GetUserDetails($scope.UserName);
        $scope.GetModules('5', $scope.UserName);
        $scope.GetUserSchoolBranch();
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.NavMenuList = JSON.stringify($scope.NavMenuList);
            collectionobj.ModuleId = $scope.ModuleId;
            collectionobj.UserId = $scope.UserName;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SchoolRelationShipId = $scope.SchoolBranchId;
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
            var getData = myService.methode('POST', '../Api/UserTransactionApi/InsertUpdateDeleteUserPermissionSchoolWise', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    //$scope.GroupMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SchoolRelationShipId = $scope.SchoolBranchId;
        collectionobj.UserId = $scope.UserName;
        collectionobj.SessionId = sessionId;
        collectionobj.ModuleId = $scope.ModuleId;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserPermissionSchoolWise', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "UserId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Profile Name", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.SchoolWiseList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                //
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ModuleId = $(FindHtml(row[3])).val();

                $scope.SchoolWiseList = $filter('filter')($scope.SchoolWiseList, { 'UserId': Number($scope.hfId), 'ModuleId': Number($scope.ModuleId) }, true);
                $scope.SchoolBranchId = $scope.SchoolWiseList[0].RelationshipId.toString();
                $scope.UserName = $scope.SchoolWiseList[0].UserId.toString();
                $scope.GetModules('5', $scope.UserName);
                $scope.GetUserSchoolBranch();

                collectionobj.Action = "5";
                collectionobj.SessionId = sessionId;
                collectionobj.UserId = $scope.UserName;
                collectionobj.ModuleId = $scope.ModuleId;
                collectionobj.SchoolRelationShipId = $scope.SchoolBranchId;
                var getData = myService.methode('POST', '../api/UserTransactionApi/GetUserPermissionSchoolWise', collectionobj);
                getData.then(function (response) {
                   // 
                    $scope.NavMenuList = response.data;
                    $scope.chkChange();
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

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
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
        $scope.NavMenuList = [];
        $scope.SchoolBranchId="";
        $scope.UserName = "";
        $scope.UserDetails = [];
        $scope.$applyAsync();
        $scope.SetFocus('#ddlUser');
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
                { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RoleOptionList, window.document.title);
    };
}

