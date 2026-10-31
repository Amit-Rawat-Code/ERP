app.MonthlyEnquiryStatisticsReportController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtToDate');
    $scope.dropdownSetting = {
        scrollable: true,
        scrollableHeight: '200px'
    }
    $scope.GetSessions = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        getData = myService.methode('POST', '../Api/GetMasterApi/GetSession', collectionobj);
        getData.then(function (response) {
        $scope.SessionList = response.data ;
        })
    }

    $scope.ddlSession_Change = function (SessionId) {
      $scope.GetSessionYear(SessionId);
    }

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {

  
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.Month = JSON.stringify($filter('filter')($scope.SessionYears, { chk: true }));
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        getData = myService.methode('POST', '../Api/EnquiryReportApi/GetMonthlyEnquiryStatisticsReport', collectionobj);
        getData.then(function (response)
        {
            
            //messagevalues = $filter('filter')($scope.SessionYears, { chk: true })
            messagevalues = $scope.SessionYears[0].Year;
           
            if (response.data != '')
            {
                $scope.dynamicRows = response.data;
                $scope.dynamicHeader = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
                var tblheader = [];
                tblheader.push(
                                 { "HeaderText": "Sr No.", "Value": "Srno", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                                 { "HeaderText": "Month-Year", "HeaderValue": "Months", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "FooterText": 'Total', "CssClass": "text-right" }
                                    )
                $.each($scope.dynamicHeader, function (index, val) {
                    tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "Fun": 'Sum', "NumberType": 1, "CssClass": "text-right" })
                });
                tblheader.push({ "HeaderText": "Total", "HeaderValue": "Total", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "Fun": 'Sum', "NumberType": 1, "CssClass": "text-right" })
                $scope.func(tblheader, JSON.parse($scope.dynamicRows));
            }
            else {
                $scope.func({}, {});
            }
        });
    }

    $scope.func = function (tblheader, data) {
        tblClass = "table-tfoot-s";
        loadDataUsingPreDefinedColumn(tblheader, data);
    }
}
