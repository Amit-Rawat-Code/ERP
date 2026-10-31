app.FinancialYearMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlAcademicSession');
    
    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.AcademicSessionID = $scope.AcademicSessionId;
            collectionobj.FinancialYearId = $scope.hfId;
            collectionobj.FinancialYearName = $scope.FinancialYearName;
            collectionobj.FromDate = moment($scope.FromDate).format('YYYY/MMM/DD');
            collectionobj.ToDate = moment($scope.FYEndDate).format('YYYY/MMM/DD');;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', "../Api/GblMasterApi/InsertUpdateDeleteFinancialYearMaster", collectionobj);
            getData.then(function (response) {
                debugger;
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;

        $scope.AcademicSessionId = "";
        $scope.FinancialYearName = "";
        $scope.SetFocus('#ddlAcademicSession');
        $scope.FromDate = "";
        $scope.FYEndDate = "";
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.FinancialYearMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    }
    $scope.FinancialYearMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started=function() {
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 4;
        var getData = myService.methode('POST', "../Api/GblMasterApi/GetFinancialYearMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "FinancialYearId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Academic Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Financial Year Name", "HeaderValue": "FinancialYearName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "From Date", "HeaderValue": "FromDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "To Date", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];

            $scope.FinancialYearMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
             
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;

                $scope.FinancialYearMasterList = $filter('filter')($scope.FinancialYearMasterList, { 'FinancialYearId': $scope.hfId });
                $scope.AcademicSessionId = $scope.FinancialYearMasterList[0].AcademicSessionID.toString();
                $scope.FinancialYearName = row[2];
                $scope.FromDate = new Date(moment(row[3], 'DD-MM-YYYY'));
                $scope.FYEndDate = new Date(moment(row[4], 'DD-MM-YYYY'));
                $scope.IsActive = row[5] == "Yes" ? "true" : "false";

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlAcademicSession', true);
                $scope.hideLoader();
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        showMsgBox('Delete is not permitted.');
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
               { "HeaderText": "Sr.No.", "Value": "FinancialYearId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
               { "HeaderText": "Financial Year Name", "HeaderValue": "FinancialYearName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
               { "HeaderText": "From Date", "HeaderValue": "FromDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
               { "HeaderText": "To Date", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
               { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
           ];
        $scope.PrintMaster(tblheader, $scope.FinancialYearMasterList, window.document.title);
    };
}