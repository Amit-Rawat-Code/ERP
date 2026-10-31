app.ConsecutiveSubjectPeriodController = function ($scope, $element, $filter, myService) {
    $scope.ddlClass_Change = function (classCode) {
        debugger;
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.ClassCode = classCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetSectionList', collectionobj);
        getData.then(function (response) {
            $scope.Sections = ($filter('filter')(response.data, { 'ClassCode': classCode }, true));
        });
    }

    $scope.FillConsecutiveSubjectPeriodMaster = function () {
        var collectionobj = {};
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', "../Api/TimeTableApi/GetConsecutiveSubjectPeriodMaster", collectionobj);
        getData.then(function (response) {
            $scope.ConsecutiveSubjectPeriodList = response.data;
        });
    }

    $scope.$watch('ClassCode', function () {
        if (typeof ($scope.ClassCode) === 'undefined') return;
        $scope.FillConsecutiveSubjectPeriodMaster();
    })

    $scope.$watch('SectionCode', function () {
        if (typeof ($scope.SectionCode) === 'undefined') return;
        $scope.FillConsecutiveSubjectPeriodMaster();
    })

    $scope.$watch('BranchCode', function () {
        if (typeof ($scope.BranchCode) === 'undefined') return;
        $scope.FillConsecutiveSubjectPeriodMaster();
    })

    $scope.$watch('StreamCode', function () {
        if (typeof ($scope.StreamCode) === 'undefined') return;
        $scope.FillConsecutiveSubjectPeriodMaster();
    })

    /* Save Button Click Event */
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.BranchCode = $scope.BranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.ConsecutiveSubjectData = JSON.stringify($filter('filter')($scope.ConsecutiveSubjectPeriodList, { 'IsConsecutive': true }));
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteConsecutiveSubjectPeriodMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ConsecutiveSubjectPeriodMasterList = [];
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
        var getData = myService.methode('POST', '../Api/TimeTableApi/GetConsecutiveSubjectPeriodMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "Value": "StreamCode", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "No. of Period", "HeaderValue": "NoOfPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Consecutive", "HeaderValue": "IsConsecutive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
          ];
            $scope.ConsecutiveSubjectPeriodMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ConsecutiveSubjectPeriodMasterList = $filter('filter')($scope.ConsecutiveSubjectPeriodMasterList, { 'Id': Number($scope.hfId)}, true);
                debugger;
                $scope.$parent.ClassCode = $(FindHtml(row[1])).val();
                $scope.ddlClass_Change($scope.$parent.ClassCode);
                $scope.$parent.SectionCode = $(FindHtml(row[2])).val();
                $scope.BranchCode = $(FindHtml(row[3])).val();
                $scope.StreamCode = $(FindHtml(row[4])).val();
                $scope.IsActive = $scope.ConsecutiveSubjectPeriodMasterList[0].IsActive == true ? "true" : "false";

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.ClassCode = $scope.$parent.ClassCode;
                collectionobj.SectionCode = $scope.$parent.SectionCode;
                collectionobj.BranchCode = $scope.BranchCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TimeTableApi/ConsecutiveSubjectPeriodMaster', collectionobj);
                getData.then(function (response) {
                    $scope.ConsecutiveSubjectPeriodList = response.data;
                });

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                //$scope.SetFocus('#ddlSession', true);
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
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.BranchCode = $scope.BranchCode;
        collectionobj.StreamCode = $scope.StreamCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TimeTableApi/InsertUpdateDeleteConsecutiveSubjectPeriodMaster', collectionobj);
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
        $scope.$parent.ClassCode = "";
        $scope.$parent.SectionCode = "";
        $scope.BranchCode = "";
        $scope.StreamCode = "";
        $scope.IsActive = "true";
        $scope.ConsecutiveSubjectPeriodList = [];
        $scope.ConsecutiveSubjectPeriodMasterList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    ///*Refresh Search Table Record*/
    //$(document).on("click", ".RefreshSearchTable", function (e) {

    //    var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
    //    var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
    //    var loadingAnim = panelToRefresh.find('.loading-progress');
    //    panelToRefresh.show();
    //    setTimeout(function () {
    //        loadingAnim.addClass('la-animate');
    //    }, 100);
    //    $scope.started();
    //    return false;
    //});

    $scope.PrintRecord = function () {
        var tblheader =
            [{ "HeaderText": "Sr.No.", "Value": "Id", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Class", "Value": "ClassCode", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Section", "Value": "SectionCode", "HeaderValue": "SectionName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Branch", "Value": "BranchCode", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Stream", "Value": "StreamCode", "HeaderValue": "StreamName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "No. of Period", "HeaderValue": "NoOfPeriod", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Consecutive", "HeaderValue": "IsConsecutive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
               ];
        $scope.PrintMaster(tblheader, $scope.ConsecutiveSubjectPeriodMasterList, window.document.title);
    };


}