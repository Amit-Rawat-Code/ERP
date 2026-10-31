app.SessionMasterController = function ($scope, $element, $filter, myService) {
    
    $scope.SetFocus('#txtSessionText');
    
    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj._SessionId = $scope.hfId;
            collectionobj.SessionText = $scope.SessionText;
            collectionobj.SessionStartDate = moment($scope.SessionStartDate).format('YYYY-MMM-DD');
            collectionobj.SessionEndDate = moment($scope.SessionEndDate).format('YYYY-MMM-DD');;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.IsAdmActiveSession = $scope.IsAdmActiveSession;
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

            var getData = myService.methode('POST', "../Api/GblMasterApi/InsertUpdateDeleteSessionMaster", collectionobj);
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
        $scope.SessionText = "";
        $scope.SetFocus('#txtSessionText');
        $scope.SessionStartDate = "";
        $scope.SessionEndDate = "";
        $scope.IsActive = "true";
        $scope.IsAdmActiveSession = "false";
        $scope.hfId = "";
        $scope.SessionMasterList = [];
        if (flag == 0) {
            showMsgBox('4');
        };

    };
    $scope.SessionMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started=function() {
        var collectionobj = {};        
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.Action = 4;
        var getData = myService.methode('POST', "../Api/GblMasterApi/GetSessionMaster", collectionobj);
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "SessionId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Session Name", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "From Date", "HeaderValue": "FromDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "To Date", "HeaderValue": "ToDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" },
               { "HeaderText": "Admission Active For This Session", "HeaderValue": "AdmActiveSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
            $scope.SessionMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
             
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;
                $scope.SessionMasterList = $filter('filter')($scope.SessionMasterList, { 'SessionId': $scope.hfId });
                $scope.SessionText = row[1];
                $scope.SessionStartDate = new Date(row[2]);
                $scope.SessionEndDate = new Date(row[3]);
                $scope.IsActive = row[4] == "Yes" ? "true" : "false";
                $scope.IsAdmActiveSession = row[5] == "Yes" ? "true" : "false";

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtSessionText', true);
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
                { "HeaderText": "Sr.No.", "Value": "SessionId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Session Name", "HeaderValue": "SessionText", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "From Date", "HeaderValue": "SessionStartDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "To Date", "HeaderValue": "SessionEndDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.SessionMasterList, window.document.title);
    };
}