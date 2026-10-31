app.PageController = function ($scope, $sce, myService)
{
    $scope.GetAboutUs = function ()
    {
        debugger
        var collectionobj = {};
        var url = window.location.pathname;
        var splits = url.split('/');
        var splitsids = [];
        if (splits.length > 3) {
            splitsids = splits[3].split('_');
            if (splitsids.length > 0)
                collectionobj.Language = splitsids[0];
        }
        collectionobj.Action = 4;
        collectionobj.UnitId = (typeof (UnitId) === 'undefined' ? splitsids[1] : UnitId);
        collectionobj.TabId = (typeof (TabId) === 'undefined' ? (splitsids.length > 2 ? (isNaN(splitsids[2]) ? null : splitsids[2]) : null) : TabId);
        collectionobj.MenuId = (typeof (MenuId) === 'undefined' ? (splitsids.length > 3 ? (isNaN(splitsids[3]) ? null : splitsids[3]) : null) : MenuId);
        collectionobj.SubMenuId = (typeof (SubMenuId) === 'undefined' ? (splitsids.length > 4 ? (isNaN(splitsids[4]) ? null : splitsids[4]) : null) : SubMenuId);

        var getData = myService.methode('POST', "/Site/GetBodyContent", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0)
                $scope.AboutUsHome = response.data[0].BodyContent;
            else
                $scope.GetAboutUsById();
        });

    };

};