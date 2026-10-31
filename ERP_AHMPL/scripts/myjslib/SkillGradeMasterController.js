app.SkillGradeMasterController = function ($scope, $element, $filter, myService) {   

    $scope.GetAllSkillType = function () {
        var collectionobj = {};
        collectionobj.Action = 5;

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillGroupMaster', collectionobj);
        getData.then(function (response) {
            $scope.SkillTypeList = response.data;
        });
    };

    $scope.GetSkillTypeCode = function (rdovalue) {        
        $scope.hfId = rdovalue;
    }; 

    $scope.GetDisplayOrder = function () {
        var collectionobj = {};
        collectionobj.Action = "4";

        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillGradeMaster', collectionobj);
        getData.then(function (response) {
            if (response.data == null)
                $scope.DisplayOrder = 1;
            else
                $scope.DisplayOrder = response.data.length + 1;
        });
    }  
    $scope.GetDisplayOrder();

    $scope.SaveRecord = function () {
        if (isValidate()) {            
            var collectionobj = {};
            collectionobj.SkillTypeCode = $scope.hfId;
            collectionobj.GradeFor = $scope.GradeFor;
            collectionobj.GradeType = $scope.GradeType;
            collectionobj.GradeName = $scope.GradeName;
            collectionobj.GradeDescription = $scope.GradeDescription;
            collectionobj.LowerLimit = $scope.LowerLimit;
            collectionobj.UpperLimit = $scope.UpperLimit;
            collectionobj.DisplayOrder = $scope.DisplayOrder;

            collectionobj.FYId = fyId;
            collectionobj.RelationShipId = relationshipId;
            collectionobj.SessionId = sessionId;           

            if ($scope.hfId == undefined) {
                showMsgBox("999", "Stop", "Please Select Skill Type", "warning", 'btn-warning');
                $scope.SetFocus('#SkillType');
            }
            else {
                if ($scope.Save == "Save") {
                    collectionobj.Action = "1";
                    collectionobj.CreatedBy = userid;
                }
                else if ($scope.Save == "Edit") {
                    collectionobj.Action = "2";
                    collectionobj.UpdatedBy = userid;
                    collectionobj.Code = $scope.hfId;
                }
                var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSkillGradeMaster', collectionobj);
                getData.then(function (response) {
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }
        }
    };

    $scope.SkillGradeList = [];
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

        var getData = myService.methode('POST', '../Api/ExamMasterApi/GetSkillGradeMaster', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Type Name", "HeaderValue": "SkillTypeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Grade For", "HeaderValue": "GradeFor", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Grade Type", "HeaderValue": "GradeType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Grade", "HeaderValue": "GradeName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Grade Description", "HeaderValue": "GradeDescription", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Lower Limit", "HeaderValue": "LowerLimit", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Upper Limit", "HeaderValue": "UpperLimit", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Display Order", "HeaderValue": "DisplayOrder", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            $scope.SkillGradeList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event) {

                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.SkillGradeList = $filter('filter')($scope.SkillGradeList, { 'Code': $scope.hfId }, true);
              
                $scope.SkillType = $scope.SkillGradeList[0].SkillTypeCode;
                $scope.GradeFor = $scope.SkillGradeList[0].GradeFor.toString();
                $scope.GradeType = $scope.SkillGradeList[0].GradeType.toString();
                $scope.GradeName = $scope.SkillGradeList[0].GradeName;
                $scope.GradeDescription = $scope.SkillGradeList[0].GradeDescription;
                $scope.LowerLimit = $scope.SkillGradeList[0].LowerLimit;
                $scope.UpperLimit = $scope.SkillGradeList[0].UpperLimit;
                $scope.DisplayOrder = $scope.SkillGradeList[0].DisplayOrder;

                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
               // $scope.SetFocus('#txtSkillName');
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
        var getData = myService.methode('POST', '../Api/ExamMasterApi/InsertUpdateDeleteSkillGradeMaster', collectionobj);
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

        $scope.GradeFor = '';
        $scope.GradeType = '';
        $scope.GradeName = '';
        $scope.GradeDescription = '';
        $scope.LowerLimit = '';
        $scope.UpperLimit = '';
        $scope.GetDisplayOrder();
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
                { "HeaderText": "Skill Group Name", "HeaderValue": "SkillGroupName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
            ];

        $scope.PrintMaster(tblheader, $scope.SkillGradeList, window.document.title);
    };
}