app.EventCalendarForMasterController = function ($scope, $element, $filter, myService)
{
    $scope.hideEmployeeType = true;
    $scope.hideStudentType = true;

    $scope.DisplayDiv = function ()
    {
        if ($scope.CalendarFor == 'Staff')
        {
            $scope.hideEmployeeType = false;
            $scope.hideStudentType = true;
        }
        else if($scope.CalendarFor == 'Student')
        {
            $scope.hideEmployeeType = true;
            $scope.hideStudentType = false;
        }
        else
        {
            $scope.hideEmployeeType = true;
            $scope.hideStudentType = true;
        }
    };   
    
    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        
        if (isValidate())
        {
            var collectionobj = {};
            collectionobj.CalendarFor = $scope.CalendarFor; 
            collectionobj.EmployeeType = $scope.EmployeeType;
            collectionobj.StudentType = $scope.StudentType;            
            collectionobj.RelationshipId = relationshipId;
            collectionobj.SessionId = sessionId;
            collectionobj.FYId = fyId;
            if ($scope.Save == "Save")
            {
                collectionobj.Action = "1";
                collectionobj.CreatedBy = userid;
            }
            else if ($scope.Save == "Edit")
            {
                collectionobj.Action = "2";
                collectionobj.UpdatedBy = userid;
                collectionobj.Code = $scope.hfId;
            }
            var getData = myService.methode('POST', '../Api/CommunicationWebApi/InsertUpdateDeleteEventCalendarForMaster', collectionobj);
            getData.then(function (response)
            {
                if (showMsgBox(response.data))
                {
                    $scope.ClearControl(1);
                }
            });
        }
    };

    $scope.EventCalendarMasterList = [];
    /*Search Button Click Event*/
    $scope.SearchRecord = function ()
    {
        $('#collapseinputbox').attr('class', 'collapse in');
        $('#CollapseSearchTableList').attr('class', 'collapse');
        $scope.started();
    };
    $scope.started = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "1";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        var getData = myService.methode('POST', '../Api/CommunicationWebApi/GetEventCalendarForMaster', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Calendar For", "HeaderValue": "CalendarFor", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Name", "HeaderValue": "CalendarForTypeCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }                                       
                ];

            $scope.EventCalendarMasterList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data);

            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                $scope.showLoader();
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EventCalendarMasterList = $filter('filter')($scope.EventCalendarMasterList, { 'Code': $scope.hfId }, true);
                $scope.CalendarFor = $scope.EventCalendarMasterList[0].CalendarFor;
                $scope.GetEmployeeType();
                if ($scope.CalendarFor == 'Staff')
                {
                    $scope.hideEmployeeType = false;
                    $scope.hideStudentType = true;
                    $scope.EmployeeType = $scope.EventCalendarMasterList[0].Code;
                }
                else
                {
                    $scope.hideEmployeeType = true;
                    $scope.hideStudentType = false;
                    $scope.StudentType = $scope.EventCalendarMasterList[0].Code;
                }
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();

                //collapse box
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                //$scope.SetFocus('#ddlSession', true);
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function ()
    {
        deleteConfirmbox("Do you want to delete this record?", $scope.deleteRecord);
    };
    $scope.deleteRecord = function ()
    {
        var collectionobj = {};
        collectionobj.Action = "3";
        collectionobj.Code = $scope.hfId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UpdatedBy = userid;
        var getData = myService.methode('POST', '../Api/CommunicationWebApi/InsertUpdateDeleteEventCalendarForMaster', collectionobj);
        getData.then(function (response)
        {
            if (showMsgBox(response.data))
            {
                $scope.ClearControl(1);
            }
        });
    };

    $scope.ClearControl = function (flag)
    {
        if (flag == 1)
        {
            $scope.ResetControl(flag);
        }
        else
        {
            clearConfirmbox("Do you want to clear fields?", function () { $scope.ResetControl(0); });
        }
    };

    $scope.ResetControl = function (flag)
    {
        $scope.Save = "Save";
        $scope.CalendarFor = '';
        $scope.EmployeeType = '';
        $scope.StudentType = '';
        $scope.$applyAsync();
        if (flag == 0) {
            showMsgBox('4');
        };
    };
}