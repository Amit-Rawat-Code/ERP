app.UserMobileRoleAssignmentsController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlUserName');

    $scope.GetMobileRole = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '/Api/UserMobileMasterApi/GetMobileUserRole', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data;
        });
    }
    $scope.GetMobileRole();


    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.UserId = $scope.UserName;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.RoleList = JSON.stringify($filter('filter')($scope.RolesList, { 'IsSelected': true }, true)); 
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/UserMobileMasterApi/InsertUpdateDeleteMobileRoleAssignments', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
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
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UserId = userid;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserRoleAssignments', collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [{ "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Role Name", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];


            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                collectionobj.Action = "5";
                collectionobj.UserId = $scope.hfId;
                var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserRoleAssignments', collectionobj);
                getData.then(function (response) {

                    $scope.UserData = response.data.Table;
                    $scope.UserName = ($filter('filter')($scope.UserData, { UserId: '!!' }))[0].UserId.toString();
                    $scope.RolesList = $scope.UserData;
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
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/InsertUpdateDeleteMobileRoleAssignments', collectionobj);
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
        $scope.UserName = "";
        $scope.GetMobileRole();
        //$scope.GetMobileRole();
        $scope.$applyAsync();
        $scope.SetFocus('#txtEnquiryType');
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
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mode Of Enquiry", "HeaderValue": "ModeOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Category", "HeaderValue": "EnquiryCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Recurring", "HeaderValue": "Recurring", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.EnquiryTypeMasterList, window.document.title);
    };
};

