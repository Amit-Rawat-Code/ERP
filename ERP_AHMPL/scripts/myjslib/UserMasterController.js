app.UserMasterController = function ($scope, $element, $filter, myService) {
    $scope.selectedBranchCount = 0;
    $scope.GetAssociatedBranches(sessionId);

    $scope.ddl_ChangeSession = function () {
        if ($scope.Save == 'Save')
            $scope.GetAssociatedBranches($scope.SessionId);
        else {
            var collectionobj = {};
            collectionobj.Action = "5";
            collectionobj.UserId = $scope.hfId;
            collectionobj.SessionId = $scope.SessionId;
            collectionobj.CreatedBy = userid;

            var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
            getData.then(function (response) {
                $scope.AssociatedBranches = response.data;
            });
        }
    }

    $scope.GetSessionUserWise = function () {
        var collectionobj = {};
        collectionobj.Action = "8";
        collectionobj.CreatedBy = userid;

        var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetSessionMonths', collectionobj);
        getUserDetails.then(function (response) {
            $scope.SessionList = response.data;
            $scope.SessionId = sessionId;
        });
    }

    $scope.AllBranch = function () {
        angular.forEach($scope.AssociatedBranches, function (BI) {
            BI.IsActive = $scope.chkAllBranch;
        });
    }
    $scope.chkAllBranch = false;

    $scope.UncheckAll = function (obj,flag) {
        angular.forEach($scope.AssociatedBranches, function (BI) {
            BI.IsDefault = false;
        });
        obj.IsDefault = flag;
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

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //
            var collectionobj = {};
            collectionobj.ProfileName = $scope.Name;
            collectionobj.UserName = $scope.UserName;
            collectionobj.Password = $scope.Password;
            collectionobj.MobileNo = $scope.MobileNo;
            collectionobj.EmailId = $scope.EmailId;
            collectionobj.UserTypeId = $scope.UserTypeId;
            collectionobj.SessionId = $scope.SessionId;

            let filteredab = ($filter('filter')($scope.AssociatedBranches, { 'IsActive': true }))
                
            let AssociatedBranchesResult = filteredab.map(function (obj) {
                return { RelationshipId: obj.RelationshipId, IsActive: obj.IsActive, IsDefault: obj.IsDefault};
            });

            collectionobj.EntitiesData = JSON.stringify(AssociatedBranchesResult);

            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsActive = $scope.IsActive;
            let filteredabcount = ($filter('filter')(filteredab, { 'IsDefault': true }))
           

            if ($scope.Save == "Save") {
                if (filteredabcount.length > 0) {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;

                    var getData = myService.methode('POST', '../Api/UserMasterApi/InsertUpdateDeleteUserMaster', collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                        }

                    });

                } else {
                    alert("One institute should be selected as Default.");
                }
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.UserId = parseInt($scope.hfId);
                var getData = myService.methode('POST', '../Api/UserMasterApi/InsertUpdateDeleteUserMaster', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            }
        }
    };


    $scope.UserMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        $scope.showLoader();

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.UserId = userid;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "UserId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "User Name", "HeaderValue": "UserName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Password", "HeaderValue": "Password", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Profile Name", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mobile", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Email", "HeaderValue": "EmailId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "User Typed", "Value": "UserTypeId", "HeaderValue": "UserTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "School", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.UserMasterResponse = response.data;
            loadDataTableForLargeAmountData(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                var ID = parseInt($scope.hfId);
                //
                $scope.UserMasterResponse = $filter('filter')($scope.UserMasterResponse, { 'UserId': ID }, true);

                $scope.Name = $scope.UserMasterResponse[0].ProfileName;
                $scope.EmailId = $scope.UserMasterResponse[0].EmailId;
                $scope.MobileNo = $scope.UserMasterResponse[0].MobileNo;
                $scope.UserName = $scope.UserMasterResponse[0].UserName;
                $scope.Password = $scope.UserMasterResponse[0].Password;
                //$scope.GetUserTypes();
                $scope.UserTypeId = $scope.UserMasterResponse[0].UserTypeId.toString();
                $scope.IsActive = $scope.UserMasterResponse[0].IsActive == true ? "true" : "false";

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.UserId = ID; 
                collectionobj.SessionId = sessionId;
                collectionobj.CreatedBy = userid;

                var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
                getData.then(function (response) {
                    $scope.SessionId = ($filter('filter')(response.data, { SessionId: '!!' }))[0].SessionId.toString();
                    $scope.AssociatedBranches = response.data;
                });
                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtProfileName', true);
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
        collectionobj.UserId = $scope.hfId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/InsertUpdateDeleteUserMaster', collectionobj);
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
        $scope.hfId = "";
        $scope.Name = "";
        $scope.EmailId = "";
        $scope.MobileNo = "";
        $scope.UserName = "";
        $scope.Password = "";
        $scope.ddlUserType = "";
        $scope.ddlActive = true;
        $scope.SessionId = sessionId
        $scope.GetAssociatedBranches($scope.SessionId);
        $scope.AllBranch();
        $scope.$applyAsync();
        $scope.SetFocus('#txtProfileName');
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
                { "HeaderText": "User Name", "HeaderValue": "UserName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Profile Name", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mobile", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Email", "HeaderValue": "EmailId", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "User Typed", "Value": "UserTypeId", "HeaderValue": "UserTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "School", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.UserMasterResponse, window.document.title);
    };

}