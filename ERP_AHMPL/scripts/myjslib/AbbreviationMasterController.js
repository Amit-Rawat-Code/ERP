app.AbbreviationMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#ddlAbbrType');
    $scope.ddl_ChangeAbbrType = function () {
        $scope.AbbrName = ($filter('filter')($scope.AbbrTypes, { AbbrTypeId: Number($scope.AbbrTypeId) }, true))[0].AbbrType;
    }

    $scope.SaveRecord = function () {

        if (isValidate()) {

            debugger;
            var collectionobj = {};
            collectionobj.Code = $scope.hfId;
            collectionobj.Name = $scope.AbbrName;
            collectionobj.Abbreviation = $scope.Abbreviation;
            collectionobj.AbbrTypeId = $scope.AbbrTypeId;
            //-------------------Add New Fields--------------------------------------
            collectionobj.AbbreviationWeight = $scope.AbbreviationWeight;
            collectionobj.GroupAbbreviation = $scope.GroupAbbreviation;
            collectionobj.DeductionDays = $scope.DeductionDays;
            collectionobj.Valuetype = $scope.Valuetype;
            //------------------------------------------------------------

            collectionobj.Remarks = $scope.Remarks;
            collectionobj.DisplayOrder = $scope.DisplayOrder;
            collectionobj.IsActive = $scope.IsActive;
            collectionobj.SessionId = sessionId;
            collectionobj.RelationshipId = relationshipId;
            collectionobj.FYId = fyId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;
            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
            }
            else {
                collectionobj.Action = 2;
            }

            var getData = myService.methode('POST', "../Api/AttendanceMasterApi/InsertUpdateDeleteAbbreviationMaster", collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });

        }
    }

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Code = $scope.hfId;
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.CreatedBy = userid
        collectionobj.UpdatedBy = userid

        var getData = myService.methode('POST', "../Api/AttendanceMasterApi/InsertUpdateDeleteAbbreviationMaster", collectionobj);
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
        $scope.AbbrName = "";
        $scope.AbbreviationWeight = "";
        $scope.GroupAbbreviation = "";
        $scope.DeductionDays = "";
        $scope.Valuetype = "";
        $scope.Abbreviation = "";
        $scope.AbbrTypeId = "";
        $scope.Remarks = "";
        $scope.DisplayOrder = "";
        $scope.IsActive = "true";
        $scope.Save = "Save";
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.hfId = "";
        $scope.SetFocus('#ddlAbbrType');
        $scope.MasterAbbreviationList = [];
        if (flag == 0) {
            showMsgBox('4');
        };
    };
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };

    $scope.started = function () {

        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;

        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', "../Api/AttendanceMasterApi/GetAbbreviationMaster", collectionobj);
        getData.then(function (response) {
            debugger;
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Abbr. Type", "HeaderValue": "AbbrType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Abbreviation [Short Name]", "HeaderValue": "Abbreviation", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Abbr. Weight", "HeaderValue": "LeaveWeight", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Group Of Abbr.", "HeaderValue": "GroupOfDay", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Deduction Of Days", "HeaderValue": "Deduction", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Abbreviation For [Value Type]", "HeaderValue": "ValueType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },

                    { "HeaderText": "Remarks", "HeaderValue": "Remarks", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "IsActive", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
                ];
            $scope.MasterAbbreviationList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                debugger;

                $scope.MasterAbbreviationList = $filter('filter')($scope.MasterAbbreviationList, { 'Code': $scope.hfId });

                $scope.AbbrTypeId = $scope.MasterAbbreviationList[0].AbbrTypeId.toString()
                $scope.AbbrName = $scope.MasterAbbreviationList[0].Name;
                $scope.Abbreviation = $scope.MasterAbbreviationList[0].Abbreviation;
                $scope.AbbreviationWeight = $scope.MasterAbbreviationList[0].LeaveWeight;
                $scope.Valuetype = $scope.MasterAbbreviationList[0].ValueType;

                $scope.DeductionDays = $scope.MasterAbbreviationList[0].Deduction;
                $scope.GroupAbbreviation = $scope.MasterAbbreviationList[0].GroupOfDay;

                $scope.Remarks = $scope.MasterAbbreviationList[0].Remarks;
                $scope.DisplayOrder = $scope.MasterAbbreviationList[0].DisplayOrder;
                $scope.IsActive = row[10] == "Yes" ? "true" : "false";

                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#ddlAbbrType', true);
                $scope.hideLoader();
            });

        });

    };
    $scope.MasterAbbreviationList = [];
    //$scope.SearchbyValue = function () {       
    //    var collectionobj1 = {};
    //    collectionobj1.Code = $scope.hfId;
    //    collectionobj1.SessionId = sessionId;
    //    collectionobj1.Action = 4;
    //    collectionobj1.FYId = fyId;
    //    collectionobj1.SchoolCode = sessionStorage.getItem('schoolCode');
    //    collectionobj1.BranchCode = sessionStorage.getItem('branchCode');
    //    var getData = myService.methode('POST', "../Attendance/MasterAbbreviationList", '{obj:' + JSON.stringify(collectionobj1) + '}');
    //    getData.then(function (response) {
    //        debugger;
    //        $scope.AbbrName = response.data[0]["Name"];
    //        $scope.Abbreviation = response.data[0]["Abbreviation"];
    //        $scope.AbbreviationId = response.data[0]["AbbrTypeId"].toString();
    //        $scope.Remarks = response.data[0]["Remarks"];
    //        $scope.DisplayOrder = response.data[0]["DisplayOrder"].toString();
    //        $scope.IsActive = response.data[0]["IsActive"];
    //        $scope.hideLoader();
    //    });
    //}
    /*Refresh Search Table Record*/
    $(document).on("click", ".RefreshSearchTable", function (e) {
        debugger;
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
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Code", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Name", "HeaderValue": "Name", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "activeyn" }
            ];
        $scope.PrintMaster(tblheader, $scope.MasterAbbreviationList, window.document.title);
    };
}