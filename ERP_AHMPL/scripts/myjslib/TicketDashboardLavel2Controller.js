app.TicketDashboardLavel2Controller = function ($scope, $element, $filter, myService)
{
    $scope.hfId = "";
    $scope.RedirectTransID = function (trans_id) {
        sessionStorage.setItem('TransID', trans_id);
        window.location.href = "/TicketTransaction/TicketResponse?id=2";
    }  

    $scope.GetAllRaiseTicket_1 = function () {
        var collectionobj = {};
        collectionobj.Action = "2";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;   
        collectionobj.FYId = fyId;  
        collectionobj.CreatedBy = userid;
        collectionobj.Status = "1"; //open

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_1 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_1();

    $scope.GetAllRaiseTicket_3 = function () {
        var collectionobj = {};
        collectionobj.Action = "6";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
       // collectionobj.Status = "3"; //Resolved

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_3 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_3();

    $scope.GetAllRaiseTicket_4 = function () {
        var collectionobj = {};
        collectionobj.Action = "2";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.Status = "4"; //Closed

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket_4 = response.data;
        });
    }
    $scope.GetAllRaiseTicket_4();

    $scope.GetAllRaiseTicket_5 = function () {
        var collectionobj = {};
        collectionobj.Action = "2";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        collectionobj.Status = "5"; //Reopen

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
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
        collectionobj.CreatedBy = userid;

        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.RaiseTicket_Attachment = response.data;
        });
    }
}