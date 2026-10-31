app.VehicleReportController = function ($scope, $element, $filter, myService) {

    $scope.GetNewAdmissionStudents = function () {

        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.AcademicSessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TransportTransactionApi/GetStudentsForTransport', collectionobj);
        getData.then(function (response) {
            $scope.Students = response.data;
        });

    }

    $scope.SelectVehicleName = function () {
      
        var collectionobj = {};
        collectionobj.Action = "8";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/TransportMasterApi/GetVehicleMaster', collectionobj);
        getData.then(function (response) {
            $scope.VehicleNameList = response.data;
        });
    }

    $(document).on("click", ".RefreshSearchTable", function (e)
    {

        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });


    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };
    $scope.VehicleDataList = [];
    $scope.StudentDetailList = [];
    $scope.started = function () {

        debugger
        if (($filter('filter')($scope.VehicleNameList, { chk: true },true).length > 0) || ($filter('filter')($scope.Students, { chk: true }, true).length > 0)) {
            var collectionobj = {};
            if ($scope.Category == '1') {
                collectionobj.Action = '1';
                collectionobj.VehicleCode = JSON.stringify($filter('filter')($scope.VehicleNameList, { chk: true }));
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Category = $scope.Category;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TransportReportApi/GetVehicleReport', collectionobj);
                getData.then(function (response) {
      
                    angular.forEach(response.data, function (obj) {
                        obj.StudentDetails = JSON.parse(obj.StudentDetails)
                    })
                    $scope.vehicleDetail = response.data;


                });
            }
            if ($scope.Category == '2') {
            collectionobj.StudentCode = JSON.stringify($filter('filter')($scope.Students, { chk: true }));
            collectionobj.RelationshipId = relationshipId;
            collectionobj.Category = $scope.Category;
                collectionobj.SessionId = sessionId;
                collectionobj.Action = '1';
                collectionobj.VehicleCode = JSON.stringify($filter('filter')($scope.VehicleNameList, { chk: true }));
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Category = $scope.Category;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/TransportReportApi/GetVehicleReport', collectionobj);
                getData.then(function (response) {
                    debugger

                    var tblheader =
                        [
                            { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                            { "HeaderText": "Vehicle Name", "Value": "VehicleNumber", "HeaderValue": "VehicleNumber", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Route Name", "Value": "RouteName", "HeaderValue": "RouteName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Student Name", "Value": "StudentName", "HeaderValue": "StudentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Class Name", "Value": "ClassName", "HeaderValue": "ClassName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Admission Number", "Value": "AdmissionNo", "HeaderValue": "AdmissionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Father Name", "Value": "FatherName", "HeaderValue": "FatherName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Mobile", "Value": "Mobile", "HeaderValue": "Mobile", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "Stoppage", "Value": "Stoppage", "HeaderValue": "Stoppage", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                            { "HeaderText": "IsActive", "Value": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                        ];
                   loadDataUsingPreDefinedColumn(tblheader, response.data);
                });
            }
                   
            }
        else {
            alert('Please Select Either Vehicle or Student')
            $('#CollapseSearchTableList').fadeOut();
        }
    } 

}