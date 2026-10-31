app.ClassFeeStructureMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');

    $scope.GetFeeHeadDetail = function (AcademicSessionId) {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = AcademicSessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetFeeHeadDetail', collectionobj);
        getData.then(function (response) {
            $scope.FeeHeadList = response.data;
        });
    }

    $scope.ddlSession_Change = function (AcademicSessionId) {
        if (AcademicSessionId != "") {
            $scope.ClassFeeStructureList = [];
            $scope.AddRow();
            $scope.GetFeeHeadDetail(AcademicSessionId);
        }
    }
    $scope.ddlClass_Change = function (classcode) {
        if (classcode != "") {
            $scope.GetSections(classcode)
        }
    }
    $scope.SetFrequency = function (FeeHeadCode, index) {
        $scope.ClassFeeStructureList[index].Frequency = $filter('filter')($scope.FeeHeadList, { 'Code': FeeHeadCode }, true)[0].FrequencyName;
    }

    $scope.CalculateYearlyAmt = function (FeeHeadCode, NetAmt, index) {
        if (NetAmt != "") {
            $scope.ClassFeeStructureList[index].YearlyAmt = (($filter('filter')($scope.FeeHeadList, { 'Code': FeeHeadCode }, true)[0].FrequencyValue) * NetAmt)
        }
        else { $scope.ClassFeeStructureList[index].YearlyAmt = ""; }
    }

    $scope.ShowDetails = function (FeeHeadCode, NetAmt, index) {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.FeeHeadCode = FeeHeadCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetDueMonthList', collectionobj);
        getData.then(function (response) {
            $scope.DueMonthList = response.data;
            $scope.NetAmt = NetAmt;
            if (FeeHeadCode == "" && NetAmt == "") { $scope.total = ""; }
            else {
                $scope.total = (($filter('filter')($scope.FeeHeadList, { 'Code': FeeHeadCode }, true)[0].FrequencyValue) * NetAmt);
            }
        });
    }
    $scope.AddRow = function () {
        $scope.ClassFeeStructureList.push({
            Srno: "1",
            FeeHeadCode: "",
            Frequency: "",
            NetAmt: "",
            YearlyAmt: "",
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.ClassFeeStructureList = $filter('filter')($scope.ClassFeeStructureList, { Srno: '!' + srno });
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {           
            var collectionobj = {};
            collectionobj.AcademicSessionId = $scope.SessionId;
            collectionobj.FeeStructureGroupCode = $scope.FeeStructureGroup;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.FeeStructureData = JSON.stringify($scope.ClassFeeStructureList);
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteClassFeeStructureMaster', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ClassFeeStructureMasterList = [];
    $scope.ClassFeeStructureDetailList = [];
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
        var getData = myService.methode('POST', '../Api/FeeMasterApi/GetClassFeeStructureMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Academic Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Fee Structure Group Name", "HeaderValue": "FeeStructureGroupName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            
            $scope.ClassFeeStructureMasterList = response.data.Table;
            $scope.ClassFeeStructureDetailList = response.data.Table1;
            loadDataUsingPreDefinedColumn(tblheader, $scope.ClassFeeStructureMasterList);            
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ClassFeeStructureMasterList = $filter('filter')($scope.ClassFeeStructureMasterList, { 'Code': $scope.hfId }, true);
                $scope.SessionId = $scope.ClassFeeStructureMasterList[0].AcademicSessionId.toString();
                $scope.FeeStructureGroup = $scope.ClassFeeStructureMasterList[0].FeeStructureGroupCode;
                $scope.$parent.ClassCode = $scope.ClassFeeStructureMasterList[0].ClassCode;
                $scope.ddlClass_Change($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $scope.ClassFeeStructureMasterList[0].SectionCode;
                $scope.StreamCode = $scope.ClassFeeStructureMasterList[0].StreamCode;           
                $scope.IsActive = $scope.ClassFeeStructureMasterList[0].IsActive == true ? "true" : "false";
                $scope.ddlSession_Change($scope.SessionId);
                $scope.ClassFeeStructureList = $filter('filter')($scope.ClassFeeStructureDetailList, { 'Code': $scope.hfId }, true)
                $scope.disableDelete = false;
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSession', true);
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
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/FeeMasterApi/InsertUpdateDeleteClassFeeStructureMaster', collectionobj);
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
        $scope.SessionId = "";
        $scope.FeeStructureGroup = "";
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.ClassFeeStructureList = [];
        $scope.ClassFeeStructureDetailList = [];
        //$scope.AddRow();
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlSession');
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
                { "HeaderText": "Academic Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Fee Structure Group Name", "HeaderValue": "FeeStructureGroupName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "HeaderValue": "SectionName", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Stream", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.ClassFeeStructureMasterList, window.document.title);
    };


}