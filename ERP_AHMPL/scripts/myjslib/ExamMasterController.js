app.ExamMasterController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#ddlSession');

    $scope.GetDisplayOrder = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetExamMaster', collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }

    $scope.GetDisplayOrder();

    $scope.SaveRecord = function () {
        if (isValidate()) {            
            var collectionobj = {};

            collectionobj.AcademicSessionID = $scope.AcademicSessionId;
            collectionobj.ExamName = $scope.ExamName;            
            collectionobj.ClassList = JSON.stringify($filter('filter')($scope.ClassList, { chk: true }));
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.IsActive = $scope.IsActive;

            collectionobj.FYId = fyId;
            collectionobj.RelationShipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
           
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }           
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteExamMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ExamMasterList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;
       
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetExamMaster', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },                    
                    { "HeaderText": "Academic Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Examination Name", "HeaderValue": "ExamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }, 
                    { "HeaderText": "Class Name", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }                    
                ];

            $scope.ExamMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {                
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                
                $scope.ExamMasterList = $filter('filter')($scope.ExamMasterList, { 'Code': $scope.hfId }, true);
                
                $scope.AcademicSessionId = $scope.ExamMasterList[0].AcademicSessionID.toString();
                $scope.ExamName = $scope.ExamMasterList[0].ExamName;
                $scope.ClassList = $scope.ExamMasterList[0].ClassList;
                $scope.DisplayOrder = $scope.ExamMasterList[0].DisplayOrder;
                $scope.IsActive = $scope.ExamMasterList[0].IsActive == true ? "true" : "false";
                                
                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.Code = $scope.hfId;
                collectionobj.RelationShipId = relationshipId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/AssessmentApi/GetExamMaster', collectionobj);
                getData.then(function (response) {
                    if (response.data) {
                        $scope.ClassList = response.data;                                                               
                    }
                });
                
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSession');
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        debugger
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteExamMaster', collectionobj);
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
        debugger
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        
        $scope.hfId = "";
        $scope.AcademicSessionId = '';
        $scope.ExamName = ''; 
        $scope.GetClasses();
        $scope.GetDisplayOrder();
        $scope.ExamMasterList = [];     
        $scope.$applyAsync();
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
                { "HeaderText": "Academic Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Examination Name", "HeaderValue": "ExamName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class Name", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.ExamMasterList, window.document.title);
    };
}