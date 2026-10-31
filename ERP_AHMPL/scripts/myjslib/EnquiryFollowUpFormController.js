app.EnquiryFollowUpFormController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlSession');
    $scope.EnquiryFor = 'School';
    //$scope.SessionId = sessionId;
    $scope.IsSchoolSelected = 0;

    $scope.DashBoradLevel = sessionStorage.getItem('DashBoradLevel');
    $scope.CurrentRelationshipId = relationshipId;

    $scope.CheckEnquiryTransId = function () {
        if (sessionStorage.getItem('EnquiryTransId') == null || sessionStorage.getItem('EnquiryTransId') == "") {
            if ($scope.DashBoradLevel == 1) {
                window.location.href = "/DashBoard/EnquiryDashBoradLevel1";
            }
            else if ($scope.DashBoradLevel == 2) {
                window.location.href = "/DashBoard/EnquiryDashBoradLevel2";
            }
            else if ($scope.DashBoradLevel == 3) {
                window.location.href = "/DashBoard/EnquiryDashBoradLevel3";
            }
        }
        $scope.EnquiryTransId = sessionStorage.getItem('EnquiryTransId')
    }
    $scope.CheckEnquiryTransId();

    $scope.ddlAssociatedBranches_Change = function () {
        $scope.RenameRemark();
    }

    $scope.RenameRemark = function () {
        if ($scope.InRemark == undefined)
            $scope.InRemark = "";
        if ($scope.RelationshipId) {
            var Branch = $filter('filter')($scope.AssociatedBranches, { RelationshipId: $scope.RelationshipId });
            $scope.Remark = $scope.InRemark + ' (Enquiry Transfered to School ' + Branch[0].BranchName + '-' + Branch[0].BranchAddress + '.' + ' Dated: ' + moment($scope.TransferEnquiryDate).format('DD-MMM-YYYY') + ")";
        }
        else {
            $scope.Remark = $scope.InRemark;
        }
    }
    
    $scope.TransferEnquiry = function () {

        if (isValidate()) {
            var collectionobj = {};
            collectionobj.Action = "6";
            collectionobj.TransferEnquiryTransID = $scope.EnquiryTransId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.TransferSchoolId = $scope.RelationshipId;
            collectionobj.TransferEnquiryDate = moment($scope.TransferEnquiryDate).format('DD/MMM/YYYY');
            collectionobj.Remark = $scope.Remark;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/SendEnquiryToAnotherSchool', collectionobj);
            getData.then(function (response) {
                showMsgBox(response.data);

                setTimeout(function () {
                    if ($scope.DashBoradLevel == 1) {
                        window.location.href = "/DashBoard/EnquiryDashBoradLevel1";
                    }
                    else if ($scope.DashBoradLevel == 2) {
                        window.location.href = "/DashBoard/EnquiryDashBoradLevel2";
                    }
                    else if ($scope.DashBoradLevel == 3) {
                        window.location.href = "/DashBoard/EnquiryDashBoradLevel3";
                    }
                }, 300);
            });
        }   
    }
   

    $scope.BackToDashBoard = function () {
        sessionStorage.removeItem('EnquiryTransId'); 
        $scope.CheckEnquiryTransId();
    }

    $scope.ddl_CityChange = function () {
        $scope.GetCityArea($scope.CityCode);
    }
    $scope.ddlCollegeCourse_Change = function () {
        $scope.GetCollegeBranch($scope.CollegeCourseCode);
    }

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


    $scope.InRemark = "";
    $scope.IsTransferedEnq = false;

    $scope.GetEnquiry = function () {
       
        var collectionobj = {};
     
        collectionobj.TransID = $scope.EnquiryTransId
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/GetEnquiryFollowupFormOffline', collectionobj);
        getData.then(function (response) {



            $scope.EnquiryFormOffline = response.data.Table;
            $scope.FollowUpList = response.data.Table1;
            $scope.LastQualifiedExaminationList = response.data.Table2;

            $scope.EnquiryFor = $scope.EnquiryFormOffline[0].EnquiryFor;
            $scope.SessionId = $scope.EnquiryFormOffline[0].EnquiryForSessionCode;

            $scope.DateofEnquiry = new Date($scope.EnquiryFormOffline[0].DateOfEnquiry);
            $scope.EnquiryTypeCode = $scope.EnquiryFormOffline[0].EnquiryTypeCode;
            $scope.EnquirySourceCode = $scope.EnquiryFormOffline[0].EnquirySourceCode;
            $scope.IAm = $scope.EnquiryFormOffline[0].IAm;
            $scope.ClassCode = $scope.EnquiryFormOffline[0].ClassCode;
            $scope.StreamCode = $scope.EnquiryFormOffline[0].StreamCode;

            $scope.CollegeCourseCode = $scope.EnquiryFormOffline[0].CollegeCourseCode;
            if (typeof ($scope.CollegeCourseCode) != 'undefined') {
                $scope.GetCollegeBranch($scope.CollegeCourseCode);
            }
            
            $scope.CollegeBranchCode = $scope.EnquiryFormOffline[0].CollegeBranchCode;

            $scope.VisitorName = $scope.EnquiryFormOffline[0].VisitorName;
            $scope.FatherName = $scope.EnquiryFormOffline[0].FatherName;
            $scope.MotherName = $scope.EnquiryFormOffline[0].MotherName;
            $scope.Occupation = $scope.EnquiryFormOffline[0].Occupation;
            $scope.Reference = $scope.EnquiryFormOffline[0].Reference;
            $scope.StudentFirstName = $scope.EnquiryFormOffline[0].StudentFirstName;
            $scope.StudentMiddleName = $scope.EnquiryFormOffline[0].StudentMiddleName;
            $scope.StudentLastName = $scope.EnquiryFormOffline[0].StudentLastName;
            if ($scope.EnquiryFormOffline[0].DateOfBirth != undefined && $scope.EnquiryFormOffline[0].DateOfBirth != "" && $scope.EnquiryFormOffline[0].DateOfBirth != null)
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
            $scope.InRemark = $scope.EnquiryFormOffline[0].Remark;
            $scope.HostalRequired = $scope.EnquiryFormOffline[0].HostalRequired ? 'true' : 'false';

            $scope.NameofExam = $scope.EnquiryFormOffline[0].NameofExam;
            $scope.Rank = $scope.EnquiryFormOffline[0].Rank;

            $scope.TransferFromSchool = $scope.EnquiryFormOffline[0].TransferFromSchool

            $scope.IsTransferedEnq = $scope.EnquiryFormOffline[0].IsTransferedEnq;
            $scope.RelationshipId = $scope.EnquiryFormOffline[0].TransferEnquiryTo;

            if ($scope.IsTransferedEnq)
                $scope.TransferEnquiryDate = new Date($scope.EnquiryFormOffline[0].TransferEnquiryDate);
            

            $scope.$applyAsync();

        });
    }

    $scope.GetEnquiry();


    $scope.UpdateRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TransID = $scope.EnquiryTransId;
            collectionobj.EnquiryFor = $scope.EnquiryFor
            collectionobj.AcademicSessionId = $scope.SessionId
            collectionobj.VDate = moment($scope.DateofEnquiry).format('DD/MMM/YYYY HH:mm:ss')
            collectionobj.EnquiryTypeCode = $scope.EnquiryTypeCode;
            collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
            collectionobj.IAm = $scope.IAm;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.StreamCode = $scope.StreamCode;
            collectionobj.CollegeCourseCode = $scope.CollegeCourseCode;
            collectionobj.CollegeBranchCode = $scope.CollegeBranchCode;
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
            collectionobj.PrimaryNo = $scope.PrimaryNo == 1 ? $scope.StudentContact : $scope.PrimaryNo == 2 ? $scope.FatherContact : $scope.PrimaryNo == 3 ? $scope.MotherContact : $scope.PrimaryNo == 4 ? $scope.VisitorContact : null;
            collectionobj.WhatsAppNo = $scope.WhatsAppNo == 1 ? $scope.StudentContact : $scope.WhatsAppNo == 2 ? $scope.FatherContact : $scope.WhatsAppNo == 3 ? $scope.MotherContact : $scope.WhatsAppNo == 4 ? $scope.VisitorContact : null;
            collectionobj.Address = $scope.Address;
            collectionobj.CountryCode = $scope.CountryCode;
            collectionobj.StateCode = $scope.StateCode;
            collectionobj.CityCode = $scope.CityCode;
            collectionobj.CityAreaCode = $scope.CityAreaCode;
            collectionobj.SubArea = $scope.SubArea;
            collectionobj.PinCode = $scope.PinCode;
            collectionobj.CurrentPreviousSchool = $scope.CurrentPreviousSchool
            collectionobj.Remark = $scope.Remark;

            collectionobj.HostalRequired = $scope.HostalRequired;

            collectionobj.NameofExam = $scope.NameofExam;
            collectionobj.Rank = $scope.Rank;
            collectionobj.LastQualifiedExaminationList = JSON.stringify($scope.LastQualifiedExaminationList);
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/UpdateEnquiryFormFromFollowUp', collectionobj);
            getData.then(function (response) {
                showMsgBox(response.data);
            });
        }
    }

    $scope.SaveRecord = function () {
        if (isValidateList()) {
            var collectionobj = {};
          
            collectionobj.TransID = $scope.EnquiryTransId;
            collectionobj.FollowupCategory = $scope.FollowupCategory
            collectionobj.NextFollowupDate = moment($scope.NextFollowupDate).format('DD/MMM/YYYY')
            collectionobj.FollowUpRemark = $scope.FollowUpRemark
            collectionobj.VDate = moment($scope.DateOfEnquiry).format('DD/MMM/YYYY')

            collectionobj.RelationshipId = relationshipId;
            
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            
            var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/InsertUpdateDeleteEnquiryFollowUpFormOffline', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    sessionStorage.removeItem('EnquiryTransId');
                    $scope.CheckEnquiryTransId();
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
                    { "HeaderText": "Date of Enquiry", "HeaderValue": "DateOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Enquiry Source", "HeaderValue": "EnquirySource", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "I Am", "HeaderValue": "IAm", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Stream", "HeaderValue": "Stream", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Visitor Name", "HeaderValue": "VisitorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
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
                    { "HeaderText": "Current/PreviousSchool", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Hostal Required", "HeaderValue": "HostalRequired", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }
                ];

            $scope.EnquiryFormOffline = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EnquiryFormOffline = $filter('filter')($scope.EnquiryFormOffline, { 'TransId': $scope.hfId }, true);

            
                $scope.EnquiryFor = $scope.EnquiryFormOffline[0].EnquiryFor;
                $scope.SessionId = $scope.EnquiryFormOffline[0].EnquiryForSessionCode;
            
                $scope.DateOfEnquiry = new Date($scope.EnquiryFormOffline[0].DateOfEnquiry);
                $scope.EnquiryTypeCode = $scope.EnquiryFormOffline[0].EnquiryTypeCode;
                $scope.EnquirySourceCode = $scope.EnquiryFormOffline[0].EnquirySourceCode;
                $scope.IAm = $scope.EnquiryFormOffline[0].IAm;
                $scope.ClassCode = $scope.EnquiryFormOffline[0].ClassCode;
                $scope.StreamCode = $scope.EnquiryFormOffline[0].StreamCode;
                $scope.VisitorName = $scope.EnquiryFormOffline[0].VisitorName;
                $scope.FatherName = $scope.EnquiryFormOffline[0].FatherName;
                $scope.MotherName = $scope.EnquiryFormOffline[0].MotherName;
                $scope.Occupation = $scope.EnquiryFormOffline[0].Occupation;
                $scope.Reference = $scope.EnquiryFormOffline[0].Reference;
                $scope.StudentFirstName = $scope.EnquiryFormOffline[0].StudentFirstName;
                $scope.StudentMiddleName = $scope.EnquiryFormOffline[0].StudentMiddleName;
                $scope.StudentLastName = $scope.EnquiryFormOffline[0].StudentLastName;
                if ($scope.EnquiryFormOffline[0].DateOfBirth != undefined && $scope.EnquiryFormOffline[0].DateOfBirth != "" && $scope.EnquiryFormOffline[0].DateOfBirth != null)
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
                $scope.HostalRequired = $scope.EnquiryFormOffline[0].HostalRequired ? 'true' : 'false';

                $scope.hideLoader();
                $scope.Save = "Edit";
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
        var getData = myService.methode('POST', '../Api/EnquiryMasterApi/InsertUpdateDeleteEnquiryFormOffline', collectionobj);
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
        $scope.hfId = "";


        $scope.GetEnquiry();

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
                { "HeaderText": "Date of Enquiry", "HeaderValue": "DateOfEnquiry", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Source", "HeaderValue": "EnquirySource", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "I Am", "HeaderValue": "IAm", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "Class", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Stream", "HeaderValue": "Stream", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Visitor Name", "HeaderValue": "VisitorName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
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
                { "HeaderText": "Current/PreviousSchool", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "Hostal Required", "HeaderValue": "HostalRequired", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }

            ];

        $scope.PrintMaster(tblheader, $scope.EnquiryFormOffline, window.document.title);
    };
}