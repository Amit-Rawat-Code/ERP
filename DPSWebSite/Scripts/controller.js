
$scope.$on('ArrowMove', function () {
    if (IsFunctionDefined('ArrowMoveWithOutFirstFocus')) {
        $scope.ArrowMoveWithOutFirstFocus("#collapseinputbox");
    }
});
if (IsFunctionDefined('app.LayoutController')) {
    app.LayoutController($scope, $element, $filter, myService);
}
