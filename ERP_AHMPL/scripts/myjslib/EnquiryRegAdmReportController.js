app.EnquiryRegAdmReportController = function ($scope, $element, $filter, myService) {

    $scope.DocOrientation = "landscape";
    $scope.GetSchools = function () {
      
        var collectionobj = {};
        collectionobj.Action = '1';
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/MISReportApi/GetMISReport', collectionobj);
        getData.then(function (response) {
            $scope.SchoolList = response.data;
        });
    };
    $scope.SearchRecord = function () {
        $('#CollapseSearchTableList').fadeIn();
      
        $scope.started();
        //setTimeout(function () { $scope.started(); }, 1000);
      
    };
    $scope.started = function ()
    {
        //debugger
        $scope.showLoader();
        $scope.SFromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        $scope.SToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        var collectionobj = {};
        collectionobj.Action = 2;
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = $scope.SessionId;
        collectionobj.FYId = fyId;
        if ($scope.SessionId != undefined) {
            $scope.SessionText = ($filter('filter')($scope.SessionList, { SessionId: Number($scope.SessionId) }, true))[0].SessionName;
        }
        else {
            $scope.SessionText = "";
        }
        collectionobj.RIDs = JSON.stringify($filter('filter')($scope.SchoolList, { 'chk': true }, true));
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/MISReportApi/GetMISReport", collectionobj);
        getData.then(function (response) {
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
                $scope.TextMessage = '' + message + '';

                $scope.CountList = response.data;
                //$(".section-toggle").slideToggle('slow');
                $scope.hideLoader();
            }
            else
            {
                $('#CollapseSearchTableList').fadeOut();
                showMsgBox('Please Select School');
            }
        });
    }

    $scope.startDate;
    $scope.endDate;
    $scope.TodayDate;
    $scope.SetMaxMinDateByTxt = function () {
        return Promise.resolve($scope.TodayDate).then(async function () {
            //debugger
            if ($scope.SessionId != null && $scope.SessionId != undefined) {
                var collectionobj = {};

                collectionobj.Action = 4;
                collectionobj.GroupCode = groupCode;
                collectionobj.SocietyCode = societyCode;
                collectionobj.SchoolCode = schoolCode;
                collectionobj.BranchCode = branchCode;
                collectionobj.SessionId = $scope.SessionId;
                collectionobj.FYId = fyId;
                var getData = myService.methode('POST', '../api/GetMasterApi/GetSessionMinMaxDate', collectionobj);
                getData.then(function (response) {
                    //debugger
                    $scope.ActiveSessionList = response.data;
                    $scope.startDate = ($filter('filter')($scope.ActiveSessionList, { SessionId: Number($scope.SessionId) }, true))[0].FromDate;// response.data[0].FromDate;
                    $scope.endDate = ($filter('filter')($scope.ActiveSessionList, { SessionId: Number($scope.SessionId) }, true))[0].ToDate;//response.data[0].ToDate;
                    if (new Date() > new Date($scope.endDate))
                        $scope.TodayDate = new Date($scope.endDate.split('-')[2] + '-' + $scope.endDate.split('-')[1] + '-' + $scope.endDate.split('-')[0]);
                    else
                        $scope.TodayDate = new Date();
                    $scope.FromDate = new Date(moment($scope.startDate, 'DD-MMM-YYYY'));
                    $scope.ToDate = $scope.TodayDate;

                    $scope.startDate = moment($scope.FromDate).format('YYYY-MM-DD');
                    $scope.endDate = moment($scope.ToDate).format('YYYY-MM-DD');
                });
            }
            else {

                $scope.startDate = sessionStorage.getItem("sessionStartDate");
                $scope.endDate = sessionStorage.getItem("sessionEndDate");
            }

            return $scope.TodayDate;
        });
    }
}