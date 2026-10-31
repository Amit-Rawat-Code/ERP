app.RegistrationFormSaleEntryController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSearch');
    $scope.SessionId = sessionId;
    $scope.IsAgainstEnquiry = "1";
    $scope.GetState();
    $scope.SetMaxMinDate().then(function (response) {
        $scope.Date = response;
        $scope.$applyAsync();
    });

    $scope.ClearItems = function () {
        $scope.items = [];
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

    $scope.ddlClass_Change = function (ClassCode) {

        $scope.GetAmount(ClassCode);
    }

    $scope.IsAgainstEnquiryDirectChange = function ()
    {
        if ($scope.IsAgainstEnquiry == "1")
        {
            $scope.Searchdisabled = false; 
        }
        else
        {
            $scope.items = [];
            $scope.Searchdisabled = true;
        }
        $scope.ResetControl(1, false);
    }

    //This is Search Box List Function
    $scope.GetAmount = function () {

        var collectionobj = {};

        collectionobj.ClassCode = $scope.ClassCode;
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.RegNoSerial = $scope.RegNo;
        collectionobj.FormSaleType = $scope.FormSaleType;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response) {
            
            if (response.data.Table1.length > 0)
            {
                var RegistrationDetail = response.data.Table1;
            
                $scope.RegNo = RegistrationDetail[0].RegNo;
                $scope.RegNoSerial = RegistrationDetail[0].Serial;
                $scope.Amount = RegistrationDetail[0].Amount;
                $scope.GetNetAmount();
            }
            else
            {
                $scope.RegNo = '';
                $scope.Amount = 0;
            }
        });
    }




        $scope.ddl_CityChange = function () {
            $scope.GetCityArea($scope.CityCode);
        }
       // $scope.GetStream();
    $scope.GetNetAmount = function () {
        $scope.NetAmount = parseInt($scope.Amount - $scope.Discount);
    }

       //This is Search Box List Function
        $scope.SearchStudentsDetail = function ()
        {
            var collectionobj = {};
            collectionobj.SearchBox = $scope.SearchBox;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = $scope.SessionId;
            collectionobj.Action = "5";

            var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetails', collectionobj);
            getData.then(function (response) {
                $scope.items = response.data.Table;
                $scope.$applyAsync();
            });
        }
     // This is Student Detail Function (On Click of "Get Details" link)
    $scope.SearchStudentDetail = function (ID)
    {
        var collectionobj = {};
        collectionobj.SearchBox = ID;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.RegNoSerial = $scope.RegNoSerial;
        collectionobj.FormSaleType = $scope.FormSaleType;
        collectionobj.Action = "6";

        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetStudentDetails', collectionobj);
        getData.then(function (response)
        {
            $scope.items = [];
            $scope.$parent.SearchBox = "";
            var UserDetails = [];
            UserDetails = response.data.Table;

            $scope.StateCode = UserDetails[0].StateCode;
            $scope.CityCode = UserDetails[0].CityCode;
            $scope.GetCityArea($scope.CityCode);
            $scope.CityAreaCode = UserDetails[0].CityAreaCode;
            $scope.EnquiryTransID = UserDetails[0].TransID;
            $scope.sessionId = UserDetails[0].EnquiryForSessionCode;
            $scope.$parent.ClassCode = UserDetails[0].ClassCode;
            $scope.StreamCode = UserDetails[0].StreamCode;
            $scope.VisitorName = UserDetails[0].VisitorName;
            $scope.FatherName = UserDetails[0].FatherName;
            $scope.MotherName = UserDetails[0].MotherName;
            $scope.StudentFirstName = UserDetails[0].StudentFirstName;
            $scope.StudentMiddleName = UserDetails[0].StudentMiddleName;
            $scope.StudentLastName = UserDetails[0].StudentLastName;
            $scope.DateOfBirth = new Date(UserDetails[0].DateOfBirth);
            $scope.Gender = UserDetails[0].Gender;
            $scope.Category = UserDetails[0].Category;
            $scope.StudentEmail = UserDetails[0].StudentdEmail;
            $scope.ParentEmail = UserDetails[0].ParentEmail;
            $scope.GuardianEmail = UserDetails[0].GuardianEmail;
            $scope.StudentContact = UserDetails[0].StudentContact;
            $scope.FatherContact = UserDetails[0].FatherContact;
            $scope.MotherContact = UserDetails[0].MotherContact;
            $scope.VisitorContact = UserDetails[0].VisitorContact;
            $scope.PrimaryNo = UserDetails[0].PrimaryNo;
            $scope.WhatsAppNo = UserDetails[0].WhatsAppNo;
            $scope.Address = UserDetails[0].Address;
            $scope.SubArea = UserDetails[0].SubArea;
            $scope.PinCode = UserDetails[0].PinCode;
            $scope.CurrentPreviousSchool = UserDetails[0].CurrentPreviousSchool;
            $scope.Occupation = UserDetails[0].Occupation;
            $scope.Reference = UserDetails[0].Reference;
            $scope.Remark = UserDetails[0].Remark;           
            if (response.data.Table1.length > 0)
            {
                var RegistrationDetail = response.data.Table1;                
                $scope.RegNo = RegistrationDetail[0].RegNo;
                $scope.RegNoSerial = RegistrationDetail[0].Serial;
                $scope.Amount = RegistrationDetail[0].Amount;
                $scope.GetNetAmount();
            }
        });
    }



    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            var flag = false;
            if ($scope.IsAgainstEnquiry == '1' && ($scope.RegNo != null && $scope.RegNo.trim() != '')) {
                flag = true;
            }
            else {
                if ($scope.IsAgainstEnquiry == '0') {
                    flag = true;
                }
            }
            if (flag) {

                var collectionobj = {};
                collectionobj.TransID = $scope.hfId;
                collectionobj.EnquiryTransID = $scope.EnquiryTransID;
                collectionobj.VDate = moment($scope.Date).format('DD/MMM/YYYY HH:mm:ss');
                collectionobj.VType = $scope.VType;
                collectionobj.RegNo = $scope.RegNo;
                //collectionobj.PVNo = $scope.PVNo;
                collectionobj.FormSaleType = $scope.FormSaleType;
                collectionobj.IsAgainstEnquiry = $scope.IsAgainstEnquiry;
                collectionobj.ClassCode = $scope.ClassCode;
                collectionobj.StreamCode = $scope.StreamCode;
                collectionobj.BoardCode = $scope.BoardCode;
                collectionobj.AcademicSessionId = $scope.SessionId;
                collectionobj.StudentFirstName = $scope.StudentFirstName;
                collectionobj.StudentMiddleName = $scope.StudentMiddleName;
                collectionobj.StudentLastName = $scope.StudentLastName;
                collectionobj.DateOfBirth = moment($scope.DateOfBirth).format('DD/MMM/YYYY');
                collectionobj.Gender = $scope.Gender;
                collectionobj.MotherName = $scope.MotherName;
                collectionobj.FatherName = $scope.FatherName;
                collectionobj.GuardianName = $scope.GuardianName;
                collectionobj.Category = $scope.Category;
                collectionobj.StudentEmail = $scope.StudentEmail;
                collectionobj.GuardianEmail = $scope.GuardianEmail;
                collectionobj.ParentEmail = $scope.ParentEmail;
                collectionobj.StudentContact = $scope.StudentContact;
                collectionobj.FatherContact = $scope.FatherContact;
                collectionobj.MotherContact = $scope.MotherContact;
                collectionobj.GuardianContact = $scope.GuardianContact;
                collectionobj.PrimaryNo = $scope.PrimaryNo == 1 ? $scope.StudentContact : $scope.PrimaryNo == 2 ? $scope.FatherContact : $scope.PrimaryNo == 3 ? $scope.MotherContact : $scope.PrimaryNo == 4 ? $scope.VisitorContact : null;
                collectionobj.WhatsAppNo = $scope.WhatsAppNo == 1 ? $scope.StudentContact : $scope.WhatsAppNo == 2 ? $scope.FatherContact : $scope.WhatsAppNo == 3 ? $scope.MotherContact : $scope.WhatsAppNo == 4 ? $scope.VisitorContact : null;
                collectionobj.StateCode = $scope.StateCode;
                collectionobj.CityCode = $scope.CityCode;
                collectionobj.Address = $scope.Address;
                collectionobj.CityAreaCode = $scope.CityAreaCode;
                collectionobj.SubArea = $scope.SubArea;
                collectionobj.PinCode = $scope.PinCode;
                collectionobj.CurrentPreviousSchool = $scope.CurrentPreviousSchool;
                collectionobj.Occupation = $scope.Occupation;
                collectionobj.Reference = $scope.Reference;
                collectionobj.Remark = $scope.Remark;
                collectionobj.Amount = $scope.Amount;
                collectionobj.Discount = $scope.Discount;
                collectionobj.SaleRemark = $scope.SaleRemark;
                collectionobj.NetAmount = $scope.NetAmount;
                collectionobj.IsPayMode = $scope.IsPayMode;
                collectionobj.PaymentType = $scope.PaymentType;
                collectionobj.PaymentRefrenceNo = $scope.PaymentRefrenceNo;


                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.CreaetdBy = userid;
                collectionobj.UpdatedBy = userid;

                $scope.disableAdd = true;
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                }

                var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFormSaleEntry', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }

                });
            }
            else {
                showMsgBox('Reg.No. can not blank.')
                $scope.SetFocus('#txtRegNo');
            }
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
        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetRegistrationFormSaleEntry', collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    {"HeaderText": "Session", "HeaderValue": "AcademicSession", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg. No.", "HeaderValue": "RegNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg. Date", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg. Month", "HeaderValue": "RegMonth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Form Sale Type", "HeaderValue": "FormSaleType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Student Name", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Date of Birth", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Gender", "HeaderValue": "Gender", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Father Name", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mother Name", "HeaderValue": "MotherName", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Father Mobile No.", "HeaderValue": "FatherContact", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mother Mobile No.", "HeaderValue": "MotherContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Guardian Mobile No.", "HeaderValue": "VisitorContact", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Current/Previous School", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" }
                ];

            $scope.RegistrationFormSaleEntryOffline = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();

                $scope.Searchdisabled = true;

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.GetClasses();
                $scope.RegistrationFormSaleEntryOffline = $filter('filter')($scope.RegistrationFormSaleEntryOffline, { 'TransID': $scope.hfId }, true);
                $scope.EnquiryTransID = $scope.RegistrationFormSaleEntryOffline[0].EnquiryTransID;
                $scope.IsAgainstEnquiry = $scope.RegistrationFormSaleEntryOffline[0].IsAgainstEnquiry;
                $scope.SessionId = String($scope.RegistrationFormSaleEntryOffline[0].AcademicSessionId);
                $scope.Date = new Date($scope.RegistrationFormSaleEntryOffline[0].VDate);
                $scope.FormSaleType = $scope.RegistrationFormSaleEntryOffline[0].FormSaleType
                $scope.Gender = $scope.RegistrationFormSaleEntryOffline[0].Gender;
                $scope.MotherName = $scope.RegistrationFormSaleEntryOffline[0].MotherName;
                $scope.FatherName = $scope.RegistrationFormSaleEntryOffline[0].FatherName;
                $scope.$parent.ClassCode = $scope.RegistrationFormSaleEntryOffline[0].ClassCode;
                $scope.StreamCode = $scope.RegistrationFormSaleEntryOffline[0].StreamCode;
                $scope.BoardCode = $scope.RegistrationFormSaleEntryOffline[0].BoardCode;
                $scope.Occupation = $scope.RegistrationFormSaleEntryOffline[0].Occupation;
                $scope.Reference = $scope.RegistrationFormSaleEntryOffline[0].Reference;
                $scope.StudentFirstName = $scope.RegistrationFormSaleEntryOffline[0].StudentFirstName;
                $scope.StudentMiddleName = $scope.RegistrationFormSaleEntryOffline[0].StudentMiddleName;
                $scope.StudentLastName = $scope.RegistrationFormSaleEntryOffline[0].StudentLastName;
                $scope.DateOfBirth = new Date($scope.RegistrationFormSaleEntryOffline[0].DateOfBirth);
                $scope.Category = $scope.RegistrationFormSaleEntryOffline[0].Category;
                $scope.StudentdEmail = $scope.RegistrationFormSaleEntryOffline[0].StudentdEmail;
                $scope.GuardianEmail = $scope.RegistrationFormSaleEntryOffline[0].GuardianEmail;
                $scope.RegNo = $scope.RegistrationFormSaleEntryOffline[0].RegNo;
                $scope.ParentEmail = $scope.RegistrationFormSaleEntryOffline[0].ParentEmail;
                $scope.StudentContact = $scope.RegistrationFormSaleEntryOffline[0].StudentContact;
                $scope.FatherContact = $scope.RegistrationFormSaleEntryOffline[0].FatherContact;
                $scope.MotherContact = $scope.RegistrationFormSaleEntryOffline[0].MotherContact;
                $scope.PrimaryNo = $scope.RegistrationFormSaleEntryOffline[0].PrimaryNo;
                $scope.WhatsAppNo = $scope.RegistrationFormSaleEntryOffline[0].WhatsAppNo;
                $scope.Address = $scope.RegistrationFormSaleEntryOffline[0].Address;
                $scope.StateCode = $scope.RegistrationFormSaleEntryOffline[0].StateCode;
               // $scope.GetCity($scope.StateCode);
                $scope.CityCode = $scope.RegistrationFormSaleEntryOffline[0].CityCode;
               // $scope.GetCityArea($scope.CityCode);
                $scope.CityAreaCode = $scope.RegistrationFormSaleEntryOffline[0].CityAreaCode;
                $scope.SubArea = $scope.RegistrationFormSaleEntryOffline[0].SubArea;
                $scope.PinCode = $scope.RegistrationFormSaleEntryOffline[0].PinCode;
                $scope.CurrentPreviousSchool = $scope.RegistrationFormSaleEntryOffline[0].CurrentPreviousSchool;
                $scope.Remark = $scope.RegistrationFormSaleEntryOffline[0].Remark
                $scope.SaleRemark = $scope.RegistrationFormSaleEntryOffline[0].SaleRemark;
                $scope.Amount = $scope.RegistrationFormSaleEntryOffline[0].Amount;
                $scope.NetAmount = $scope.RegistrationFormSaleEntryOffline[0].NetAmount;
                $scope.Discount = $scope.RegistrationFormSaleEntryOffline[0].Discount;
                $scope.IsPayMode = $scope.RegistrationFormSaleEntryOffline[0].IsPayMode;
                $scope.PaymentType = $scope.RegistrationFormSaleEntryOffline[0].PaymentType;
                $scope.PaymentRefrenceNo = $scope.RegistrationFormSaleEntryOffline[0].PaymentRefrenceNo;
                $scope.ClassName = $scope.RegistrationFormSaleEntryOffline[0].ClassName;
                $scope.AmountInWords = $scope.RegistrationFormSaleEntryOffline[0].AmountInWords;
                $scope.PVNo = $scope.RegistrationFormSaleEntryOffline[0].PVNo;

                var collectionobj = {};
                collectionobj.Action = "8";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.SessionId = sessionId;
                collectionobj.RegNo = $scope.RegNo;
                var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetRegistrationFormSaleEntry', collectionobj);
                getData.then(function (response) {
                    $scope.ClassList = response.data;
                });

                $scope.hideLoader();
                $scope.Save = "Edit";
               // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.disablePrint = false;
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
        var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFormSaleEntry', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag,flag1)
    {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";
        $scope.EnquiryTransID = "";
        $scope.FormSaleType = "Offline";
        $scope.RegNo = "";
        $scope.RegNoSerial = "";
        $scope.Discount = "0";
        $scope.Amount = "0";
        $scope.SaleRemark = "";
        $scope.NetAmount = "0";
        $scope.Category = "";
        $scope.EnquiryFor = loginAs;
        $scope.$parent.ClassCode = "";
        $scope.StreamCode = "";
        $scope.BoardCode = "";
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
        $scope.StudentEmail = "";
        $scope.GuardianEmail = "";
        $scope.ParentEmail = "";
        $scope.StudentContact = "";
        $scope.FatherContact = "";
        $scope.MotherContact = "";
        $scope.GuardianContact = "";
        $scope.PrimaryNo = "";
        $scope.WhatsAppNo = "";
        $scope.Address = "";
        $scope.CountryCode = "";
        $scope.StateCode = "";
        $scope.CityCode = "";
        $scope.CityAreaCode = "";
        $scope.SubArea = "";
        $scope.PinCode = "";
        $scope.CurrentPreviousSchool = "";
        $scope.Remark = "";
        if (flag1 != false) {
            $scope.IsAgainstEnquiry = "1";
            $scope.Searchdisabled = false;
        }

        $scope.PaymentRefrenceNo = "";
        

        $scope.IsPayMode = "";
        $scope.PaymentType = ($filter('filter')($scope.PayModeList, { Name: 'Cash' }))[0].Code.toString();

        $scope.GetClasses();
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
        $scope.Export('print');
    };

}