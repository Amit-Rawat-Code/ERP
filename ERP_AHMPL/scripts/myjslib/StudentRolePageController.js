app.StudentRolePageController = function ($scope, $element, $filter, myService)
{
    $scope.CurrentDate = new Date();
    $scope.TillDate = new Date();
    $scope.UserTypeId = "5";
    $scope.hfId = '';   

    $scope.UserNameList = [];
    $scope.GetUserDetail = function () {        
        $scope.Show = true;
        var collectionobj = {};
        collectionobj.Action = "2";
        collectionobj.UserTypeId = $scope.UserTypeId;
        collectionobj.CreatedBy = userid;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetailForStudentRole', collectionobj);
        getData.then(function (response) {
            $scope.UserNameList = response.data;
        });
    }   

    $scope.UserNameListNew = {};
    $scope.GetEdit = function (ID) {
        debugger
        $scope.UserNameList = $filter('filter')($scope.UserNameList, { 'UserId': ID }, true);     
        $scope.GetHistory(ID);

        $scope.hfId = ID;
        if ($scope.UserNameList[0].Pre_Date == null) {
            $scope.TillDate = new Date();
        }
        else {
            $scope.TillDate = $scope.ConverDate($scope.UserNameList[0].Pre_Date);
        }
        $scope.UserNameListNew = $scope.UserNameList[0];
        $scope.Show = false;
        $scope.SearchBox = '';
    }
      
    $scope.UserRoleList = [];
    $scope.GetUserRole = function () {        
        var collectionobj = {};
        collectionobj.Action = "3";
        //collectionobj.UserTypeId = $scope.UserTypeId;
        //collectionobj.CreatedBy = userid;
        //collectionobj.SessionId = sessionId;
        //collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetailForStudentRole', collectionobj);
        getData.then(function (response) {
            $scope.UserRoleList = response.data;          
        });
    }

    $scope.UserNameListWithoutRole = [];
    $scope.SearchRecordWithoutRole = function () {
        debugger
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.Action = "6";
        collectionobj.CreatedBy = userid;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetailForStudentRole', collectionobj);
            getData.then(function (response) {
            $scope.UserNameListWithoutRole = response.data;
        });
    };

    $scope.WithoutRoleList = {};
    $scope.GetEdit1 = function (ID) {        
        $scope.hfId = ID;     
        $scope.UserNameListWithoutRole = $filter('filter')($scope.UserNameListWithoutRole, { UserId: Number($scope.hfId) }, true);
        $scope.GetHistory(ID);
        $scope.WithoutRoleList = $scope.UserNameListWithoutRole[0];
        $scope.Show = false;
        $scope.SearchBox1 = '';
    }

    $scope.HistoryList = [];
    $scope.GetHistoryDetail = function () {
        debugger
        var collectionobj = {};
        $scope.Show = true;
        collectionobj.Action = "7";
        collectionobj.CreatedBy = userid;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetailForStudentRole', collectionobj);
        getData.then(function (response) {
            $scope.HistoryList = response.data;
        });
        //; GetHistoryDetail();
        
    };   

    $scope.HistoryListNew = [];
    $scope.GetHistory = function (ID) {
        $scope.HistoryListNew = $filter('filter')($scope.HistoryList, { UserId: Number(ID) }, true);
    }

    $scope.BlankHistoryList = function () {
        $scope.HistoryList = [];
        $scope.HistoryListNew = [];
    }


    //----------------------------------------------------------------------------------------------------
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.UserId = $scope.hfId;
           
            if ($scope.StudentList == 0) {
                collectionobj.UserName = $scope.UserNameList[0].UserName;
                collectionobj.PreRoleId = $scope.UserNameList[0].Pre_RoleID;
                collectionobj.PreAssignRoleDate = $scope.UserNameList[0].Pre_Date;
            }
            else {
                collectionobj.UserName = $scope.UserNameListWithoutRole[0].UserName;
                collectionobj.PreRoleId = "0";
                collectionobj.PreAssignRoleDate = moment($scope.CurrentDate).format('DD-MMM-YYYY');
            }
            collectionobj.CurrentDate = moment($scope.CurrentDate).format('DD-MMM-YYYY');
            collectionobj.RoleId = $scope.ChangeRole;
            collectionobj.ToDate = moment($scope.TillDate).format('DD-MMM-YYYY');
            collectionobj.Remark = $scope.remark;

            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "4";
                collectionobj.CreatedBy = userid;
            }            
            var getData = myService.methode('POST', '../Api/UserTransactionApi/UpdateUserRoleAssignmentForStudentRole', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
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
        $scope.disableAdd = false;
        $scope.hfId = "";
               
        $scope.UserNameList = [];
        $scope.UserNameListNew = [];

        $scope.UserNameListWithoutRole = [];
        $scope.WithoutRoleList = [];

        $scope.HistoryList = [];
        $scope.HistoryListNew = [];

        $scope.remark = '';
        $scope.ChangeRole = '';
        $scope.TillDate = new Date();

        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.StudentRoleList = [];    
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;        
        var getData = myService.methode('POST', '../Api/UserMasterApi/GetUserDetailForStudentRole', collectionobj);
        getData.then(function (response) {
            var tblheader = 
                [
                    { "HeaderText": "Sr.No.", "Value": "SrNo", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },                    
                    { "HeaderText": "Assign Date", "HeaderValue": "CurrentDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "User Name", "HeaderValue": "UserName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Current Role", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Current Role Till Date", "HeaderValue": "CurrentAssignRoleDate", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Previous Role", "HeaderValue": "PreRoleName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Previous Role Till Date", "HeaderValue": "PreAssignRoleDate", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.StudentRoleList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);           
        });
    };

}