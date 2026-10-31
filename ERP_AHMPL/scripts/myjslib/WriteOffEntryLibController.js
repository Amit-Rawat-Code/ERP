app.WriteOffEntryLibController = function ($scope, $element, $filter, myService) {

    $scope.VDate = new Date();
    $scope.WriteOffDate = new Date();
    $scope.GetVoucherNoLibList(5);
    $scope.SetFocus('#txtAccessionNo');
    /* Refresh Table on Model Selection */
    //$scope.$watch('[AccessionNoM]', function () {
    //    debugger;
    //    $scope.hfBookCode = "";
    //    $scope.BookName = "";
    //    $scope.BARID = "";
    //    $scope.Author = "";
    //    $scope.Publisher = "";
    //    $scope.WriteOffTypeM = "";
    //    $scope.Reason = "";
    //    $scope.WriteOffDate = new Date();
    //});


    $scope.GetAccessionIDDetails = function (AccessionID) {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 7;
        collectionobj.AccessionID = AccessionID;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetAccessionID', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.hfBookCode = response.data[0].BookCode;
                $scope.BookName = response.data[0].BookName;
                $scope.AccessionNoM = response.data[0].AccessionID;
                $scope.BARID = response.data[0].BARID;
                $scope.Author = response.data[0].Author;
                $scope.Publisher = response.data[0].Publisher;
                $scope.WriteOffDate = new Date();
            }

        });
    };
    $scope.GetWriteOffType = function () {
        //debugger;
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetWriteOffType', collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                //debugger;
                $scope.WriteOffTypeList = response.data;
            }
        });
    };

    /*Save-Edit Button Click Event*/
    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.TransId = $scope.hfId;
            collectionobj.V_Date = $scope.VDate;
            collectionobj.WriteOffDate = $scope.WriteOffDate;
            collectionobj.WriteType = $scope.WriteOffTypeM;
            collectionobj.BookCode = $scope.hfBookCode;
            collectionobj.AccessionID = $scope.AccessionNoM;
            collectionobj.BARID = $scope.BARID;
            collectionobj.Resaon = $scope.Reason;
            collectionobj.Type = "W";
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.CreatedBy = JSON.parse(userid);
            collectionobj.UpdatedBy = JSON.parse(userid);

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteWriteOffEntry", collectionobj);
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
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag) {
        //debugger;
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.VoucherM = "";
        $scope.GetVoucherType("BKWRT");
        $scope.GetVoucherNoLibList(5);
        $scope.VDate = "";
        $scope.VDate = new Date();
        $scope.hfId = "";
        $scope.hfBookCode = "";
        $scope.WriteOffDate = new Date();
        $scope.WriteOffTypeM = "";
        $scope.BookName = "";
        $scope.AccessionNoM = "";
        $scope.BARID = "";
        $scope.Reason = "";
        $scope.Author = "";
        $scope.Publisher = "";
        $scope.SetFocus('#txtAccessionNo');
        $scope.WriteOffEntryList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    }

    $scope.WriteOffEntryList = [];

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        //debugger;
        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/GetWriteOffEntryList", collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "V.Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "V No.", "HeaderValue": "VrNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                    { "HeaderText": "W.O.Date", "HeaderValue": "WriteoffDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Accession No.", "HeaderValue": "AccessionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Book Name", "Value": "BookCode", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "W.O.Type", "HeaderValue": "WriteOffType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reason", "HeaderValue": "Reason", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.WriteOffEntryList = response.data;

            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                //debugger;
                $scope.WriteOffEntryList = $filter('filter')($scope.WriteOffEntryList, { 'TransID': $scope.hfId });
                $scope.VDate = new Date(moment(row[1], 'DD-MM-YYYY'));
                $scope.PVNo = row[2];
                $scope.AccessionNoM = row[4];
                $scope.hfBookCode = $(FindHtml(row[5])).val();
                $scope.BookName = $scope.WriteOffEntryList[0].BookName;
                $scope.BARID = $scope.WriteOffEntryList[0].BARID;
                $scope.Author = $scope.WriteOffEntryList[0].AUTHOR; //$filter('filter')($scope.WriteOffEntryList, { 'TransID': $scope.hfId })[0].AUTHOR;
                $scope.Publisher = $scope.WriteOffEntryList[0].PUBLISHER;
                $scope.WriteOffDate = new Date(moment(row[3], 'DD-MM-YYYY'));
                $scope.GetWriteOffType();
                $scope.WriteOffTypeM = row[6];
                $scope.Reason = row[7];
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtName', true);
                $scope.hideLoader();


            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {
        //debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.TransId = $scope.hfId;
        collectionobj.UpdatedBy = JSON.parse(userid);

        var getData = myService.methode('POST', "../Api/LibraryTransactionApi/InsertUpdateDeleteWriteOffEntry", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ResetControl();
                $scope.hideLoader();
            };
        });
    };

    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        //debugger;
        var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
        var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
        var loadingAnim = panelToRefresh.find('.loading-progress');
        panelToRefresh.show();
        setTimeout(function () {
            loadingAnim.addClass('la-animate');
        }, 100);
        $scope.started();
        return false;
    });

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "TransID", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "V.Date", "HeaderValue": "V_Date", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "V No.", "HeaderValue": "VrNo", "Width": "100%", "ShowColumn": "No", "ImageColumn": "No" },
                { "HeaderText": "W.O.Date", "HeaderValue": "WriteoffDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Accession No.", "HeaderValue": "AccessionNo", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Book Name", "Value": "BookCode", "HeaderValue": "BookName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "W.O.Type", "HeaderValue": "WriteOffType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Reason", "HeaderValue": "Reason", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
        $scope.PrintMaster(tblheader, $scope.WriteOffEntryList, window.document.title);
    };
}