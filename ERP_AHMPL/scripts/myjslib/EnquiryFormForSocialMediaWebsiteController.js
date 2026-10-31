app.EnquiryFormForSocialMediaWebsiteController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlIAm');
    $scope.EnquiryFor = (isSchool ? 'School' : isCollege ? 'College' : null);

    debugger
    
    //sessionStorage.setItem("","")
    var SplitedUrl = [];
    var url = window.location.href;
    var transid = "";
    var srnobyurl = "";
    var enqSrcCode = "";
    SplitedUrl = url.split("=", 4);

    if (SplitedUrl.length > 1)
    {
        transid = SplitedUrl[1].split("&", 1);
        srnobyurl = SplitedUrl[2].split("&", 1);
        enqSrcCode = SplitedUrl[3].split("&", 1);
    }

    $scope.GetEnquirySourceCode = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        //collectionobj.EnquirySource = $scope.EnquirySourceCode == enqSrcCode[0] ?  '': null ;        
        collectionobj.EnquirySource = enqSrcCode ? enqSrcCode[0]:'' ;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../api/GetMasterApi/GetEnquirySource', collectionobj);
        getData.then(function (response) {
            
            $scope.EnquirySourceList = response.data
        });
    };


    $scope.ddl_CityChange = function () {
        $scope.GetCityArea($scope.CityCode);
    }
    $scope.ddlCollegeCourse_Change = function () {
        $scope.GetCollegeBranch($scope.CollegeCourseCode);
    }
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            debugger
            var collectionobj = {};
            collectionobj.TransID = $scope.hfId
            collectionobj.SocialMediaTransID = transid[0];
            collectionobj.AcademicSessionId = $scope.SessionId
            collectionobj.EnquiryFor = $scope.EnquiryFor;
            collectionobj.IAm = $scope.IAm;
            collectionobj.StudentFirstName = $scope.StudentFirstName;
            collectionobj.StudentMiddleName = $scope.StudentMiddleName;
            collectionobj.StudentLastName = $scope.StudentLastName;
            collectionobj.EnquiryTypeCode = $scope.EnquiryFor == 'School' ? '010010001010000006' :'010020002010000003';
            collectionobj.EnquirySourceCode = $scope.EnquirySourceCode;
            collectionobj.StudentdEmail = $scope.IAm == 'Student' ? $scope.Email : "";
            collectionobj.ParentEmail = $scope.IAm != 'Student' ? $scope.Email : "";
            collectionobj.StudentContact = $scope.IAm == 'Student' ? $scope.Mobile : "";
            collectionobj.FatherContact = $scope.IAm == 'Parent' ? $scope.Mobile : "";
            collectionobj.VisitorContact = $scope.IAm == 'Other' ? $scope.Mobile : "";
            collectionobj.CountryCode = $scope.CountryCode;
            collectionobj.StateCode = $scope.StateCode;
            collectionobj.CityCode = $scope.CityCode;           
            collectionobj.CityAreaCode = $scope.CityAreaCode;
            collectionobj.ClassCode = $scope.ClassCode;
            collectionobj.CollegeCourseCode = $scope.CollegeCourseCode;
            collectionobj.CollegeBranchCode = $scope.CollegeBranchCode;
            collectionobj.RelationshipId = relationshipId;         
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.Action = "1";
            
            var getData = myService.methode('POST', '../Api/EnquiryTransactionApi/InsertUpdateDeleteEnquiryFormForSocialMediaWebsite', collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        }
    };
    $scope.EnquiryFormForSocialMediaWebsite = [];



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
        $scope.EnquiryFormForSocialMediaWebsiteList = [];
        $scope.hfId = "";
        $scope.IAm = "Parent";
        $scope.StudentFirstName = "";
        $scope.StudentMiddleName = "";
        $scope.StudentLastName = "";
        $scope.EnquirySourceCode = "";
        $scope.Email = "";
        $scope.Mobile = "";
        $scope.CityAreaCode = "";
        $scope.ClassCode = "";
        $scope.CollegeCourseCode = "";
        $scope.CollegeBranchCode = "";
        $scope.IsActive = "True";
        $scope.$applyAsync();
        $scope.SetFocus('#ddlIAm');
        if (flag == 0) {
            showMsgBox('4');
        };
    };

   
}