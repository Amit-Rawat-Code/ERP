app.LayoutMasterController = function ($scope, $element, $filter, myService) {

    $scope.showhide = false;
    $scope.files = [];

    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });
/*Save-Edit Button Click Event*/
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.LayoutName = $scope.LayoutName;
            collectionobj.LayoutPageName = $scope.LayoutPageName;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            collectionobj.DisplayCode = displayCode;            
            var sdfsdf = $("#fileInput").get(0).files.length;
           
            var HeadImgSrc = $('#imgfileInput').attr('src');
            var tarr = HeadImgSrc.split('/');
            var file43 = tarr[tarr.length - 1];

            if ((sdfsdf != 0))
            {
                collectionobj.fileInput = $("#fileInput").get(0).files[0].name;
            }
            else if (file43 != "noimage.png")
            {
                collectionobj.LayoutDemoImage = $scope.imgfileInput;
            }

            if ($scope.Save == "Save")
            {
                collectionobj.Action = 1;
            }
            else
            {
                collectionobj.Action = 2;
            }
            var getData = myService.postmethode('POST', '../Api/DynamicWebsiteApi/InsertUpdateDeleteLayoutMaster', collectionobj,$scope.files);
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
    $scope.LayoutMasterList = [];
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.LayoutName = "";
        $scope.LayoutPageName = "";
        $scope.IsApproved = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $scope.LayoutMasterList = [];
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    /*Search Button Click Event*/
    $scope.LayoutMasterList = [];
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
        var getData = myService.methode('POST', '../Api/DynamicWebsiteApi/GetLayoutMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [

                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Layout Name", "HeaderValue": "LayoutName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Layout Page Name", "HeaderValue": "LayoutPageName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Replace Date", "HeaderValue": "ReplaceDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.LayoutMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                
                var row = $('#example').DataTable().row(this).data();
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.LayoutMasterList = $filter('filter')($scope.LayoutMasterList, { 'Code': $scope.Code });
                $scope.LayoutName = row[1];
                $scope.LayoutPageName = row[2];
                $scope.IsApproved = row[3];
                $scope.IsActive = row[4];
                $scope.imgfileInput = $scope.LayoutMasterList[0].layoutdemoimagepath;    
                
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
        deleteConfirmbox("Do u want to delete this record!", function () {

            //var collectionobj = {};
            //collectionobj.Code = $scope.Code;
            //collectionobj.Action = "3";
            //collectionobj.UpdatedBy = userid;
            //collectionobj.RelationshipId = relationshipId;           
            //var getData = myService.methode('POST', "../Api/DynamicWebsiteApi/InsertUpdateDeleteLayoutMaster", collectionobj);
            //getData.then(function (response)
            //{
            showMsgBox("Delete operation not permitted.");

            //});
        });
    };
    $scope.OpenFileUpload = function () {
        $('#fileInput').click();
    }
    $scope.fuImageChange = function (input) {
        readURL(input);
    };
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

}