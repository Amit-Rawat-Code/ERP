app.FooterHeaderController = function ($scope, $element, $filter, myService) {

    $scope.showhide = false;
    /*Save-Edit Button Click Event*/

    $scope.SaveRecord = function ()
    {
        
        if (isValidate())
        {
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.FooterHeaderText = $scope.FooterHeaderText;
            collectionobj.SeqNo = $scope.SeqNo;
            collectionobj.RelationshipId = relationshipId;         
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteFooterHeader', collectionobj);
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


    $scope.FooterHeaderMasterList = [];
    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.FooterHeaderText = "";
        $scope.SeqNo = "";  
        $scope.hfId = "";
        $scope.LayoutMasterList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    /*Search Button Click Event*/
    $scope.FooterHeaderMasterList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function ()
    {
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetFooterHeader', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [

                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Footer Header Name", "HeaderValue": "FooterHeaderText", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sequence Number", "HeaderValue": "SeqNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                                
                ];

            $scope.FooterHeaderMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {

                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.FooterHeaderText = row[1];
                $scope.SeqNo = row[2];              
                $scope.FooterHeaderMasterList = response.data;
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

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do u want to delete this record!", function () {
            debugger
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.UpdatedBy = userid;
            collectionobj.RelationshipId = relationshipId;
            var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteFooterHeader", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };

}