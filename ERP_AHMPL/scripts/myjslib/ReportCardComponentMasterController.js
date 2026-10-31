app.ReportCardComponentMasterController = function ($scope, $element, $filter, myService) {
    $scope.SetFocus('#txtComponentName');

    $scope.SaveRecord = function () {
        if (isValidate()) {
            var collectionobj = {};           
            collectionobj.ComponentName = $scope.ComponentName;

            collectionobj.FYId = fyId;
            collectionobj.RelationShipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.CreatedBy = userid;
            collectionobj.UpdatedBy = userid;

            if ($scope.Save == "Save") {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit") {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteReportCardComponentMaster', collectionobj);
            getData.then(function (response) {
                if (showMsgBox(response.data)) {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.ComponentList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    }

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = "4";
        collectionobj.RelationShipId = relationshipId;
        collectionobj.SessionId = sessionId;

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetReportCardComponentMaster', collectionobj);
        getData.then(function (response) {

            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Class", "HeaderValue": "ComponentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.ComponentList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);
            
            $('#example tbody').on('dblclick', 'tr', function (event) {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.ComponentList = $filter('filter')($scope.ComponentList, { 'Code': $scope.hfId }, true);
                $scope.ComponentName = $scope.ComponentList[0].ComponentName
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                $scope.SetFocus('#txtComponentName');
            });
        });
        

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
            var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteReportCardComponentMaster', collectionobj);
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
            $scope.ComponentName = '';
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
                    { "HeaderText": "Class", "HeaderValue": "ComponentName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.PrintMaster(tblheader, $scope.ComponentList, window.document.title);
        };
    }
}