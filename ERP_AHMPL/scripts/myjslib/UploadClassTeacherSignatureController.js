app.UploadClassTeacherSignatureController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass')

    $scope.ddlClass_Change = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.SectionCode = $scope.AllClassSection;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "/Api/ExamMasterApi/GetEmployeeCodeUsingClassScetion", collectionobj);
        getData.then(function (response) {
           
            $scope.ClassTeachersList = response.data;
        }); 
}


    $scope.OpenFileUploadBanner = function () {
        $('#fileInput').click();
    }
    $scope.fuBannerImageChange = function (input) {
        $scope.readBannerURL(input);
    };
    $scope.readBannerURL = function (input) {
        debugger
        if (input.files && input.files[0]) {
            if (input.files[0].size < 1048576) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.Signature = e.target.result;
                    $scope.$applyAsync();
                }
                reader.readAsDataURL(input.files[0]);
            }
            else
                showMsgBox('Please Select Image less then 1 MB')
        }
    }


    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.SectionCode = $scope.AllClassSection;
            collectionobj.EmployeeCode = $scope.TeacherCode;
            collectionobj.ImagefileUrl = $scope.Signature;
            collectionobj.CreatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "/Api/ExamMasterApi/InsertUpdateDeleteUploadClassTeacherSignature", collectionobj);
            getData.then(function (response) {
                debugger
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
        else {
            showMsgBox("Oops! Please Select Signature....");
            $scope.hideLoader();
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
        debugger
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.AllClassSection = '';
        $scope.TeacherCode ='';
        $scope.Signature = "../../Content/noimage.png";
        $scope.fileInput = '';
        $('#fileInput').val('');
        $scope.SetFocus('#Signature')
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };


    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/ExamMasterApi/GetClassTeacherSignature", collectionobj);
        getData.then(function (response) {
            debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class-SectionName", "HeaderValue": "ClassSectionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Employee Code", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Signature Image", "HeaderValue": "SignatureImagePath", "Width": "10%", "ShowColumn": "Yes", "ImageColumn": "Yes" },
                ];

            $scope.PrincipalSignatureList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();
                debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.PrincipalSignatureList = $filter('filter')($scope.PrincipalSignatureList, { 'Code': $scope.hfId });
                $scope.AllClassSection = $scope.PrincipalSignatureList[0].SectionCode;
                $scope.ddlClass_Change();
                $scope.TeacherCode = $scope.PrincipalSignatureList[0].EmployeeCode;
                $scope.Signature = $filter('filter')($scope.PrincipalSignatureList[0].SignatureImagePath);
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#Signature', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/ExamMasterApi/InsertUpdateDeleteUploadPrincipalSignature", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
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
                { "HeaderText": "Keyword", "HeaderValue": "Keyword", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "KeywordDescription", "HeaderValue": "KeywordDescription", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.UnitMasterList, window.document.title);
    };


}