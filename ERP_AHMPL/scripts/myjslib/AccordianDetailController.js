app.AccordianDetailController = function ($scope, $element, $filter, myService) {
    $scope.GetAccordianType = function () {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/GetAccordianContentLayout', collectionobj);
        getData.then(function (response) {
            //debugger
            $scope.Accordians = response.data;
        });
    };
    $scope.SaveRecord = function () {
        debugger
        if (isValidate()) {
            //$scope.showLoader();
            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.AccordianCode = $scope.AccordianType;
            collectionobj.AccordianContentHeading = $scope.AccCHeading;
            collectionobj.AccordianContent = CKEDITOR.instances.EnglishEditor.getData();
            collectionobj.SeqNo = $scope.SequenceNo;
            collectionobj.PageLinkList = JSON.stringify($scope.PLSettingList);
            collectionobj.IsBanner = $scope.ddlIsBanner;
            collectionobj.IsSlider = $scope.ddlIsSlider;
            collectionobj.PhotoIdList = $scope.AlbumIcon;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.sessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.IsApproved = $scope.IsApproved;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }
            var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/InsertUpdateDeleteAccordianContentLayout', collectionobj);
            getData.then(function (response) {
                //debugger
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                    showMsgBox(response.data);
                }
            });
        }
    }

    $scope.PLSettingList = [];
    $scope.AccordianDetailList = [];
    $scope.SearchRecord = function () {

        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {
        //debugger
        $scope.disable = true;
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '/Api/DynamicWebsiteApi/GetAccordianContentLayout', collectionobj);
        getData.then(function (response) {
            //debugger
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Accordian Code", "HeaderValue": "AccordianCode", "Width": "100px", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "Accordian Name ContentHeading", "HeaderValue": "AccordianName", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Sequence No", "HeaderValue": "SequenceNo", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Accordian ContentHeading", "HeaderValue": "AccordianContentHeading", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Accordian Content", "HeaderValue": "AccordianContent", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },                    
                    { "HeaderText": "Status", "HeaderValue": "IsApproved", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.AccordianDetailList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                debugger
                var row = $('#example').DataTable().row(this).data();                
                $scope.Code = $(this).find('input[type="hidden"]').val();
                $scope.AccordianDetailList = $filter('filter')($scope.AccordianDetailList, { 'Code': $scope.Code });
                $scope.GetAccordianType();
                $scope.AccordianType = row[1];
                $scope.SequenceNo = row[3];
                $scope.AccCHeading = row[4];
                CKEDITOR.instances.EnglishEditor.setData($scope.AccordianDetailList[0].AccordianContent);                
                $scope.IsApproved = row[6];
                $scope.IsActive = (row[7] == "Yes" ? "true" : "0");
                $scope.fileInput1 = $scope.AccordianDetailList[0].ImgPath;
                if ($scope.AccordianDetailList[0].LinkSequence != null && $scope.AccordianDetailList[0].LinkSequence != '') {                    
                    if ($scope.AccordianDetailList[0].PageLink != null) {
                        var Serial = $scope.AccordianDetailList[0].LinkSequence.split(',');
                        var Plink = $scope.AccordianDetailList[0].PageLink.split(',');
                        var LName = $scope.AccordianDetailList[0].LinkName.split(',');
                        $scope.PLSettingList = [];
                        $.each(Serial, function (i, val) {
                            $.each(Plink, function (j, x) {
                                if (i == j) {
                                    $.each(LName, function (k, y) {
                                        if (j == k) {
                                            $scope.PLSettingList.push({
                                                Srno: val,
                                                PageLink: x,
                                                LinkName: y
                                            })
                                        }

                                    });
                                }

                            });
                        })
                    }
                }                
                //$scope.AccordianDetailList = response.data;
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

            var collectionobj = {};
            collectionobj.Code = $scope.Code;
            collectionobj.Action = "3";
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            var getData = myService.methode('POST', "/Api/DynamicWebsiteApi/InsertUpdateDeleteAccordianContentLayout", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        });
    };
    $scope.ClearControl = function (flag) {
        if (flag == 1) {
            $scope.ResetControl(flag);
        }
        else {
            clearConfirmbox("do u want to clear field?", function () { $scope.ResetControl(0); });
        }
    };
    $scope.ResetControl = function (flag) {
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.IsApproved = "";
        $scope.hfId = "";
        $scope.SequenceNo = "";
        $scope.AccordianType = "";
        $scope.AccCHeading = "";
        $scope.IsActive = "";
        $scope.PLSettingList = [];
        $scope.AddRow();
        if (typeof (CKEDITOR) !== 'undefined')
            CKEDITOR.instances['EnglishEditor'].setData("");

        $scope.EnglishEditor = "";
        $scope.BodyContentList = [];
        $('.dropify-clear').click();
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.AddRow = function () {
        $scope.PLSettingList.push({
            Srno: "",
            PageLink: "",
            LinkName: "",
        })
    };


    $scope.RemoveRow = function (srno) {
        $scope.PLSettingList = $filter('filter')($scope.PLSettingList, { Srno: '!' + srno });
    }

    $scope.fuImageChange1 = function (input) {
        readURL1(input);
        $scope.AppendFiles(input);
    };
    function readURL1(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.imgfileInput1 = e.target.result;
                $scope.$applyAsync();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $scope.AlbumIcon = [];
    $scope.AppendFiles = function (input) {
        $scope.AlbumIcon = [];
        //$scope.getFiledetails();
        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                //GetHeightWidth('fileInput');
                if (input.files[i].size < '3048576') {
                    var filerdr = new FileReader();
                    filerdr.onload = function (e) {
                        $scope.AlbumIcon.push((e.target.result).replace(/^data:image\/[a-z]+;base64,/, ""));
                    }
                    filerdr.readAsDataURL(input.files[i]);
                }

            };
        }
    }
}