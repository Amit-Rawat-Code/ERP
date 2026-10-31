app.ChangeStudentBatchController = function ($scope, $element, $filter, myService, States) {
    $scope.TransferToBatch = "";
    $scope.GetAlottedBatchStudent = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetChangeBatch', collectionobj);
        getData.then(function (response) {
            $scope.AlottedBatchStudents = response.data
        });
    };

    $scope.GetBatches = function () {
        var collectionobj = {};
        collectionobj.Action = 11;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchTimeSlot', collectionobj);
        getData.then(function (response) {
            $scope.ActiveBatchesList = response.data
        });
    };

    $scope.GetAlottedBatchStudent();

    $scope.SetStudentRecord = function (selectedStudent) {
        
        $scope.textFilter = selectedStudent.StudentName;
        $scope.RegNo = selectedStudent.RegNo;
        $scope.StudentClass = selectedStudent.ClassName;
        $scope.ActiveBatchName = selectedStudent.BatchName;
        $scope.ActiveTimeSlot = selectedStudent.TimeSlot;
    };

    $scope.ToBeTransfer = function () {
        if ($scope.TransferToBatch == "")
            return;      
        $scope.TransTimeSlot = ($filter('filter')($scope.ActiveBatchesList, { 'Code': $scope.TransferToBatch }))[0].TimeSlot;
    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            //
            var collectionobj = {};
            collectionobj.BatchCode = $scope.TransferToBatch;
            collectionobj.RegNo = $scope.RegNo;

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
            }
            var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteChangeBatch', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });

        }
    };

    $scope.ChangeChangeBatchList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetChangeBatch', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Student", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "RegNo", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Batch", "HeaderValue": "BatchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Time Slot", "HeaderValue": "TimeSlot", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.ChangeBatchList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //
                //$scope.ChangeBatchList = $filter('filter')($scope.ChangeBatchList, { 'Code': $scope.hfId }, true);
                var selectedStudent = $filter('filter')($scope.AlottedBatchStudents, { 'RegNo': $scope.ChangeBatchList[0].RegNo })
                $scope.SetStudentRecord(selectedStudent[0]);
                $scope.TransferToBatch = $scope.ChangeBatchList[0].BatchCode;
                $scope.ToBeTransfer($scope.TransferToBatch);

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtStudent', true);
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
        collectionobj.BatchCode = $scope.TransferToBatch;
        collectionobj.RegNo = $scope.RegNo;

        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;


        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteChangeBatch', collectionobj);
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
        $scope.textFilter = "";
        $scope.RegNo = "";
        $scope.StudentClass = "";
        $scope.ActiveBatchName = "";
        $scope.ActiveTimeSlot = "";
        $scope.TransTimeSlot = "";
        $scope.TransferToBatch = "";
        $scope.GetAlottedBatchStudent();
        $scope.$applyAsync();
        $scope.SetFocus('#txtStudent');
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
                { "HeaderText": "Student", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "RegNo", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Batch", "HeaderValue": "BatchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Time Slot", "HeaderValue": "TimeSlot", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        $scope.PrintMaster(tblheader, $scope.ChangeBatchList, window.document.title);
    };
}
