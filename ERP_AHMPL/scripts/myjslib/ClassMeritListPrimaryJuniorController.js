app.ClassMeritListPrimaryJuniorController = function ($scope, $element, $filter, myService) {
    $scope.selectedStudentCount = 0;

    $scope.CollectStudent = function () {
        var collectionobj = {};
        collectionobj.Action = 4
        collectionobj.ClassCode = $scope.$parent.ClassCode;
        collectionobj.CutOffFrom = $scope.CutOffFrom;
        collectionobj.CutOffTo = $scope.CutOffTo;
        collectionobj.IsActive = $scope.IsActive;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var data = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimaryJr', collectionobj);
        data.then(function (response) {
            $scope.StudentData = response.data;
            if ($scope.StudentData == undefined || $scope.StudentData.length == 0) {
                showMsgBox('Sorry no student found.')
            }
        });

    }

    $scope.AllStudent = function (value) {
        angular.forEach($scope.StudentData, function (SI) {
            SI.IsActive = value;
        });
    }

    $scope.SaveRecord = function () {


        if (isValidate()) {
            $scope.TotalBatches = $filter('filter')($scope.StudentData, { 'IsActive': true })

            if ($scope.TotalBatches !== undefined && $scope.TotalBatches.length > 0) {
                var collectionobj = {};

                collectionobj.StudentData = JSON.stringify($filter('filter')($scope.StudentData, { 'IsActive': true }));
                collectionobj.MeritCode = $scope.MeritCode;
                collectionobj.ClassCode = $scope.$parent.ClassCode;
                collectionobj.CutOffFrom = $scope.CutOffFrom;
                collectionobj.CutOffTo = $scope.CutOffTo;

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
                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteClassMeritListPrimaryJr', collectionobj);

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

    $scope.ClassMeritListPrePrimaryJrList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimaryJr', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Cut Off From", "HeaderValue": "CutOffFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Cut Off To", "HeaderValue": "CutOffTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Merit Base", "Value": "MeritListId", "HeaderValue": "MeritBase", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "No. Of Applicants", "HeaderValue": "NoOfApplicants", "Width": "100%", "ShowColumn": "Yes" },
                    
                ];



            $scope.ClassMeritListPrePrimaryJrList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();

                $scope.ClassMeritListPrePrimaryJrList = $filter('filter')($scope.ClassMeritListPrePrimaryJrList, { 'Code': $scope.hfId }, true);
                $scope.$parent.ClassCode = $scope.ClassMeritListPrePrimaryJrList[0].ClassCode.toString();
                $scope.CutOffFrom = $scope.ClassMeritListPrePrimaryJrList[0].CutOffFrom;
                $scope.CutOffTo = $scope.ClassMeritListPrePrimaryJrList[0].CutOffTo;
                $scope.MeritCode = $scope.ClassMeritListPrePrimaryJrList[0].MeritListId.toString();

                var collectionobj = {};
                collectionobj.Action = 6;
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                collectionobj.RelationshipId = relationshipId;

                var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetClassMeritListPrePrimaryJr', collectionobj);
                getData.then(function (response) {
                    $scope.StudentData = response.data;
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

        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteClassMeritListPrimaryJr', collectionobj);
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
        $scope.StudentData = "";
        $scope.MeritCode = "";
        $scope.$parent.ClassCode="";
        $scope.CutOffFrom = "";
        $scope.CutOffTo = "";
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
                { "HeaderText": "Cut Off From", "HeaderValue": "CutOffFrom", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Cut Off To", "HeaderValue": "CutOffTo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Merit Base", "Value": "MeritListId", "HeaderValue": "MeritBase", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];


        $scope.PrintMaster(tblheader, $scope.ClassMeritListPrePrimaryJrList, window.document.title);
    };
}
