app.ObservationCriteriaMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtCriteriaName');


    $scope.SaveRecord = function () {
       
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.Code = $scope.hfId;
            collectionobj.CriteriaName = $scope.CriteriaName;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.IsActive = $scope.IsActive;
            if ($scope.Save == 'Save')
                collectionobj.Action = 1;
            else if ($scope.Save == 'Edit')
                collectionobj.Action = 2;

            var getData = myService.methode('POST', '../Api/HRManagementMasterApi/InsertUpdateDeleteObservationCriteria', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };


    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        
        var collectionobj = {};
        collectionobj.Action = '4';
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/HRManagementMasterApi/GetObservationCriteria', collectionobj);
        getData.then(function (response) {
           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Criteria", "HeaderValue": "CriteriaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];

            $scope.ObservationCriteriaList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ObservationCriteriaList = $filter('filter')($scope.ObservationCriteriaList, { 'Code': $scope.hfId });

                $scope.CriteriaName = row[1];
                $scope.IsActive = row[2] == "Yes" ? "true" : "false";

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtCriteriaName', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.DeleteObservationCriteria);
    };
    $scope.DeleteObservationCriteria = function () {

        var collectionobj = {};
        collectionobj.Code = $scope.hfId;

        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "3";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/HRManagementMasterApi/InsertUpdateDeleteObservationCriteria', collectionobj);
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
        $scope.IsActive = "true";
        $scope.hfId = "";
        $scope.ObservationCriteriaList = [];
        $scope.CriteriaName = "";
        $scope.SetFocus('#txtCriteriaName');
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
                { "HeaderText": "Criteria", "HeaderValue": "CriteriaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];

        $scope.PrintMaster(tblheader, $scope.ObservationCriteriaList, window.document.title);
    };


}