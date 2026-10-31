app.TicketResponseController = function ($scope, $element, $filter, myService)
{
    $scope.hfId = "";
    $scope.title = "";

    $scope.GetTicketType = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobj);
        getData.then(function (response) {
            $scope.TicketTypeList = response.data;
        });
    }
    $scope.GetTicketStatus = function () {
        var collectionobj = {};
        collectionobj.Action = "6";
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobj);
        getData.then(function (response) {
            $scope.TicketStatusList = response.data;
        });
    }
    $scope.id = getParameterByName('id');
    $scope.CheckTransId = function () {
        if (sessionStorage.getItem('TransID') != null || sessionStorage.getItem('TransID') != "") {
            $scope.TransId = sessionStorage.getItem('TransID');               
            $scope.hfId = $scope.TransId;
            $scope.title = sessionStorage.getItem('title');
        }       
    }
    $scope.CheckTransId();

    $scope.RedirectPage = function () {            
        if ($scope.id == 1)
            window.location.href = "/TicketDashBoard/TicketDashBoardLevel1";
        else if ($scope.id == 2)
            window.location.href = "/TicketDashBoard/TicketDashBoardLevel2";
    }

    $scope.GetTicketDetailWithTransID = function () {        
        var collectionobj = {};
        collectionobj.Action = "2";
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
                $scope.TicketType = $scope.TicketDetailList[0].TicketTypeID.toString();
                $scope.TicketStatus = $scope.TicketDetailList[0].Status.toString();
                if ($scope.TicketStatus == 4) {
                    $scope.dis_status = true;
                }
            }
        });
    }
    $scope.GetTicketDetailWithTransID();

    $scope.GetResponseHistory = function () {
        var collectionobj = {};
        collectionobj.Action = "3";
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
        collectionobj.Action = "4";
        collectionobj.TransID_RaisedTicket = $scope.hfId;
        collectionobj.TransID =TranRaisedId;
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

    $scope.Print = function () {
        $scope.PrintForm($('#print').html(), 'Response Detail Report');
    }

    $scope.index = 0;
    $scope.Attachments = []
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            if (args.file.type.contains("image") || args.file.type.contains("pdf") || args.file.type.contains("doc") || args.file.type.contains("docx") || args.file.type.contains("xls")) {
                $scope.Attachments[$scope.index] = args.file;
            }
            else {
                showMsgBox('only .jpg|.jpeg|.bmp|.doc|.docx|.xls|.xlsx|.pdf')
            }
        });
    });
    $scope.SetIndex = function (index) {
        $scope.index = index;
    }
    $scope.AddRow = function () {
        if ($scope.Attachments.length == 5)
            showMsgBox("Maximum 5 attachments are allowd.");
        else
            $scope.Attachments.push({ File: "" })
    }
    $scope.RemoveRow = function (index) {
        $scope.filterList = [];
        $.each($scope.Attachments, function (i, array) {
            if (i != index)
                $scope.filterList.push(array)
        })
        $scope.Attachments = $scope.filterList;
    }

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};            
            collectionobj.TransID_RaisedTicket = $scope.hfId;
            collectionobj.TicketNo_RaisedTicket = $scope.TicketNo;
            collectionobj.TicketDate_RaisedTicket = moment($scope.TicketDate).format('DD-MMM-YYYY');
            collectionobj.RelationshipId_RaisedTicket = $scope.TicketDetailList[0].RelationshipId;
            collectionobj.CreatedBy_RaisedTicket = $scope.TicketDetailList[0].CreatedBy;

            collectionobj.TicketTypeID_RaisedTicket = $scope.TicketType;
            collectionobj.TicketStatusID = $scope.TicketStatus;

            collectionobj.ResponseDescription = CKEDITOR.instances.EnglishEditor1.getData();

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            if ($scope.TicketStatus == 4) {
                $scope.dis_status = true;
                showMsgBox("999", "Stop", "Ticket is Already Closed.", "warning", 'btn-warning');
                $scope.SetFocus('#ddlTicketStatus');
            }
            else {
                if (CKEDITOR.instances.EnglishEditor1.getData() != "") {
                    if ($scope.TicketStatus == 1 || $scope.TicketStatus == 5) {
                        showMsgBox("999", "Stop", "You Can't Select Open & Reopen Status, Please Change Your Response Status", "warning", 'btn-warning');
                        $scope.SetFocus('#ddlTicketStatus');
                    }
                    else if ($scope.TicketStatus != 1 || $scope.TicketStatus != 5) {
                        $scope.disableAdd = true;
                        var getData = myService.postmethode('POST', '../Api/TicketTransactionApi/InsertUpdateDeleteTicketResponse', collectionobj, $scope.Attachments);
                        getData.then(function (response) {
                            if (showMsgBox(response.data)) {
                                $scope.ClearControl(1);
                                $scope.disableAdd = false;
                                $scope.GetResponseHistory();
                                $scope.RedirectPage();
                            }
                        });
                    }
                }
                else {
                    showMsgBox("999", "Stop", "Please Write Your Responses", "warning", 'btn-warning');
                    $scope.SetFocus('#EnglishEditor1');
                }
            }
        }
    };

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
    
        $scope.Attachments = [{ Attachment: "" }];

        if (typeof (CKEDITOR) !== 'undefined')
            CKEDITOR.instances['EnglishEditor1'].setData("");
        $scope.EnglishEditor1 = "";

        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}