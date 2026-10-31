app.EnquiryFormController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    //$scope.EnquiryFor = (isSchool ? 'School' : isCollege ? 'College' : null);
    $scope.EnquiryFor = 'School';
    $scope.SessionId = sessionId;
    $scope.SetMaxMinDate().then(function (response) {
        $scope.DateofEnquiry = response;
        $scope.$applyAsync();
    });
    $scope.DashBoradLevel = sessionStorage.getItem('DashBoradLevel');

    $scope.BackToDashBoard = function () {
        if ($scope.DashBoradLevel == 1) {
            window.location.href = "/DashBoard/EnquiryDashBoradLevel1";
        }
        else if ($scope.DashBoradLevel == 2) {
            window.location.href = "/DashBoard/EnquiryDashBoradLevel2";
        }
        else if ($scope.DashBoradLevel == 3) {
            window.location.href = "/DashBoard/EnquiryDashBoradLevel3";
        }
        sessionStorage.removeItem('DashBoradLevel');
    }

    $scope.LastQualifiedExaminationList = [{
        Srno: "",
        Class: "",
        BoardUniversity: "",
        Stream: "",
        MarksObtained: "",
        AggPer: "",
        PerOfPCM: "",
        Devision: "",
        YearOfPassing: ""
    }];

    $scope.AddRow = function () {
        $scope.LastQualifiedExaminationList.push({
            Srno: "",
            Class: "",
            BoardUniversity: "",
            Stream: "",
            MarksObtained: "",
            AggPer: "",
            PerOfPCM: "",
            Devision: "",
            YearOfPassing: ""
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.LastQualifiedExaminationList = $filter('filter')($scope.LastQualifiedExaminationList, { Srno: '!' + srno });
    }

    $scope.ddl_CityChange = function () {
        $scope.GetCityArea($scope.CityCode);
    }
    $scope.$parent.CollegeBranchCode = '';
    $scope.$parent.CollegeCourseCode = '';
    $scope.ddlCollegeCourse_Change = function () {
        $scope.GetCollegeBranch($scope.CollegeCourseCode);
    }


    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.disableAdd = true;
            var collectionobj = {};
            
            collectionobj.TransID = $scope.hfId;
            collectionobj.EnquiryFor = $scope.EnquiryFor;
            collectionobj.AcademicSessionId = $scope.SessionId
            collectionobj.VDate = moment($scope.DateofEnquiry).format('DD/MMM/YYYY HH:mm:ss')
            collectionobj.EnquiryTypeCode = $scope.EnquiryTypeCode;
            collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
            collectionobj.IAm = $scope.IAm;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.CollegeCourseCode = $scope.CollegeCourseCode;
            collectionobj.CollegeBranchCode = $scope.CollegeBranchCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.VisitorName = $scope.VisitorName;
            collectionobj.FatherName = $scope.FatherName;
            collectionobj.MotherName = $scope.MotherName;
            collectionobj.Occupation = $scope.Occupation;
            collectionobj.Reference = $scope.Reference;
     
            collectionobj.StudentFirstName = $scope.StudentFirstName;
            collectionobj.StudentMiddleName = $scope.StudentMiddleName;
            collectionobj.StudentLastName = $scope.StudentLastName;
            if ($scope.DateOfBirth != undefined && $scope.DateOfBirth != "")
                collectionobj.DateOfBirth = moment($scope.DateOfBirth).format('DD/MMM/YYYY');
            collectionobj.Gender = $scope.Gender
            collectionobj.CategoryCode = $scope.CategoryCode
            collectionobj.StudentdEmail = $scope.StudentdEmail;
            collectionobj.ParentEmail = $scope.ParentEmail;
            collectionobj.StudentContact = $scope.StudentContact;
            collectionobj.FatherContact = $scope.FatherContact;
            collectionobj.MotherContact = $scope.MotherContact;
            collectionobj.VisitorContact = $scope.VisitorContact;
            collectionobj.PrimaryNo = $scope.PrimaryNo == 1 ? $scope.StudentContact : $scope.PrimaryNo == 2 ? $scope.FatherContact : $scope.PrimaryNo == 3? $scope.MotherContact: $scope.PrimaryNo == 4 ? $scope.VisitorContact : null;
            collectionobj.WhatsAppNo = $scope.WhatsAppNo == 1 ? $scope.StudentContact : $scope.WhatsAppNo == 2 ? $scope.FatherContact : $scope.WhatsAppNo == 3? $scope.MotherContact: $scope.WhatsAppNo == 4 ? $scope.VisitorContact : null;
            collectionobj.Address = $scope.Address;
            collectionobj.CountryCode = $scope.CountryCode;
            collectionobj.StateCode = $scope.StateCode;
            collectionobj.CityCode = $scope.CityCode;
            collectionobj.CityAreaCode = $scope.CityAreaCode;
            collectionobj.SubArea = $scope.SubArea;
            collectionobj.PinCode = $scope.PinCode;
            collectionobj.CurrentPreviousSchool = $scope.CurrentPreviousSchool
            collectionobj.HostalRequired = $scope.HostalRequired
            collectionobj.Remark = $scope.Remark
            collectionobj.NameofExam = $scope.NameofExam
            collectionobj.Rank = $scope.Rank

            collectionobj.LastQualifiedExaminationList = JSON.stringify($scope.LastQualifiedExaminationList);

            collectionobj.FollowupCategory = $scope.FollowupCategory
            if ($scope.NextFollowupDate != undefined && $scope.NextFollowupDate != "")
                collectionobj.NextFollowupDate = moment($scope.NextFollowupDate).format('DD/MMM/YYYY');
            collectionobj.FollowUpRemark = $scope.FollowUpRemark


            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }
            var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/InsertUpdateDeleteEnquiryFormOffline', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
    };

    $scope.CityAreaMasterList = [];
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
        var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/GetEnquiryFormOffline', collectionobj);
        getData.then(function (response) {
            
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date of Enquiry", "HeaderValue": "DateOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "IdDateType":"Yes" },
                    { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Enquiry Source", "HeaderValue": "EnquirySource", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "I Am", "HeaderValue": "IAm", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            //if (loginAs == 'School') {
                tblheader.push({ "HeaderText": "Class", "HeaderValue": "Class", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
                tblheader.push({ "HeaderText": "Stream", "HeaderValue": "Stream", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" })
            //}
            //else {
            //    tblheader.push({ "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            //    tblheader.push({ "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" })
            //}
                tblheader.push({ "HeaderText": "Visitor Name", "HeaderValue": "VisitorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Occupation", "HeaderValue": "Occupation", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Reference", "HeaderValue": "Reference", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Std. FirstName", "HeaderValue": "StudentFirstName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Std. MiddleName", "HeaderValue": "StudentMiddleName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Std. LastName", "HeaderValue": "StudentLastName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date of Birth", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "IdDateType": "Yes" },
                { "HeaderText": "Gender", "HeaderValue": "Gender", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Studentd's Email", "HeaderValue": "StudentdEmail", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Parent's Email", "HeaderValue": "ParentEmail", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Student Mobile No.", "HeaderValue": "StudentContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherContact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mother Mobile No.", "HeaderValue": "MotherContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Guardian/Visitor Mobile No.", "HeaderValue": "VisitorContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Address", "HeaderValue": "Address", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "City Area", "HeaderValue": "CityAreaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Sub Area", "HeaderValue": "SubArea", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Pin Code", "HeaderValue": "PinCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Current/Previous School", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Hostal Required", "HeaderValue": "HostalRequired", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" });

               

            $scope.EnquiryFormOffline = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EnquiryFormOffline = $filter('filter')($scope.EnquiryFormOffline, { 'TransId': $scope.hfId }, true);

            
                $scope.EnquiryFor = $scope.EnquiryFormOffline[0].EnquiryFor;
                $scope.SessionId = $scope.EnquiryFormOffline[0].EnquiryForSessionCode;
            
                $scope.DateofEnquiry = new Date($scope.EnquiryFormOffline[0].DateOfEnquiry);
                $scope.EnquiryTypeCode = $scope.EnquiryFormOffline[0].EnquiryTypeCode;
                $scope.EnquirySourceCode = $scope.EnquiryFormOffline[0].EnquirySourceCode;
                $scope.IAm = $scope.EnquiryFormOffline[0].IAm;
                $scope.ClassCode = $scope.EnquiryFormOffline[0].ClassCode;
                $scope.StreamCode = $scope.EnquiryFormOffline[0].StreamCode;
                $scope.CollegeCourseCode = $scope.EnquiryFormOffline[0].CollegeCourseCode;
                $scope.CollegeBranchCode = $scope.EnquiryFormOffline[0].CollegeBranchCode;
                $scope.VisitorName = $scope.EnquiryFormOffline[0].VisitorName;
                $scope.FatherName = $scope.EnquiryFormOffline[0].FatherName;
                $scope.MotherName = $scope.EnquiryFormOffline[0].MotherName;
                $scope.Occupation = $scope.EnquiryFormOffline[0].Occupation;
                $scope.Reference = $scope.EnquiryFormOffline[0].Reference;
                $scope.StudentFirstName = $scope.EnquiryFormOffline[0].StudentFirstName;
                $scope.StudentMiddleName = $scope.EnquiryFormOffline[0].StudentMiddleName;
                $scope.StudentLastName = $scope.EnquiryFormOffline[0].StudentLastName;
                $scope.DateOfBirth = new Date($scope.EnquiryFormOffline[0].DateOfBirth);
                $scope.Gender = $scope.EnquiryFormOffline[0].Gender;
                $scope.CategoryCode = $scope.EnquiryFormOffline[0].CategoryCode;
                $scope.StudentdEmail = $scope.EnquiryFormOffline[0].StudentdEmail;
                $scope.ParentEmail = $scope.EnquiryFormOffline[0].ParentEmail;
                $scope.StudentContact = $scope.EnquiryFormOffline[0].StudentContact;
                $scope.FatherContact = $scope.EnquiryFormOffline[0].FatherContact;
                $scope.MotherContact = $scope.EnquiryFormOffline[0].MotherContact;
                $scope.VisitorContact = $scope.EnquiryFormOffline[0].VisitorContact;
                $scope.PrimaryNo = $scope.EnquiryFormOffline[0].PrimaryNo;
                $scope.WhatsAppNo = $scope.EnquiryFormOffline[0].WhatsAppNo;
                $scope.Address = $scope.EnquiryFormOffline[0].Address;
                $scope.CountryCode = $scope.EnquiryFormOffline[0].CountryCode;
                $scope.StateCode = $scope.EnquiryFormOffline[0].StateCode;
                $scope.CityCode = $scope.EnquiryFormOffline[0].CityCode;
                $scope.GetCityArea($scope.CityCode);
                $scope.CityAreaCode = $scope.EnquiryFormOffline[0].CityAreaCode;
                $scope.SubArea = $scope.EnquiryFormOffline[0].SubArea;
                $scope.PinCode = $scope.EnquiryFormOffline[0].PinCode;
                $scope.CurrentPreviousSchool = $scope.EnquiryFormOffline[0].CurrentPreviousSchool;
                $scope.Remark = $scope.EnquiryFormOffline[0].Remark;
                $scope.HostalRequired = $scope.EnquiryFormOffline[0].HostalRequired == true ? 'true' : 'false';
                $scope.NameofExam = $scope.EnquiryFormOffline[0].NameofExam;
                $scope.Rank = $scope.EnquiryFormOffline[0].Rank;

                $scope.FollowupCategory = $scope.EnquiryFormOffline[0].FollowupCategory;
                $scope.NextFollowupDate = $scope.EnquiryFormOffline[0].NextFollowupDate!=null?new Date($scope.EnquiryFormOffline[0].NextFollowupDate):$scope.EnquiryFormOffline[0].NextFollowupDate;
                $scope.FollowUpRemark = $scope.EnquiryFormOffline[0].FollowupRemark;               
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlIAm', true);
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
        collectionobj.TransId = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/InsertUpdateDeleteEnquiryFormOffline', collectionobj);
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

        $scope.EnquiryTypeCode = "";
        $scope.EnquirySourceCode = "";
        $scope.IAm = "Parent";
        $scope.ClassCode = "";
        $scope.StreamCode = "";
        $scope.CollegeCourseCode = "";
        $scope.CollegeBranchCode = "";
        $scope.VisitorName = "";
        $scope.FatherName = "";
        $scope.MotherName = "";
        $scope.Occupation = "";
        $scope.Reference = "";
        $scope.StudentFirstName = "";
        $scope.StudentMiddleName = "";
        $scope.StudentLastName = "";
        $scope.DateOfBirth = "";
        $scope.Gender = "";
        $scope.CategoryCode = "";
        $scope.StudentdEmail = "";
        $scope.ParentEmail = "";
        $scope.StudentContact = "";
        $scope.FatherContact = "";
        $scope.MotherContact = "";
        $scope.VisitorContact = "";
        $scope.PrimaryNo = "";
        $scope.WhatsAppNo = "";
        $scope.Address = "";
        $scope.CityAreaCode = "";
        $scope.SubArea = "";
        $scope.PinCode = "";
        $scope.CurrentPreviousSchool = "";
        $scope.Remark = "";
        $scope.FollowupCategory = "";
        $scope.NextFollowupDate = "";
        $scope.FollowUpRemark = "";
        $scope.HostalRequired = "false";

        $scope.NameofExam = "";
        $scope.Rank = "";
        $scope.SetMaxMinDate().then(function (response) {
            $scope.DateofEnquiry = response;
            $scope.$applyAsync();
        });

        $scope.$applyAsync();
        $scope.SetFocus('#ddlCountry');
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
                { "HeaderText": "Sr.No.", "Value": "TransId", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Session", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date of Enquiry", "HeaderValue": "DateOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No"},
                { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Source", "HeaderValue": "EnquirySource", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "I Am", "HeaderValue": "IAm", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];
        if (loginAs == 'School') {
            tblheader.push({ "HeaderText": "Class", "HeaderValue": "Class", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            tblheader.push({ "HeaderText": "Stream", "HeaderValue": "Stream", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" })
        }
        else {
            tblheader.push({ "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            tblheader.push({ "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" })
        }
        tblheader.push({ "HeaderText": "Visitor Name", "HeaderValue": "VisitorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Occupation", "HeaderValue": "Occupation", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Reference", "HeaderValue": "Reference", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Std. FirstName", "HeaderValue": "StudentFirstName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Std. MiddleName", "HeaderValue": "StudentMiddleName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Std. LastName", "HeaderValue": "StudentLastName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Date of Birth", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Gender", "HeaderValue": "Gender", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Studentd's Email", "HeaderValue": "StudentdEmail", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Parent's Email", "HeaderValue": "ParentEmail", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Student Mobile No.", "HeaderValue": "StudentContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherContact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Mother Mobile No.", "HeaderValue": "MotherContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Guardian/Visitor Mobile No.", "HeaderValue": "VisitorContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Address", "HeaderValue": "Address", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "State", "HeaderValue": "StateName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "City", "HeaderValue": "CityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "City Area", "HeaderValue": "CityAreaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            { "HeaderText": "Sub Area", "HeaderValue": "SubArea", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Pin Code", "HeaderValue": "PinCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Current/Previous School", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
            { "HeaderText": "Hostal Required", "HeaderValue": "HostalRequired", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" });

        $scope.PrintMaster(tblheader, $scope.EnquiryFormOffline, window.document.title);
    };
}