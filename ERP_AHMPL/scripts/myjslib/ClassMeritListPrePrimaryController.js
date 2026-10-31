app.ClassMeritListPrePrimaryController = function ($scope, $element, $filter, myService) {
    $scope.selectedStudentCount = 0;

    $scope.CollectStudent = function () {
        var collectionobj = {};
        collectionobj.Action = 5
        collectionobj.ClassCode = JSON.stringify($filter('filter')($scope.ClassListRespectOfCreatedBatch, { 'IsActive': true }));
        collectionobj.BatchCode = $scope.BatchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimary', collectionobj);
        data.then(function (response) {
            $scope.StudentData = response.data.Table;
            if ($scope.StudentData == undefined || $scope.StudentData.length == 0) {
                showMsgBox('Sorry no student found.')
            }
            else {
                $scope.GetClasses();
            }
        });

    }

    $scope.AllStudent = function (value) {
        angular.forEach($scope.StudentData, function (SI) {
            SI.IsActive = value;
        });
    }

    $scope.GetClassesWithRespectOfCreatedBatches = function () {
        var collectionobj = {};
        collectionobj.Action = 5;
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

    $scope.SaveRecord = function () {

        if (isValidate()) {
            $scope.TotalBatches = $filter('filter')($scope.StudentData, { 'IsActive': true })

            if ($scope.TotalBatches !== undefined && $scope.TotalBatches.length > 0) {
                var collectionobj = {};

                collectionobj.StudentData = JSON.stringify($filter('filter')($scope.StudentData, { 'IsActive': true }));
                collectionobj.MeritCode = $scope.MeritCode;

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
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteClassMeritListPrePrimary', collectionobj);

                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });

            } else {
                showMsgBox('Sorry no student found, at least one student should be selected.')
            }
        }

    };

    $scope.ClassMeritListPrePrimaryList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimary', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Batches", "HeaderValue": "Batches", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Classes", "HeaderValue": "Classes", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Merit Base", "Value":"MeritId","HeaderValue": "MeritBase", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "List Strangth", "HeaderValue": "NoOfApplicants", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.ClassMeritListPrePrimaryList = response.data.Table;
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.ClassMeritListPrePrimaryList = $filter('filter')($scope.ClassMeritListPrePrimaryList, { 'Code': $scope.hfId }, true);
                $scope.MeritCode = $scope.ClassMeritListPrePrimaryList[0].MeritId.toString();


                var collectionobj = {};
                collectionobj.Action = 7;
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;

                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimary', collectionobj);
                getData.then(function (response) {
                    $scope.ClassListRespectOfCreatedBatch = response.data.Table;
                    $scope.StudentData = response.data.Table1;
                    $scope.GetClasses();
                });

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#sdata', true);
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

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteClassMeritListPrePrimary', collectionobj);
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
        $scope.disableForEdit = false;
        $scope.ClassListRespectOfCreatedBatch = "";
        $scope.StudentData = "";
        $scope.MeritCode = "";
        $scope.GetClassesWithRespectOfCreatedBatches();
        $scope.$applyAsync();
        $scope.SetFocus('#btncollect');
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
                { "HeaderText": "Merit Base", "Value": "MeritId", "HeaderValue": "MeritBase", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "List Strangth", "HeaderValue": "NoOfApplicants", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];


        $scope.PrintMaster(tblheader, $scope.ClassMeritListPrePrimaryList, window.document.title);
    };
}
