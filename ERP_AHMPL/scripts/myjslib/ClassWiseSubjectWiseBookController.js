app.ClassWiseSubjectWiseBookController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#ddlSession');
        
    $scope.GetAllClass = function ()
    {        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/GblMasterApi/GetClasses', collectionobj);
        getData.then(function (response)
        {
            $scope.ClassList = response.data;
        });
    };

    $scope.GetAllSubject = function ()
    {       
        var collectionobj = {};
        collectionobj.Action = 5;       
        collectionobj.ClassCode = $scope.class;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);        
        getData.then(function (response)
        {
            $scope.SubjectList = response.data;
        });
    };
    $scope.GetAllBook = function ()
    {        
        var collectionobj = {};
        collectionobj.Action = 6;        
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        collectionobj.AcademicSessionID = $scope.SessionId;
        collectionobj.ClassCode = $scope.class;
        collectionobj.SubjectCode = $scope.Subject;
        
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            $scope.BookList = response.data;           
        });
    };

    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {        
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.AcademicSessionID = $scope.SessionId;
            collectionobj.ClassCode = $scope.class;
            collectionobj.SubjectCode = $scope.Subject;
            collectionobj.BookList = JSON.stringify($filter('filter')($scope.BookList, { chk: true }));            
            
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteClassWiseSubjectWiseBook', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ClassWiseSubjectWiseBookList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AssessmentApi/GetClassWiseSubjectWiseBook', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Academic Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Subject", "HeaderValue": "SubjectName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name of Book", "HeaderValue": "NameOfBook", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.ClassWiseSubjectWiseBookList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                $scope.showLoader();
                //------------------------Disabled-------------------------
                $scope.clsSession = true;
                $scope.clsClass = true;
                $scope.clsSubject = true;
                //------------------------Disabled-------------------------

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ClassWiseSubjectWiseBookList = $filter('filter')($scope.ClassWiseSubjectWiseBookList, { 'Code': $scope.hfId }, true);
                
                $scope.SessionId = $scope.ClassWiseSubjectWiseBookList[0].AcademicSessionID.toString();
                $scope.class = $scope.ClassWiseSubjectWiseBookList[0].ClassCode;
                $scope.Subject = $scope.ClassWiseSubjectWiseBookList[0].subjectcode;
                $scope.Books = $scope.ClassWiseSubjectWiseBookList[0].bookcode;

                $scope.GetAllClass();
                $scope.GetAllSubject();
                $scope.GetAllBook();

                
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlSession', true);
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
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/AssessmentApi/InsertUpdateDeleteClassWiseSubjectWiseBook', collectionobj);
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
    $scope.ResetControl = function (flag)
    {
        //------------------------Enabled-------------------------
        $scope.clsSession = false;
        $scope.clsClass = false;
        $scope.clsSubject = false;
        //------------------------Enabled-------------------------

        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.ClassWiseSubjectWiseBookList = [];
       
        $scope.SessionId = '';
        $scope.class = '';
        $scope.Subject = '';
        $scope.GetAllBook();
        $scope.Books = '';       
        $scope.SetFocus('#ddlSession');
        $scope.$applyAsync();

        if (flag == 0) {
            showMsgBox('4');
        };
    };
}
