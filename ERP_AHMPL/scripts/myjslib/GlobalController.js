app.GlobalController = function ($scope, $element, $sce, $filter, $timeout, myService) {
    $scope.GetCountry = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../api/GlobalMasterApi/GetCountry', collectionobj);
        getData.then(function (response) {
            $scope.Countrylist = response.data
            $scope.DefaultCountry = $filter('filter')($scope.Countrylist, { CountryName: 'India' }, true);
            if ($scope.DefaultCountry.length > 0) {
                $scope.CountryCode = $scope.DefaultCountry[0].Code;
                $scope.GetState($scope.CountryCode);
            }
        });
    };


    $scope.GetState = function (countrycode) {
       
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.CountryCode = countrycode;    
        var getData = myService.methode('POST', '../api/GlobalMasterApi/GetState', collectionobj);
        getData.then(function (response) {
            $scope.Statelist = response.data
            $scope.DefaultState = $filter('filter')($scope.Statelist, { StateName: 'Uttar Pradesh' }, true);
            if ($scope.DefaultState.length > 0) {
                $scope.StateCode = $scope.DefaultState[0].Code;
                $scope.GetCity($scope.StateCode)
            }    
        });
    };

    $scope.GetCity = function (statecode) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.StateCode = statecode;
        var getData = myService.methode('POST', '../api/GlobalMasterApi/GetCity', collectionobj);
        getData.then(function (response) {
            $scope.Citylist = response.data
        });
    };


}