app.UnitTypeMasterController = function ($scope, $element, $filter, myService) {

    $scope.GetLayoutMaster = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;       
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {
            $scope.GetLayouts = response.data;
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        
        if (isValidate())
        {
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.LayoutCode = $scope.LayoutCode;
            collectionobj.UnitType = $scope.UnitType;            
            collectionobj.RelationshipId = relationshipId;           
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteUnitTypeMaster', collectionobj);
            getData.then(function (response) {
                
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    }
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("Do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.LayoutPartList = [];

    $scope.ResetControl = function (flag) {
  
        $scope.Save = "Save";
        $scope.disableForEdit = false;
        $scope.disableDelete = false;
        $scope.disablePrint = true;
        $scope.disableAdd = false;
        $scope.UnitType = "";      
        $scope.LayoutCode = "";       
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.UnitTypeMasterList = [];
        $scope.$applyAsync();

        if (flag == 0) {
            showMsgBox('4');
        };

    }

    /*Search Button Click Event*/
    $scope.UnitTypeMasterList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;        
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetUnitTypeMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },                   
                    { "HeaderText": "Unit Type", "HeaderValue": "UnitType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },       
                    { "HeaderText": "Layout Code", "HeaderValue": "LayoutCode", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Unit Type Layout Name", "HeaderValue": "LayoutName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }                    
                ];

            $scope.UnitTypeMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event)
            {            
                
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.UnitTypeMasterList = $filter('filter')($scope.UnitTypeMasterList, { 'Code': $scope.Code });
                $scope.LayoutCode = row[2];
                $scope.LayoutName = row[3];
                $scope.UnitType = row[1];               
                $scope.IsApproved = row[4];
                $scope.IsActive = row[5];             
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#FromDate', true);
            });
        });
    };


    $scope.DeleteRecord = function ()
    {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;         
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteUnitTypeMaster", collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        });
    };
}