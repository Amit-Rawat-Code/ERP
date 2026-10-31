app.CollegeApplicationFormGeneralDetails = function ($scope, $element, $filter, myService) {
    $scope.AdmissionType = 2;
    $scope.MaxPreferenceList = [
        { PName: 'First Preferance', PPreferedBranch: "" },
        { PName: 'Second Preferance', PPreferedBranch: "" },
        { PName: 'Third Preferance', PPreferedBranch: "" },
        { PName: 'Fourth Preferance', PPreferedBranch: "" },
        { PName: 'Fifth Preferance', PPreferedBranch: "" },
        { PName: 'Sixth Preference', PPreferedBranch: "" },

    ]
    $scope.files = [];
    $scope.ddlCollegeCourse_Change=function(CollegeCourseCode)
    {
        $scope.GetSemester(CollegeCourseCode);
        $scope.GetCollegeBranch(CollegeCourseCode);
    };

    $scope.GetAdmissionFormNo = function () { }
    $scope.PreferenceAlert = function (PPreferedBranch,i) {
        if ((($filter('filter')($scope.MaxPreferenceList, { 'PPreferedBranch': PPreferedBranch })).length) > 1)
        {
            $scope.MaxPreferenceList[i].PPreferedBranch = "";
            alert(($filter('filter')($scope.CollegeBranchList, { 'Code': PPreferedBranch }, true))[0].CollegeBranchName +" is already selected as preferance");
        }
        
    }

    $scope.PerGetCountry = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCountry', collectionobj);
        getData.then(function (response) {
            $scope.PerCountrylist = response.data;
        });
    };

    $scope.PerGetState = function (countrycode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.CountryCode = countrycode;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetState', collectionobj);
        getData.then(function (response) {
            $scope.PerStatelist = response.data
        });
    };

    $scope.PerGetCity = function (statecode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StateCode = statecode;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetCity', collectionobj);
        getData.then(function (response) {
            $scope.PerCitylist = response.data;
          
        });
    };

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });  

    $scope.CopyAddress = function () {
        if ($scope.IsAddressSame == 1) {
            $scope.Per_Address1 = $scope.Curr_Address1;
            $scope.Per_Address2 = $scope.Curr_Address2;
            $scope.Per_Address3 = $scope.Curr_Address3;
            $scope.Per_CountryCode = $scope.Curr_CountryCode;
            $scope.PerGetState($scope.Per_CountryCode);
            $scope.Per_StateCode = $scope.Curr_StateCode;
            $scope.PerGetCity($scope.Per_StateCode);
            $scope.Per_CityCode = $scope.Curr_CityCode;
            $scope.Per_PinCode = $scope.Curr_PinCode;
        }
        else {
            $scope.Per_Address1 = "";
            $scope.Per_Address2 = "";
            $scope.Per_Address3 = "";
            $scope.Per_CountryCode = "";
            $scope.Per_StateCode = "";
            $scope.Per_CityCode = "";
            $scope.Per_PinCode = "";
        }

    };

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};

            collectionobj.EnquiryTypeCode = $scope.AdmissionType;
            collectionobj.EnquirySearch = $scope.EnquirySearch;

            collectionobj.RegNo = $scope.RegNo;
            collectionobj.AdmissionFormNo = $scope.AdmissionFormNo;

            collectionobj.DateOfAdmission = $scope.DateOfAdmission;
            collectionobj.AcademicSessionId = $scope.AcademicSessionId;
            collectionobj.CourseCode = $scope.$parent.CollegeCourseCode;
            collectionobj.SemesterCode = $scope.Semester;

            collectionobj.AdmissionMode = $scope.AdmissionMode;
            collectionobj.LaternalEntry = $scope.LaternalEntry;
            collectionobj.AdmissionThrough = $scope.AdmissionThrough;
            collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
            collectionobj.ReferenceOf = $scope.ReferenceOf;

            collectionobj.BranchPreference1 = $scope.MaxPreferenceList[0].PPreferedBranch;
            collectionobj.BranchPreference2 = $scope.MaxPreferenceList[1].PPreferedBranch;
            collectionobj.BranchPreference3 = $scope.MaxPreferenceList[2].PPreferedBranch;
            collectionobj.BranchPreference4 = $scope.MaxPreferenceList[3].PPreferedBranch;
            collectionobj.BranchPreference5 = $scope.MaxPreferenceList[4].PPreferedBranch;
            collectionobj.BranchPreference6 = $scope.MaxPreferenceList[5].PPreferedBranch;
            collectionobj.Initials = $scope.Initials;
            collectionobj.Gender = $scope.Gender;

            collectionobj.IsPhyDisable = $scope.IsPhyDisable;
            collectionobj.DisabilityDetails = $scope.DisabilityDetails;
            collectionobj.BloodGroup = $scope.BloodGroup;
            collectionobj.FirstName = $scope.StudentFirstName;
            collectionobj.MiddleName = $scope.StudentMiddleName;
            collectionobj.LastName = $scope.StudentLastName;
            collectionobj.StudentMobileNo = $scope.StudentMobileNo;
            collectionobj.StudentAlternativeMobileNo = $scope.StudentAlternativeMobileNo;
            collectionobj.StudentEmail = $scope.StudentEmail;
            collectionobj.StudentAlternativeEmailid = $scope.StudentAlternativeEmailid;


            collectionobj.Hostel = $scope.Hostel;
            collectionobj.Transport = $scope.Transport;
            collectionobj.EducationLoan = $scope.EducationLoan;
            collectionobj.EducationLoanLocation = $scope.EducationLoanLocation;
            collectionobj.DOB = $scope.DateOfBirth;
            collectionobj.Religion = $scope.Religion;


            collectionobj.FatherName = $scope.FatherName;
            collectionobj.FatherMobile = $scope.FatherMobile;

            collectionobj.MotherName = $scope.MotherName;
            collectionobj.MotherMobile = $scope.MotherMobile;
            collectionobj.FatherOccupation = $scope.FatherOccupationCode;
            collectionobj.GrandFatherName = $scope.GrandFatherName;
            collectionobj.GuardianName = $scope.GuardianName;
            collectionobj.GuardianMobile = $scope.GuardianMobile;

            collectionobj.Curr_Address1 = $scope.Curr_Address1;
            collectionobj.Curr_Address2 = $scope.Curr_Address2;
            collectionobj.Curr_Address3 = $scope.Curr_Address3;
            collectionobj.Curr_CountryCode = $scope.Curr_CountryCode;
            collectionobj.Curr_StateCode = $scope.Curr_StateCode;
            collectionobj.Curr_CityCode = $scope.Curr_CityCode;
            collectionobj.Curr_PinCode = $scope.Curr_PinCode;

            collectionobj.IsAddressSame = $scope.IsAddressSame;

            collectionobj.Per_Address1 = $scope.Per_Address1;
            collectionobj.Per_Address2 = $scope.Per_Address2;
            collectionobj.Per_Address3 = $scope.Per_Address3;
            collectionobj.Per_CountryCode = $scope.Per_CountryCode;
            collectionobj.Per_StateCode = $scope.Per_StateCode;
            collectionobj.Per_CityCode = $scope.Per_CityCode;
            collectionobj.Per_PinCode = $scope.Per_PinCode;
                
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
            var getData = myService.postmethode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCollegeAdmissionFormDetails', collectionobj, $scope.files);

            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });

        }
    };

    $scope.CollegeApplicationGeneralDetailList = [];
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
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/GetCollegeAdmissionFormDetails', collectionobj);
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

            $scope.CollegeApplicationGeneralDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                ;
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.CollegeApplicationGeneralDetailList = $filter('filter')($scope.CollegeApplicationGeneralDetailList, { 'Code': $scope.hfId }, true);

                $scope.AdmissionType = parseInt($scope.CollegeApplicationGeneralDetailList[0].EnquiryTypeCode);
                $scope.EnquirySearch = $scope.CollegeApplicationGeneralDetailList[0].EnquirySearch;

                $scope.RegNo = $scope.CollegeApplicationGeneralDetailList[0].RegistrationFormNo;
                $scope.AdmissionFormNo = $scope.CollegeApplicationGeneralDetailList[0].AdmissionFormNo;

                $scope.DateOfAdmission = new Date($scope.CollegeApplicationGeneralDetailList[0].DateOfAdmission);
                $scope.AcademicSessionId = $scope.CollegeApplicationGeneralDetailList[0].AcademicSessionId.toString();
                $scope.$parent.CollegeCourseCode = $scope.CollegeApplicationGeneralDetailList[0].CourseCode;
                $scope.ddlCollegeCourse_Change($scope.$parent.CollegeCourseCode);
                $scope.Semester = $scope.CollegeApplicationGeneralDetailList[0].SemesterCode.toString();

                $scope.AdmissionMode = $scope.CollegeApplicationGeneralDetailList[0].AdmissionMode;
                $scope.LaternalEntry = $scope.CollegeApplicationGeneralDetailList[0].LaternalEntry ? 'true' : 'false';
                $scope.AdmissionThrough = $scope.CollegeApplicationGeneralDetailList[0].AdmissionThrough;
                $scope.EnquirySourceCode = $scope.CollegeApplicationGeneralDetailList[0].EnquirySourceCode;
                $scope.ReferenceOf = $scope.CollegeApplicationGeneralDetailList[0].ReferenceOf;

                $scope.MaxPreferenceList[0].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference1;
                $scope.MaxPreferenceList[1].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference2;
                $scope.MaxPreferenceList[2].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference3;
                $scope.MaxPreferenceList[3].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference4;
                $scope.MaxPreferenceList[4].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference5;
                $scope.MaxPreferenceList[5].PPreferedBranch = $scope.CollegeApplicationGeneralDetailList[0].BranchPreference6;
                $scope.Initials = $scope.CollegeApplicationGeneralDetailList[0].Initials;
                $scope.Gender = $scope.CollegeApplicationGeneralDetailList[0].Gender;

                $scope.IsPhyDisable = $scope.CollegeApplicationGeneralDetailList[0].IsPhyDisable=="1" ? 'true' : 'false';
                $scope.DisabilityDetails = $scope.CollegeApplicationGeneralDetailList[0].DisabilityDetails;
                $scope.BloodGroup = $scope.CollegeApplicationGeneralDetailList[0].BloodGroup;
                $scope.StudentFirstName = $scope.CollegeApplicationGeneralDetailList[0].StudentFirstName;
                $scope.StudentMiddleName = $scope.CollegeApplicationGeneralDetailList[0].StudentMiddleName;
                $scope.StudentLastName = $scope.CollegeApplicationGeneralDetailList[0].StudentLastName;
                $scope.StudentMobileNo = $scope.CollegeApplicationGeneralDetailList[0].StudentMobileNo;
                $scope.StudentAlternativeMobileNo = $scope.CollegeApplicationGeneralDetailList[0].StudentAlternativeMobileNo;
                $scope.StudentEmail = $scope.CollegeApplicationGeneralDetailList[0].StudentEmailid;
                $scope.StudentAlternativeEmailid = $scope.CollegeApplicationGeneralDetailList[0].StudentAlternativeEmailid;


                $scope.Hostel = $scope.CollegeApplicationGeneralDetailList[0].Hostel=="1" ? 'true' : 'false';
                $scope.Transport = $scope.CollegeApplicationGeneralDetailList[0].Transport == "1" ? 'true' : 'false';
                $scope.EducationLoan = $scope.CollegeApplicationGeneralDetailList[0].EducationLoan == "1" ? 'true' : 'false';
                $scope.EducationLoanLocation = $scope.CollegeApplicationGeneralDetailList[0].EducationLoanLocation;
                $scope.DateOfBirth = new Date($scope.CollegeApplicationGeneralDetailList[0].DOB);
                $scope.Religion = $scope.CollegeApplicationGeneralDetailList[0].Religion;


                $scope.FatherName = $scope.CollegeApplicationGeneralDetailList[0].FatherName;
                $scope.FatherMobile = $scope.CollegeApplicationGeneralDetailList[0].FatherMobileNo;

                $scope.MotherName = $scope.CollegeApplicationGeneralDetailList[0].MotherName;
                $scope.MotherMobile = $scope.CollegeApplicationGeneralDetailList[0].MotherMobileNo;
                $scope.FatherOccupationCode = $scope.CollegeApplicationGeneralDetailList[0].FatherOccupation;
                $scope.GrandFatherName = $scope.CollegeApplicationGeneralDetailList[0].GrandFatherName;
                $scope.GuardianName = $scope.CollegeApplicationGeneralDetailList[0].LocalGuardianName;
                $scope.GuardianMobile = $scope.CollegeApplicationGeneralDetailList[0].LocalGuardianMobileNo;

                $scope.Curr_Address1 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address1;
                $scope.Curr_Address2 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address2;
                $scope.Curr_Address3 = $scope.CollegeApplicationGeneralDetailList[0].Curr_Address3;
                $scope.Curr_CountryCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_CountryCode;
                $scope.Curr_StateCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_StateCode;
                $scope.Curr_CityCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_CityCode;
                $scope.Curr_PinCode = $scope.CollegeApplicationGeneralDetailList[0].Curr_PinCode;

                $scope.IsAddressSame = $scope.CollegeApplicationGeneralDetailList[0].IsAddressSame == true ? true : false;

                $scope.Per_Address1 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address1;
                $scope.Per_Address2 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address2;
                $scope.Per_Address3 = $scope.CollegeApplicationGeneralDetailList[0].Per_Address3;
                $scope.Per_CountryCode = $scope.CollegeApplicationGeneralDetailList[0].Per_CountryCode;
                $scope.PerGetState($scope.Per_CountryCode);
                $scope.Per_StateCode = $scope.CollegeApplicationGeneralDetailList[0].Per_StateCode;
                $scope.PerGetCity($scope.Per_StateCode);
                $scope.Per_CityCode = $scope.CollegeApplicationGeneralDetailList[0].Per_CityCode;
                $scope.Per_PinCode = $scope.CollegeApplicationGeneralDetailList[0].Per_PinCode;

                $scope.StudentPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].StudentPhoto, '#imgStudentPhoto', '#fuStudentPhoto');
                $scope.StudentSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].StudentSign, '#imgStudentSign', '#fuStudentSign');
                $scope.FatherPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].FatherPhoto, '#imgFatherPhoto', '#fuFatherPhoto');
                $scope.FatherSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].FatherSign, '#imgFatherSign', '#fuFatherSign');
                $scope.MotherPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].MotherPhoto, '#imgMotherPhoto', '#fuMotherPhoto');
                $scope.MotherSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].MotherSign, '#imgMotherSign', '#fuMotherSign');
                $scope.LocalGuardianPhoto = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].LocalGuardianPhoto, '#imgLocalGuardianPhoto', '#fuLocalGuardianPhoto');
                $scope.LocalGuardianSign = $scope.SetPhotoUrl($scope.CollegeApplicationGeneralDetailList[0].LocalGuardianSign, '#imgLocalGuardianSign', '#fuLocalGuardianSign');

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableForEdit = true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtEnquiryNo', true);
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
        var getData = myService.methode('POST', '../Api/AdmissionMasterApi/InsertUpdateDeleteCollegeAdmissionFormDetails', collectionobj);
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
        $scope.AdmissionType = 2;
        $scope.EnquirySearch = "";
        $scope.RegNo = "";
        $scope.AdmissionFormNo = "";
        $scope.DateOfAdmission = "";
        $scope.AcademicSessionId = "";
        $scope.$parent.CollegeCourseCode = "";
        $scope.Semester = "";
        $scope.AdmissionMode = "";
        $scope.LaternalEntry = "";
        $scope.AdmissionThrough = "";
        $scope.EnquirySourceCode = "";
        $scope.ReferenceOf = "";
        $scope.Initials = "";
        $scope.Gender = "";
        $scope.IsPhyDisable = "";
        $scope.DisabilityDetails = "";
        $scope.BloodGroup = "";
        $scope.StudentFirstName = "";
        $scope.StudentMiddleName = "";
        $scope.StudentLastName = "";
        $scope.StudentMobileNo = "";
        $scope.StudentAlternativeMobileNo = "";
        $scope.StudentEmail = "";
        $scope.StudentAlternativeEmailid = "";
        $scope.Hostel = "";
        $scope.Transport = "";
        $scope.EducationLoan = "";
        $scope.EducationLoanLocation = "";
        $scope.DateOfBirth = "";
        $scope.Religion = "";
        $scope.FatherName = "";
        $scope.FatherMobile = "";
        $scope.MotherName = "";
        $scope.MotherMobile = "";
        $scope.FatherOccupationCode = "";
        $scope.GrandFatherName = "";
        $scope.GuardianName = "";
        $scope.GuardianMobile = "";
        $scope.Curr_Address1 = "";
        $scope.Curr_Address2 = "";
        $scope.Curr_Address3 = "";
        $scope.Curr_CountryCode = "";
        $scope.Curr_StateCode = "";
        $scope.Curr_CityCode = "";
        $scope.Curr_PinCode = "";
        $scope.IsAddressSame = "";
        $scope.Per_Address1 = "";
        $scope.Per_Address2 = "";
        $scope.Per_Address3 = "";
        $scope.Per_CountryCode = "";
        $scope.Per_StateCode = "";
        $scope.Per_CityCode = "";
        $scope.Per_PinCode = "";
        $scope.files = [];
        $scope.MaxPreferenceList = [];
        $scope.MaxPreferenceList = [
            { PName: 'First Preferance', PPreferedBranch: "" },
            { PName: 'Second Preferance', PPreferedBranch: "" },
            { PName: 'Third Preferance', PPreferedBranch: "" },
            { PName: 'Fourth Preferance', PPreferedBranch: "" },
            { PName: 'Fifth Preferance', PPreferedBranch: "" },
            { PName: 'Sixth Preference', PPreferedBranch: "" },

        ]
        $scope.$applyAsync();
        $scope.SetFocus('#txtEnquiryNo');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

}