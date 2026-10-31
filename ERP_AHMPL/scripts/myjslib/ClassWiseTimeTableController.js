app.ClassWiseTimeTableController = function ($scope, $element,$filter, myService) {
    $scope.DocOrientation = "landscape";

    $scope.ddlShift_change = function () {
        $scope.GetTeacherWiseTimeTable();
    }

    $scope.ddlClass_Change = function () {
        $scope.GetSections($scope.ClassCode);
    }

    $scope.GetClassWiseTimeTable = function ()
    {       
        var collectionobj = {};  
        collectionobj.ShiftCode = $scope.ShiftCode;
        collectionobj.ClassCode = (($scope.ClassCode == "" ? null : $scope.ClassCode) || ($scope.ClassCode == 'undefined' ? null : $scope.ClassCode));
        collectionobj.SectionCode = (($scope.SectionCode == "" ? null : $scope.SectionCode) || ($scope.SectionCode == "" ? null : $scope.SectionCode));
        collectionobj.BranchCode = (($scope.BranchCode == "" ? null : $scope.BranchCode) || ($scope.BranchCode == "" ? null : $scope.BranchCode));
        collectionobj.StreamCode = $scope.StreamCode == "" ? "-1" : $scope.StreamCode;
        collectionobj.RelationshipId = relationshipId;
        
        collectionobj.SessionId = sessionId;
       
        var getData = myService.methode('POST', '../Api/TimeTableReportApi/GetClassWiseTimeTable', collectionobj);
        getData.then(function (response) {
            messagevalues = [
               { "Class":$scope.ClassCode == ""?"":$('#ddlClass option:selected').text() },
               { "Section": $scope.SectionCode == "" ? "" : $('#ddlSection option:selected').text() },
               { "Branch": $scope.BranchCode == "" ? "" : $('#ddlBranch option:selected').text() }
            ];

            var tblheader =
                [
        { "HeaderText": "Class", "HeaderValue": "ClassName", "Width": "100px" },
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
                tblshowfooter: 0,
                //FooterColumn: {}
                //        TextCol: [{ Text: 'DueMonth', Val: 'Total' }],
                //        SumCol: ['PaybleAmt', 'FeeAmt', 'DisAmt', 'PaidFee', 'BalanceFee']
                //    },
                BodyGrid: 1,
                //SummaryCol: ['FeeHeadName', 'PaybleAmt', 'PaidFee', 'BalanceFee'],
                //SummaryHeader: tblheaderSummary,
                //SummaryHeaderRow: 1,
                SummaryGrid: 0
            }

            $scope.SearchReportGrid(object);

            //setTimeout(function () 
            //{
            //    $('#example').margetable({
            //        type: 1,
            //        colindex: [{
            //            index: 1,
            //            dependent: [0]
            //        }]
            //    });
            //}, 1000);
            
        });
    };

    $scope.$on('tablecellmarge', function () {
        $('#example').margetable({
            type: 2,
            colindex: [0]
        });
    });

    $scope.SearchRecord = function ()
    {
        $('#CollapseSearchTableList').fadeIn();
        $scope.GetClassWiseTimeTable();
        $('title').html('TimeTable For Class ' + $('#ddlClass option:selected').text());
    };
  

    $scope.$watch('StudentCode', function () {
        if (typeof ($scope.StudentCode) === 'undefined') return;
        $scope.GetClassWiseTimeTable();
    });
};