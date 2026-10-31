app.TestAmitController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#txtTitle');
    $('#txtReportTitle').css('display', 'none');
 
    $scope.GetClassUsingShift = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 8;

        var getData = myService.methode('POST', "../Api/TestApi/GetShiftClassMapping", collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data
        });
    }
    $scope.ddlShift_change = function () {
        $scope.GetClassUsingShift();
        $scope.GetPeriods();
    }

    $scope.GetSectionUsingShiftClass = function () {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 9;

        var getData = myService.methode('POST', "../Api/TestApi/GetShiftClassMapping", collectionobj);
        getData.then(function (response) {
            $scope.Sections = response.data
        });
    }
    $scope.ddlClass_Change = function () {
        $scope.GetSectionUsingShiftClass();
    }

    $scope.TimeTableList = [];

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function ()
    {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;


        var getData = myService.methode('POST', "../Api/TestApi/GetTestTableManualList", collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Got Input", "HeaderValue": "GotInput", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Shift", "HeaderValue": "ShiftName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.TimeTableList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $scope.hideLoader();
            $('#example tbody').on('dblclick', 'tr', function ()
            {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.TimeTableList = $filter('filter')($scope.TimeTableList, {Code: $scope.hfId})

                if ($scope.TimeTableList.length > 0 && $scope.TimeTableList != undefined) {
                    
                    $scope.isShiftDisabled = true;
                    $scope.isClassDisabled = true;
                    $scope.isSectionDisabled = true;
                    $scope.isBranchDisabled = true;
                    
                    $scope.GotInput = $scope.TimeTableList[0].GotInput;
                    $scope.ShiftCode = $scope.TimeTableList[0].ShiftCode;
                    $scope.GetClassUsingShift();
                    $scope.ClassCode = $scope.TimeTableList[0].ClassCode;
                    $scope.GetSectionUsingShiftClass();
                    $scope.SectionCode = $scope.TimeTableList[0].SectionCode;
                    $scope.BranchCode = $scope.TimeTableList[0].BranchCode;
                }
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtGotInput', true);
                $scope.hideLoader();

            });
        });
        $scope.hideLoader();
    };

    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.ShiftCode = $scope.ShiftCode;
            collectionobj.GotInput = $scope.GotInput;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;

            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
            }
            else
            {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/TestApi/InsertUpdateDeleteTestTable", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Code = $scope.hfId;
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 3;

        var getData = myService.methode('POST', "../Api/TestApi/InsertUpdateDeleteTestTable", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
            };
        });
    };
    $scope.ClearControl = function (flag) {
        if (flag == 1) {           
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () {
                $scope.ResetControl(0);
                $scope.isShiftDisabled = false;
                $scope.isClassDisabled = false;
                $scope.isSectionDisabled = false;
                $scope.isBranchDisabled = false;
            });
        }
    };

    $scope.ResetControl = function (flag) {        
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.SetFocus('#txtGotInput');
        $scope.ShiftCode = "";
        $scope.hfId = "";
        $scope.ClassCode = "";
        $scope.SectionCode = "";
        $scope.BranchCode = "";
        $scope.ShiftCode = "";
        $scope.GotInput = "";
        $scope.rows = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }
};