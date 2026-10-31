app.CreateBatchController = function ($scope, $element, $filter, myService) {
    $scope.TotalBatches = 0;
    $scope.disableForEdit = false;
    $scope.StudentsList = [];

    $scope.GetOrderByStudent = function () {
        var collectionobj = {};
        collectionobj.Action = 9
        collectionobj.Code = $scope.hfId;
        collectionobj.OrderBy = $scope.OrderBy;
        collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassListRespectOfRegistration, { 'chk': true }));
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionMasterApi/GetOrderByStudent', collectionobj);
        data.then(function (response) {
            $scope.StudentsList = response.data;
            $('#myModal').modal({
                show: 'true'
            }); 
        });

    }
    $scope.ddlSession_Change = function () {
        $scope.CollectStudent();
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
    $scope.selectedClassCount = 0;
    $scope.GetClassesWithRespectOfRegistration();
    $scope.AllClass = function () {
        angular.forEach($scope.ClassListRespectOfRegistration, function (CI) {
            CI.IsActive = $scope.chkAllClass;
        });
    }


    $scope.CollectStudent = function () {
        if (isValidate()) {
            $scope.GetOrderByStudent();
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Action = 5
            collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassListRespectOfRegistration, { 'chk': true }));
            collectionobj.AcademicSessionId = $scope.SessionId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var data = myService.methode('POST', '../Api/AdmissionMasterApi/GetCollectStudent', collectionobj);
            data.then(function (response) {
                $scope.hideLoader();
                $scope.NoOfRegdStudent = response.data[0].NoOfStudent;
            });
        }
    }
    $scope.CalculateBatch = function () {
        if ($scope.NoOfStudentPerBatch > $scope.NoOfSelectedStudent) {
            showMsgBox('"No.Of Student Per Batch" can not greater "No.Of Selected Student"');
            $scope.NoOfStudentPerBatch = $scope.NoOfSelectedStudent;
        }
        $scope.TotalBatches = Math.round(parseInt($scope.NoOfSelectedStudent) / parseInt($scope.NoOfStudentPerBatch));
    }

    $scope.CheckAll_1 = function () {
        $scope.StudentsList.map(obj => { obj.chk = $scope.chkAll_1 });
    }

    $scope.UnCheckAll_1 = function () {
        $scope.flag = true;
        $scope.StudentsList.map(obj => { if (obj.chk == false) { $scope.flag = false; return; } });
        $scope.chkAll_1 = $scope.flag;
    }

    $scope.CheckAll_2 = function () {
        $scope.StudentsList.map(obj => { obj.chk = $scope.chkAll_2 });
    }

    $scope.UnCheckAll_2 = function () {
        $scope.flag = true;
        $scope.StudentsList.map(obj => { if (obj.chk == false) { $scope.flag = false; return; } });
        $scope.chkAll_2 = $scope.flag;
    }


    $scope.SaveRecord = function () {
        if (isValidate()) {
            //
            var collectionobj = {};
            collectionobj.NoOfRegdStudent = $scope.NoOfRegdStudent;
            collectionobj.NoOfStudentPerBatch = $scope.NoOfStudentPerBatch;
            collectionobj.TotalBatches = $scope.TotalBatches;
            collectionobj.OrderBy = $scope.OrderBy;
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentsList, { 'chk': true }));
            collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassListRespectOfRegistration, { 'chk': true }));

            collectionobj.SessionId = sessionId;
            collectionobj.AcademicSessionId = $scope.SessionId;

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.TotalBatches !== undefined && $scope.TotalBatches > 0) {

                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                    collectionobj.UpdatedBy = userid;
                    collectionobj.Code = $scope.hfId;
                }
                var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCreateBatch', collectionobj);

                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            }
            else {
                showMsgBox('No batch found to create.')
            }

        }
    };

    $scope.BatchList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Batches", "HeaderValue": "Batches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes", "HeaderValue": "Classes", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "No Of Reg. Student", "HeaderValue": "NoOfRegStudent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Batch Strangth", "HeaderValue": "NoOfStudentPerBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "No of Batch", "HeaderValue": "TotalCreatedBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "OrderBy", "Value": "OrderBy", "HeaderValue": "OrderByText", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.BatchList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //
                $scope.BatchList = $filter('filter')($scope.BatchList, { 'Code': $scope.hfId }, true);

                $scope.NoOfRegdStudent = $scope.BatchList[0].NoOfRegStudent;
                $scope.NoOfStudentPerBatch = $scope.BatchList[0].NoOfStudentPerBatch;
                $scope.TotalBatches = $scope.BatchList[0].TotalCreatedBatch;
                $scope.OrderBy = $scope.BatchList[0].OrderBy.toString();

                var collectionobj = {};
                collectionobj.Action = "8";
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;


                var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetBatchMaster', collectionobj);
                getData.then(function (response) {

                    $scope.ClassListRespectOfRegistration = response.data
                    $scope.GetOrderByStudent();
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

        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCreateBatch', collectionobj);
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
        $scope.NoOfRegdStudent = "";
        $scope.NoOfStudentPerBatch = "";
        $scope.NoOfSelectedStudent = "";
        $scope.StudentsList = [];
        $scope.OrderBy = "";
        $scope.disableForEdit = false;
        $scope.TotalBatches = 0;
        $scope.GetClassesWithRespectOfRegistration();
        $scope.$applyAsync();
        $scope.SetFocus('#NoOfStudentPerBatch');
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
                { "HeaderText": "Classes", "HeaderValue": "Classes", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "No Of Reg. Student", "HeaderValue": "NoOfRegStudent", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Batch Strangth", "HeaderValue": "NoOfStudentPerBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "No of Batch", "HeaderValue": "TotalCreatedBatch", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "OrderBy", "Value": "OrderBy", "HeaderValue": "OrderByText", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];


        $scope.PrintMaster(tblheader, $scope.BatchList, window.document.title);
    };
}