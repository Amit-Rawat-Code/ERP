app.UserRoleAssignmentsController = function ($scope, $element, $filter, myService, $compile)
{
    $scope.SetFocus('#ddlUserName');
    $scope.UserClassList = [];
    $scope.SetMaxMinDate();
    $scope.GetAssociatedBranches(sessionId);
    $scope.AssignedUserId = "";

    $scope.ddl_UserChange = function () {
        
        document.getElementById("myDropdown").classList.toggle("show");
        $scope.GetUserDetails($scope.AssignedUserId);
        $scope.Save = 'Save';
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.UserId =  $scope.AssignedUserId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserRoleAssignments', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data.Table;
           
            var flag = false;
            $.each($scope.RolesList, function (index, array) {
                if (array.IsSelected == true) {
                    if (array.RoleName != 'Teacher') {
                        flag = true;
                    }
                    $scope.Save = 'Edit';
                }
            });
            $scope.IsNonTeachingRoleAssign = flag;
            $scope.GetClasses(response.data.Table1);
        });
    }

    $scope.FormatDate = function (obj) {
        obj.ToDate = new Date(obj.ToDate);
    }

    $scope.GetUserSelectionofSchool = function () {
        $scope.UserNameList = [];
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.EntitiesData = JSON.stringify($filter('filter')($scope.AssociatedBranches, { chk: true }, true));
        collectionobj.Action = "11";
        collectionobj.UserId = userid;
        collectionobj.SessionId = sessionId;

        collectionobj.UserTypeId = $scope.UserTypeId;
       
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetail', collectionobj);
        getData.then(function (response) {
            $scope.UserNameList = response.data;            
        });
    }
       
    $scope.ddlAssociatedBranches_Change = function () {
        $scope.UserTypeId = "";
        $scope.GetUserSelectionofSchool();
    }

    $scope.ddlAssociatedBranchesCheckAll_click = function () {
        $scope.GetUserSelectionofSchool();
    }

    $scope.ddlAssociatedBranchesUnCheckAll_click = function () {
        $scope.GetUserSelectionofSchool();
    }
    
    
    chk = false;
    $scope.GetRole = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data;           
        });
    }

    $scope.GetRoleStudent = function (id) {        
        var collectionobj = {};
        collectionobj.Action = "6";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {
            if (id == 5) {
                $scope.RolesList = response.data;
            }
            else {
                $scope.GetRoleOthers();
            }
        });
    }

    $scope.GetRoleOthers = function () {
        var collectionobj = {};
        collectionobj.Action = "7";
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response) {
            $scope.RolesList = response.data;
        });
    }

    $scope.ClassEnableDisabled = function (RoleId)
    {       
        var flag = false;
        $.each($scope.RolesList, function (index, array) {
            if (array.IsSelected == true && array.RoleName != 'Teacher' && array.RoleName != 'Active Student'
                && array.RoleName != 'In Active Student' && array.RoleName != 'Partial Student' && array.RoleName != 'Student') {
                flag = true;
            }
        });
        $scope.IsNonTeachingRoleAssign = flag;

        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RoleId = RoleId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetRoles', collectionobj);
        getData.then(function (response)
        {           
            $scope.UserLevelList = response.data;
            if ($scope.UserLevelList.length > 0)
                $scope.UserLevel = $scope.UserLevelList[0].UserLevel;
            else
                $scope.UserLevel == 0
            if ($scope.UserLevel == 5 || $scope.UserLevel == 6 || $scope.UserLevel == 7)
            {
                chk = true;
            }

        });
    }

    $scope.GetRole();
    
    $scope.GetClasses = function (UserClassList) {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetClass', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
            if (UserClassList != null)
                setTimeout(function () {
                    angular.forEach($scope.ClassList, function (obj) {
                        angular.forEach(UserClassList, function (obj1) {
                            if (obj1.ClassCode == obj.Code) {
                                obj.chk = true;
                            }
                        })
                    })
                },500)
        });
    };

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {            
            $scope.showLoader();
            var collectionobj = {};       
            collectionobj.UserId = $scope.AssignedUserId;
            if ($scope.UserTypeId == '5' || $scope.UserTypeId == '6')
                collectionobj.UserList = JSON.stringify($filter('filter')($scope.UserNameList, { 'chk': true }));

            collectionobj.RelationshipId = relationshipId;
            if ($scope.IsNonTeachingRoleAssign)
                collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassList, { 'chk': true }));
            angular.forEach($scope.RolesList, function (obj) {
                if (obj.ToDate != undefined && obj.ToDate != 'Invalid Date' && obj.ToDate != '')
                obj.ToDate = moment(obj.ToDate).format('YYYY-MMM-DD H:mm')
            });
            collectionobj.RoleList = JSON.stringify($filter('filter')($scope.RolesList, { IsSelected: true }));
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/UserTransactionApi/InsertUpdateDeleteUserRoleAssignments', collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
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

    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UserId = userid;
        var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserRoleAssignments', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Role Name", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "School", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.UserData = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
              
                $scope.UserData = $filter('filter')($scope.UserData, { UserId: $scope.hfId });
                $scope.AssignedUserName = $scope.UserData[0].ProfileName;
                $scope.RelationshipIds = ($scope.UserData[0].RelationshipIds).split(',');
                collectionobj.Action = "5";
                collectionobj.UserId = $scope.hfId;
                var getData = myService.methode('POST', '../Api/UserTransactionApi/GetUserRoleAssignments', collectionobj);
                getData.then(function (response)
                {
                    angular.forEach($scope.AssociatedBranches, function (obj) {
                        obj.chk = false;
                    });

                    angular.forEach($scope.AssociatedBranches, function (obj) {
                        angular.forEach($scope.RelationshipIds, function (id) {
                            if (obj.RelationshipId == id) {
                                obj.chk = true;
                            }
                        });
                    });

                    $scope.UserData = response.data.Table;
                    $scope.UserClassList = response.data.Table1;
                   

                    $scope.AssignedUserId = ($filter('filter')($scope.UserData, { UserId: '!!' }))[0].UserId.toString();
                    $scope.UserTypeId = ($filter('filter')($scope.UserData, { UserId: '!!' }))[0].UserTypeId.toString();
                   
                    $scope.RolesList = $scope.UserData;
           
                    $scope.GetClasses($scope.UserClassList);

                    $scope.hideLoader();
                    $scope.Save = "Edit";
                    $scope.disableDelete = false;
                    var flag = false;
                    $.each($scope.RolesList, function (index, array) {
                        if (array.IsSelected == true && array.RoleName != 'Teacher') {
                            flag = true;
                        }
                    });
                    $scope.IsNonTeachingRoleAssign = flag;

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
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/InsertUpdateDeleteEnquiryTypeMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.ClearControl = function (flag)
    {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.ClassList = [];
        $scope.hfId = "";
        $scope.IsNonTeachingRoleAssign = false;
        $scope.AssignedUserId = "";
        $scope.UserTypeId = "";
        $scope.GetRole();
        $scope.GetClasses();
        //$scope.GetAssociatedBranches();
        $scope.$applyAsync();
        $scope.SetFocus('#txtEnquiryType');
        if (flag == 0)
        {
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
                { "HeaderText": "Role Name", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "School", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.UserData, window.document.title);
    };
};