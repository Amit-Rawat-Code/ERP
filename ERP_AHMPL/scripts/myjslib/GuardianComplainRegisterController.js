app.GuardianComplainRegisterController = function ($scope, $element, $filter, myService)
{
    $scope.BindTeacherList = function ()
    {
        debugger;
      
        var collectionobj = {};
        collectionobj.Code = $scope.StudentCode;
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.Action = 10;
        var getData = myService.methode('POST', "../ComplainRegister/GetTeacherList", '{ obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response)
        {
            $scope.records = response.data;
            seprator = "";
            stringbuilder = "";
            $('#hdngetstu').html(''); 
            $scope.$applyAsync(); 
        }); 
    }
    $scope.Validate = function ()
    {
        debugger;
        if ($('#hdngetstu').text() == '')
        {
            showMsgBox('Oops !,Please Select At least One Teacher..')
            $scope.Valid = 0
        }
        else
        {
            if ($scope.Message == undefined || $scope.Message == '') {
                showMsgBox('Oops !,Message Content Sholud not empty..')
                $scope.Valid = 0
            }
            else { $scope.Valid = 1 }
          
        }

    }
    $scope.SaveRecord = function () {
        $scope.Validate();
        if ($scope.Valid==1) {
            debugger;
            $scope.showLoader();
            var collectionobj = {};
            collectionobj.Codes = $('#hdngetstu').text();
             
            collectionobj.ClassCode =  $scope.ClassId;
            collectionobj.SectionCode =   $scope.SectionId;
            collectionobj.ComplainText = $scope.Message;
            collectionobj.IsActive = 1;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.SchoolCode = schoolCode;
            collectionobj.BranchCode = branchCode;
            collectionobj.Action = 6;
            collectionobj.ComplainBy = $scope.StudentCode;
            collectionobj.CreatedBy = JSON.parse(userid);
            if ($scope.Save == "Save") {
                var getData = myService.methode('POST', "../ComplainRegister/InsertDeleteComplainRegister", '{obj:' + JSON.stringify(collectionobj) + '}');
                getData.then(function (response) {
                    debugger;
                    if (showMsgBox(response.data)) {
                        $scope.ClearControl(1);
                    }
                });
            }

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
        $scope.hideLoader();

        $scope.Save = "Save";
        $('input:checkbox').removeAttr('checked');
        $scope.disableDelete = true;
        $scope.disablePrint = true;
        $scope.Message = "";
        $scope.IsActive = "";
        $scope.hfId = "";
        $('#hdngetstu').text('');
      

        if (flag == 0) {
            showMsgBox('4');
        };

    }

    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    
    $scope.started = function () {
        var collectionobj = {};
        collectionobj.SessionId = sessionId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.Code = $scope.StudentCode;
        collectionobj.Action = 11;
        debugger;
        var getData = myService.methode('POST', "../ComplainRegister/ComplainRegisterList", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            var tblheader =
            [
                { "HeaderText": "Sr NO", "Value": "ComplainId", "HeaderValue": "Id", "Width": "40px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Teacher Name", "HeaderValue": "EmployeeDetails", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "Complain Message", "HeaderValue": "Complain", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" },
                { "HeaderText": "CreatedOn", "HeaderValue": "CreatedOn", "Width": "100px", "ShowColumn": "Yes", "ImageColumn": "No" }
            ];
         

            loadDataUsingPreDefinedColumn(tblheader, response.data);

        });
    };
    $scope.chk = [];
    $scope.Change = function (e) {
        debugger;


        var status = e.Checked;
        if ($('#' + e + '').prop("checked") == true) {
            status = true;
        }
        else { status = false; }
        var id = e;
        debugger;
        var stu = "";
        debugger;
        var isContains = stringbuilder.indexOf(e + ',') > -1;
        var isFContains = stringbuilder.indexOf(',' + id) > -1;
        if (status == false) {
            if (isContains) {
                stringbuilder = stringbuilder.replace(id + ',', '')
            }
            else if (isFContains) {
                stringbuilder = stringbuilder.replace(',' + id, '')
            }
            else { stringbuilder = stringbuilder.replace(id, '') }
            $('#hdngetstu').html(stringbuilder);


        }
        else {
            stringbuilder = stringbuilder + seprator + e;
            seprator = ",";
            $('#hdngetstu').html(stringbuilder);
        }
    }
}