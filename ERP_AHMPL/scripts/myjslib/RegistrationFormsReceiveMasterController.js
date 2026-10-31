app.RegistrationFormsReceiveMasterController = function ($scope, $element, $filter, myService) {
    $scope.RegNoPrefix = "";
    $scope.RegNoSufix = "";

    $scope.SaveRecord = function () {
        if (isValidate()) {
            $scope.showLoader();
            $scope.disableAdd = true;

            var collectionobj = {};
            collectionobj.RegistrationFeeHeadCode = $scope.RegistrationFeeHeadCode;

            collectionobj.ProspectusPrefix = $scope.RegNoPrefix;
            collectionobj.ProspectusNoStart = $scope.FormNoStart;
            collectionobj.ProspectusNoEnd = $scope.FormNoEnd;
            collectionobj.ProspectusSufix = $scope.RegNoSufix;
            collectionobj.ProspectusData = JSON.stringify($scope.RegNoTable);
            collectionobj.ReceivedOnDate = moment($scope.TodayDate).format('DD-MMM-YYYY');

            //collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;


            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            $scope.disableAdd = true;

            var getData = myService.methode('POST', '../Api/RegistrationMasterApi/InsertUpdateDeleteRegistrationReceiveMaster', collectionobj);

            getData.then(function (response) {
                $scope.disableAdd = true;
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.RegistrationFormsReceiveMasterList = [];
    $scope.Process = true;
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/RegistrationMasterApi/GetRegistrationReceive', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Registration Fee Head", "Value": "RegistrationFormFeeHeadCode", "HeaderValue": "RegistrationFeeHead", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Received Date", "HeaderValue": "ReceivedOnDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg No. Prefix ", "HeaderValue": "Prefix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg No. Start", "HeaderValue": "FormSeries", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg No. End", "HeaderValue": "ToSeries", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Reg No. Sufix", "HeaderValue": "Sufix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    //{ "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];
            $scope.RegistrationFormsReceiveMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, $scope.RegistrationFormsReceiveMasterList);

            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.RegistrationFormsReceiveMasterList = $filter('filter')($scope.RegistrationFormsReceiveMasterList, { 'Code': $scope.hfId }, true);
                $scope.RegistrationFeeHeadCode = $scope.RegistrationFormsReceiveMasterList[0].RegistrationFormFeeHeadCode;
                $scope.TodayDate = new Date($scope.RegistrationFormsReceiveMasterList[0].ReceivedOnDate);
                $scope.RegNoPrefix = $scope.RegistrationFormsReceiveMasterList[0].Prefix;
                $scope.FormNoStart = $scope.RegistrationFormsReceiveMasterList[0].FormSeries;
                $scope.FormNoEnd = $scope.RegistrationFormsReceiveMasterList[0].ToSeries;
                $scope.RegNoSufix = $scope.RegistrationFormsReceiveMasterList[0].Sufix;
                

                var collectionobj = {};
                collectionobj.Action = "5";
                collectionobj.RelationshipId = relationshipId;
                collectionobj.Code = $scope.hfId;
                collectionobj.SessionId = sessionId;
                var getData = myService.methode('POST', '../Api/RegistrationMasterApi/GetRegistrationReceive', collectionobj);
                getData.then(function (response) {

                    $scope.RegNoTable =response.data;

                });


                
                $scope.Process = false;
                $scope.hideLoader();
                $scope.Save = "Edit";
                // $scope.disableAdd=true;
                $scope.disableDelete = false;
                $scope.$applyAsync();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#ddlRegistrationFeeHead', true);
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
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/RegistrationMasterApi/InsertUpdateDeleteRegistrationReceiveMaster', collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
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
        $scope.Process = true;
        $scope.hfId = "";
        $scope.RegistrationFeeHeadCode = "";
        $scope.RegNoPrefix = "";
        $scope.FormNoStart = "";
        $scope.FormNoEnd = "";
        $scope.RegNoSufix = "";
        $scope.RegNoTable = [];

        $scope.$applyAsync();
        $scope.SetFocus('#ddlRegistrationFeeHead');
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    //$scope.RegNoTable = []
    $scope.GenerateRegNoTable = function () {
        $scope.RegNoTable = [];
        if (($scope.FormNoEnd - $scope.FormNoStart) <= 200)
        {
            var regno = "";
            var index = Number($scope.FormNoStart);
            for (let i = Number($scope.FormNoStart); i <= Number($scope.FormNoEnd); i++) {
                regno = $scope.RegNoPrefix.trim() + index + $scope.RegNoSufix.trim();
                $scope.RegNoTable.push({
                    Srno: 0,
                    RegNo: regno,
                    Status: "1",
                    Remark: "",
                });
                index = index + 1;
            }
        }
        else 
        {
            alert("Sorry, Please reset Reg No. range, i will be maximum 200.");
        }

        //setTimeout(function () {
        //    $('#ddlStatus' + $index).focus();
        //}, 500);
    };

    $scope.BindStatus = function () {

        var collectionobj = {};
        collectionobj.Action = "0";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getUserDetails = myService.methode('POST', '../Api/RegistrationMasterApi/GetRegistrationReceive', collectionobj);
        getUserDetails.then(function (response) {
            $scope.StatusList = response.data;
        });
    };

    $scope.PrintRecord = function () {
        var tblheader =
            [
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Registration Fee Head", "Value": "RegistrationFormFeeHeadCode", "HeaderValue": "RegistrationFeeHead", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Received Date", "HeaderValue": "ReceivedOnDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Reg No. Prefix ", "HeaderValue": "Prefix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Reg No. Start", "HeaderValue": "FormSeries", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Reg No. End", "HeaderValue": "ToSeries", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Reg No. Sufix", "HeaderValue": "Sufix", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                //{ "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.RegistrationFormsReceiveMasterList, window.document.title);
    };
}