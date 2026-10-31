app.CollegeSocialMediaPostReportController = function ($scope, $element, $filter, myService) {

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


    $scope.SearchRecord = function () {
        if (isValidate()) {
            $('#CollapseSearchTableList').fadeIn();
            $scope.started();
        }
    };

    $scope.started = function () {
        var collectionobj = {};
        collectionobj.Action = 1;
        collectionobj.ToDate = moment(($scope.ToDate)).format('YYYY-MMM-DD');
        collectionobj.FromDate = moment(($scope.FromDate)).format('YYYY-MMM-DD');
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '/Api/CollegeEnquiryReportApi/GetCollegeSocialMediaPostReport', collectionobj);
        getData.then(function (response) {

            messagevalues = [
                { "FromDate": moment($scope.FromDate).format('DD-MMM-YYYY') },
                { "ToDate": moment($scope.ToDate).format('DD-MMM-YYYY') }
            ];
            var tblheader = [];
            var tblheader =
                [
                    { "HeaderText": "Sr No.", "Value": "RowNumber", "HeaderValue": "Id", "Width": "30px", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "srno", "rowSpan": "2" },

                ];

            $scope.dynamicHeader = Object.keys(response.data[0]);

            $.each($scope.dynamicHeader, function (index, val) {
                tblheader.push({ "HeaderText": val, "HeaderValue": val, "Width": "100%", "ShowColumn": "Yes", "ImageColumn": "No", "CssClass": "text-left" })
            });

            loadDataUsingPreDefinedColumn(tblheader, response.data);
        });

    }

}