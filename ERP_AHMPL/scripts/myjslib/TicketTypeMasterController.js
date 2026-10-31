app.TicketTypeMasterController = function ($scope, $element, $filter, myService) {

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.TicketTypeName = $scope.TicketTypeName;
            collectionobj.IsActive = $scope.IsActive;

            collectionobj.FYId = fyId;            
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.ID = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/TicketMasterApi/InsertUpdateDeleteTicketTypeMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.hfId = "";

        $scope.TicketTypeName = '';       

        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    $scope.TicketTypeList =[];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/TicketMasterApi/GetTicketTypeMaster', collectionobj);
        getData.then(function (response) {           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "ID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },                    
                    { "HeaderText": "Ticket Type Name", "HeaderValue": "TicketTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                  
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];            
            $scope.TicketTypeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);            

            $('#example tbody').on('dblclick', 'tr', function (event) {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();                
                $scope.TicketTypeList = $filter('filter')($scope.TicketTypeList, { 'ID': Number($scope.hfId) }, true);                 
                $scope.TicketTypeName = $scope.TicketTypeList[0].TicketTypeName;
                $scope.IsActive = $scope.TicketTypeList[0].IsActive == true ? "true" : "false";

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();               
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {        
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.ID = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/TicketMasterApi/InsertUpdateDeleteTicketTypeMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
}