app.DigitalNoticeCreationController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#AllNotice');
    $scope.ChooseFor = "";
    $scope.files = [];
    $scope.StudentLists = [];

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    }); 
    $scope.ddlClass_Change = function () {
        var collectionobj = {}
        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.UpdatedBy = userid;
        collectionobj.Action = "9";
        var getData = myService.methode('POST', '../Api/DigitalNoticeBoardApi/GetStudentsList', collectionobj);
        getData.then(function (response) {
            $scope.StudentLists = response.data;
        });
    }

    $scope.ShowStudent = function () {
        $scope.Show = true;
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {}; //debugger;
            collectionobj.TransID = $scope.hfId
            collectionobj.SendBy = $scope.SendBy;
            collectionobj.CreateNoticeFor = $scope.NoticeFor
            collectionobj.NoticeFor = $scope.ChooseFor 
            collectionobj.ShowDate = $scope.ShowDate
            collectionobj.ClassCode = $scope.ClassCode
            collectionobj.EndDate = $scope.EndDate
            collectionobj.StudentList = JSON.stringify($filter('filter')($scope.StudentLists, { 'Chk': true }, true));
            collectionobj.Description = $scope.TextEditor;
            collectionobj.NoticeHeadline = $scope.NoticeHeadline
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = "1";
            var getData = myService.postmethode('POST', '../Api/DigitalNoticeBoardApi/InsertUpdateDeleteDigitalNoticeBoardWeb', collectionobj, $scope.files);
            getData.then(function (response)
            {
                var a = response.data; 
                if (showMsgBox(a[0].Status))
                {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.StudentList = [];
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
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/DigitalNoticeBoardApi/GetDigitalNoticeBoard', collectionobj);
        getData.then(function (response) {
            //debugger;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Notice By", "HeaderValue": "NoticeBy", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Create Notice For", "HeaderValue": "CreateNoticeFor", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Notice For", "HeaderValue": "NoticeFor", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "HeadLine", "HeaderValue": "NoticeHeadline", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Description", "HeaderValue": "Description", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date", "HeaderValue": "Date", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Time", "HeaderValue": "Time", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                 //   { "HeaderText": "Mother", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
               

            $scope.StudentList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);

            //$('#example tbody').on('dblclick', 'tr', function (event) {
            //    $scope.showLoader();
            //    var row = $('#example').DataTable().row(this).data();
            //    $scope.hfId = $(this).find('input[type="hidden"]').val();

            //    collectionobj.Action = "5";
            //    collectionobj.StudentCode = $scope.hfId;
            //    collectionobj.RelationshipId = relationshipId;
            //    collectionobj.SessionId = sessionId;
            //    collectionobj.FYId = fyId;
            //    var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetAdmissionFormDetails', collectionobj);
            //    getData.then(function (response) {

            //        $scope.StudentList = response.data;
            //        //debugger;
            //        $scope.hfId = $scope.StudentList[0].StudentCode;
            //        $scope.StudentID = $scope.StudentList[0].StudentID
            //        $scope.AdmissionNo = $scope.StudentList[0].AdmissionNo
            //        $scope.AdmissionSourceType = $scope.StudentList[0].AdmissionSourceType == 1 ? "1" : "0"
            //        $scope.$parent.ClassCode = $scope.StudentList[0].ClassCode
            //        $scope.SessionId = $scope.StudentList[0].AcademicSessionID.toString();
            //        $scope.BoardCode = $scope.StudentList[0].BoardCode
            //        $scope.RegNo = $scope.StudentList[0].RegNo
            //        $scope.FirstName = $scope.StudentList[0].FirstName
            //        $scope.MiddleName = $scope.StudentList[0].MiddleName
            //        $scope.LastName = $scope.StudentList[0].LastName
            //        $scope.DOB = new Date($scope.StudentList[0].DOB)
            //        $scope.PlaceOfBirth = $scope.StudentList[0].PlaceOfBirth
            //        $scope.AgeOnDate = $scope.StudentList[0].AgeOnDate
            //        $scope.Gender = $scope.StudentList[0].Gender
            //        $scope.IsSearchBoxDisabled = true;
            //        $scope.Show = false;

            //        collectionobj.Action = "8";
            //        collectionobj.StudentCode = $scope.hfId;
            //        collectionobj.RelationshipId = relationshipId;
            //        collectionobj.SessionId = sessionId;
            //        collectionobj.FYId = fyId;
            //        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/GetAdmissionFormDetails', collectionobj);
            //        getData.then(function (response) {
            //            $scope.FinalStudentList = response.data;
            //        });

            //        $scope.hideLoader();
            //        $scope.Save = "Edit";
            //        $scope.disableAdd = false;
            //        $scope.disableDelete = false;
            //        $scope.$applyAsync();
            //        //collapse box
            //        $('.br-pageheader').fadeIn();
            //        $('#collapseinputbox').fadeIn();
            //        $('#CollapseSearchTableList').fadeOut();
            //        $scope.SetFocus('#ddlClass', true);
            //        // )
            //    });
            //});
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.StudentCode = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/AdmissionTransactionApi/InsertUpdateDeleteAdmissionFormDetails', collectionobj);
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
        $scope.IsSearchBoxDisabled = false;
        $scope.hfId = ""
        $scope.NoticeFor = "";
        $scope.ChooseFor = ""
        $scope.files = "";
        $scope.StudentLists = ""
        $scope.NoticeDate = ""
        $scope.ClassCode=""
        $scope.ShowDate = ""
        $scope.EndDate = ""
        $scope.NoticeHeadline = ""
        $scope.NoticeImage = "";
        $scope.SendBy = "";

        $scope.TextEditor = "";
 
        $scope.$applyAsync();
        $scope.SetFocus('#AllNotice');
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
                { "HeaderText": "Sr.No.", "Value": "StudentCode", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Student", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date Of Birth", "HeaderValue": "DOB", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date Of Admission", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date Of Joining", "HeaderValue": "DateOfJoining", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mobile", "HeaderValue": "FatherMobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mother", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.StudentList, window.document.title);
    };
}











 