app.CreateBatchTimeSlotController = function ($scope, $element, $filter, myService) {
    $scope.disableForEdit = false;
    $scope.chkAllDocument = false;

    $scope.GetClassesWithRespectOfCreatedBatches = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetClassesWithRespectOfCreatedBatches', collectionobj);
        getData.then(function (response) {
            $scope.ClassListRespectOfCreatedBatch = response.data
        });
    };
    $scope.selectedClassCount = 0;
    $scope.GetClassesWithRespectOfCreatedBatches();
    $scope.AllClass = function () {
        angular.forEach($scope.ClassListRespectOfCreatedBatch, function (CI) {
            CI.IsActive = $scope.chkAllClass;
        });
    }

    $scope.GetClassesWithRespectOfRegistration = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetCollectStudent', collectionobj);
        getData.then(function (response) {
            $scope.ClassListRespectOfRegistration = response.data
        });
    };

    $scope.selectedDocumentCount = 0;
    $scope.GetDocuments();
    $scope.AllDocument = function () {
        angular.forEach($scope.ListedDocuments, function (DI) {
            DI.IsActive = $scope.chkAllDocument;
        });
    }

    $scope.CollectBatches = function () {
        var collectionobj = {};
        collectionobj.Action = 6
        collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassListRespectOfCreatedBatch, { 'IsActive': true }));

        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchTimeSlot', collectionobj);
        data.then(function (response) {
            $scope.AssociatedBatchesList = response.data;
        });

    }
    $scope.BatchDetailList = function (batchcode) {
        var collectionobj = {};
        collectionobj.Action = 7
        collectionobj.BatchesData = batchcode;

        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchTimeSlot', collectionobj);
        data.then(function (response) {
            $scope.BatchDetailedList = response.data;
        });

    }

    $scope.CollectStudents = function () {
        var collectionobj = {};
        collectionobj.Action = 8
        collectionobj.ClassCode = $scope.ClassCode;

        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionMasterApi/GetClassesWithRespectOfCreatedBatches', collectionobj);
        data.then(function (response) {
            $scope.StudentsList = response.data;
        });

    }

    $scope.SaveRecord = function () {
      
        if (isValidate()) {
            $scope.TotalBatches = [];
            $scope.TotalBatches = $filter('filter')($scope.AssociatedBatchesList, { 'IsActive': true });

            if ($scope.TotalBatches !== undefined && $scope.TotalBatches.length > 0) {
                var collectionobj = {};
                collectionobj.SlotDate = $scope.SlotDate;
                collectionobj.SlotTime = $scope.SlotTime;
                collectionobj.BatchDuration = $scope.BatchDuration;
                collectionobj.BatchInterval = $scope.BatchInterval;
                collectionobj.IsWrittenExam = $scope.IsWrittenExam;
                collectionobj.Remark = $scope.Remark;

                collectionobj.BatchesData = JSON.stringify($filter('filter')($scope.AssociatedBatchesList, { 'IsActive': true }));
                collectionobj.DocumentsData = JSON.stringify($filter('filter')($scope.ListedDocuments, { 'IsActive': true }));


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
                var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteBatchTimeSlot', collectionobj);

                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            }
            else {
                showMsgBox('No batch selected, at least select one batch should be selected.')
            }

        }
    };

    $scope.AddNewRecord = function () {
        if (isValidateList()) {
            //
            var collectionobj = {};
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.DocumentsData = $scope.StudentRegNo;
            collectionobj.BatchesData = $scope.BatchDetailedList[0].BatchCode;

            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.Action = 9;
            collectionobj.CreatedBy = userid;


            var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteBatchTimeSlot', collectionobj);

            getData.then(function (response) {
                console.log(response.data);
                if (response.data == "1") {
                    $scope.AddNewRecord();
                    $scope.BatchDetailList($scope.BatchDetailedList[0].BatchCode);
                    $('#addnewrecordmclose').click();
                }

                

            });

        }
    };

    $scope.BatchTimeList = [];
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
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchTimeSlot', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Batches", "HeaderValue": "Batches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slot Date", "HeaderValue": "SlotDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Slot Time", "HeaderValue": "StartTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Batch Duration", "HeaderValue": "DurationOfEachBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Batch Interval", "HeaderValue": "BreakBetweenBatches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Written Exam", "HeaderValue": "WrittenExamRequired", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Documents", "HeaderValue": "Documents", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }

                ];

            $scope.BatchTimeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {;
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //
                $scope.BatchTimeList = $filter('filter')($scope.BatchTimeList, { 'Code': $scope.hfId }, true);
                
                $scope.SlotDate = new Date($scope.BatchTimeList[0].MSlotDate);
                $scope.SlotTime = new Date($scope.BatchTimeList[0].MSlotTime);
                $scope.BatchDuration = $scope.BatchTimeList[0].DurationOfEachBatch;
                $scope.BatchInterval = $scope.BatchTimeList[0].BreakBetweenBatches;
                $scope.IsWrittenExam = $scope.BatchTimeList[0].WrittenExamRequired?'true':'false';
                $scope.Remark = $scope.BatchTimeList[0].Remark;

                disableForEdit = true;

                var collectionobj = {};
                collectionobj.Action = 10;
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;


                var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchTimeSlotDetail', collectionobj);
                getData.then(function (response) {

                    $scope.AssociatedBatchesList = response.data.Table;
                    $scope.ListedDocuments = response.data.Table1;
                });

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableForEdit = true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#NoOfStudentPerBatch', true);
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
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Code = $scope.hfId;

        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteBatchTimeSlot', collectionobj);
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
        $scope.disableForEdit = false;
        $scope.hfId = "";
        $scope.SlotDate = "";
        $scope.SlotTime = "";
        $scope.BatchDuration = "";
        $scope.BatchInterval = "";
        $scope.IsWrittenExam = "";
        $scope.Remark = "";

        $scope.AssociatedBatchesList = "";
        $scope.ListedDocuments = "";

        $scope.$applyAsync();
        $scope.SetFocus('#SlotDate');

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
                { "HeaderText": "Batches", "HeaderValue": "Batches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Slot Date", "HeaderValue": "SlotDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Slot Time", "HeaderValue": "StartTime", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Batch Duration", "HeaderValue": "DurationOfEachBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Batch Interval", "HeaderValue": "BreakBetweenBatches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Written Exam", "HeaderValue": "WrittenExamRequired", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Documents", "HeaderValue": "Documents", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }

            ];


        $scope.PrintMaster(tblheader, $scope.BatchTimeList, window.document.title);
    };
}