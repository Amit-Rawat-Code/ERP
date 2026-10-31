app.RegistrationFormFeeHeadMasterController = function ($scope, $element, $filter, myService) {
    $scope.selectedClassCount = 0;
    $scope.GetClasses();
    $scope.AllClass = function () {
        angular.forEach($scope.ClassList, function (CI) {
            CI.IsActive = $scope.chkAllClass;
        });
    }

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            
            var collectionobj = {};
            collectionobj.SubmissionType = $scope.SubmissionType;
            collectionobj.RegistrationFeeHead = $scope.RegistrationFeeHead;
            //collectionobj.RegistrationAmount = $scope.RegistrationAmount;
            collectionobj.AcademicYear = $scope.SessionId;

            let filteredlist = $filter('filter')($scope.ClassList, { 'IsActive': true })
            let ccresult = filteredlist.map(function (obj)
            {
                
                if (obj.Amount == null || obj.Amount == 'undefined' || obj.Amount == '')
                {
                    alert("Amount can not be blank.");
                    document.getElementById($scope.Amount).focus();
                    return false;
                }
                else
                {
                    return { Code: obj.Code, IsActive: obj.IsActive, Amount: obj.Amount };
                }
            });
            
            collectionobj.ClassCode = JSON.stringify(ccresult);
            collectionobj.IsActive = $scope.IsActive;           
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1"; 
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/RegistrationMasterApi/InsertUpdateDeleteRegistrationFeeHeadMaster', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.RegistrationFeeHeadMasterList = [];

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

        var getData = myService.methode('POST', '../Api/RegistrationMasterApi/GetRegistrationFeeHead', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Type", "HeaderValue": "Type", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Registration Fee Head", "HeaderValue": "RegistrationFeeHead", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Registration Fee", "HeaderValue": "Amount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Academic Year", "Value": "SessionId", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.RegistrationFeeHeadMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, $scope.RegistrationFeeHeadMasterList);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.RegistrationFeeHeadMasterList = $filter('filter')($scope.RegistrationFeeHeadMasterList, { 'Code': $scope.hfId }, true);

                $scope.SubmissionType = $scope.RegistrationFeeHeadMasterList[0].Type;
                $scope.RegistrationFeeHead = $scope.RegistrationFeeHeadMasterList[0].RegistrationFeeHead;
                $scope.RegistrationAmount = $scope.RegistrationFeeHeadMasterList[0].Amount;
                $scope.SessionId = $scope.RegistrationFeeHeadMasterList[0].SessionId.toString();
                $scope.IsActive = $scope.RegistrationFeeHeadMasterList[0].IsActive == true ? "true" : "false";
                let ccresult = $scope.RegistrationFeeHeadMasterList.map(function (obj) {
                    return { Code: obj.ClassCode, ClassName: obj.ClassName, IsActive: obj.IsActive, Amount: obj.Amount };
                });

                $scope.ClassList = ccresult;

                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSubmissionMode', true);
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
        var getData = myService.methode('POST', '../Api/RegistrationMasterApi/InsertUpdateDeleteRegistrationFeeHeadMaster', collectionobj);
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
        $scope.RegistrationFeeHead = "";
        $scope.RegistrationAmount = "";
        $scope.SessionId = "";
        $scope.ddlActive = true;
        $scope.SubmissionType = "";
        $scope.GetClasses();
        $scope.AllClass();
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSubmissionMode');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Type", "HeaderValue": "Type", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Registration Fee Head", "HeaderValue": "RegistrationFeeHead", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Registration Fee", "HeaderValue": "Amount", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Academic Year", "Value": "SessionId", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RegistrationFeeHeadMasterList, window.document.title);
    };
}