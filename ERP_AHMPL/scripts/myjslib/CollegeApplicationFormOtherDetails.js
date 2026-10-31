app.CollegeApplicationFormOtherDetails = function ($scope, $element, $filter, myService) {
    

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.CasteCategory = $scope.Category;
            collectionobj.SubCasteCategory = $scope.Caste;
            collectionobj.CasteCertificateNo = $scope.CasteCertificateNo;
            collectionobj.DateOfAdmission = $scope.CasteCertificateIssueDate;
            collectionobj.DomicileCertificateNo = $scope.DomicileCertificateNo;
            collectionobj.DomicileDateOfIssue = $scope.DomicileCertificateIssueDate;

            collectionobj.IncomeCertificateNo = $scope.IncomeCertificateNo;
            collectionobj.IncomeDateOfIssue = $scope.IncomeCertificateIssueDate;
            collectionobj.TransferCertificateNo = $scope.TransferCertificateNo;
            collectionobj.TransferDateOfIssue = $scope.TransferCertificateIssueDate;
            collectionobj.AADHAARNo = $scope.AadharNo;
            collectionobj.AnnualIncome = $scope.AnnualIncome;
            collectionobj.BankName = $scope.BankName;

            collectionobj.BranchName = $scope.BranchName;
            collectionobj.AccountNo = $scope.AccountNo;
            collectionobj.IFSCCode = $scope.IFSCCode;
            //collectionobj.InstructionMedium
            collectionobj.EducationalQualification = $scope.QualificationList;
           
            

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
            var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCollegeAdmissionFormOtherDetails', collectionobj);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });

        }
    };
    $scope.CollegeApplicationFormOtherDetailList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetCollegeAdmissionFormOtherDetails', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Reg. Form No", "HeaderValue": "RegistrationFormNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Form No", "HeaderValue": "AdmissionFormNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Date", "HeaderValue": "DateOfAdmission", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Adm. Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherMobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];

            $scope.CollegeApplicationFormOtherDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                ;
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CollegeApplicationFormOtherDetailList = $filter('filter')($scope.CollegeApplicationFormOtherDetailList, { 'Code': $scope.hfId }, true);

                $scope.AdmissionType = parseInt($scope.CollegeApplicationFormOtherDetailList[0].EnquiryTypeCode);
                $scope.EnquirySearch = $scope.CollegeApplicationFormOtherDetailList[0].EnquirySearch;

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableForEdit = true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlCategory', true);
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
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCollegeAdmissionFormOtherDetails', collectionobj);
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

        $scope.Category = "";
        $scope.Caste = "";
        $scope.CasteCertificateNo = "";
        $scope.CasteCertificateIssueDate = "";
        $scope.DomicileCertificateNo = "";
        $scope.DomicileCertificateIssueDate = "";
        $scope.IncomeCertificateNo = "";
        $scope.IncomeCertificateIssueDate = "";
        $scope.TransferCertificateNo = "";
        $scope.TransferCertificateIssueDate = "";

        $scope.AadharNo = "";
        $scope.AnnualIncome = "";
        $scope.BankName = "";
        $scope.BranchName = "";
        $scope.AccountNo = "";
        $scope.IFSCCode = "";
        $scope.QualificationList = "";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlCategory');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

}