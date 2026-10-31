app.RegistrationFormSubmissionController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');
    $scope.SessionId = sessionId;
    $scope.IsAgainstEnquiry = "1";
    $scope.GetState();

    $scope.SetMaxMinDate().then(function (response) {
        $scope.Date = response;
        $scope.$applyAsync();
    });

    $scope.ddlSession_Change = function () {
        $scope.SearchStudentsDetail();
    }

    $scope.ClearItems = function () {
        $scope.items = [];
    }
    $scope.SubjectList = [{
        Srno: "",
        Subject: '',
        Marks:''
    }]

    $scope.AddRow = function () {
        $scope.SubjectList.push({
            Srno: "",
            Subject: '',
            Marks: ''
        });
    }

    $scope.RemoveRow = function (srno) {
        $scope.SubjectList = $filter('filter')($scope.SubjectList, { Srno: '!' + srno });
    }

    $scope.GetClasses = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        
        var getData = myService.methode('POST', '../api/GetMasterApi/GetClass', collectionobj);
        getData.then(function (response) {
            $scope.ClassList = response.data;
        });
    };

    $scope.ddl_CityChange = function () {
        $scope.GetCityArea($scope.CityCode);
    }
    $scope.GetStream();

    //This is Search Box List Function
    $scope.SearchStudentsDetail = function () {
        var collectionobj = {};
        collectionobj.SearchBox = $scope.SearchBox;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.Action = "5";

        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetailsFromRegistrationSale', collectionobj);
        getData.then(function (response) {
            $scope.items = response.data.Table;
        });
    }
    // This is Student Detail Function (On Click of "Get Details" link)
    $scope.SearchStudentDetail = function (ID) {

        var collectionobj = {};
        collectionobj.SearchBox = ID;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.AcademicSessionId = $scope.SessionId;
        collectionobj.RegNoSerial = $scope.RegNoSerial;
        collectionobj.Action = "6";

        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetailsFromRegistrationSale', collectionobj);
        getData.then(function (response) {

            $scope.items = [];
            $scope.$parent.SearchBox = "";
            var UserDetails = [];
            UserDetails = response.data.Table;

            $scope.RegistrationFormSaleTransId = UserDetails[0].TransID;
            $scope.RegNo = UserDetails[0].RegNo;

            $scope.StudentFirstName = UserDetails[0].StudentFirstName;
            $scope.StudentMiddleName = UserDetails[0].StudentMiddleName;
            $scope.StudentLastName = UserDetails[0].StudentLastName;

            $scope.DateOfBirth = new Date(UserDetails[0].DateofBirth)

            $scope.Days = UserDetails[0].Day;
            $scope.Month = UserDetails[0].Month;
            $scope.Year = UserDetails[0].Year;

            $scope.DateOfBirthInWords = UserDetails[0].DateOfInWords;
            $scope.AgeOnDate = UserDetails[0].AgeOnDate;

            $scope.AgeAsOnYear = $scope.AgeOnDate.split('-')[0];
            $scope.AgeAsOnMonth = $scope.AgeOnDate.split('-')[1];

            $scope.FatherName = UserDetails[0].FatherName;
            $scope.MotherName = UserDetails[0].MotherName;

            $scope.FatherContact = UserDetails[0].FatherContact;
            $scope.MotherContact = UserDetails[0].MotherContact;

            $scope.PrimaryNo = UserDetails[0].PrimaryNo;
            $scope.WhatsAppNo = UserDetails[0].WhatsAppNo;

            $scope.FatherEmail = UserDetails[0].ParentEmail;
            $scope.MotherEmail = UserDetails[0].MotherEmail;

            $scope.ResidentialAddress = UserDetails[0].Address;

            $scope.RegClassName = UserDetails[0].RegClassName;
            $scope.BoardCode = UserDetails[0].BoardCode;
        });
    }

    $scope.Calculate = function () {
        $scope.Days = moment($scope.DateOfBirth).format('DD');
        $scope.Month = moment($scope.DateOfBirth).format('MMMM');
        $scope.Year = moment($scope.DateOfBirth).format('YYYY');

        var collectionobj = {};
        collectionobj.DateOfBirth = moment($scope.DateOfBirth).format('DD-MMM-YYYY');
        collectionobj.Action = "8";

        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetailsFromRegistrationSale', collectionobj);
        getData.then(function (response) {
            $scope.DateOfBirthInWords = response.data.Table[0].DateOfInWords;
            $scope.AgeOnDate = response.data.Table[0].AgeOnDate;

            $scope.AgeAsOnYear = $scope.AgeOnDate.split('-')[0];
            $scope.AgeAsOnMonth = $scope.AgeOnDate.split('-')[1];
        });
    }
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.VDate = moment($scope.Date).format('DD-MMM-YYYY');
            collectionobj.RegistrationFormSaleTransId = $scope.RegistrationFormSaleTransId;
            collectionobj.RegNo = $scope.RegNo;

            collectionobj.StudentFirstName = $scope.StudentFirstName;
            collectionobj.StudentMiddleName = $scope.StudentMiddleName;
            collectionobj.StudentLastName = $scope.StudentLastName;

            collectionobj.Days = $scope.Days;
            collectionobj.Month = $scope.Month;
            collectionobj.Year = $scope.Year;
            collectionobj.DateOfBirth = moment($scope.DateOfBirth).format('DD-MMM-YYYY');

            collectionobj.DateOfBirthInWords = $scope.DateOfBirthInWords;
            collectionobj.AgeAsOnYear = $scope.AgeAsOnYear
            collectionobj.AgeAsOnMonth = $scope.AgeAsOnMonth
            collectionobj.CurrentlyStudyingSchool = $scope.CurrentlyStudyingSchool
            collectionobj.BoardCode = $scope.BoardCode
            collectionobj.ClassCode = $scope.$parent.ClassCode 
            collectionobj.SubjectList = JSON.stringify($scope.SubjectList)
            collectionobj.MediumOfInstruction = $scope.MediumOfInstruction
            collectionobj.Nationality = $scope.Nationality

            collectionobj.MotherTongue = $scope.MotherTongue

            collectionobj.FatherContact = $scope.FatherContact
            collectionobj.MotherContact = $scope.MotherContact

            collectionobj.FatherName = $scope.FatherName
            collectionobj.MotherName = $scope.MotherName
            collectionobj.PrimaryNo = $scope.PrimaryNo == 1 ? $scope.StudentContact : $scope.PrimaryNo == 2 ? $scope.FatherContact : $scope.PrimaryNo == 3 ? $scope.MotherContact : $scope.PrimaryNo == 4 ? $scope.VisitorContact : null;
            collectionobj.WhatsAppNo = $scope.WhatsAppNo == 1 ? $scope.StudentContact : $scope.WhatsAppNo == 2 ? $scope.FatherContact : $scope.WhatsAppNo == 3 ? $scope.MotherContact : $scope.WhatsAppNo == 4 ? $scope.VisitorContact : null;
            collectionobj.FatherEmail = $scope.FatherEmail
            collectionobj.MotherEmail = $scope.MotherEmail
            collectionobj.FatherAcademicQualification = $scope.FatherAcademicQualification
            collectionobj.MotherAcademicQualification = $scope.MotherAcademicQualification
            collectionobj.FatherOccupation = $scope.FatherOccupation
            collectionobj.MotherOccupation = $scope.MotherOccupation
            collectionobj.FatherNatureOfJob = $scope.FatherNatureOfJob
            collectionobj.MotherNatureOfJob = $scope.MotherNatureOfJob
            collectionobj.ResidentialAddress = $scope.ResidentialAddress

            collectionobj.StudentPhoto = $scope.StudentPhoto
            collectionobj.OverallPercentage = $scope.OverallPercentage
     

            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            $scope.disableAdd = true;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
            }

            var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFormSubmission', collectionobj);
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
        $scope.items = [];

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetRegistrationFormSubmission', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date Of Sub.", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "RegClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date of Birth", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherContact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mother Mobile No.", "HeaderValue": "MotherContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }
                ];

            $scope.RegistrationFormSubmissionList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.RegistrationFormSubmissionList = $filter('filter')($scope.RegistrationFormSubmissionList, { 'TransID': $scope.hfId }, true);

                $scope.Searchdisabled = true;
                

                $scope.RegNo = $scope.RegistrationFormSubmissionList[0].RegNo
                $scope.Date = new Date($scope.RegistrationFormSubmissionList[0].VDate)
                $scope.StudentFirstName = $scope.RegistrationFormSubmissionList[0].StudentFirstName
                $scope.StudentMiddleName = $scope.RegistrationFormSubmissionList[0].StudentMiddleName
                $scope.StudentLastName = $scope.RegistrationFormSubmissionList[0].StudentLastName

                $scope.Days = $scope.RegistrationFormSubmissionList[0].DateOfBirthinFiguresDay
                $scope.Month = $scope.RegistrationFormSubmissionList[0].DateOfBirthinFiguresMonth
                $scope.Year = $scope.RegistrationFormSubmissionList[0].DateOfBirthinFiguresYear
                $scope.DateOfBirth = new Date($scope.RegistrationFormSubmissionList[0].DateOfBirth)

                $scope.DateOfBirthInWords = $scope.RegistrationFormSubmissionList[0].DateOfBirthInWords
                $scope.AgeAsOnYear = $scope.RegistrationFormSubmissionList[0].AgeAsOnYear
                $scope.AgeAsOnMonth = $scope.RegistrationFormSubmissionList[0].AgeAsOnMonth
                $scope.CurrentlyStudyingSchool = $scope.RegistrationFormSubmissionList[0].CurrentlyStudyingSchool
                $scope.BoardCode = $scope.RegistrationFormSubmissionList[0].BoardCode
                $scope.$parent.ClassCode = $scope.RegistrationFormSubmissionList[0].ClassCode

                $scope.RegClassName = $scope.RegistrationFormSubmissionList[0].RegClassName
                
                $scope.MediumOfInstruction = $scope.RegistrationFormSubmissionList[0].MediumOfInstruction
                $scope.Nationality = $scope.RegistrationFormSubmissionList[0].Nationality
                $scope.MotherTongue = $scope.RegistrationFormSubmissionList[0].MotherTongue
                $scope.FatherName = $scope.RegistrationFormSubmissionList[0].FatherName
                $scope.MotherName = $scope.RegistrationFormSubmissionList[0].MotherName

                $scope.FatherContact = $scope.RegistrationFormSubmissionList[0].FatherMobileNo
                $scope.MotherContact = $scope.RegistrationFormSubmissionList[0].MotherMobileNo

                $scope.PrimaryNo = $scope.RegistrationFormSubmissionList[0].PrimaryNo
                $scope.WhatsAppNo = $scope.RegistrationFormSubmissionList[0].WhatsAppNo

                $scope.FatherEmail = $scope.RegistrationFormSubmissionList[0].FatherEmailId
                $scope.MotherEmail = $scope.RegistrationFormSubmissionList[0].MotherEmailId

                $scope.FatherAcademicQualification = $scope.RegistrationFormSubmissionList[0].FatherAcademicQualification
                $scope.MotherAcademicQualification = $scope.RegistrationFormSubmissionList[0].MotherAcademicQualification
                $scope.FatherOccupation = $scope.RegistrationFormSubmissionList[0].FatherOccupation
                $scope.MotherOccupation = $scope.RegistrationFormSubmissionList[0].MotherOccupation
                $scope.FatherNatureOfJob = $scope.RegistrationFormSubmissionList[0].FatherNatureOfJob
                $scope.MotherNatureOfJob = $scope.RegistrationFormSubmissionList[0].MotherNatureOfJob
                $scope.ResidentialAddress = $scope.RegistrationFormSubmissionList[0].ResidentialAddress
                $scope.StudentPhoto = $scope.RegistrationFormSubmissionList[0].StudentPhoto
                $scope.OverallPercentage = $scope.RegistrationFormSubmissionList[0].OverallPercentage
    

                var collectionobj = {};
                collectionobj.Action = "7";
                collectionobj.TransID = $scope.hfId;
                var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetRegistrationFormSubmission', collectionobj);
                getData.then(function (response) {
                    if (response.data.length>0)
                        $scope.SubjectList = response.data
                    else
                        $scope.SubjectList = [{
                            Srno: "",
                            Subject: '',
                            Marks: ''
                        }]
                });

                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
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
        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFormSubmission', collectionobj);
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
        $scope.RegNo = "";

        $scope.StudentFirstName = "";
        $scope.StudentMiddleName = "";
        $scope.StudentLastName = "";

        $scope.DateOfBirth = "";

        $scope.Days = "";
        $scope.Month = "";
        $scope.Year = "";
        $scope.DateOfBirthInWords= "";
        $scope.AgeAsOnYear = "";
        $scope.AgeAsOnMonth = "";
        $scope.CurrentlyStudyingSchool = "";
     
        $scope.BoardCode = "";
        $scope.$parent.ClassCode = "";

        $scope.RegClassName = "";

        $scope.SubjectList = [{
            Srno: "",
            Subject: '',
            Marks: ''
        }]

        $scope.MediumOfInstruction = "";
        $scope.Nationality = "";
        $scope.MotherTongue = "";
        $scope.FatherName = "";
        $scope.MotherName = "";

        $scope.FatherContact = "";
        $scope.MotherContact = "";

        $scope.PrimaryNo = "";
        $scope.WhatsAppNo = "";
        $scope.FatherEmail = "";
        $scope.MotherEmail = "";
        $scope.FatherAcademicQualification = "";
        $scope.MotherAcademicQualification = "";
        $scope.FatherOccupation = "";
        $scope.MotherOccupation = "";
        $scope.FatherNatureOfJob = "";
        $scope.MotherNatureOfJob = "";
        $scope.ResidentialAddress = "";
        $scope.OverallPercentage = "";
        $scope.StudentPhoto = "";
        $scope.Searchdisabled = false;

        $scope.ModeOfCommunication = "Email";
        $scope.SetMaxMinDate().then(function (response) {
            $scope.Date = response;
            $scope.$applyAsync();
        });

        $scope.$applyAsync();
        $scope.SetFocus('#txtSearch');
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
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date Of Sub.", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "RegClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Date of Birth", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherContact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Mother Mobile No.", "HeaderValue": "MotherContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.EnquiryFormOffline, window.document.title);
    };
}