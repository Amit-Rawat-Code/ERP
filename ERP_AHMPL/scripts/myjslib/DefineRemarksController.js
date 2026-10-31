app.DefineRemarksController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtRemark')
    $scope.SaveRecord = function () {
       
        if (isValidate()) {
            $scope.showLoader();
            var collectionobj = {};

            collectionobj.Code = $scope.hfId;
            collectionobj.Remark = $scope.Remark;
            collectionobj.RemarkPoints = $scope.RemarkPoints;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.RelationshipId = relationshipId;

            if ($scope.Save == "Save") {
                collectionobj.Action = 1;
                collectionobj.CreatedBy = userid;
            }
            else {
                collectionobj.Action = 2;
                collectionobj.UpdatedBy = userid;
            }
            var getData = myService.methode('POST', "../Api/ExamMasterApi/InsertUpdateDeleteDefineRemark", collectionobj);
            getData.then(function (response) {

                showMsgBox(response.data);
                $scope.ClearControl(1);
               
            });
        }
        //else {
        //    showMsgBox('Please fill All Field');
        //}
        
    }

    $scope.ClearControl = function (flag) {
        if (flag == 1)
        {
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
        $scope.Remark = "";
        $scope.RemarkPoints = "";
        $scope.SetFocus('#txtRemark');
        $scope.hfId = "";
        if (flag == 0) {
            showMsgBox('4');
        };

    }

    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };


    $scope.started = function () {
        
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', "../Api/ExamMasterApi/GetDefineRemark", collectionobj);
        getData.then(function (response) {
           
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "RemarkPoints", "HeaderValue": "RemarkPoints", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
                ];

            $scope.DefineRemarkList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            $('#example tbody').on('dblclick', 'tr', function () {
                $scope.showLoader();

                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.DefineRemarkList = $filter('filter')($scope.DefineRemarkList, { 'Code': $scope.hfId });
                $scope.Remark = $scope.DefineRemarkList[0].Remark;
                $scope.RemarkPoints = $scope.DefineRemarkList[0].RemarkPoints;
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$apply();
                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();

                $scope.SetFocus('#txtUnitName', true);
                $scope.hideLoader();


            });
        });
    };

    $scope.DeleteRecord = function () {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };

    $scope.deleteRecord = function () {

        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.Code = $scope.hfId;
        collectionobj.FYId = fyId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;

        var getData = myService.methode('POST', "../Api/ExamMasterApi/InsertUpdateDeleteDefineRemark", collectionobj);
        getData.then(function (response) {
            if (showMsgBox(response.data)) {
                $scope.ClearControl(1);
            }
        });
    };
    $(document).on("click", ".RefreshSearchTable", function (e) {

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
                { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                { "HeaderText": "Remark", "HeaderValue": "Remark", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "RemarkPoints", "HeaderValue": "RemarkPoints", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];

        $scope.PrintMaster(tblheader, $scope.UnitMasterList, window.document.title);
    };
}