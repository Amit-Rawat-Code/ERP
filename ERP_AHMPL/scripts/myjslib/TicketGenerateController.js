app.TicketGenerateController = function ($scope, $element, $filter, myService)
{
    $scope.SetFocus('#ddlTicket');
    $scope.hfId = "";
    //----------------------------------------------------------------------------------------
    $scope.RedirectTransID = function (trans_id) {
        sessionStorage.setItem('TransID', trans_id);
        $scope.CheckTransId();
        $scope.GetResponseHistory();        
    } 
    $scope.CheckTransId = function () {
        if (sessionStorage.getItem('TransID') != null || sessionStorage.getItem('TransID') != "") {
            $scope.TransId = sessionStorage.getItem('TransID');
            $scope.hfId = $scope.TransId;
        }
    }

    $scope.CheckTransId();
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
            if ($scope.ResponseDetail.length > 0) {
                window.location.href = "/TicketTransaction/TicketResponseView";
            }
        });
    }
    //----------------------------------------------------------------------------------------

    $scope.GetTicketType = function ()
    {   
        var collectionobj = {};
        collectionobj.Action = "5";       
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobj);
        getData.then(function (response)
        {            
            $scope.TicketList = response.data;            
        });
    }

    $scope.GetMenuList = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.ModuleId = $scope.ModuleId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetMenu', collectionobj);
        getData.then(function (response) {
            $scope.MenuList = response.data;
        });
    }

    $scope.GetSubMenuList = function () {
        var collectionobj = {};
        collectionobj.Action = "5";
        collectionobj.MenuId = $scope.MenuId;
        var getData = myService.methode('POST', '../Api/MasterApi/GetSubMenu', collectionobj);
        getData.then(function (response) {
            $scope.SubMenuList = response.data;
        });
    }

    $scope.GetAllRaiseTicket = function () {

        var collectionobj = {};
        collectionobj.Action = "4";

        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.CreatedBy = userid;
        var getData = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobj);
        getData.then(function (response) {
            $scope.AllRaiseTicket = response.data;
        });
    }
    $scope.GetAllRaiseTicket();
    //--------------------------------------------------------------Upload Images--------------------------------------------------------------------
    $scope.index = 0;
    $scope.Attachments =[]

    $scope.$on("seletedFile", function (event, args)
    {
        var sum = 0;
        $scope.$apply(function ()
        {            
            if (args.file.type.contains("jpg") || args.file.type.contains("jpeg") || args.file.type.contains("bmp") || args.file.type.contains("png") || args.file.type.contains("pdf"))
            {                

                $scope.Attachments[$scope.index] = args.file;
                //sum = sum + $scope.Attachments[$scope.index].si
            }
            else
            {             
                showMsgBox('Only .jpg|.jpeg|.bmp|.png|.pdf Files Accepted')
            }
        });
    });

    //$("$scope.Attachments").on('change', function () {
    //    var totalSize = 0;

    //    $(".upload-file").each(function () {
    //        for (var i = 0; i < this.files.length; i++) {
    //            totalSize += this.files[i].size;
    //        }
    //    });

    //    var valid = totalSize <= 10485759;
    //    if (!valid)
    //        alert('Over Max Size');
    //});


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
    //$scope.CalculateFileSize = function () {
    //    var sum = 0;
    //    var sum1 = 0;
    //    for (var i = 0; i < $scope.Attachments.length; i++) {
    //        debugger
    //        sum = sum + $scope.Attachments.File[0].size;
    //        sum1 = sum1 + this.File[0].size;
    //    }
    //    alert(sum);
    //}   
    //--------------------------------------------------------------Upload Images--------------------------------------------------------------------
    $scope.TicketList = [];
    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TicketTypeID = $scope.TicketType;
            collectionobj.ModuleID = $scope.ModuleId;
            collectionobj.MenuID = $scope.MenuId;
            collectionobj.SubMenuID = $scope.SubMenuId;
            collectionobj.TicketDescription = CKEDITOR.instances.EnglishEditor.getData();

            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;            
           // $scope.CalculateFileSize();

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            if (CKEDITOR.instances.EnglishEditor.getData() == "") {
                showMsgBox("999", "Stop", "Please Write Your Views here", "warning", 'btn-warning');
                $scope.SetFocus('#EnglishEditor');
            }
            else {
                $scope.disableAdd = true;
                var getData = myService.postmethode('POST', '../Api/TicketTransactionApi/InsertUpdateDeleteTicketGenerate', collectionobj, $scope.Attachments);
                getData.then(function (response) {
                    if (response.data == 1) {
                        var collectionobjNew = {};
                        collectionobjNew.Action = "7";
                        collectionobjNew.FYId = fyId;
                        collectionobjNew.RelationshipId = relationshipId;
                        collectionobjNew.SessionId = sessionId;
                        collectionobjNew.CreatedBy = userid;

                        var getid = myService.methode('POST', '../Api/TicketTransactionApi/GetTicketGenerate', collectionobjNew);
                        getid.then(function (response) {
                            $scope.TicketList = response.data;
                            showMsgBox("999", "Thank You", "Ticket Generate Successfully.Your Ticket No. is [" + $scope.TicketList[0].PVNo + "]", "success", 'btn-success');
                            //var table = $('#AllRaiseTicket').DataTable();
                            //table.destroy();
                            $scope.GetAllRaiseTicket();
                            $scope.ClearControl(1);
                            $scope.disableAdd = false;
                        });
                    }
                });
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
        $scope.hfId = "";
        
        $scope.TicketType = '';
        $scope.ModuleId = '';
        $scope.MenuId = '';
        $scope.SubMenuId = '';
         
        if (typeof (CKEDITOR) !== 'undefined')
            CKEDITOR.instances['EnglishEditor'].setData("");
        $scope.EnglishEditor = "";

        $scope.Attachments = [{ Attachment: "" }];

        $scope.SetFocus('#ddlTicket');

        $scope.GetTicketType();
        $scope.GetMenuList();
        $scope.GetSubMenuList();

        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

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