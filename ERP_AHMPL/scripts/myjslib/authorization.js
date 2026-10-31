app.Authorization = function ($scope, $element, $interval, myService) {
    $scope.visibleAdd = true;
    $scope.visibleSearch = true;
    $scope.visibleDelete = true;
    $scope.visiblePrint = true;
    $scope.visibleClear = true;

    $scope.dbClick = function () {
        
        $scope.disableAdd=$scope.disableEdit;
        if ($scope.disableDeleted === true) {
            $scope.startForDelete();
        }
        $scope.disablePrint = $scope.disablePrinted;
        $scope.$applyAsync();
    };

    $scope.UrlAccessPermission = function () {
 
        //if (loginTypeId == 3)
        //{
        //    $scope.disableAdd = false;
        //    $scope.disableEdit = false;
        //    $scope.disableDelete = true;
        //    $scope.disablePrint = true;
        //    $scope.disableClear = false;

        //    $scope.IsAdd = true;
        //    $scope.IsEdit = true;
        //    $scope.IsDelete = true;
        //    $scope.IsPrint = true;
        //    return;
        //}
       
        $scope.IsAllow = true;
        $scope.IsAdd = false;
        $scope.IsEdit = false;
        $scope.IsDelete = false;
        $scope.IsPrint = false;

        $scope.disableAdd = true;
        $scope.disableEdit = true;
        $scope.disableDelete = true;
        $scope.disableDeleted = true;
        $scope.disablePrint = true;
        $scope.disablePrinted = true;
        $scope.disableClear = false;
        $scope.disableSearch = true;

        var url = window.location.pathname

        
        $scope.collectionobj = {};
        $scope.collectionobj["LoginId"] = userid;
        $scope.collectionobj["URL"] = url;
        $scope.collectionobj["SessionId"] = sessionId;
        $scope.collectionobj["FYId"] = fyId;
        $scope.collectionobj["RelationshipId"] = relationshipId;

        if (url.split("/").length>2)
            var getData = myService.methode('POST', '../../Api/AdministratorApi/UrlAccessPermission', $scope.collectionobj);
        else
            var getData = myService.methode('POST', '../Api/AdministratorApi/UrlAccessPermission', $scope.collectionobj);

        getData.then(function (response) {
            
            try{
                $scope.IsAllow = response.data[0].IsAllow;
                $scope.IsAdd = response.data[0].IsAdd;
                $scope.IsEdit = response.data[0].IsEdit;
                $scope.IsDelete = response.data[0].IsDelete;
                $scope.IsPrint = response.data[0].IsPrint;
             
                if ($scope.IsAdd === true) {
                    $scope.disableAdd = false;
                } else {
                    $scope.disableAdd = true;
                }

                if ($scope.IsEdit === true) {
                    $scope.disableEdit = false;
                } else {
                    $scope.disableEdit = true;
                }

                if ($scope.IsDelete === true) {
                    $scope.disableDeleted = false;
                } else {
                    $scope.disableDeleted = true;
                }

                if ($scope.IsPrint === true) {
                    $scope.disablePrinted = false;
                } else {
                    $scope.disablePrinted = true;
                }

                if ($scope.IsEdit === false && $scope.IsDelete === false && $scope.IsPrint === false) {
                    $scope.disableSearch = true;
                }
                else {
                    $scope.disableSearch = false;
                }
            }
            catch(err)
            {
                $scope.disableAdd = true;
                $scope.disableEdit = true;
                $scope.disableDelete = true;
                $scope.disablePrint = true;
                $scope.disableSearch = true;

                showMsgBox("Sorry Please Contact Admin!");
            }
           
        });
    }

    $scope.UrlAccessPermission();

    $scope.$watch('IsAllow', function () {
        
        if (typeof ($scope.IsAllow) === 'undefined') return;
        if ($scope.IsAllow===false)
        window.top.location.href = '../Login/Login';
    })

    $scope.CheckSavePermission = function () {       
        if ($scope.disableAdd === true) {
            window.top.location.href = '../Login/Login';
            e.preventDefault();
            return false;
        }
        else {
            if ($scope.IsAllow == true) {
                $scope.disableAdd = true;
            }
        }
    };

    $scope.CheckDeletePermission = function () {
        if ($scope.disableDeleted === true) {
            window.top.location.href = '../Login/Login';
            e.preventDefault();
            return false;
        }
    };

    $scope.CheckPrintPermission = function () {
        if ($scope.disablePrint === true) {
            window.top.location.href = '../Login/Login';
            e.preventDefault();
            return false;
        }
    };

    $scope.CheckSearchPermission = function () {
        if ($scope.disableSearch === true) {
            window.top.location.href = '/Login/Login';
            e.preventDefault();
            return false;
        }
    };

    $scope.ClearOk = function () {
        
        if ($scope.IsAdd === true) {
            $scope.disableAdd = false;
        } else {
            $scope.disableAdd = true;
        }

        if ($scope.IsEdit === true) {
            $scope.disableEdit = false;
        } else {
            $scope.disableEdit = true;
        }

        if ($scope.IsDelete === true) {
            $scope.disableDeleted = false;
        } else {
            $scope.disableDeleted = true;
        }

        if ($scope.IsPrint === true) {
            $scope.disablePrinted = false;
        } else {
            $scope.disablePrinted = true;
        }

        if ($scope.IsEdit === false && $scope.IsDelete === false && $scope.IsPrint === false) {
            $scope.disableSearch = true;
        }
        else {
            $scope.disableSearch = false;
        }
        $scope.$applyAsync();
    };
 
    $scope.startForDelete = function () {
        $interval(function () {
            $('#btnDelete').prop('disabled',$scope.disableDeleted);
            $scope.disableDelete = $scope.disableDeleted;
            if ($('#btnDelete').prop('disabled'))
            { $interval.cancel($scope.startForDelete); }
        }, 100);
    };
}