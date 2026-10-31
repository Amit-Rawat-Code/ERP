app.ComposeSMSController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSMSSubject');
    $scope.SendSMStoEmployeeList = [];
    $scope.tempList = [];
    $scope.ddlMSSubject_Change = function () {
        $scope.LoadSMSTemplate();
    }
    $scope.ddlUserType_Change = function () {
        $scope.LoadSMSTemplate();
        $scope.ddlUnCheckAll('Sections');
        $scope.StudentList = [];
        $scope.tempList = [];
        var table = $('#tblSendSMStoEmployeeList').DataTable();
        table.destroy();
        angular.forEach($scope.EmployeesList, function (employee) {
            $scope.tempList.push({
                Department: employee.Department, Designation: employee.Designation, EmployeeId: employee.EmployeeId, FullName: employee.FullName, Father: employee.Father, EmployeeTypeCode: employee.EmployeeType, EmployeeTypeName: employee.EmployeeTypeName
            })
        })
        $scope.SendSMStoEmployeeList = $scope.tempList;
    }
    
    $scope.chk_Change = function () {
        var table = $('#tblStudentList').DataTable();
        table.destroy();
        $scope.LoadAllStudentsUsingClassSectionList(1, sessionId, '', $filter('filter')($scope.Sections, { chk: true }, true));
    }
    $scope.Section_Click = function () {
        var table = $('#tblStudentList').DataTable();
        table.destroy();
        $scope.LoadAllStudentsUsingClassSectionList(1, sessionId, '', $filter('filter')($scope.Sections, { chk: true }, true));
    }
    $scope.ddlSMSTemplate_Change = function () {
        $scope.TextMsg = ($filter('filter')($scope.SMSTemplateList, { Code: $scope.SMSTemplateCode }, true))[0].SmsTemplateDetail;
    }
    

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
  
            collectionobj.SmsSubjectCode = $scope.SMSSubjectCode
            collectionobj.SmsTemplateCode = $scope.SMSTemplateCode
            collectionobj.Language = $scope.Language
            collectionobj.TextMsg = $scope.TextMsg
            collectionobj.CopytoSenderListofEmployee = JSON.stringify($filter('filter')($scope.EmployeesList, { chk: true }))
            collectionobj.RoleId = $scope.ComposeBy
            collectionobj.UserType = $scope.UserType
            collectionobj.ListofSelectedClass = JSON.stringify($filter('filter')($scope.Sections, { chk: true }))
            collectionobj.ListofSelectedStudents = JSON.stringify($filter('filter')($scope.StudentList, { chk: true }))
            collectionobj.ListofSelectedEmployee = JSON.stringify($filter('filter')($scope.SendSMStoEmployeeList, { chk: true }))
            collectionobj.FYId = fyId
            collectionobj.RelationshipId = relationshipId
            collectionobj.SessionId = sessionId
            collectionobj.CreatedBy = userid
            collectionobj.Action = "1";

            var getData = myService.methode('POST', '../Api/SMSTransactionApi/InsertUpdateDeleteComposeSms', collectionobj);
            getData.then(function (response) {
                if (Number(response.data.Sms_Result) > 0) {
                    if (response.data.Result == "1") {
                        showMsgBox('999', "Send", "sms sent successfully.", 'success', 'btn-success')
                        $scope.ClearControl(1);
                    }
                }
                else {
                    showMsgBox(response.data.Sms_Result);
                }
            });
        }
    };

    $scope.SMSTemplateMaster = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/SMSTransactionApi/GetComposeSms', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Send Date", "HeaderValue": "SendDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "IdDateType": "Yes" },
                    { "HeaderText": "Compose By", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SMS Subject", "HeaderValue": "SmsSubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Send To", "HeaderValue": "UserType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "SMS Template", "HeaderValue": "SmsTemplateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Language", "HeaderValue": "Language", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Copy To Sender", "HeaderValue": "CopytoSenderListofEmployee", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "TextMsg", "HeaderValue": "TextMsg", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes", "HeaderValue": "ListofSelectedClass", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Students", "HeaderValue": "ListofSelectedStudents", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employees", "HeaderValue": "ListofSelectedEmployee", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            

            $scope.SMSTemplateMaster = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

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
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.SMSSubjectCode = "";
        $scope.SMSTemplateCode = "";
        $scope.Language = "";
        $scope.TextMsg = "";
        $scope.StudentList = [];
        $scope.ComposeBy = "";
        $scope.UserType = "";
        angular.forEach($scope.EmployeesList, function (employee) { employee.chk = false });
        angular.forEach($scope.Sections, function (section) { section.chk = false });
        angular.forEach($scope.SendSMStoEmployeeList, function (employee) { employee.chk = false });
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSMSSubject');
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

}