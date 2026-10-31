app.ComplainRegisterController = function ($scope, $element, $filter, myService) {

    $scope.SetFocus('#ddlClass');
    $scope.disableDelete = true;
    $scope.disablePrint = true;
    $scope.ddlClass_Change=function(ClassCode) {
        
        $scope.GetSections(ClassCode)
        var collectionobj = {}
        collectionobj.ClassCode = ClassCode;
        collectionobj.SectionCode = $scope.SectionCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "9";
        var getData = myService.methode('POST', '../Api/DigitalNoticeBoardApi/GetStudentsList', collectionobj);
        getData.then(function (response) {
            $scope.StudentLists = response.data;
            $scope.Show = true;
        });
    };


    BindAllComplain = function ()
    {
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "9";
        var getData = myService.methode('POST', '../Api/DigitalNoticeBoardApi/GetStudentsList', collectionobj);
        getData.then(function (response) {
            $scope.StudentLists = response.data;
            $scope.Show = true;
        });
    }



    $scope.cleardetails = function ()
    {
        $scope.StudentList = ''; 
    }

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            debugger;
            $scope.showLoader(); 
            var collectionobj = {};
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentLists, { 'Chk': true }, true));
            collectionobj.ComplainCode = $scope.hfId
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.SectionCode = $scope.SectionCode;
            collectionobj.ComplainText = $scope.Message;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.Action = 1;
            collectionobj.ComplainBy = userid;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save")
            { 
                var getData = myService.methode('POST', "../APi/ComplainRegisterApi/InsertDeleteComplainRegister",collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
          
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
        $scope.hideLoader();

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.ClassCode = "";
        $scope.SectionCode = "";
        $scope.Message = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $('#hdngetstu').text('');
        $scope.OccupationMasterList = [];
        $scope.hideLoader();

        if (flag == 0) {
            showMsgBox('4');
        };

    }

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };


    $scope.started = function () {
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId
        collectionobj.CreatedBy = userid;
        collectionobj.Action = 9;
        debugger;
        var getData = myService.methode('POST', "../Api/ComplainRegisterApi/ComplainRegisterList", collectionobj);
        getData.then(function (response) {
            var tblheader =
            [
                { "HeaderText": "Sr NO", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Complain Message", "HeaderValue": "Complain", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CreatedOn", "HeaderValue": "CreatedOn", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
            
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
        });
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
                { "HeaderText": "Sr NO", "Value": "OccupationId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Occupation Name", "HeaderValue": "OccupationName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Occupation Type", "HeaderValue": "OccupationType", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.OccupationMasterList, window.document.title);
    };
}