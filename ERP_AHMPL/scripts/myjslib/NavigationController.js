app.NavigationController = function ($scope, $element, $filter, myService) {

    $scope.GetModule = function () {
            var collectionobj = {};
            collectionobj.RelationshipId = relationshipId;  
            collectionobj.UserId = userid;
        collectionobj.SessionId = sessionId;
        var getData = myService.methode('POST', '../Api/DashBoardApi/GetNevigations', collectionobj);
        getData.then(function (response) {
            $scope.NavigationData = response.data;
    });
    };

    $scope.GetMobileModule = function () {
        debugger
        var colleectionobj = {};
        colleectionobj.relationshipId = relationshipId;
        colleectionobj.UserId = userid;
        colleectionobj.SessionId = sessionId;
        var getData = myService.methode('Post', '../Api/DashBoardApi/GetMobileNevigations', colleectionobj)
        getData.then(function (response) {
            $scope.NavigationData = response.data;
        });
    }
    $scope.MenuList = [];
    $scope.GetMenu = function (ModuleId, isCallingFromParent) {
        let menu = $filter('unique')(($filter('filter')($scope.NavigationData, { ModuleId: ModuleId }, true)), 'MenuId');

        if (isCallingFromParent == 1) {
            $scope.parentScope = $window.parent.angular.element($window.frameElement).scope();
            $scope.parentScope['ModuleIcon'] = menu[0].ModuleIcon;
            $scope.parentScope['ModuleTextName'] = menu[0].ModuleName;
            $scope.parentScope['MenuList'] = menu;

            $scope.parentScope.$applyAsync();
        }
        else {
            $scope.ModuleIcon = menu[0].ModuleIcon;
            $scope.ModuleTextName = menu[0].ModuleName;
            $scope.MenuList = menu;
        }
    };
    $scope.SubMenuList = [];
    $scope.GetSubMenu = function (MenuId, index) {
        $scope.MenuList[index].SubMenuList = $filter('filter')($scope.NavigationData, { MenuId: MenuId }, true);
    };

    

};



