app.StudentClassWiseAdmissionReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtAttendanceDate');
    $scope.disableSearch = true;

    function OrderListBy(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            }
            else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    $scope.SearchRecord = function ()
    {
        //$('#ddlSection').removeClass('validate');
        if (isValidate())
        {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };


    $scope.started = function ()
    {
        debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "/APi/AdmissionReportApi/GetClassWiseAdmissionReport", collectionobj);
        getData.then(function (response)
        {
            debugger
            var tblheader = [];
            var tblheader =
                [
                    //{ "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },
                    
                ];
            if (response.data != null && response.data.length > 0) {

                $scope.dynamicHeader = Object.keys(response.data[0]);

                $.each($scope.dynamicHeader, function (index, val) {
                    if (index > 0) {
                        tblheader.push(
                            { "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                        )
                    }
                    
                });
            }
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            var collectionobj = {};
            collectionobj.Action = 6;
            collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "/APi/AdmissionReportApi/GetClassWiseAdmissionReport", collectionobj);
            getData.then(function (response) {
                $scope.DataList = response.data;
            });
        });
    }
}

