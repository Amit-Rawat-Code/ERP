app.AllComplainListController = function ($scope, $element, $sce, myService) { 
    $scope.BindAllComplain = function ()
    {
        debugger;
        
        var collectionobj = {};
        collectionobj.Code = $scope.StudentCode;
        collectionobj.ComplainBy = JSON.parse(userid);
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.Action = 12;
        var getData = myService.methode('POST', "../ComplainRegister/GetAllList", '{ obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response)
        {
            $scope.AllComplain = response.data; 
            $scope.Complain = response.data[0].Complain;
            $scope.ComplainId = response.data[0].ComplainId;
            $scope.CreatedOn = response.data[0].CreatedOn;
            $scope.Names = response.data[0].Names;
            $scope.ComplaineListCount = $scope.AllComplain.length; 
        });

    }; 
    $scope.BreakLine = function (text)
    {
        var SpliteCode = text.split('\n');
        var HtmlCode = SpliteCode.join('</br>');
        return HtmlCode;
    }
    $scope.Complainclick = function (Complain, ComplainId, CreatedOn, Names)
    {
        debugger;
        $scope.Complain = Complain;
        $scope.ComplainId = ComplainId;
        $scope.CreatedOn = CreatedOn;
        $scope.Names = Names;
    }
    

}

