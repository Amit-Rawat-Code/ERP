app.StudentSessionWiseAdmissionReport = function ($scope, $element, $filter, myService) {

    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.RelationshipID = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.Action = 5;
        collectionobj.ClassCode = $scope.ClassCode;
        var getData = myService.methode('POST', "/Api/AdmissionReportApi/GetSessionWiseAdmissionReport", collectionobj);
        getData.then(function (response) {
            
            messagevalues = [
                { "Year": $scope.SessionYear },
                { "Month": $scope.SessionMonth },
                { "Class": $('#ddlClass option:selected').text() },
                { "Section": $('#ddlSection option:selected').val() == "" ? "" : $('#ddlSection option:selected').text() }
            ];
            var tblheader =
                [
                    //{ "HeaderText": "Sr.No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "48px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    //{ "HeaderText": "Employee", "HeaderValue": "EmployeeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    //{ "HeaderText": "Father", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    //{ "HeaderText": "Depart.", "HeaderValue": "DepartmentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    //{ "HeaderText": "Desig.", "HeaderValue": "DesignationName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "ws-normal" },
                    //{ "HeaderText": "DOJ", "HeaderValue": "DOJ", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                ];
            if (response.data != null && response.data.length > 0) {
               
                $scope.dynamicHeader = Object.keys(response.data[0]);

                $.each($scope.dynamicHeader, function (index, val) {
                    tblheader.push(
                            { "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                        )                    
                });
            }

          loadDataUsingPreDefinedColumn(tblheader, response.data);
        });
    };

}