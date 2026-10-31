app.LayoutPartController = function ($scope, $element, $filter, myService) {

    $scope.GetLayoutMaster = function ()
    {
        
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;       
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response)
        {
            $scope.GetLayouts = response.data;
        });
    };
    $scope.GetLayoutPart = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 6;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutPart', collectionobj);
        getData.then(function (response) {
            $scope.GetAllLayoutParts = response.data;
        });
    };
   
    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        //debugger
        //if (isValidate())
        //{
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.LayoutCode = $scope.LayoutCode;
            collectionobj.LayoutPart = $scope.LayoutPart;
            collectionobj.Link = $scope.Link;
            collectionobj.SeqNo = $scope.SeqNo;
            collectionobj.RelationshipId = relationshipId;            
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.ContentImageDataDefaultSize = $scope.ContentImageDataDefaultSize;
            collectionobj.HeadingImageDataDefaultSize = $scope.HeadingImageDataDefaultSize;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteLayoutPart', collectionobj);
            getData.then(function (response) {
                
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        //}
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
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.SeqNo = "";
        $scope.LayoutPart = "";
        $scope.LayoutCode = "";
        $scope.Link = "";
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.LayoutPartList = [];
        $scope.$applyAsync();
        $("#ddlLayoutPart").val("");
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    /*Search Button Click Event*/
    $scope.LayoutPartList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "5";   
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutPart', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "LayoutCode", "HeaderValue": "LayoutCode", "Width": "50px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Layout Name", "HeaderValue": "LayoutName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },                    
                    { "HeaderText": "Layout Part", "HeaderValue": "LayoutPart", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Layout Link", "HeaderValue": "Link", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sequence Number", "HeaderValue": "SeqNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Replace Date", "HeaderValue": "ReplaceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];
            
            $scope.LayoutPartList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                //debugger
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.LayoutPartList = $filter('filter')($scope.LayoutPartList, { 'Code': $scope.Code });
                $scope.LayoutCode = row[1];
                $scope.LayoutName = row[2];
                $scope.LayoutPart = $scope.LayoutPartList[0].LayoutPartCode;
                $scope.Link = row[4];
                $scope.SeqNo = row[5];
                $scope.IsApproved = row[6];
                $scope.IsActive = row[7];
                $("#ddlLayoutPart").val($scope.LayoutPartList[0].LayoutPartCode);
                $scope.ContentImageDataDefaultSize = $scope.LayoutPartList[0].ContentImageDataDefaultSize;
                $scope.HeadingImageDataDefaultSize = $scope.LayoutPartList[0].HeadingImageDataDefaultSize;
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


    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function ()
        {
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;            
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteLayoutPart", collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };

}