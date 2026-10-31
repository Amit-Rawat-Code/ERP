app.TeacherWiseTimeTableController = function ($scope, $element, $filter, myService) {
    $scope.DocOrientation = "landscape";
    $scope.DesignationType = "Teacher";

    $scope.ddlShift_change = function () {
        $scope.GetTeacherWiseTimeTable();
    }

    $scope.GetTeacherWiseTimeTable = function ()
    {
        var collectionobj = {};
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.EmployeeCode = $scope.EmployeeCode;
        collectionobj.RelationshipId = relationshipId;

        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/TimeTableReportApi/GetTeacherWiseTimeTable', collectionobj);
        getData.then(function (response) {
          
            messagevalues = [
               { "Teacher": $('#ddlAllEmployee option:selected').text() }
            ];

            var tblheader =
    [
        { "HeaderText": "Period", "HeaderValue": "PeriodName", "Width": "100px"},
        { "HeaderText": "Monday", "HeaderValue": "Monday", "Width": "100px" },
        { "HeaderText": "Tuesday", "HeaderValue": "Tuesday", "Width": "100px" },
        { "HeaderText": "Wednesday", "HeaderValue": "Wednesday", "Width": "100px" },
        { "HeaderText": "Thursday", "HeaderValue": "Thursday", "Width": "100px" },
        { "HeaderText": "Friday", "HeaderValue": "Friday", "Width": "100px" },
        { "HeaderText": "Saturday", "HeaderValue": "Saturday", "Width": "100px" }
    ];

            var object = {
                tblheader: tblheader,
                tblbody: response.data,
                tblshowfooter:0,
            //FooterColumn: {}
            //        TextCol: [{ Text: 'DueMonth', Val: 'Total' }],
            //        SumCol: ['PaybleAmt', 'FeeAmt', 'DisAmt', 'PaidFee', 'BalanceFee']
            //    },
                BodyGrid: 1,
                //SummaryCol: ['FeeHeadName', 'PaybleAmt', 'PaidFee', 'BalanceFee'],
                //SummaryHeader: tblheaderSummary,
                //SummaryHeaderRow: 1,
                SummaryGrid:0
            }

            $scope.SearchReportGrid(object);

            //loadDataUsingPreDefinedColumnOnPage(tblheader, response.data);
        });
    };

    $scope.$watch('EmployeeCode', function () {
        if (typeof ($scope.EmployeeCode) === 'undefined') {
            $('title').html('TeacherWise TimeTable Report')
            return;
        }
        else {
            $('#CollapseSearchTableList').fadeIn();
            $scope.GetTeacherWiseTimeTable();
            $('title').html('TimeTable For Teacher ' + $('#ddlAllEmployee option:selected').text());
        }
    });
};