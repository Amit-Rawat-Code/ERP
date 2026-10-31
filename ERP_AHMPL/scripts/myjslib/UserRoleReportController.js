app.UserRoleReportController = function ($scope, $element, $filter, myService)
{
    $scope.GetAssociatedBranches(sessionId);
    /*Search Button Click Event*/
    $scope.SearchRecord = function () {
        $('#collapseinputbox').fadeOut();
        $('#CollapseSearchTableList').fadeIn();
        $scope.started();
    };

    $scope.started = function ()
    {
        $('#CollapseSearchTableList').attr('class', 'collapse in');
        var collectionobj = {};
        collectionobj.Action = "6";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SchoolRelationShipId = JSON.stringify($filter('filter')($scope.AssociatedBranches, { chk: true }, true));
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.UserId = userid;
        var getData = myService.methode('POST', '../Api/UserReportApi/GetUserRoleAssignments', collectionobj);
        getData.then(function (response) {
            var tblheader =
                [
                    { "HeaderText": "Sr.No.", "HeaderValue": "Id", "Width": "50px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno" },
                    { "HeaderText": "Profile Name", "Value": "UserId", "HeaderValue": "ProfileName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "Role Name", "Value": "RoleId", "HeaderValue": "RoleName", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                    { "HeaderText": "School", "HeaderValue": "DisplayCode", "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No" },
                ];

            loadDataTableForLargeAmountData(tblheader, response.data.Table);
        });
    };

  
};