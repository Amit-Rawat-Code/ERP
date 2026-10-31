app.BackDateEntryPermissionController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlRoles');

    $scope.DataType = "date";



    $scope.GetRole = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data;
        });
    }
    $scope.GetRole();
    $scope.GetSubMenuFromRoleOption = function () {
            
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ModuleId = $scope.ModuleId;
        collectionobj.RoleId = $scope.RoleId;
        var getData = myService.methode('POST', '../api/UserTransactionApi/GetNavigationMenuForRole', collectionobj);
        getData.then(function (response) {

            $scope.SubMenuesList = response.data.Table;

        });
    }

    $scope.ddl_ModulesChange = function () {
        //
        $scope.GetSubMenuFromRoleOption();
    }
       

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //
            $scope.showLoader();
            var collectionobj = {};
            
            collectionobj.RoleId = $scope.RoleId;
            collectionobj.ModuleId = $scope.ModuleId;
            collectionobj.SubMenuesList = JSON.stringify($scope.SubMenuesList);
            collectionobj.UserId = $scope.UserName;
            //collectionobj.SocietyCode = societyCode;
            //collectionobj.SchoolCode = schoolCode;
            //collectionobj.BranchCode = branchCode;
            //collectionobj.SessionId = sessionId;
            //collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/UserTransactionApi/InsertUpdateDeleteBackEntryDatePermission', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            }); USP_BackDateEntryPermission
        }
    }

    $scope.EnquiryTypeMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.UserId = $scope.UserName;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/GetBackEntryDatePermission', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [   { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "User Name", "Value":"UserId","HeaderValue": "UserName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Role", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Menu", "Value": "MenuId", "HeaderValue": "MenuName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Type", "Value": "Type", "HeaderValue": "Type", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "No. Of Days", "Value": "DaysInNumber", "HeaderValue": "DaysInNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "From Date", "Value": "", "HeaderValue": "FromDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "To Date", "Value": "", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Expiry Date", "Value": "", "HeaderValue": "ExpiryDateTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                   
                ];

            var UserData = [];
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                collectionobj.Action = "5";
                collectionobj.UserId = $scope.hfId;
                var getData = myService.methode('POST', '../Api/UserTransactionApi/GetBackEntryDatePermission', collectionobj);
                getData.then(function (response) {
                    UserData = response.data;
                    $scope.ModuleId = UserData[0].ModuleId.toString();
                    $scope.UserName = UserData[0].UserId.toString();
                    $scope.RoleId = UserData[0].RoleId.toString();
                    $scope.DataType = "datetime";
                    $scope.SubMenuesList = UserData;
                    $scope.hideLoader();
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


         
        });

    
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.UserId = $scope.UserName;
        collectionobj.ModuleId = $scope.ModuleId;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/InsertUpdateDeleteBackEntryDatePermission', collectionobj);
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
        $scope.hfId = "";
        $scope.ModuleId = "";
        $scope.RoleId = "";
        $scope.UserName = "";
        $scope.SubMenuesList = [];
        $scope.$applyAsync();
        $scope.SetFocus('#ddlRoles');
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
                { "HeaderText": "User Name", "Value": "UserId", "HeaderValue": "UserName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Role", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Module", "Value": "ModuleId", "HeaderValue": "ModuleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Menu", "Value": "MenuId", "HeaderValue": "MenuName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Type", "Value": "Type", "HeaderValue": "Type", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "No. Of Days", "Value": "NumberOfDays", "HeaderValue": "NumberOfDays", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "From Date", "Value": "", "HeaderValue": "FromDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "To Date", "Value": "", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Expiry Date", "Value": "", "HeaderValue": "ExpiryDateTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

            ];
        $scope.PrintMaster(tblheader, $scope.EnquiryTypeMasterList, window.document.title);
    };
};