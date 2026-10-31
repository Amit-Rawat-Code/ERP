app.SkillTypeMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtSkillTypeName');

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};
            debugger
            collectionobj.SkillTypeName = $scope.SkillTypeName;
            collectionobj.TypeChar = $scope.SType;

            collectionobj.FYId = fyId;
            collectionobj.RelationShipId = relationshipId;
            collectionobj.SessionId = sessionId;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSkillTypeMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.SkillTypeList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.FYId = fyId;
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillTypeMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Skill Type Name", "HeaderValue": "SkillTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.SkillTypeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SkillTypeList = $filter('filter')($scope.SkillTypeList, { 'Code': $scope.hfId }, true);
                $scope.SkillTypeName = $scope.SkillTypeList[0].SkillTypeName;
                $scope.SType = $scope.SkillTypeList[0].TypeChar;

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtSkillTypeName');
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
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSkillTypeMaster', collectionobj);
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

        $scope.hfId = "";
        $scope.SkillTypeName = '';
        $scope.SType = '';
        $scope.SkillTypeList = [];

        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };

    /*Refresh Search Table Record*/
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
                { "HeaderText": "Skill Type Name", "HeaderValue": "SkillTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.SkillTypeList, window.document.title);
    };
}