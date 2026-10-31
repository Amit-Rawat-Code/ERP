app.TicketDashboardLavel1Controller = function ($scope, $element, $filter, myService)
{
    $scope.RedirectTransID = function (trans_id) {
        sessionStorage.setItem('TransID', trans_id);
        window.location.href = "/TicketTransaction/TicketResponse?id=1";
    }  
    $scope.GetAllRaiseTicket_1 = function () {
        var collectionobj = {};
        collectionobj.Action = "1";     
        collectionobj.Status = "1";//Open
        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel1', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_1 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_1();
      
    $scope.GetAllRaiseTicket_3 = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        //collectionobj.Status = "2,3";//Resolved/Transfered

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel1', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_3 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_3();

    $scope.GetAllRaiseTicket_4 = function () {
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.Status = "4";//Closed
        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel1', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_4 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_4();
    
    $scope.GetAllRaiseTicket_5 = function () {
        var collectionobj = {};
        collectionobj.Action = "1";      
        collectionobj.Status = "5"; //Reopen

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel1', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_5 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_5();

    $scope.GetRaiseTicket_Attachments = function (TranRaisedId) {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.TransID = TranRaisedId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.RaiseTicket_Attachment = response.data;
        });
    }
}