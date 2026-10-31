app.CollegeBranchMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlCollegeCourse', true);
    $scope.SessionId = sessionId;


    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.CourseCode = $scope.$parent.CollegeCourseCode;
            collectionobj.CourseBranchName = $scope.CollegeBranchName;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/GblMasterApi/InsertUpdateDeleteCollegeBranchMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.ClassMaster = [];
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
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetCollegeBranchMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Course", "HeaderValue": "CourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "College", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            

            $scope.CollegeBranchMaster = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CollegeBranchMaster = $filter('filter')($scope.CollegeBranchMaster, { 'Code': $scope.hfId }, true);
                $scope.$parent.CollegeCourseCode = $scope.CollegeBranchMaster[0].CollegeCourseCode;
                $scope.CollegeBranchName = $scope.CollegeBranchMaster[0].BranchName;
                $scope.IsActive = $scope.CollegeBranchMaster[0].IsActive.toString();
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableAdd=false;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlCollegeCourse', true);
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
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/InsertUpdateDeleteCollegeBranchMaster', collectionobj);
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
        $scope.CollegeBranchName = "";
        $scope.$parent.CollegeCourseCode = "";
        $scope.IsActive = "true";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlCollegeCourse');
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
                { "HeaderText": "Course", "HeaderValue": "CourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "College", "HeaderValue": "BranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.ClassMaster, window.document.title);
    };
}