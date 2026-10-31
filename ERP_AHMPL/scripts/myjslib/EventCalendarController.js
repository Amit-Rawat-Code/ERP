app.EventCalendarController = function ($scope, $element, $filter, myService)
{
    $scope.GetCalendarForddl = function ()
    {
        var collectionobj = {};
        collectionobj.Action = 3;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/CommunicationWebApi/GetEventCalendar', collectionobj);
        getData.then(function (response)
        {
            $scope.CalendarForLists = response.data;
        });
    }
    $scope.showEndDate = true;
    $scope.DisplayEndDate = function ()
    {
        if ($scope.ActivityType =='Multiple Day')
        {
            $scope.showEndDate = false;
        }
        else
        {
            $scope.EventEndDate = "";
            $scope.showEndDate = true;
        }
    };
    
    /* Save Button Click Event */
    $scope.SaveRecord = function ()
    {
        if (isValidate())
        {
            if ($filter('filter')($scope.CalendarForLists, { 'chk': true }, true).length > 0)
            {
                var collectionobj = {};
                collectionobj.ActivityType = $scope.ActivityType;
                collectionobj.EventStartDate = moment($scope.EventStartDate).format('YYYY-MMM-DD');
                if (($scope.EventEndDate != undefined) && ($scope.EventEndDate != "")) {
                    collectionobj.EventEndDate = moment($scope.EventEndDate).format('YYYY-MMM-DD');
                }
                else
                {
                    collectionobj.EventEndDate = null;
                }
                collectionobj.CalendarFor = JSON.stringify($filter('filter')($scope.CalendarForLists, { 'chk': true }));;
                collectionobj.Eventname = $scope.Eventname;
                collectionobj.ActivityName = $scope.ActivityName;
                collectionobj.FYId = fyId;
                collectionobj.RelationshipId = relationshipId;
                collectionobj.IsActive = $scope.IsActive;
                collectionobj.SessionId = sessionId;
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
                var getData = myService.methode('POST', '../Api/CommunicationWebApi/InsertUpdateDeleteEventCalendar', collectionobj);
                getData.then(function (response)
                {
                    if (showMsgBox(response.data))
                    {
                        $scope.ClearControl(1);
                    }
                });
            }
            else
            {
                showMsgBox('Checked Atleast One Calendar For Checkbox.');
            }
        }
    };

    $scope.EventCalendarList = [];
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
        var getData = myService.methode('POST', '../Api/CommunicationWebApi/GetEventCalendar', collectionobj);
        getData.then(function (response)
        {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "Value": "Code", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Calendar For", "HeaderValue": "CalendarForName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Activity Type", "HeaderValue": "ActivityType", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Activity Name", "HeaderValue": "ActivityName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Event Name", "HeaderValue": "EventName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Start Date", "HeaderValue": "StartDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "End Date", "HeaderValue": "EndDate", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Is Active", "HeaderValue": "IsActive", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" }

                ];
            $scope.EventCalendarList = response.data;
            loadDataUsingPreDefinedColumn(tblheader, response.data); 
            $('#example tbody').on('dblclick', 'tr', function (event)
            {
                $scope.showLoader();                
                var row = $('#example').DataTable().row(this).data();
                $scope.hfId = $(this).find('input[type="hidden"]').val();
                $scope.EventCalendarList = $filter('filter')($scope.EventCalendarList, { 'Code': $scope.hfId }, true);                
                if ($scope.EventCalendarList[0].CalendarFor != undefined)
                {
                    $.each($scope.CalendarForLists, function (index, obj)
                    {
                        obj.chk = false;
                        obj.disabled = true;
                        if (obj.Code == $scope.EventCalendarList[0].CalendarFor)
                        {
                            obj.chk = true;
                        }
                    })
                }
                $scope.ActivityType = $scope.EventCalendarList[0].ActivityType;
                $scope.ActivityName = $scope.EventCalendarList[0].ActivityName;
                $scope.Eventname = $scope.EventCalendarList[0].EventName;
                $scope.EventStartDate = new Date(moment($scope.EventCalendarList[0].StartDate, 'DD-MM-YYYY'));
                $scope.EventEndDate = new Date(moment($scope.EventCalendarList[0].EndDate, 'DD-MM-YYYY'));                 
                $scope.IsActive = $scope.EventCalendarList[0].IsActive == true ? "True" : "False";
                if ($scope.ActivityType == 'Multiple Day')
                {
                    $scope.showEndDate = false;
                }
                else
                {
                    $scope.showEndDate = true;
                }
                $scope.hideLoader();
                $scope.Save = "Edit";
                $scope.disableDelete = false;
                $scope.$applyAsync();                
                $('.br-pageheader').fadeIn();
                $('#collapseinputbox').fadeIn();
                $('#CollapseSearchTableList').fadeOut();
                
            });
        });
    };

    /*Delete Button Click Event*/
    $scope.DeleteRecord = function () {
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
        var getData = myService.methode('POST', '../Api/CommunicationWebApi/InsertUpdateDeleteEventCalendar', collectionobj);
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
        $scope.ActivityType = '';
        $scope.ActivityName ='';
        $scope.Eventname = '';
        $scope.EventStartDate ='';
        $scope.EventEndDate = '';
        $scope.IsActive = '';
        $scope.GetCalendarForddl();
        $scope.DisplayEndDate();
        $scope.$applyAsync();
        if (flag == 0)
        {
            showMsgBox('4');
        };
    };
}