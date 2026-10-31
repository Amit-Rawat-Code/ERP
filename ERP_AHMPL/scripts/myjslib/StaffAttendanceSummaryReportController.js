app.StaffAttendanceSummaryReportController = function ($scope, $element, $filter, myService)
{
    $scope.DocOrientation = "landscape";
    $scope.GetSchools = function ()
    {
        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/MISReportApi/GetMISReport', collectionobj);
        getData.then(function (response)
        {
            $scope.SchoolList = response.data;
        });
    };
    $scope.SearchRecord = function ()
    {
        debugger
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
    };
    $scope.started = function ()
    {
        debugger
        if (($filter('filter')($scope.SchoolList, { 'chk': true }, true).length) > 0) {
            debugger
            $scope.showLoader();
            $scope.SFromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
            $scope.SToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            var collectionobj = {};
            collectionobj.Action = 2;
            collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
            collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
            collectionobj.RIDs = JSON.stringify($filter('filter')($scope.SchoolList, { 'chk': true }, true));
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "../Api/MISReportApi/GetStaffAttendanceSummary", collectionobj);
            getData.then(function (response) {
                debugger
                if (response.data != null && response.data.length > 0) {
                    messagevalues = [
                        { "From Date": moment($scope.FromDate).format('DD-MMM-YYYY') },
                        { "To Date": moment($scope.ToDate).format('DD-MMM-YYYY') },
                        { "Session": $scope.SessionText }
                    ];
                    var message = "";
                    var seprator = "";
                    var filter = "<span class='filter' ></span> ";
                    var j = 0;
                    if (messagevalues.length > 0)
                        $.each(messagevalues, function (i, values) {

                            $.each(values, function (key, val) {
                                j = j + 1;
                                if (val != null && val != "") {
                                    if (j == 3) {
                                        message = message + "</br>"
                                        j = 0;
                                    }
                                    else { message = message + seprator + filter; }
                                    message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                                    seprator = ", ";

                                    filter = "";
                                };
                            });
                        });
                    debugger
                    $scope.TextMessage = '' + message + '';
                    $scope.StaffAttendanceList = response.data;
                    $scope.hideLoader();
                }
                else {
                    $('#CollapseSearchTableList').fadeOut();
                    showMsgBox('Data Not Found.');
                }
            });
        }
        else
        {
            debugger
            $('#CollapseSearchTableList').fadeOut();
            showMsgBox('Please Select School.');
        }
    }
}