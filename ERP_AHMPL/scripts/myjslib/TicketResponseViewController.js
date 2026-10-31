app.TicketResponseViewController = function ($scope, $element, $filter, myService) {
    $scope.hfId = "";

    $scope.RedirectTransID = function (trans_id) {
        sessionStorage.setItem('TransID', trans_id);        
            window.location.href = "/TicketTransaction/TicketResponseView";
    }
    $scope.CheckTransId = function () {
        if (sessionStorage.getItem('TransID') != null || sessionStorage.getItem('TransID') != "") {
            $scope.TransId = sessionStorage.getItem('TransID');
            $scope.hfId = $scope.TransId;
        }
    }
    $scope.CheckTransId();
     

    $scope.GetTicketDetailWithTransID = function () {       
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.TransID = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;

        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketResponse', collectionobj);
        getData.then(function (response) {
            $scope.TicketDetailList = response.data;
            if ($scope.TicketDetailList.length > 0) {               
                $scope.TicketNo = $scope.TicketDetailList[0].PVNo;
                $scope.TicketDate = $scope.ConverDate($scope.TicketDetailList[0].VDate);
                $scope.SchoolName = $scope.TicketDetailList[0].SchoolName;
                $scope.UserName = $scope.TicketDetailList[0].UserName;
                $scope.DesignationName = $scope.TicketDetailList[0].Designation;
                $scope.ContactNo = $scope.TicketDetailList[0].MobileNo;
                $scope.ModuleName = $scope.TicketDetailList[0].ModuleName;
                $scope.PageTypeName = $scope.TicketDetailList[0].MenuName;
                $scope.PageName = $scope.TicketDetailList[0].SubMenuName;                
                CKEDITOR.instances.EnglishEditor.setData($scope.TicketDetailList[0].TicketDescription);
                
                if ($scope.TicketDetailList[0].Status == 4) {   
                    $scope.TicketStatus = $scope.TicketDetailList[0].Status.toString();
                    $scope.dis_status = true;
                }
                else {
                    if ($scope.TicketDetailList[0].Status == 5) {
                        $scope.TicketStatus = $scope.TicketDetailList[0].Status.toString();
                        $scope.dis_status = false;
                    }
                }
            }
        });
    }
    $scope.GetTicketDetailWithTransID();

    $scope.GetResponseHistory = function () {
        var collectionobj = {};
        collectionobj.Action = "7";
        collectionobj.TransID = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketResponse', collectionobj);
        getData.then(function (response) {
            $scope.ResponseDetail = response.data;
        });
    }
    $scope.GetResponseHistory();

    $scope.GetResponseHistory_Attachments = function (TranRaisedId) {
        var collectionobj = {};
        collectionobj.Action = "8";
        collectionobj.TransID_RaisedTicket = $scope.hfId;
        collectionobj.TransID = TranRaisedId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketResponse', collectionobj);
        getData.then(function (response) {
            $scope.ResponseDetail_Attachment = response.data;
        });
    }

    $scope.Full_Image = function (img_name) {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.TransID = $scope.hfId;
        collectionobj.FileName = img_name;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/TicketDashBoardApi/DashBoardLevel2', collectionobj);
        getData.then(function (response) {
            $scope.TicketImages = response.data;
        });
    }

    $scope.GetTicketStatus = function () {
        var collectionobj = {};
        collectionobj.Action = "8";
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobj);
        getData.then(function (response) {           
            $scope.TicketStatusList = response.data;            
        });
    }   
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            debugger
            collectionobj.TransID_RaisedTicket = $scope.hfId;
            collectionobj.TicketNo_RaisedTicket = $scope.TicketNo;
            collectionobj.TicketDate_RaisedTicket = moment($scope.TicketDate).format('DD-MMM-YYYY');
            collectionobj.TicketTypeID_RaisedTicket = $scope.TicketDetailList[0].TicketTypeID;
            collectionobj.RelationshipId_RaisedTicket = $scope.TicketDetailList[0].RelationshipId;
            collectionobj.CreatedBy_RaisedTicket = $scope.TicketDetailList[0].CreatedBy;

            collectionobj.TicketStatusID = $scope.TicketStatus;
            if ($scope.remark != null)
                collectionobj.ResponseDescription = $scope.remark;
            else
                collectionobj.ResponseDescription = "This Ticket is Closed by User.";
            /* (" + userid + ")";*/

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Save == "Save") {                
                if (($scope.TicketDetailList[0].Status == 4) && ($scope.TicketStatus == 4) ){
                    showMsgBox("999", "Sorry", "This Ticket is Already Closed ", "warning", 'btn-warning');
                }                
                else {
                    $scope.disableAdd = true;
                    collectionobj.Action = "5";
                    collectionobj.CreatedBy = userid;

                    var getData = myService.methode('POST', '../Api/TicketTransactionApi/UpdateFinalTicketStatus', collectionobj);
                    getData.then(function (response) {
                        if (showMsgBox(response.data)) {
                            $scope.ClearControl(1);
                            $scope.disableAdd = false;
                            $scope.GetResponseHistory();
                            window.location.href = "/TicketTransaction/TicketGenerate";
                        }
                    });
                }
            }
           
        }
    }

    $scope.ClearControl = function (flag) {
        if (flag == 1)
            $scope.ResetControl(flag);
        else
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.TicketStatus = '';
        $scope.remark = '';
        
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}
