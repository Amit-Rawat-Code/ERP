app.RegistrationFormSaleEntryOnlineController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlClass');
    $scope.SessionId = sessionId;
    $scope.ddlClass_Change=function (ClassCode)
    {
        
        $scope.GetAmount(ClassCode);
    }

       //This is Search Box List Function
        $scope.GetAmount = function ()
        {

            var collectionobj = {};
         
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.Action = "7";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.FYId = fyId;
            collectionobj.SessionId = sessionId;

            var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/GetAmountByClass', collectionobj);
            getData.then(function (response) {
                var Registration = response.data;
                $scope.Amount = Registration[0].Amount;
                $scope.RegNo = Registration[0].RegNo;
            });
        }
     // This is Student Detail Function (On Click of "Get Details" link)
     






    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId;
            collectionobj.FormSaleType = "Online";//$scope.FormSaleType;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.RegNo = $scope.RegNo;
            collectionobj.AcademicSessionId = $scope.SessionId;
            collectionobj.StudentFirstName = $scope.StudentFirstName;
            collectionobj.StudentMiddleName = $scope.StudentMiddleName;
            collectionobj.StudentLastName = $scope.StudentLastName;
            collectionobj.ParentEmail = $scope.ParentEmail;
            collectionobj.FatherContact = $scope.FatherContact;
            collectionobj.Amount = $scope.Amount;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreaetdBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = "1";
           //
           // if ($scope.Save == "Save") {
           //     collectionobj.Action = "1";
           // }
           // else if ($scope.Save == "Edit") {
           //     collectionobj.Action = "2";
           // }
       
            var getData = myService.methode('POST', '../Api/RegistrationTransactionApi/InsertUpdateDeleteRegistrationFormSaleEntry', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }

            });
        }
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
        $scope.EnquiryTransID = "";
        $scope.RegNo = "";
        $scope.RegNoSerial = "";
        $scope.Discount = "0";
        $scope.Amount = "0";
        $scope.SaleRemark = "";
        $scope.NetAmount = "0";
        $scope.Category = "";
        $scope.EnquiryFor = loginAs;
        $scope.SessionId = "2";
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
        $scope.PaymentRefrenceNo = "";

        $scope.IsPayMode = "";
        $scope.PaymentType = ($filter('filter')($scope.PayModeList, { Name: 'Cash' }))[0].Code.toString();

        $scope.GetClasses();
        $scope.$applyAsync();
        $scope.SetFocus('#txtSearch');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}