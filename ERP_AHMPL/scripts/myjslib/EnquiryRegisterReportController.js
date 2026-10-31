app.EnquiryRegisterReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtToDate');

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {
       
        var collectionobj = {}; 
        collectionobj.Action = $scope.LoginAs == "School" ? 1 : $scope.LoginAs == "College" ? 2 : 0;
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/EnquiryReportApi/GetEnquiryRegisterReport', collectionobj);
        getData.then(function (response) {
            debugger
            messagevalues = [
                { "From Date": $scope.FromDate == "" ? "" : $scope.FromDate },
                { "To Date": $scope.ToDate == "" ? "" : $scope.ToDate }
            ];


            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "EnqForSession", "HeaderValue": "SessionName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                    { "HeaderText": "Date", "HeaderValue": "VDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                    { "HeaderText": "EnquiryNo", "HeaderValue": "PVNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": "Total" },
                    { "HeaderText": "Source", "HeaderValue": "EnquirySource", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name Of Child", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name of Parent", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Mobile No", "HeaderValue": "MobileNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }];
            if (loginAs == 'School') {
                tblheader.push({ "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            }
            else if (loginAs == 'College') {
                tblheader.push({ "HeaderText": "Course", "HeaderValue": "CollegeCourseName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Branch", "HeaderValue": "CollegeBranchName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            }
            tblheader.push(
                { "HeaderText": "Previous School", "HeaderValue": "CurrentPreviousSchool", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "City Area", "HeaderValue": "CityAreaName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Occupation", "HeaderValue": "Occupation", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Stud DOB", "HeaderValue": "DateOfBirth", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Address", "HeaderValue": "Address", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Category", "HeaderValue": "FollowupCategory", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Enquiry Type", "HeaderValue": "EnquiryType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Last Follow up Date", "HeaderValue": "LastFollowupDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Next Follow up Date", "HeaderValue": "FollowupDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Remarks", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Follow UP", "HeaderValue": "FollowupRemark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Status", "HeaderValue": "Status", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" })
            loadDataUsingPreDefinedColumn(tblheader, response.data.Table);
            $scope.CategoryList = response.data.Table1;
            $scope.Statuslist = response.data.Table2;
        });
    };
}