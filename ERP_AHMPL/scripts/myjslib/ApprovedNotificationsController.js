app.ApprovedNotificationsController = function ($scope, $element, $filter, myService)
{
    $scope.GetAllEmployeeNotificationsRemarks = function ()
    {
        
        var collectionobj = {};
        collectionobj.Action = "3";
        var getData = myService.methode('POST', '../Api/NotificationApi/GetNotificationsList', collectionobj);
        getData.then(function (response)
        {
            $scope.EmployeeRemarksList = response.data;
        });
    }   
    $scope.ApprovedRecords = function ()
    {
            if ($filter('filter')($scope.EmployeeRemarksList, { 'Chk': true }, true).length > 0)
            {
                
                var collectionobj = {};
                collectionobj.AllEmployeeApprovalList = JSON.stringify($filter('filter')($scope.EmployeeRemarksList, { 'Chk': true }, true));               
                collectionobj.IsApproved = 2;
                collectionobj.Action = "4";
                var getData = myService.methode('POST', '../Api/NotificationApi/InsertUpdateDeleteNotifications', collectionobj);
                getData.then(function (response)
                {
                    debugger
                    if (showMsgBox(response.data))
                    {
                        debugger
                        $scope.GetAllEmployeeNotificationsRemarks(); 
                        $scope.$applyAsync();
                    }

                }); 
            }
            else
            {
                showMsgBox("Select Atleast One Record.");
            }
      
    };

    $scope.RejectRecords = function ()
    {
        
            if ($filter('filter')($scope.EmployeeRemarksList, { 'Chk': true }, true).length > 0)
            {
                var collectionobj = {};
                collectionobj.AllEmployeeApprovalList = JSON.stringify($filter('filter')($scope.EmployeeRemarksList, { 'Chk': true }, true));
                collectionobj.IsApproved = 3;
                collectionobj.Action = "4";
                var getData = myService.methode('POST', '../Api/NotificationApi/InsertUpdateDeleteNotifications', collectionobj);
                getData.then(function (response)
                {
                    debugger
                    if (showMsgBox(response.data))
                    {
                        debugger
                        $scope.GetAllEmployeeNotificationsRemarks();
                        $scope.$applyAsync();
                    }

                });
            }
            else
            {
                showMsgBox("Select Atleast One Record.");
            }
       
    };
    $scope.CheckALL = function ()
    {
        $.each($scope.EmployeeRemarksList, function (index, obj)
        {
            obj.Chk = $scope.ChkAll;
        });
    }
    
}