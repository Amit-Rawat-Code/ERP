
var userid = sessionStorage.getItem("userid");
var code = sessionStorage.getItem("code");
var profileName = sessionStorage.getItem("profileName");
var loginTypeId = sessionStorage.getItem("loginTypeId");
var loginAs = sessionStorage.getItem('loginAs');
var lastlogin = sessionStorage.getItem("LastLogin");
var sessionId = sessionStorage.getItem("sessionId");
//debugger
var academicSession = sessionStorage.getItem("academicSession");
var fyId = sessionStorage.getItem("fyId");
var financialYear = sessionStorage.getItem("financialYear");
var relationshipId = sessionStorage.getItem('relationshipId');
var schoolName = sessionStorage.getItem('SchoolName');
var schoolAddress = sessionStorage.getItem('schoolAddress');

var isHO = sessionStorage.getItem("isHO");
var isSchool = sessionStorage.getItem("isSchool");
var isCollege = sessionStorage.getItem("isCollege");
var isSociety = sessionStorage.getItem("isSociety");

var displayCode = sessionStorage.getItem("displayCode");
var groupCode = sessionStorage.getItem("groupCode");
var societyCode = sessionStorage.getItem("societyCode");
var societyName = sessionStorage.getItem("societyName");
var schoolCode = sessionStorage.getItem("schoolCode");
var branchCode = sessionStorage.getItem("branchCode");
var branchLogo = sessionStorage.getItem("branchLogo");

var designation = sessionStorage.getItem("designation");


if (sessionId == "-1" || sessionId == null || sessionId == "" || sessionId == "null") {
    alert("Please active/create session!")
    if (loginTypeId != '1') {
        window.top.location.href = '../Login/Login';
    }
}
if (fyId == "-1" || fyId == null || fyId == "" || fyId == "null") {
    alert("Please active/create financial year!")
    if (loginTypeId != '1') {
        window.top.location.href = '../Login/Login';
    }
}

//var getstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//var breakstring = getstring[0].split('|');
//if (breakstring[0] == 'TT' || breakstring.length == 6) {
//    sessionStorage.setItem("schoolCode", breakstring[1]);
//    schoolCode = sessionStorage.getItem("schoolCode");

//    sessionStorage.setItem("branchCode", breakstring[2]);
//    branchCode = sessionStorage.getItem("branchCode");

//    sessionStorage.setItem("sessionId", breakstring[3]);
//    sessionId = sessionStorage.getItem("sessionId");

//    sessionStorage.setItem("fyId", breakstring[4]);
//    fyId = sessionStorage.getItem("fyId");

//    sessionStorage.setItem("code", breakstring[5]); 
//}
//else if (breakstring[0] == 'AS' || breakstring.length == 7) {
//    sessionStorage.setItem("schoolCode", breakstring[1]);
//    schoolCode = sessionStorage.getItem("schoolCode");

//    sessionStorage.setItem("branchCode", breakstring[2]);
//    branchCode = sessionStorage.getItem("branchCode");

//    sessionStorage.setItem("sessionId", breakstring[3]);
//    sessionId = sessionStorage.getItem("sessionId");

//    sessionStorage.setItem("fyId", breakstring[4]);
//    fyId = sessionStorage.getItem("fyId");

//    sessionStorage.setItem("code", breakstring[5]);
//}
//else if (breakstring[0] == 'QP')
//{
//}
//else {
//    if (userid == "-1" || userid == null || userid == "" || userid == "null") {
//        //alert('Userid');
//        window.top.location.href = '../Login/Login';
//    }
//    if (schoolCode == "-1" || schoolCode == null || schoolCode == "" || schoolCode == "null") {
//        //alert('schoolCode');
//        window.top.location.href = '../Login/Login';
//    }
//    if (branchCode == "-1" || branchCode == null || branchCode == "" || branchCode == "null") {
//        //alert('branchCode');
//        window.top.location.href = '../Login/Login';
//    }
//    if (sessionId == "-1" || sessionId == null || sessionId == "" || sessionId == "null") {
//        alert("Please active session!")
//        window.top.location.href = '../Login/Login';
//    }
//    if (fyId == "-1" || fyId == null || fyId == "" || fyId == "null") {
//        alert("Please active/create financial year!")
//        if (loginTypeId != '1') {
//            window.top.location.href = '../Login/Login';
//        }
//    }
//    if (loginTypeId == "-1" || loginTypeId == null || loginTypeId == "" || loginTypeId == "null") {
//        //alert('loginTypeId');
//        window.top.location.href = '../Login/Login';
//    }
//}
app.directive('infiniteScroll', [
    '$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
        return {
            link: function (scope, elem, attrs) {
                var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                $window = angular.element($window);
                elem.css('overflow-y', 'scroll');
                elem.css('overflow-x', 'hidden');
                elem.css('height', 'inherit');
                scrollDistance = 0;
                if (attrs.infiniteScrollDistance != null) {
                    scope.$watch(attrs.infiniteScrollDistance, function (value) {
                        return scrollDistance = parseInt(value, 10);
                    });
                }
                scrollEnabled = true;
                checkWhenEnabled = false;
                if (attrs.infiniteScrollDisabled != null) {
                    scope.$watch(attrs.infiniteScrollDisabled, function (value) {
                        scrollEnabled = !value;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    });
                }
                $rootScope.$on('refreshStart', function (event, parameters) {
                    elem.animate({ scrollTop: "0" });
                });
                handler = function () {
                    var container, elementBottom, remaining, shouldScroll, containerBottom;
                    container = $(elem.children()[0]);
                    elementBottom = elem.offset().top + elem.height();
                    containerBottom = container.offset().top + container.height();
                    remaining = containerBottom - elementBottom;
                    shouldScroll = remaining <= elem.height() * scrollDistance;
                    if (shouldScroll && scrollEnabled) {
                        if ($rootScope.$$phase) {
                            return scope.$eval(attrs.infiniteScroll);
                        } else {
                            return scope.$apply(attrs.infiniteScroll);
                        }
                    } else if (shouldScroll) {
                        return checkWhenEnabled = true;
                    }
                };
                elem.on('scroll', handler);
                scope.$on('$destroy', function () {
                    return $window.off('scroll', handler);
                });
                return $timeout((function () {
                    if (attrs.infiniteScrollImmediateCheck) {
                        if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                            return handler();
                        }
                    } else {
                        return handler();
                    }
                }), 0);
            }
        };
    }
]);
app.directive('minDate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;
            element[0].setAttribute("min", today);
        }
    };
});

app.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
    function ($filter, $document, $compile, $parse) {

        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;

                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }

                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                if (checkboxes) {
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }

                template += '</li>';

                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

                template += '</ul>';
                template += '</div>';

                element.html(template);
            },
            link: function ($scope, $element, $attrs) {
                var $dropdownTrigger = $element.children()[0];

                $scope.toggleDropdown = function () {
                    $scope.open = !$scope.open;
                };

                $scope.checkboxClick = function ($event, id) {
                    $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

                $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
                };

                $scope.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'label',
                    idProp: 'id',
                    externalIdProp: 'id',
                    enableSearch: false,
                    selectionLimit: 0,
                    showCheckAll: true,
                    showUncheckAll: true,
                    closeOnSelect: false,
                    buttonClasses: 'btn btn-default',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop
                };

                $scope.texts = {
                    checkAll: 'Check All',
                    uncheckAll: 'Uncheck All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };

                $scope.searchFilter = $scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                    $scope.$watch('options', function (newValue) {
                        if (angular.isDefined(newValue)) {
                            $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                        }
                    });
                }

                angular.extend($scope.settings, $scope.extraSettings || []);
                angular.extend($scope.externalEvents, $scope.events || []);
                angular.extend($scope.texts, $scope.translationTexts);

                $scope.singleSelection = $scope.settings.selectionLimit === 1;

                function getFindObj(id) {
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                function clearObject(object) {
                    for (var prop in object) {
                        delete object[prop];
                    }
                }

                if ($scope.singleSelection) {
                    if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                        clearObject($scope.selectedModel);
                    }
                }

                if ($scope.settings.closeOnBlur) {
                    $document.on('click', function (e) {
                        var target = e.target.parentElement;
                        var parentFound = false;

                        while (angular.isDefined(target) && target !== null && !parentFound) {
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if (target === $dropdownTrigger) {
                                    parentFound = true;
                                }
                            }
                            target = target.parentElement;
                        }

                        if (!parentFound) {
                            $scope.$apply(function () {
                                $scope.open = false;
                            });
                        }
                    });
                }

                $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

                $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.buttonDefaultText;
                            } else {
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.buttonDefaultText;
                    }
                };

                $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () {
                    $scope.deselectAll(false);
                    $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                        $scope.externalEvents.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) {
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                        angular.extend($scope.selectedModel, finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                        if ($scope.settings.closeOnSelect) $scope.open = false;

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                        $scope.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                    }
                    if ($scope.settings.closeOnSelect) $scope.open = false;
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

                $scope.externalEvents.onInitDone();
            }
        };
    }]);

app.directive('margeCellRowspan', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('tablecellmarge');
            });
        }
    };
});

app.directive('enquiryFormList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('DashBoardEnquiryFormList');
            });
        }
    }; 
});

app.directive('enquiryFollowUpsList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('DashBoardEnquiryFollowUpsList');
            });
        }
    }; 
});
app.directive('enquiryTodayFollowUpsList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('TodayDueFollowups');
            });
        }
    };
});
app.directive('enquiryTotalFollowUpsList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('TotalDueFollowupList');
            });
        }
    };
});
app.directive('enquiryClosedFollowUpsList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('TotalClosedEnquiry');
            });
        }
    };
});
app.directive('enquiryTransferList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('TotalTransferedEnquiry');
            });
        }
    };
});

app.directive('loadBarcode', function ($timeout) {
    //debugger
    return function (scope, element, attrs) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('barcode');
            });
        }
    };
});


app.directive("ngUploadChange", function () {
    return {
        scope: {
            ngUploadChange: "&"
        },
        link: function ($scope, $element, $attrs) {
            $element.on("change", function (event) {
                $scope.$apply(function () {
                    $scope.ngUploadChange({ $event: event })
                })
            })
            $scope.$on("$destroy", function () {
                $element.off();
            });
        }
    }
});

app.directive('orientable', function () {
    return {
        link: function (scope, element, attrs) {

            element.bind("load", function (e) {

            });
        }
    }
});

app.directive('aadhaar', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var jqueryElement = $('#' + element.attr('id'));
            var isFocus = false;
            element.on('keyup', function () {
                isFocus = false;
                var aadhaarno = element.val();
                if (Number(aadhaarno.replace(/\s/g, '')) && aadhaarno.replace(/\s/g, '').length > 0) {
                    var aadhaarno = element.val();
                    var arrayofaadhaarno = aadhaarno.replace(/\s/g, '').split('');
                    var newaadhaarno = "";
                    $.each(arrayofaadhaarno, function (i, val) {
                        if (i == 4 || i == 8) {
                            newaadhaarno = newaadhaarno + ' ' + val;
                        }
                        else {
                            newaadhaarno = newaadhaarno + val;
                        }
                        if (i >= 11) return false;
                    });
                    element.val(newaadhaarno);
                    $scope.studentDetails.AadhaarNo = newaadhaarno
                    if (newaadhaarno.replace(/\s/g, '').split('').length <= 11) {
                        element.focus();
                        addToolTip(jqueryElement, "Must be 12 digit!");
                        isFocus = true;
                    }
                }
                else {
                    if (element.val() != "") {
                        isFocus = true;
                        element.focus();
                        element.val(element.val().replace(/[a-zA-Z]/g, ''));
                        addToolTip(jqueryElement, "Must be numeric value!");
                    }
                }

                if (!isFocus)
                    removeToolTip(jqueryElement);
            });

            element.on('blur', function () {
                if (isFocus)
                    element.focus();
                else
                    removeToolTip(jqueryElement);
            });
        }
    };
});

app.directive('allStartCompetitionList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('allStartCompetitionListAction');
            });
        }
    };
});

app.directive('clockPicker', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.blur(function (e) {
                var model = attrs['ngModel'];
                scope[model] = $(this).val();
                scope.$applyAsync();
            });
        }
    }
});

app.directive('scrollDivFooter', function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) {
            $timeout(function () {
                var table = $("#" + attrs.scrollDivFooter).DataTable({
                    "searching": true
                });

                //Apply the search
                table.columns().every(function () {
                    var that = this;

                    $('input', this.footer()).on('keyup change', function () {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw();
                        }
                    });
                });
            });
        }
    };
});
app.directive('scrollDiv', function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) {
            $timeout(function () {
                var table = $("#" + attrs.scrollDiv).DataTable({
                    "searching": true
                });
            });
        }
    };
});

app.directive('ngRepeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('CustomFunction');
            });
        }
    };
});

app.directive('repeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('MergeCommonRows');
            });
        }
    };
});

app.directive('conversationMemberList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('conversationMemberList-init');
            });
        }
    };
});
app.directive('allCircularList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('allCircularList-init');
            });
        }
    };
});
app.directive('threadList', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('threadList-init');
            });
        }
    };
});
app.directive('chatRepeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('slimscroll-init');
            });
        }
    };
});
app.directive('bodyDetailsDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('bodyDetails-scroll');
            });
        }
    };
});
app.directive('owldemorepeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('owldemo');
            });
        }
    };
});

app.directive('upScrollDone1', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('ScrollDone1');
            });
        }
    };
});
app.directive('upScrollDone2', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('ScrollDone2');
            });
        }
    };
});
app.directive('upScrollDone3', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('ScrollDone3');
            });
        }
    };
});
app.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $('[data-toggle=tooltip]').hover(function () {

                // on mouseenter
                $(this).tooltip('show');
            }, function () {
                // on mouseleave
                $(this).tooltip('hide');
            });
        }
    };
});

app.directive('menurepeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('NavCollapse');
            });
        }
    };
});

app.directive('repeatAlbum', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('NavAlbum');
            });
        }
    };
});
app.directive('modalHeightFind', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('modalHeightFindCount');
            });
        }
    };
});
app.directive('findHeightQuestionPaperShowBox', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('findHeightQuestionPaperShowBoxCount');
            });
        }
    };
});
app.directive('findHeightQuestionMarksEntry', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('findHeightQuestionMarksEntryCount');
            });
        }
    };
});


app.directive('repeatGallery', function ($timeout) {

    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('NavGallery');

            });
        }
    };
});
app.directive('repeatEmployeeBirthdayDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('EmployeeBirthday');

            });
        }
    };
});
app.directive('repeatEmployeeBirthdayWeekDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('EmployeeBirthday');

            });
        }
    };
});
app.directive('repeatEmployeeBirthdayMonthDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('EmployeeBirthday');

            });
        }
    };
});
app.directive('repeatStudentBirthdayDone', function ($timeout) {

    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('StudentBirthday');

            });
        }
    };
});
app.directive('repeatStudentBirthdayWeekDone', function ($timeout) {

    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('StudentBirthdayWeek');

            });
        }
    };
});
app.directive('repeatStudentBirthdayMonthDone', function ($timeout) {

    return function (scope) {
        if (scope.$last) {
            $timeout(function () {

                scope.$emit('StudentBirthdayMonth');

            });
        }
    };
});
app.directive('allowOnlyNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9]+/g, '')
                $input.val(value);
                
                scope.$applyAsync();
                console.log(event.which)
                if (event.which == 64 || event.which == 16) {
                    // to allow numbers
                    removeToolTip($input);
                    return false;
                } else if (event.which >= 48 && event.which <= 57) {
                    // to allow numbers
                    removeToolTip($input);
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // to allow numpad number
                    removeToolTip($input);
                    return true;
                } else if ([8, 9, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // to allow backspace, tab, enter, escape, arrows
                    removeToolTip($input);
                    return true;
                }
                else {
                    event.preventDefault();
                    // to stop others
                    addToolTip($input, "Sorry, only numbers allowed.");
                    return false;
                }
            });
        }
    }
});
app.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                $input.val(value);
                scope.$applyAsync();
                if (event.which == 64 || event.which == 16) {
                    // numbers
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});
app.directive('allowOneDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keyup', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '');
                if (value.split('.').length > 1)
                    value = (value.split('.')[1]).length > 1 ? (value.split('.')[0]) + '.' + (value.split('.')[1]).substr(0, 1) : value;
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                $input.val(value);
                scope.$applyAsync();
                if (event.which == 64 || event.which == 16) {
                    // numbers
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110, 9].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows,tab
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});

app.directive('allowTwoDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keyup', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                if (value.split('.').length > 1)
                    value = (value.split('.')[1]).length > 2 ? (value.split('.')[0]) + '.' + (value.split('.')[1]).substr(0, 2) : value;
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                $input.val(Number(value));
                scope.$applyAsync();
                if (event.which == 64 || event.which == 16) {
                    // numbers
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110,9].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows,tab
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});
app.directive('twoDecimalPlace', function () {
    return {
       
        require: 'ngModel',
        scope: true,
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('blur', function (event) {
                
                var currValue = ctrl.$modelValue;
                var newValue = Number(currValue);
                ctrl.$setViewValue(isNaN(newValue.toString()) ? newValue : newValue.toString());
                ctrl.$render();
                event.preventDefault();
                scope.$applyAsync(); // needed if other parts of the app need to be updated
            });
        }
    };
});

app.directive('addPageBreakCheckHp', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('addPageBreakCheckHpRun');
            });
        }
    };
});
app.directive('validateEmailId', function () {
    return {

        require: 'ngModel',
        scope: true,
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('blur', function (event) {
                
                var currValue = ctrl.$modelValue;
                var control = ctrl.$$element[0];
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (currValue == "" || filter.test(currValue)) {
                    removeToolTip($(control));
                        return true;
                    }
                    else {
                    addToolTip($(control), "Please fill correct e-mail address!");
                    return false;

                }
                

                ctrl.$render();
                event.preventDefault();
                scope.$applyAsync(); 
            });
        }
    };
});

app.directive('validateMobileNo', function () {
    return {

        require: 'ngModel',
        scope: true,
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('blur', function (event) {

                var currValue = ctrl.$modelValue;
                var control = ctrl.$$element[0];
                var filter = /^\d{10}$/;
                if (currValue == "" || filter.test(currValue)) {
                    removeToolTip($(control));
                    ctrl.$render();
                    event.preventDefault();
                    scope.$applyAsync();
                    return true;
                }
                else {
                    addToolTip($(control), "Please enter vaild Mobile No.!");
                    ctrl.$render();
                    event.preventDefault();
                    scope.$applyAsync();
                    return false;

                }



            });
        }
    };
});

app.directive('validateNumbersOnly', function () {
    return {

        require: 'ngModel',
        scope: true,
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('change', function (event) {
                debugger
                var currValue = ctrl.$modelValue;
                var control = ctrl.$$element[0];
                var filter = /^\d$/;
                if (currValue == "" || filter.test(currValue)) {
                    removeToolTip($(control));
                    return true;
                }
                else {
                    ctrl.$modelValue = "";
                    addToolTip($(control), "Please enter numbers only!");
                    return false;

                }


                ctrl.$render();
                event.preventDefault();
                scope.$applyAsync();
            });
        }
    };
});

app.filter('trustUrl', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
});

app.directive('uploadFiles', function () {
    return {
        scope: true,        //create a new scope  
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element  
                for (var i = 0; i < files.length; i++) {
                    //emit event upward  
                    scope.$emit("seletedFile", { file: files[i] });
                }
            });
        }
    };
});  


app.controller('myController', function ($scope, $element, $sce, $timeout, $interval, $filter, $http, $compile, $window, myService, $q)
{

    $scope.WorkingSessionId = sessionId;
    $scope.LoginAs = (isSchool ? 'School' : isCollege ? 'College' : null);
    $scope.DashBoardLogo = sessionStorage.getItem('DashBoardLogo');
    $scope.DashBoardLogoSmall = sessionStorage.getItem('DashBoardLogoSmall');
    //debugger
    $scope.ModuleIcon = "fa-cog fa-spin";
    $scope.DisplayCode = displayCode;
    $scope.SchoolName = schoolName;
    $scope.SocietyName = societyName;
    $scope.SchoolAddress = schoolAddress;
    $scope.AcademicSession = academicSession;
    $scope.FinancialYear = financialYear;
    $scope.LastLogin = lastlogin;
    $scope.ProfileName = profileName;
    $scope.Designation = designation;

    $scope.Logo = branchLogo;

    $scope.Virson = "1.1";
    //$scope.Address = "";
    //$scope.ContactNo = "";
    //$scope.Email = "";
    //$scope.Name = "";
    //$scope.UserName = "";
    //$scope.LastLogin = "";
    $scope.HideStudentList = function (val) {
        setTimeout(function () {
            if (document.querySelectorAll(".show").length > 0) {
                document.getElementById("FeeStuListOnOff").classList.toggle("show")
            }
        }, 200);
    }

    $scope.SearchStudents = function () {
        //debugger
        $scope.SearchText = "";
        document.getElementById("FeeStuListOnOff").classList.toggle("show");
    }

    $scope.HideExpandList = function (val) {
        setTimeout(function () {
            if (document.querySelectorAll(".show").length > 0) {
                document.getElementById(val).classList.toggle("show")
            }
        }, 200);
    }

    $scope.ShowCollapsedList = function (val) {
        //debugger
        $scope.SearchText = "";
        document.getElementById(val).classList.toggle("show");
    }

    //$scope.HideBillList = function (val) {
    //    //debugger;
    //    setTimeout(function () {
    //        //debugger
    //        var bl = document.getElementById(val);
    //        if (document.querySelectorAll(".show").length > 0) {
    //            //debugger
    //            bl.classList.toggle("show")
    //        }
    //    }, 200);
    //}

    //$scope.SearchBillNo = function (val) {
    //    debugger
    //    $scope.SearchBillText = "";
    //    document.getElementById(val).classList.toggle("show");
    //}

    $scope.setStudentName = function (student) {

        $scope.SearchText = student.Name;
        $scope.StudentCode = student.StudentCode;
        $scope.StudentName = student.Name;
        $scope.StudentId = student.StudentId;
        $scope.AdmissionNo = student.AdmissionNo;
        $scope.ClassName = student.ClassName;
        $scope.BranchName = student.BranchName;
        $scope.SectionName = student.SectionName;
        $scope.GuardianAddress = student.GuardianAddress;
        $scope.FatherName = student.FatherName;
        $scope.MotherName = student.MotherName;
        $scope.FatherContactNo = student.FatherContactNo;
        $scope.AdmissionFormNo = student.AdmissionFormNo;
        $scope.InstituteRollNo = student.InstituteRollNo;
        $scope.StudentPhoto = student.StudentPhoto;
        $scope.AcademicSess = student.AcademicSession;
        $scope.AcademicSessionId = student.AcademicSessionId;
        $scope.HideStudentList();
        $scope.HideBillList();
        //if (sessionId == $scope.AcademicSessionId) {
        //    $scope.GetSessionYear();
        //}
        //else {
        //    $scope.GetAcademicSession();
        //}
        $scope.$applyAsync();
    }

    $scope.ddlCheckAll = function (ModelList, filter, repeatinlist, i) {
        if (filter != null && filter != "" && repeatinlist==null) {
            $.each($filter('filter')($scope[ModelList], filter), function (index, array) {
                if (array.hasOwnProperty('IsActive')) {
                    if (array.IsActive == true)
                        array.chk = true;
                    else
                        array.chk = false;
                }
                else {
                    array.chk = true;
                }
            })
        }
        else if (repeatinlist != null) {
            var l1 = $scope[repeatinlist];
            var l2 = l1[i]
            var l3 = l2[ModelList]
            $.each(l3, function (index, array) {
                if (array.hasOwnProperty('IsActive')) {
                    if (array.IsActive == true)
                        array.chk = true;
                    else
                        array.chk = false;
                }
                else {
                    array.chk = true;
                }
            })
        }
        else {
            $.each($scope[ModelList], function (index, array) {
                if (array.hasOwnProperty('IsActive')) {
                    if (array.IsActive == true)
                        array.chk = true;
                    else
                        array.chk = false;
                }
                else {
                    array.chk = true;
                }
            })
        }
        //$scope[ModelList].chk=true
    }

    $scope.ddlUnCheckAll = function (ModelList, repeatinlist, i) {
        if (repeatinlist != null) {
            var l1 = $scope[repeatinlist];
            var l2 = l1[i]
            var l3 = l2[ModelList]
            $.each(l3, function (index, array) {
                array.chk = false
            })
        }
        else {
            $.each($scope[ModelList], function (index, array) {
                array.chk = false
            })
        }
       
    }

    $scope.openUserNameList = false;

    $scope.ToogleDDL = function (id, model) {
        $(document).on('click', function (e) {
            if ($(e.target).closest("#" + id).length === 0) {
                $scope[model] = false;
                $scope.$applyAsync();
            }
        });
    }

    $scope.GetCount = function (list, initcap) {
        $scope.count = 0;
        $scope.return = initcap;
        if (typeof (list) === 'undefined') return $scope.return;
        $.each(list, function (index, array) {
            if (array.chk == true)
                $scope.count = $scope.count + 1
        });
        if ($scope.count > 0)
            $scope.return = $scope.count + " Selection";
        return $scope.return;
    }

    $scope.IsToday = function (someDate) {
        const today = new Date()
        return new Date(someDate).getDate() == today.getDate() &&
            new Date(someDate).getMonth() == today.getMonth() &&
            new Date(someDate).getFullYear() == today.getFullYear()
    }

    $scope.FilterToggle = function () {
       $(".section-toggle").slideToggle('slow');
        $(".filter-toggle").toggleClass("open");
    };
    $scope.$on('DashBoardEnquiryFormList', function () {
   
        var table1 =$("#example1").DataTable({
            realtime: true,
            responsive: false,
            "retrieve": true,
            "searching": true,
            "bDestroy": true,
            "scrollX": true,
            "iDisplayLength": -1,
            "lengthMenu": [[-1], ["All"]]
        });

        //Apply the search
        table1.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });

    $scope.$on('DashBoardEnquiryFollowUpsList', function () {
        var table2 = $("#example2").DataTable({
            realtime: true,
            responsive: false,
            "retrieve": true,
            "searching": true,
            "bDestroy": true,
            "scrollX": true,
            "iDisplayLength": -1,
            "lengthMenu": [[-1], ["All"]]
        });

        //Apply the search
        table2.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });
    $scope.$on('TodayDueFollowups', function () {
        var table3 = $("#example3").DataTable({
            "searching": true
        });

        //Apply the search
        table3.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });
    $scope.$on('TotalDueFollowupList', function () {

        var table4 = $("#example4").DataTable({
            "searching": true,
        });

        //Apply the search
        table4.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });
    $scope.$on('TotalClosedEnquiry', function () {
        var table5 = $("#example5").DataTable({
            "searching": true,
        });

        //Apply the search
        table5.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });

    $scope.$on('TotalTransferedEnquiry', function () {
        var table6 = $("#example6").DataTable({
            "searching": true,
        });

        //Apply the search
        table6.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
    });
    $scope.showModuleIcon = function () {
        $('.spinner', window.parent.document).show(0);
        $scope.$applyAsync();
    }

    $scope.Sumoflist = function (list, text, filterlist, minfrac) {
        if (typeof ($scope[list]) !== 'undefined') {
            $scope.List = $scope[list];
            if (minfrac == null)
                minfrac = 2;
            if (filterlist != null) {
                $scope.FilterList = $filter('filter')($scope.List, filterlist, true);
                return $scope.FilterList.sum(text, minfrac);
            }
            else {
                return $scope.List.sum(text, minfrac);
            }
        }
        else {
            if (!Array.isArray(list)) return;
            $scope.List = list;
            if (minfrac == null)
                minfrac = 2;
            if (filterlist != null) {
                $scope.FilterList = $filter('filter')($scope.List, filterlist, true);
                return $scope.FilterList.sum(text, minfrac);
            }
            else {
                return $scope.List.sum(text, minfrac);
            }
        }
        
    }

    $scope.JoinArray = function (array, key, seprator, filterkey, filtervalue) {
        var returnstr = $.map(array, function (obj) {
            if (filterkey != "" && filterkey != null && filtervalue != "" && filtervalue != null) {
                if (obj[filterkey] == filtervalue)
                    return obj[key]
            }
            else {
                return obj[key]
            }
        }).join(seprator);

        return returnstr;
    }

    //$scope.ConvertToTwoDecimalPoint = function (amount) {
    //    return $scope.checkNaN(amount).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //}

    $scope.checkNaN = function (amount) {
        if (isNaN(amount))
            return 0;
        else
            return Number(amount)
    }
    $scope.trustAsHtml = function (html) {
        if (html != null)
            html = html.toString();
        return $sce.trustAsHtml(html);
    };

    $scope.ConverToDate = function (date, format) {
        return moment(date).format(format);
    };

    $scope.ConverDate = function (date) {
        if (date != undefined && date!=null)
        return new Date(date);
    };
    $scope.ConvertDate = function (date) {
        return $scope.ConverDate(date)
    };

    $scope.startDate;
    $scope.endDate;
    $scope.TodayDate;
    $scope.SetMaxMinDate = function () {
        return Promise.resolve($scope.TodayDate).then(async function () {
            if (sessionStorage.getItem("sessionStartDate") == null) {
                var collectionobj = {};

                collectionobj.Action = 4;
                collectionobj.GroupCode = groupCode;
                collectionobj.SocietyCode = societyCode;
                collectionobj.SchoolCode = schoolCode;
                collectionobj.BranchCode = branchCode;
                collectionobj.SessionId = sessionId;
                collectionobj.FYId = fyId;
                var getUserDetails = myService.methode('POST', '../api/GetMasterApi/GetSessionMinMaxDate', collectionobj);
                await getUserDetails.then(function (response) {

                    $scope.startDate = response.data[0].FromDate;
                    $scope.endDate = response.data[0].ToDate;
                    if (new Date() > new Date($scope.endDate))
                        $scope.TodayDate = new Date($scope.endDate.split('-')[2] + '-' + $scope.endDate.split('-')[1] + '-' + $scope.endDate.split('-')[0]);
                    else
                        $scope.TodayDate = new Date();
                    $scope.FromDate = new Date(moment(response.data[0].FromDate, 'DD-MMM-YYYY'));
                    $scope.ToDate = $scope.TodayDate;

                    $scope.startDate = moment($scope.FromDate).format('YYYY-MM-DD');
                    $scope.endDate = moment($scope.ToDate).format('YYYY-MM-DD');

                    sessionStorage.setItem("sessionTodayDate", $scope.TodayDate);
                    sessionStorage.setItem("sessionStartDate", $scope.startDate);
                    sessionStorage.setItem("sessionEndDate", $scope.endDate);
                });
            }
            else {

                $scope.startDate = sessionStorage.getItem("sessionStartDate");
                $scope.endDate = sessionStorage.getItem("sessionEndDate");
                $scope.TodayDate = new Date(sessionStorage.getItem("sessionTodayDate"));
            }

            return $scope.TodayDate;
        });
    }

    

    $scope.Color = [];
    $scope.SetColor = function (sessionvalue) {
        //alert(sessionId)
        //alert(sessionvalue)

        if (sessionvalue == sessionId) {
            $scope.Color[sessionvalue] = 'Green';
        }
        else {
            $scope.Color[sessionvalue] = "White";
        }

    }



    $scope.numbersOnly = function (value) {
        $scope.number = value.replace(/\D+/g, '');
        return $scope.number;
    }

    $scope.decimalOnly = function (value) {
        $scope.number = value.replace(/[^\d\.*]+/g, '');
        return $scope.number;
    }

    $scope.GetTodayDate = function () {
        return new Date();
    }

    $scope.Logout = function () {
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("schoolCode");
        sessionStorage.removeItem("branchCode");
        sessionStorage.removeItem("sessionId");
        sessionStorage.removeItem("fyId");
        sessionStorage.removeItem("loginTypeId");
        sessionStorage.removeItem("code");
        window.top.location.href = '../Login/Login';
    };

    //$(document).ready(function () {
    //    var getUserDetails = myService.methode('POST', '../DashBoard/GetUserDetails', '{userid:' + JSON.stringify(userid) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}');
    //    getUserDetails.then(function (response) {
    //        if (response.data.length > 0) {
    //            $scope.BindSession();
    //            $scope.Address = response.data[0].Address;
    //            $scope.ContactNo = response.data[0].ContactNo;
    //            $scope.Designation = response.data[0].Designation;
    //            $scope.Email = response.data[0].Email;
    //            $scope.AccessorName = response.data[0].Name;
    //            $scope.UserName = response.data[0].UserName;
    //            $scope.LastLogin = lastlogin;

    //            if ($scope.Code == null || $scope.Code == 'undefined' || $scope.Code == '') {
    //                $scope.Code = response.data[0].Code;
    //            }

    //            if (response.data[0].Code == 1) {
    //                $scope.viewStatus = false;
    //            }
    //            else { $scope.viewStatus = true; }

    //            if (sessionStorage.getItem("code") == null)
    //                sessionStorage.setItem("code", $scope.Code);

    //            $scope.PhotoPath = response.data[0].PhotoPath;
    //            $scope.Department = response.data[0].Department;
    //            $scope.DateofJoining = response.data[0].DateofJoining;
    //            $scope.BindNotificationbehaveOfStudentCode();
    //        }
    //    });
    //});

    $scope.ChangeSession = function (sessionvalue, SessionName) {


        sessionStorage.setItem('sessionId', sessionvalue);
        sessionStorage.setItem('academicSession', SessionName);
        sessionStorage.setItem('financialYear', SessionName);

        window.location.href = '../DashBoard/QuickLinksDashBoard';
    };

    $scope.BindSession = function () {

        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.LoginId = loginTypeId;
        var getData = myService.methode('POST', "../GuardianDashBoard/GetSession", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.SessionList = response.data;
            $.each(response.data, function (i, val) {

                if (sessionId == val.SessionId) {
                    $scope.AcademicSession = response.data[i].SessionName;
                }
                else
                    if (val.IsActive == 1) {
                        $scope.AcademicSession = response.data[i].SessionName;

                    }
            })
        });


    };

    //$scope.VedioEndResponse = function () {
    //   
    //    alert('sss');
    //    var collectionobj = {};
    //    collectionobj.schoolCode = schoolCode;
    //    collectionobj.schoolCode = schoolCode;
    //    collectionobj.branchCode = branchCode;
    //    collectionobj.sessionId = sessionId;

    //    collectionobj.TransId = TransId;
    //    collectionobj.IsApproved = 1;
    //    collectionobj.Action = 25;

    //    var getData = myService.methode('POST', "../Homework/UpdateHomeworkApprove", '{obj:' + JSON.stringify(collectionobj) + '}');
    //    getData.then(function (response) {
    //        if (JSON.stringify(response.data == 2)) {
    //            showMsgBox('999', 'Success', 'Thanks for  Watching Vedio', 'success', 'btn-success');

    //        }
    //    });
    //}

    $scope.PrintForm = function (print, title) {

        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        var head = '<html><head><title>' + title + '</title><meta charset="utf-8" /><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()" class="dt-print-view">' + print + '</body></html>';
        popupWin.document.write(head);
        popupWin.document.close();
    }

    $scope.PrintMasterHeader = function () {
        var reportHeader = $('.ReportHeader');
        var div = $('<div><div class="ReportHeader" style="font-size:' + fontSize + '">' + reportHeader.html() + '</div></div>');
        //var tab = $('<table class="table p-table header-bg1"> </table>');
        //var tbody = $('<tbody></tbody>');
        //var trow = $('<tr></tr>');
        //trow.append('<td class="no-b"> <div class="detail-box"> <div class="school-name">BSN Infotech Pvt. Ltd.</div><div class="school-address"><i class="icofont-bank-alt"></i> 40-A, S-201, IInd Floor, Corner Market Malviya Nagar Delhi-110075</div><div class="school-contact"><i class="icofont-telephone"></i> +91-9999-666-555, +91-8888-444-222</div><div class="school-email"> <i class="icofont-envelope"></i> info_delhi@bsninfotech.net</div></div></td>');
        //trow.append('<td width="115px" class="no-b"> <div class="logo-box"> <img src="../Content/plugins/login/images/RSYSIC-logo.png" /> </div></td>');
        //tbody.append(trow);
        //tab.append(tbody);
        //div.append(reportHeader);
        return div;
    }

    $scope.PrintMaster = function (tblheader, data, title) {
       var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = "0"; i < l; i++) {
            var val = tblheader[i]
            // Append header here
            theadrow.append('<th>' + val.HeaderText + '</th>');
        }

        thead.append(theadrow);

        tab.append(thead);
        var tbody = $('<tbody></tbody>');
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) { value = "" }
                if (key == "Id" || key == "#") {
                    trow.append('<td>' + (i + 1) + '</td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        trow.append('<td><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td>' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                    }
                }
            });
            tbody.append(trow);
        });
        tab.append(tbody);
        var div = $('<div class="col-lg-12"></div>');
        var h1 = $('<h1>' + title + '</h1>');
        div.append(h1);
        div.append(tab);
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        var table = div.html();
        var head = '<html><head><title>' + title + '</title><meta charset="utf-8" /><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()" class="dt-print-view">' + $scope.PrintMasterHeader().html() + '' + table + '</body></html>';
        popupWin.document.write(head);
        popupWin.document.close();
    };

    $scope.PrintChildMaster = function (tblheader, data, title) {

        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');

        var l = tblheader.length;
        for (var i = "0"; i < l; i++) {
            var val = tblheader[i]
            // Append header here
            theadrow.append('<th>' + val.HeaderText + '</th>');
        }

        thead.append(theadrow);

        tab.append(thead);
        var tbody = $('<tbody></tbody>');
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) { value = "Sorry No Data Found!" }
                if (key == "Id" || key == "#") {
                    trow.append('<td>' + (i + 1) + '</td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        trow.append('<td><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td>' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                    }
                }
            });
            tbody.append(trow);
        });
        tab.append(tbody);
        var div = $('<div class="col-lg-12"></div>');
        var h1 = $('<table class="table p-table "><tr><td><h4>' + title + '<h4></td></tr></table>');
        div.append(h1);
        div.append(tab);
        var table = div.html();
        return table;
    };

    $scope.PrintNestedMaster = function (tblheader, data, title, tblnheader, ndata) {

        var tab = $('<table id="example" class="table compact table-hover table-striped table-bordered nowrap" ></table>');
        var thead = $('<thead></thead>');
        var theadrow = $('<tr></tr>');
        var tbody = $('<tbody></tbody>');
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) { value = "Sorry No Data Found!" }
                if (key == "Id" || key == "#") {
                    trow.append('<td>' + (i + 1) + '</td>');
                }
                else {
                    if (val.ImageColumn == "Yes") {
                        trow.append('<td><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                    }
                    else {
                        trow.append('<td>' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                    }
                }
            });
            tbody.append(trow);
        });
        var trow = $('<tr></tr>');
        trow.append('<td>' + $scope.PrintChildMaster(tblnheader, ndata, '') + '</td>');
        tbody.append(trow);

        tab.append(tbody);
        var div = $('<div class="col-lg-12"></div>');
        var h1 = $('<table class="table p-table "><tr><td><h4>' + title + '<h4></td></tr></table>');
        div.append(h1);
        div.append(tab);
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        var table = div.html();
        var head = '<html><head><title>' + title + '</title><meta charset="utf-8" /><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()">' + $scope.PrintMasterHeader().html() + '' + table + '</body></html>';
        popupWin.document.write(head);
        popupWin.document.close();
    };

    $scope.Print2ndMaster = function (tblheader, data, title) {

        var tab = $('<table    ></table>');
        var tbody = $('<tbody></tbody>');
        $.each(data, function (i, obj) {
            var trow = $('<tr></tr>');
            $.each(tblheader, function (j, val) {
                var key = val.HeaderValue;
                var value = obj[key];
                if (value == 'undefined' || value == null) {
                }
                else {
                    if (key == "Id" || key == "#") {
                        trow.append('<td>' + (i + 1) + '</td>');
                    }
                    else {
                        if (val.ImageColumn == "Yes") {
                            trow.append('<td><img src="../' + ((value == null || value == "") ? '../content/photos/default-user.png' : value) + '" width="50px" height="50px"></td>');
                        }
                        else {
                            trow.append('<td>' + (typeof (value) == 'boolean' ? (value == true ? "Yes" : "No") : Replace(value)) + '</td>');
                        }
                    }

                }


            });
            tbody.append(trow);
        });
        tab.append(tbody);
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        var table = tab.html();
        var head = '<html><head><title>' + title + '</title><meta charset="utf-8" /><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()">' + table + '</body></html>';
        popupWin.document.write(head);
        popupWin.document.close();
    };

    $scope.Print = function (title) {

        if (title == null)
            title = "Ledger Voucher";
        var print = $('#printDiv').html();
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        var head = '<html><head><title>' + title + '</title><meta charset="utf-8" /><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /></head><body onload="window.print()" style="background:#fff;">' + print + '</body></html>';
        popupWin.document.write(head);
        setTimeout(function () { popupWin.document.close(); }, 500);
    }
    $scope.PrintVoucher = function (transid, vouchertype) {
        var collectionobj = {};
        collectionobj.Action = 6;
        collectionobj.FYId = fyId;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.VoucherType = vouchertype;
        collectionobj.TransId = transid;

        var getData = myService.methode('POST', "../Api/AccountTransactionApi/GetLedgerVoucher", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                $scope.VoucherType = response.data[0].VoucherType;
                $scope.VoucherNo = response.data[0].VoucherNo;
                $scope.VDate = response.data[0].VDate;
                $scope.VNarr = response.data[0].VoucherNarr;
                $scope.VoucherType = response.data[0].VoucherType;
                $scope.CNCD = response.data[0].CNCD;
                $scope.ChqDate = response.data[0].ChqDate;
                $scope.V_Type = response.data[0].V_Type;
                $scope.ChqNo = response.data[0].ChqNo;
                $scope.VoucherDetailData = response.data
                $scope.totalDrAmt = (Number($scope.VoucherDetailData.sum('DrAmt'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 });
                $scope.totalCrAmt = (Number($scope.VoucherDetailData.sum('CrAmt'))).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 });

                $scope.MergerdCode = $scope.totalDrAmt.split('.');
                $scope.InWords = convertNumberToWords($scope.MergerdCode[0]) + " Rupees";

                if (Number($scope.MergerdCode[1]) != Number(0))
                { $scope.InWords += " and " + convertNumberToWords($scope.MergerdCode[1]) + " Paisa"; }

                $scope.InWords += " Only.";


                setTimeout(function () { $scope.Print(); }, 2000);
            }

        })
    };
    $scope.GetVoucherNoLibList = function (SubAction) {
        //debugger
        var collectionobj = {};
        collectionobj.Action = 8;
        collectionobj.SubAction = SubAction;
        collectionobj.SessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        var getData = myService.methode('POST', '../Api/LibraryTransactionApi/GetVoucherNoLibList', collectionobj);
        getData.then(function (response) {
            //debugger
            if (response.data.length > 0) {
                $scope.PVNo = response.data[0].PVNo;
            }
        });
    }
    //$scope.NavMenu = function () {
    //    $(document).ready(function () {
    //        $scope.collectionobj = {};
    //        $scope.collectionobj["LoginId"] = JSON.parse(userid);
    //        $scope.collectionobj["BranchCode"] = branchCode;
    //        $scope.collectionobj["SchoolCode"] = schoolCode;
    //        $scope.collectionobj["SessionId"] = sessionId;

    //        var getData = myService.methode('POST', '../DashBoard/NavMenuList', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
    //        getData.then(function (response) {
    //            $scope.ModuleList = response.data;
    //        });
    //    });
    //};

    //$scope.MenuDataSet = [];
    //$scope.MenuList = [];
    //$scope.GetModule = function () {
    //    $scope.facog = true;
    //    $scope.collectionobj = {};
    //    $scope.collectionobj["LoginId"] = JSON.parse(userid);
    //    $scope.collectionobj["BranchCode"] = branchCode;
    //    $scope.collectionobj["SchoolCode"] = schoolCode;
    //    $scope.collectionobj["SessionId"] = sessionId;

    //    var getData = myService.methode('POST', '../DashBoard/GetNavMenu', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
    //    getData.then(function (response) {
    //        $scope.MenuDataSet = response.data;
    //        $scope.ModuleList = $scope.MenuDataSet.Table;
    //        $scope.facog = false;
    //        $scope.$applyAsync();
    //        //alert(JSON.stringify(response.data));
    //    });
    //};
    //$scope.GetMenu = function (ModuleId, ModuleName, ModuleIcon, isCallingFromParent) {
    //    if (isCallingFromParent == 1) {
    //        $scope.parentScope = $window.parent.angular.element($window.frameElement).scope();

    //        $scope.parentScope['ModuleIcon'] = ModuleIcon;
    //        $scope.parentScope['ModuleTextName'] = ModuleName;
    //        $scope.parentScope['MenuList'] = $filter('filter')($scope.parentScope['MenuDataSet'].Table1, { ModuleId: ModuleId }, true);

    //        $scope.parentScope.$applyAsync();
    //    }
    //    else {
    //        $scope.ModuleIcon = ModuleIcon;
    //        $scope.ModuleTextName = ModuleName;
    //        $scope.MenuList = $filter('filter')($scope.MenuDataSet.Table1, { ModuleId: ModuleId }, true);
    //    }
    //};
    //$scope.GetSubMenu = function (MenuId, index) {
    //    if (index != null)
    //        $scope.MenuList[index].SubMenuList = $filter('filter')($scope.MenuDataSet.Table2, { MenuId: MenuId }, true);
    //    else
    //    {
    //        $scope.facog = true;
    //        $scope.collectionobj = {};
    //        $scope.collectionobj["LoginId"] = JSON.parse(userid);
    //        $scope.collectionobj["BranchCode"] = branchCode;
    //        $scope.collectionobj["SchoolCode"] = schoolCode;
    //        $scope.collectionobj["SessionId"] = sessionId;

    //        var getData = myService.methode('POST', '../DashBoard/GetNavMenu', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
    //        getData.then(function (response) {
    //            $scope.SubMenuList = response.data.Table;
    //            $scope.$applyAsync();
    //        });
    //    }
    //};

    $scope.SetFocus = function (id, checkvalidation, duration) {

        if (duration == null || Number(duration) === false)
            duration = 1100;

        $timeout(function () {
            $(id).focus();
            if (checkvalidation === true) {
                isValidate();
            }
            if (checkvalidation === false) {
                RemoveRedValidate();
            }
        }, duration);
    };

    $scope.$on('NavCollapse', function () {

        var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
        var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
        $(document).on("click", sidebarNavAnchor, function (e) {
            if ($(this).attr('aria-expanded') === "false")
                $(this).blur();
            $(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
        });
    });

    $scope.$on('StudentBirthday', function () {
        $('#birthdaysliderstart').multislider({
            // endless scrolling
            continuous: true,

            // slide all visible slides, or just one at a time
            slideAll: false,

            // autoplay interval  // 0 or 'false' prevents auto-sliding
            interval: 2000,

            // duration of slide animation
            duration: 2000,

            // pause carousel on hover
            hoverPause: true,

            // pause above specified screen width
            pauseAbove: null,

            // pause below specified screen width
            pauseBelow: null

        });
    });
    $scope.$on('StudentBirthdayWeek', function () {
        $('.autohide-scroll-tab-dashboard').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab'
        });
    });
    $scope.$on('StudentBirthdayMonth', function () {
        $('.autohide-scroll-tab-dashboard').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab'
        });
    });

    $scope.$on('EmployeeBirthday', function () {

        $('#birthdaysliderstart2').multislider({
            continuous: true,
            slideAll: false,
            interval: 2000,
            duration: 2000,
            hoverPause: true,
            pauseAbove: null,
            pauseBelow: null

        });
    });
    $scope.$on('EmployeeBirthdayWeek', function () {
        $('.autohide-scroll-tab-dashboard').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab'
        });
    });
    $scope.$on('EmployeeBirthdayMonth', function () {
        $('.autohide-scroll-tab-dashboard').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab'
        });
    });

    $scope.$on('ScrollDone1', function () {
        $("#topscroll1").bootstrapNews({
            newsPerPage: 6,
            autoplay: false,
            pauseOnHover: true,
            direction: 'up',
            newsTickerInterval: 2000,
            onToDo: function () {
                //console.log(this);
            }
        });
    });


    $scope.$on('addPageBreakCheckHpRun', function () {

        $(function () {
            var cls = document.querySelectorAll('.voucher-layout');

            for (var i = 1; i < cls.length; i++) {

                //cls[i].style.display = 'none';
                var fid = "#VoucherID" + i;
                var voucherheight = $(fid).height();
                if (voucherheight >= 522) {
                    $(fid).parent().parent().append("<p class='page-b page-b-after'>&nbsp;</p>");
                }
                else {

                    if ((i % 2 == 0) && (i > 1)) {
                        $(fid).parent().parent().append("<p class='page-b page-b-after'>&nbsp;</p>");
                    }
                }
            }
            //$(".voucher-layout").each(function () {
            //    $(this).html("Found this one");
            //});
        });
    });

    $scope.$on('allCircularList-init', function () {
        var InW = $(window).width();
        var InH = $(window).height();

        if (InW > 640) {
            var setH = InH - 144 //180
            var itemContainer = $(".circular-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else if ((InW <= 640) && (InW > 480)) {
            var setH = InH - 144  //180

            var itemContainer = $(".circular-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else if ((InW <= 480) && (InW >= 412)) {
            var setH = InH - 144  //180
            var itemContainer = $(".circular-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else {
            var setH = InH - 144  //180
            var itemContainer = $(".circular-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
    });

    $scope.$on('allStartCompetitionListAction', function () {
        
        var InH1 = $(window).height();
        var popupH = InH1 - 10;
        //alert($('.StartCompetitionOuterBox').find('.StartCompetitionFBGBox').length);
        $('.StartCompetitionOuterBox').find('.StartCompetitionMainBox').css({ "height": popupH });
        $('.StartCompetitionOuterBox').find('.StartCompetitionFBGBox').css({ "height": popupH });
        $('.StartCompetitionFBGBox').find('.SC-FBG-Cell').css({ "height": popupH - 20 });
        $('.StartCompetitionOuterBox').find('.StartCompetitionContentBox').css({ "height": popupH - 294 });
        

    });

    $scope.$on('conversationMemberList-init', function () {
        var InW = $(window).width();
        var InH = $(window).height();

        if (InW > 640) {
            var setH = InH - 172  //180
            var itemContainer = $(".msg-box-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });
            $('.threadList-scroll').css({ "height": (InH - 172) });
        }
        else if ((InW <= 640) && (InW > 480)) {
            var setH = InH - 172  //180

            var itemContainer = $(".msg-box-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });
            $('.threadList-scroll').css({ "height": (InH - 172) });
        }
        else if ((InW <= 480) && (InW >= 412)) {
            var setH = InH - 172  //180
            var itemContainer = $(".msg-box-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });
            $('.threadList-scroll').css({ "height": (InH - 172) });
        }
        else {
            var setH = InH - 172  //180
            var itemContainer = $(".msg-box-list-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });
            $('.threadList-scroll').css({ "height": (InH - 172) });
        }
    });

    $scope.$on('threadList-init', function () {
        var InW = $(window).width();
        var InH = $(window).height();

        if (InW > 640) {
            var setH = InH - 172  //180
            var itemContainer = $(".threadList-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else if ((InW <= 640) && (InW > 480)) {
            var setH = InH - 172  //180

            var itemContainer = $(".threadList-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else if ((InW <= 480) && (InW >= 412)) {
            var setH = InH - 172  //180
            var itemContainer = $(".threadList-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
        else {
            var setH = InH - 172  //180
            var itemContainer = $(".threadList-scroll");
            itemContainer.slimScroll({ height: setH, size: '4px', color: '#878787', disableFadeOut: true, borderRadius: 0 });

        }
    });


    $scope.$on('bodyDetails-scroll', function () {

        var InW = $(window).width();
        var InH = $(window).height();
        var FinalSetH

        $('.body-details-scorll').css({ "height": 0 });
        var headerHeight = $("#QHeaderHight").height();

        var AddHeight = (isNaN(headerHeight) || headerHeight == null) ? 0 : parseInt(headerHeight);

        if (AddHeight == 0) {
            FinalSetH = $('.body-details-scorll').css({ "height": (InH - 179) });
        }
        else {
            AddHeight = AddHeight - 19;
            FinalSetH = $('.body-details-scorll').css({ "height": (InH - (179 + AddHeight)) });
        }


        var setH = FinalSetH;


        var itemContainer = $(".body-details-scorll");
        var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
        itemContainer.slimScroll({
            scrollTo: scrollTo_int,
            height: setH,
            size: '4px',
            color: '#878787',
            borderRadius: 0,
            start: 'top',
        });

        $(".query-show-body").css({ "height": (InH - (159 + AddHeight)) });
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.$on('slimscroll-init', function () {
        var InW = $(window).width();
        var InH = $(window).height();
        var FinalSetH;

        $('#QueryScrollControl').css({ "height": 0 });
        var headerHeight = $("#QHeaderHight").height();

        var AddHeight = (isNaN(headerHeight) || headerHeight == null) ? 0 : parseInt(headerHeight);

        if (AddHeight == 0) {
            FinalSetH = $('#QueryScrollControl').css({ "height": (InH - 215) });
        }
        else {
            AddHeight = AddHeight - 19;
            FinalSetH = $('#QueryScrollControl').css({ "height": (InH - (215 + AddHeight)) });
        }


        var setH = FinalSetH;


        var itemContainer = $("#QueryScrollControl");
        var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
        itemContainer.slimScroll({

            scrollTo: scrollTo_int,
            height: setH,
            size: '4px',
            color: '#878787',
            borderRadius: 0,
            start: 'bottom',

        });
        $(".query-show-body").css({ "height": (InH - (149 + AddHeight)) });
        //$('#QueryScrollControl').css({ "min-height": (InH - 121) });
        //$('#QueryScrollControl').parent(".slimScrollDiv").css({ "height": (InH - 121) });

    });

    $scope.$on('ScrollDone2', function () {
        $("#topscroll2").bootstrapNews({
            newsPerPage: 6,
            autoplay: false,
            pauseOnHover: true,
            direction: 'up',
            newsTickerInterval: 2000,
            onToDo: function () {
                //console.log(this);
            }
        });
    });
    $scope.$on('ScrollDone3', function () {
        $("#topscroll3").bootstrapNews({
            newsPerPage: 6,
            autoplay: false,
            pauseOnHover: true,
            direction: 'up',
            newsTickerInterval: 2000,
            onToDo: function () {
                //console.log(this);
            }
        });
    });

    $scope.$on('modalHeightFindCount', function () {

        var InW = $(window).width();
        var InH = $(window).height();

        var IfSetHeight;
        if (InW > 1024) {
            IfSetHeight = InH - 55;
            $('#myModal').find('.HomeworkBindBox').css({ "height": IfSetHeight });
            $('#myModal').find('.HomeworkAttachmentView').css({ "height": IfSetHeight - 46 });

            var HAHeight = $('#myModal').find(".AttachmentHomeworkListBox").height();
            IfSetHeight = IfSetHeight - HAHeight - 130;
            $('#myModal').find('#RemarkHeightSet').css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 50;
            $('#myModal').find('.HomeworkBindBox').css({ "height": IfSetHeight });
        }

    });

    $scope.$on('NavAlbum', function () {
        masonryPortfolio();
    });

    $scope.count = "0";

    $scope.$on('NavGallery', function () {
        var lg = $('#main-gallery');
        if (lg.data('lightGallery'))
            lg.data('lightGallery').destroy(true);
        masonryPortfolio();
        lg.lightGallery();

    });
    $scope.SelectIframForNID = function (datapath, TransId, UserId, text) {




        var addurl = datapath + '?NID=' + TransId



        /*Bind Page Tab with Iframe*/

        var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        var HalfID = src.split('/').join('');
        var FinalID = 'MenuNotification' //'menu' + HalfID ;

        $('.nav-item').removeClass('active');
        $('.iframedesign').addClass('iframe-close');
        $('.refresh-box').attr('disabled', true);
        //$('.iframe-box-w-reload-box').addClass('iframe-close');
        /*Bind Page Tab*/
        var iframeTab = '<li class="nav-item active" id="tab' + FinalID + '"><a id="ancor' + FinalID + '" class="nav-link active" onclick="Showtab(\'#' + FinalID + '\');" data-toggle="tab" href="#' + FinalID + '" role="tab">' + TabTitle + '</a><i id="btnrefresh' + FinalID + '" class="pe-7s-refresh-2 fa-spin refresh-box" title="Reload Page" onclick="ReloadBox(\'#' + FinalID + '\');" ></i><i class="icofont-close-line close-box" title="Close Page"  onclick="CloseTab(\'#' + FinalID + '\',\'#tab' + FinalID + '\');" ></i></li>';
        //$(".iframe-wrapper-tab").prepend(iframeTab);
        var falg = true;
        var tablist = $('.iframe-wrapper-tab li');
        $.each(tablist, function () {
            var li = $(this)

            if (li.attr('id') === 'tab' + FinalID) {

                falg = false;
            }
        });
        if (falg) {
            $(iframeTab).insertAfter($('.iframe-wrapper-tab li#tabmenuhomedashboard'));
        }



        if ($('.iframe-wrapper-tab').height() > 30) {
            var LastTab = $('.iframe-wrapper-tab li:last-child').toArray();
            var ShowTab = LastTab[0].outerHTML;



            $(".fixed-tab-menu-sidebar-right .right-side-menu-tab-bind").prepend(ShowTab);




            $('.iframe-wrapper-tab li:last-child').remove();

        }



        //var SideRightLastTab = $('.right-side-menu-tab-bind li:fast-child').toArray();
        //var ShowTab2 = SideRightLastTab[0].outerHTML;
        //$(".iframe-wrapper-tab").append(ShowTab2);


        /*Bind Page Iframe*/

        var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + addurl + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true"></iframe>';

        //var iframe = '<div  id="data' + FinalID + '" class="iframe-box-w-reload-box"><div id="btn' + FinalID + '" class="reload-box"><button  onclick="ReloadBox(\'#' + FinalID + '\');" class="btn btn-primary btn-anim"><i class="mdi mdi-account-off"></i><span class="btn-text">Reload Page</span></button></div><div class="iframe-in-loadpage-box "><iframe id="' + FinalID + '" class="iframedesign " src="' + src + '" rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true"></iframe></div></div>';

        $(".iframe-wrapper").prepend(iframe);
        //$(".iframe-wrapper").append(iframe);
        var InW = $(window).width();
        var InH = $(window).height();

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH - 126;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 132;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        $scope.RemoveSpin(FinalID);
        $scope.ViewNotification(TransId, UserId);
        return false;
    };


    $scope.BindNotificationbehaveOfStudentCode = function () {

        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.Code;
        collectionobj.fyId = fyId;
        collectionobj.loginTypeId = loginTypeId;
        collectionobj.userId = userid;
        var getData = myService.methode('POST', "../GuardianDashBoard/GetNotification", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.AllNotification = response.data;
            var j = 0;
            $.each(response.data, function (i, val) {
                if (response.data[i].Status == 'Mark as Unread') {

                    j = j + 1;
                }
                $('#lblNcount').text(j);
            });

        });
    };
    $scope.ViewNotification = function (TransId, StudentCode) {

        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;

        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.StudentCode = StudentCode;;
        collectionobj.TransId = TransId;
        var getData = myService.methode('POST', "../GuardianDashBoard/ViewNotification", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {

            $scope.BindNotificationbehaveOfStudentCode();
        });
    }

    $scope.BindUnReadNotify = function () {
        $('#LoaderNotice').show();
        var collectionobj = {};
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.SessionId = sessionId;
        collectionobj.StudentCode = $scope.StudentCode;
        collectionobj.fyId = fyId;
        var getData = myService.methode('POST', "../GuardianDashBoard/GetUnReadNotify", '{obj:' + JSON.stringify(collectionobj) + '}');

        getData.then(function (response) {
            $('#lblNcount').text(response.data[0].NCount);
        });
    };

    $scope.setResponse = function (Title, StudentCode, SlotMessage, TransId) {

        var collectionobj = {};
        collectionobj.TransId = TransId;
        collectionobj.StudentCode = StudentCode;
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.ResponseMsg = SlotMessage;
        collectionobj.fyId = fyId;
        var getData = myService.methode('POST', "../GuardianDashBoard/UpdateRevertMsg", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $scope.BindUnReadNotify();
            $scope.BindNotificationbehaveOfStudentCode();

        });
    }
    $scope.responsemsg = function (Title, StudentCode, SlotMessage, TransId, TypeResponse) {

        if (TypeResponse == 1) {
            //swal(Title, "Thanks for Revert Message!", "success",
            Title = 'Thanks for Revert Message!, success'
            swal({
                title: Title,
                text: SlotMessage,
            });
            $scope.setResponse(Title, StudentCode, "Yes", TransId)
        }
        else {
            swal({
                title: Title,
                text: SlotMessage,
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something"
            },
            function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                else {
                    swal("Thanks !", "You Response is : " + inputValue, "success");
                    $scope.setResponse(Title, StudentCode, inputValue, TransId)
                }

            });


        }

    }
    $scope.SelectForIframe = function (datapath, text) {

        /*Bind Page Tab with Iframe*/

        var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        var HalfID = src.split('/').join('');
        var FinalID = 'menu' + HalfID + date;

        $('.nav-item').removeClass('active');
        $('.iframedesign').addClass('iframe-close');
        $('.refresh-box').attr('disabled', true);

        var iframeTab = '<li class="nav-item active" id="tab' + FinalID + '"><a id="ancor' + FinalID + '" class="nav-link active" onclick="Showtab(\'#' + FinalID + '\');" data-toggle="tab" href="#' + FinalID + '" role="tab">' + TabTitle + '</a><i id="btnrefresh' + FinalID + '" class="pe-7s-refresh-2 fa-spin refresh-box" title="Reload Page" onclick="ReloadBox(\'#' + FinalID + '\');" ></i><i class="icofont-close-line close-box" title="Close Page"  onclick="CloseTab(\'#' + FinalID + '\',\'#tab' + FinalID + '\');" ></i></li>';
        $(".iframe-wrapper-tab").append(iframeTab);

        var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true"></iframe>';

        $(".iframe-wrapper").append(iframe);
        var InW = $(window).width();
        var InH = $(window).height();

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH - 126;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 132;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        $scope.RemoveSpin(FinalID);

        return false;
    };
    $scope.SelectIfram = function (datapath, text) {
        /*Bind Page Tab with Iframe*/

        var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        var HalfID = src.split('/').join('');
        var FinalID = 'menu' + HalfID + date;

        $('.nav-item').removeClass('active');
        $('.iframedesign').addClass('iframe-close');
        $('.refresh-box').attr('disabled', true);
        //$('.iframe-box-w-reload-box').addClass('iframe-close');
        /*Bind Page Tab*/
        var iframeTab = '<li class="nav-item active" id="tab' + FinalID + '"><a id="ancor' + FinalID + '" class="nav-link active" onclick="Showtab(\'#' + FinalID + '\');" data-toggle="tab" href="#' + FinalID + '" role="tab">' + TabTitle + '</a><i id="btnrefresh' + FinalID + '" class="pe-7s-refresh-2 fa-spin refresh-box" title="Reload Page" onclick="ReloadBox(\'#' + FinalID + '\');" ></i><i class="icofont-close-line close-box" title="Close Page"  onclick="CloseTab(\'#' + FinalID + '\',\'#tab' + FinalID + '\');" ></i></li>';
        //$(".iframe-wrapper-tab").prepend(iframeTab);

        $(iframeTab).insertAfter($('.iframe-wrapper-tab li#tabmenuhomedashboard'));



        if ($('.iframe-wrapper-tab').height() > 30) {

            var LastTab = $('.iframe-wrapper-tab li:last-child').toArray();
            var ShowTab = LastTab[0].outerHTML;
            $(".fixed-tab-menu-sidebar-right .right-side-menu-tab-bind").prepend(ShowTab);
            $('.iframe-wrapper-tab li:last-child').remove();

        }



        //var SideRightLastTab = $('.right-side-menu-tab-bind li:fast-child').toArray();
        //var ShowTab2 = SideRightLastTab[0].outerHTML;
        //$(".iframe-wrapper-tab").append(ShowTab2);


        /*Bind Page Iframe*/

        var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true" allow="camera *;microphone *"></iframe>';

        //var iframe = '<div  id="data' + FinalID + '" class="iframe-box-w-reload-box"><div id="btn' + FinalID + '" class="reload-box"><button  onclick="ReloadBox(\'#' + FinalID + '\');" class="btn btn-primary btn-anim"><i class="mdi mdi-account-off"></i><span class="btn-text">Reload Page</span></button></div><div class="iframe-in-loadpage-box "><iframe id="' + FinalID + '" class="iframedesign " src="' + src + '" rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true"></iframe></div></div>';

        $(".iframe-wrapper").prepend(iframe);
        //$(".iframe-wrapper").append(iframe);
        var InW = $(window).width();
        var InH = $(window).height();

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH - 126;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 132;
            $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
        }
        $scope.RemoveSpin(FinalID);

        return false;
    };
    $scope.SelectIframoutiframe_with_querystring = function (datapath, querystring, text) {

        /*Bind Page Tab with Iframe*/

        var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        var HalfID = src.split('/').join('');
        var FinalID = 'menu' + HalfID + date;

        $('.nav-item', window.parent.document).removeClass('active');
        $('.iframedesign', window.parent.document).addClass('iframe-close');
        $('.refresh-box', window.parent.document).attr('disabled', true);
        //$('.iframe-box-w-reload-box').addClass('iframe-close');
        /*Bind Page Tab*/
        var iframeTab = '<li class="nav-item active" id="tab' + FinalID + '"><a id="ancor' + FinalID + '" class="nav-link active" onclick="Showtab(\'#' + FinalID + '\');" data-toggle="tab" href="#' + FinalID + '" role="tab">' + TabTitle + '</a><i id="btnrefresh' + FinalID + '" class="pe-7s-refresh-2 fa-spin refresh-box" title="Reload Page" onclick="ReloadBox(\'#' + FinalID + '\');" ></i><i class="icofont-close-line close-box" title="Close Page"  onclick="CloseTab(\'#' + FinalID + '\',\'#tab' + FinalID + '\');" ></i></li>';
        //$(".iframe-wrapper-tab").prepend(iframeTab);

        $(iframeTab).insertAfter($('.iframe-wrapper-tab li#tabmenuhomedashboard', window.parent.document));

        if ($('.iframe-wrapper-tab', window.parent.document).height() > 30) {

            var LastTab = $('.iframe-wrapper-tab li:last-child', window.parent.document).toArray();
            var ShowTab = LastTab[0].outerHTML;
            $(".fixed-tab-menu-sidebar-right .right-side-menu-tab-bind", window.parent.document).prepend(ShowTab);
            $('.iframe-wrapper-tab li:last-child', window.parent.document).remove();

        }

        /*Bind Page Iframe*/
        var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + querystring + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless"  allowtransparency="true" allow="camera *;microphone *"></iframe>';

        $('.iframe-wrapper', window.parent.document).prepend(iframe);

        var InW = $(window).width();
        var InH = $(window).height();

        if (InW > 980) {
            InH = InH + 126;
        }
        else {
            InH = InH + 132;
        }

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH - 126;
            $('.iframe-wrapper', window.parent.document).find('.iframedesign ', window.parent.document).css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 132;
            $('.iframe-wrapper', window.parent.document).find('.iframedesign ', window.parent.document).css({ "height": IfSetHeight });
        }
        $scope.RemoveSpinoutiframe(FinalID);
    };
    $scope.SelectIframoutiframe = function (datapath, text, transid, bcode, locked) {

        /*Bind Page Tab with Iframe*/

        var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        var HalfID = src.split('/').join('');
        var FinalID = 'menu' + HalfID + date;

        $('.nav-item', window.parent.document).removeClass('active');
        $('.iframedesign', window.parent.document).addClass('iframe-close');
        $('.refresh-box', window.parent.document).attr('disabled', true);
        //$('.iframe-box-w-reload-box').addClass('iframe-close');
        /*Bind Page Tab*/
        var iframeTab = '<li class="nav-item active" id="tab' + FinalID + '"><a id="ancor' + FinalID + '" class="nav-link active" onclick="Showtab(\'#' + FinalID + '\');" data-toggle="tab" href="#' + FinalID + '" role="tab">' + TabTitle + '</a><i id="btnrefresh' + FinalID + '" class="pe-7s-refresh-2 fa-spin refresh-box" title="Reload Page" onclick="ReloadBox(\'#' + FinalID + '\');" ></i><i class="icofont-close-line close-box" title="Close Page"  onclick="CloseTab(\'#' + FinalID + '\',\'#tab' + FinalID + '\');" ></i></li>';
        //$(".iframe-wrapper-tab").prepend(iframeTab);

        $(iframeTab).insertAfter($('.iframe-wrapper-tab li#tabmenuhomedashboard', window.parent.document));



        if ($('.iframe-wrapper-tab', window.parent.document).height() > 30) {

            var LastTab = $('.iframe-wrapper-tab li:last-child', window.parent.document).toArray();
            var ShowTab = LastTab[0].outerHTML;
            $(".fixed-tab-menu-sidebar-right .right-side-menu-tab-bind", window.parent.document).prepend(ShowTab);
            $('.iframe-wrapper-tab li:last-child', window.parent.document).remove();

        }



        //var SideRightLastTab = $('.right-side-menu-tab-bind li:fast-child').toArray();
        //var ShowTab2 = SideRightLastTab[0].outerHTML;
        //$(".iframe-wrapper-tab").append(ShowTab2);


        /*Bind Page Iframe*/
        if (locked == "No") {
            var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + '?TransId=' + transid + '&BCode=' + bcode + '&Locked=' + locked + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless"  allowtransparency="true" allow="camera *;microphone *"></iframe>';
        }
        else if (bcode != null && bcode != "") {
            var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + '?TransId=' + transid + '&BCode=' + bcode + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless"  allowtransparency="true" allow="camera *;microphone *"></iframe>';
        }
        else {
            var iframe = '<iframe id="' + FinalID + '" class="iframedesign " src=\'..' + src + '?' + transid + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless"  allowtransparency="true" allow="camera *;microphone *"></iframe>';
        }

        //var iframe = $('<iframe/>', {
        //    id: FinalID,
        //    src: src,
        //    class:'iframedesign',
        //    load: function () {
        //        //$("#iframeID").contents().find("[tokenid=" + token + "]").html();
        //        //setTimeout(function () { angular.element(document).scope().started1(transid); alert(transid); }, 2000);
        //        //alert($('#txtChallanNo').val());
        //        var iframe = document.getElementById(FinalID);
        //        var elmnt = iframe.contentWindow.document.getElementsByTagName("H5")[0];
        //        elmnt.style.display = "none";
        //    }
        //});
        //alert($(iframe).contents().find('div#mydiv'));
        //$([0]).prepend('{{started1("' + transid + '")}}');
        //var iframe = '<div  id="data' + FinalID + '" class="iframe-box-w-reload-box"><div id="btn' + FinalID + '" class="reload-box"><button  onclick="ReloadBox(\'#' + FinalID + '\');" class="btn btn-primary btn-anim"><i class="mdi mdi-account-off"></i><span class="btn-text">Reload Page</span></button></div><div class="iframe-in-loadpage-box "><iframe id="' + FinalID + '" class="iframedesign " src="' + src + '" rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="no" allowtransparency="true"></iframe></div></div>';
        $('.iframe-wrapper', window.parent.document).prepend(iframe);
        //$(".iframe-wrapper").append(iframe);
        var InW = $(window).width();
        var InH = $(window).height();

        if (InW > 980) {
            InH = InH + 126;
        }
        else {
            InH = InH + 132;
        }

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH - 126;
            $('.iframe-wrapper', window.parent.document).find('.iframedesign ', window.parent.document).css({ "height": IfSetHeight });
        }
        else {
            IfSetHeight = InH - 132;
            $('.iframe-wrapper', window.parent.document).find('.iframedesign ', window.parent.document).css({ "height": IfSetHeight });
        }
        $scope.RemoveSpinoutiframe(FinalID);

        //return false;
    };
    $scope.SelectIframPayNow = function (datapath, text) {

        $('#PayNowpageheaderRemove').fadeOut(0);
        $('#PayNowpagebodyRemove').fadeOut(0);


        //var date = new Date().getTime();
        var TabTitle = text;
        var src = datapath;
        //var HalfID = src.split('/').join('');
        //var FinalID = 'menu' + HalfID + date;

        var iframe = '<iframe id="PayNowIframeDesign" class="iframedesign" src=\'..' + src + '\' rameborder="0" marginheight="1" role="tabpanel" marginwidth="1" seamless="seamless" scrolling="yes" allowtransparency="true"></iframe>';


        $(".slimScrollDiv").find(".slimScrollBar").css({ "display": "none" })
        $("#onlyForPayNow").prepend(iframe);
        var InW = $(window).width();
        var InH = $(window).height();

        var IfSetHeight;
        if (InW > 980) {
            IfSetHeight = InH;
            $('#onlyForPayNow').find('#PayNowIframeDesign').css({ "height": IfSetHeight });

        }
        else {
            IfSetHeight = InH;
            $('#onlyForPayNow').find('#PayNowIframeDesign').css({ "height": IfSetHeight });

        }
        return false;
    };

    //    $(".iframe-wrapper").append(iframe);
    //    var InW = $(window).width();
    //    var InH = $(window).height();

    //    var IfSetHeight;
    //    if (InW > 980) {
    //        IfSetHeight = InH - 126;
    //        $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
    //    }
    //    else {
    //        IfSetHeight = InH - 132;
    //        $('.iframe-wrapper').find('.iframedesign ').css({ "height": IfSetHeight });
    //    }
    //    $scope.RemoveSpin(FinalID);

    //    return false;
    //};

    $scope.NumSum = function (numList) {
        var List = [];
        $.each(numList, function (index, val) {
            var obj = { 'num': val }
            List.push(obj)
        });
        return List.sum('num');
    }

    $scope.htmlTextToPlainText = function (htmlText) {
        var plainText = htmlText.replace(/&amp;/g, "&");
        return plainText;
    }
    $scope.FormatToDecimal = function (value, isDecimalPoint) {
        ////
        if ((value >= 0 || value <= 0) && isDecimalPoint=='Yes') {
            return $scope.checkNaN(value).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        else { return value; }

    }
    $scope.ConvertAmountToDecimalPoint = function (amount) {
        ////
        if (amount >= 0 || amount <= 0) {
            return $scope.checkNaN(amount).toLocaleString("en", { useGrouping: false, minimumFractionDigits: $scope.Amt, maximumFractionDigits: $scope.Amt });
        }
        else { return ""; }

    }
    $scope.ConvertQtyToDecimalPoint = function (Qty) {
        ////
        if (Qty >= 0 || Qty <= 0)
            return $scope.checkNaN(Qty).toLocaleString("en", { useGrouping: false, minimumFractionDigits: $scope.Qty, maximumFractionDigits: $scope.Qty });
        else { return ""; }
    }
    $scope.ConvertPerToDecimalPoint = function (Per) {
        ////
        if (Per >= 0 || Per <= 0)
            return $scope.checkNaN(Per).toLocaleString("en", { useGrouping: false, minimumFractionDigits: $scope.Per, maximumFractionDigits: $scope.Per });
        else { return ""; }
    }
    $scope.ConvertToTwoDecimalPoint = function (amount) {
        if ((amount >= 0 || amount <= 0) && amount != "" && amount != 'undefined') {
            return $scope.checkNaN(amount).toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        else { return ""; }
    }
    $scope.ConvertToDecimalPoint = function (amount, minpoint, maxpoint) {
        if (minpoint == null)
            minpoint = 2;
        if (maxpoint == null)
            maxpoint = 2;
        return $scope.checkNaN(amount).toLocaleString("en", { useGrouping: false, minimumFractionDigits: minpoint, maximumFractionDigits: maxpoint });
    }
    $scope.checkNaN = function (amount) {
        if (isNaN(amount))
            return 0;
        else
            return Number(amount)
    }
    $scope.RemoveSpin = function (id) {
        var frameID = id;
        var tabID = "#btnrefresh" + frameID;

        var interval1 = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(interval1);
                $(tabID).removeClass('fa-spin');
            }
        }, 100);
    }
    $scope.RemoveSpinoutiframe = function (id) {
        var frameID = id;
        var tabID = "#btnrefresh" + frameID;

        var interval1 = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(interval1);
                $(tabID, window.parent.document).removeClass('fa-spin');
            }
        }, 100);
    }
    $scope.ddlClassBranchWiseSubjects = function () {

        $scope.collectionobj = {};
        $scope.collectionobj["Action"] = 1;
        $scope.collectionobj["Classid"] = $scope.studentDetails.ClassId;
        $scope.collectionobj["Branchid"] = $scope.studentDetails.BranchId;
        $scope.collectionobj["SchoolCode"] = schoolCode;
        $scope.collectionobj["BranchCode"] = branchCode;
        $scope.collectionobj["SessionId"] = sessionId;

        var getData = myService.methode('POST', '../Administrator/ClassBranchWiseSubjectsList', '{obj:' + JSON.stringify($scope.collectionobj) + '}');
        getData.then(function (response) {
            $scope.Classbranchwisesubjects = response.data;
        });
    };

    $scope.SetDecimalDigit = function () {
        var collectionobj = {};
        collectionobj.Action = 4;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CompCode = compCode;
        collectionobj.SiteCode = siteCode;
        var getUserDetails = myService.methode('POST', '../Company/GetCompanyMaster', '{obj:' + JSON.stringify(collectionobj) + '}');
        getUserDetails.then(function (response) {
            if (response.data.length > 0) {
                $scope.Qty = response.data[0].RightQty;
                $scope.Amt = response.data[0].RightAmt;
                $scope.Per = response.data[0].RightPer;
                $scope.LotNoApplicable = response.data[0].LotYN;
                $scope.NeedExcessQty = response.data[0].ExcessQtyYN;
                $scope.DApproval = response.data[0].DApproval;
                $scope.AccPostingFromInward = response.data[0].AccPostingFromInward;
                $scope.SaudaNoApplicable = response.data[0].SaudaNoYN;
                $scope.CashFlow = response.data[0].CashFlowYN;
                $scope.SBillLayout = response.data[0].SBillLayout;
                $scope.JBillLayout = response.data[0].JBillLayout;
                $scope.DBillLayout = response.data[0].DBillLayout;
                $scope.SetInvetoryParameter();
            }
        });
    }
    $scope.ApplicationCodeIsAllowed = '-1'; $scope.BatchNoIsAllowed = '-1'; $scope.ItemMakeIsAllowed = '-1'; $scope.PackingIsAllowed = '-1';
    $scope.ProdCodeIsAllowed = '-1'; $scope.SizeIsAllowed = '-1'; $scope.ModelCodeIsAllowed = '-1'; $scope.MfgDateIsAllowed = '-1';
    $scope.ExpDateIsAllowed = '-1'; $scope.ColorIsAllowed = '-1';

    $scope.SetInvetoryParameter = function () {
        
        var collectionobj = {};
        collectionobj.Action = 10;
        collectionobj.SchoolCode = schoolCode;
        collectionobj.BranchCode = branchCode;
        collectionobj.CompCode = compCode;
        collectionobj.SiteCode = siteCode;
        var getData = myService.methode('POST', '../Company/GetCompanyMaster', '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            if (response.data.length > 0) {
                
                $scope.InvetoryKeys = response.data;
                $scope.InvetoryKey = Object.keys($scope.InvetoryKeys[0]);

                $.each($scope.InvetoryKey, function (index, val) {
                    if (val === "ApplicationCode") {
                        $scope.ApplicationCodeIsAllowed = response.data[0].ApplicationCode;
                    }
                    else if (val === "BatchNo") {
                        $scope.BatchNoIsAllowed = response.data[0].BatchNo;
                    }
                    else if (val === "ItemMake") {
                        $scope.ItemMakeIsAllowed = response.data[0].ItemMake;
                    }
                    else if (val === "Packing") {
                        $scope.PackingIsAllowed = response.data[0].Packing;
                    }
                    else if (val === "ProdCode") {
                        $scope.ProdCodeIsAllowed = response.data[0].ProdCode;
                    }
                    else if (val === "Size") {
                        $scope.SizeIsAllowed = response.data[0].Size;
                    }
                    else if (val === "ModelCode") {
                        $scope.ModelCodeIsAllowed = response.data[0].ModelCode;
                    }
                    else if (val === "MfgDate") {
                        $scope.MfgDateIsAllowed = response.data[0].MfgDate;
                    }
                    else if (val === "ExpDate") {
                        $scope.ExpDateIsAllowed = response.data[0].ExpDate;
                    }
                    else if (val === "Color") {
                        $scope.ColorIsAllowed = response.data[0].Color;
                    }

                });
            }
        });
    }


    $scope.$on('ArrowMove', function () {
        if (IsFunctionDefined('ArrowMoveWithOutFirstFocus')) {
            $scope.ArrowMoveWithOutFirstFocus("#collapseinputbox");
        }
    });
    $scope.$on('ArrowMoveExpensItem', function () {
        $scope.ArrowMove('#expensitem');
    });


    $scope.Rowdata = [];
    $scope.move = true;
    $scope.createElement = function (attr, index, name) {
        attr[index]['name'] = name;
        $scope.Rowdata.push({ currentRow: 0, VISIBLE_ROWS: 6 })
        if (attr[index]['valueModel'] == null)
            attr[index]['valueModel'] = attr[index].name + 'ValueModel';

        if (attr[index]['textModel'] == null)
            attr[index]['textModel'] = attr[index].name + 'TextModel';

        if (attr[index]['fontSize'] == null)
            attr[index]['fontSize'] = '12px';

        if (attr[index]['textTransform'] == null)
            attr[index]['textTransform'] = 'capitalize';

        if (attr[index]['showdiv'] == null)
            attr[index]['showdiv'] = false;

        if (attr[index]['Isdisabled'] == null)
            attr[index]['Isdisabled'] = false;

        if (attr[index]['validate'] == null)
            attr[index]['validate'] = 'validate';

        if (attr[index]['placeholder'] == null)
            attr[index]['placeholder'] = 'Select ' + attr[index].name;

        if (attr[index]['textCol'] == null)
            attr[index]['textCol'] = attr[index].header[0].ValueCol;

        if (attr[index]['valueCol'] == null)
            attr[index]['valueCol'] = attr[index].header[0].ValueCol;

        if (attr[index]['keyupfun'] == null)
            if (index == 0)
                attr[index]['keyupfun'] = 'key_Up($event.key)';
            else
                attr[index]['keyupfun'] = 'key_Up' + index + '($event.key)';

        if (attr[index]['initfun'] == null)
            attr[index]['initfun'] = "";

        if (attr[index]['width'] == null)
            attr[index]['width'] = "100%";

        var innerWidth = $('.panel-body').innerWidth();
        var totalWidth = 0;
        $.each(attr[index].header, function (index, val) {
            totalWidth = val.Width + totalWidth;
        });
        var excss = 'text-wraping-n'
        if ((innerWidth - 64) > totalWidth) {
            totalWidth = totalWidth + 'px';
        }
        else {
            totalWidth = '100%';
            excss = ''
        }
        $scope.ReplaceText = "'&amp;','&'";
        //\'' + list + '\'
        var newEle = angular.element('<div class="input-box input-z-in-close-box" ng-model=' + attr[index].valueModel + '><input autocomplete="off" style="cursor:pointer;width:' + attr[index].width + ' !important" class="form-control clear custom-div bg-t ' + attr[index].validate + '" id="txt' + attr[index].name + '" ng-model=' + attr[index].textModel + ' type="text" placeholder=\'' + attr[index].placeholder + '\' ng-click="show(attr[' + index + '],' + index + ')" ng-change="resetRowdata(Rowdata[' + index + '])" ng-keydown="HighlightTableRow(attr,' + index + ',$event);" ng-keyup=' + attr[index].keyupfun + ' ng-disabled=' + attr[index].Isdisabled + ' ng-blur="hide(attr[' + index + '])" /><div class="input-z-in ' + attr[index].name + '" style="width:' + totalWidth + ';font-size:' + attr[index].fontSize + ';text-transform:' + attr[index].textTransform + '" ng-show="attr[' + index + '].showdiv"><div id="overflow' + attr[index].name + '" class="datatable-responsive table-responsive advance-btn-table"><table class="table table-in-input-box compact table-bordered ' + excss + ' dataTable t-mgtb-n" id="tbl' + attr[index].name + '" style="cursor:context-menu;"><thead><tr><th style="width:{{th.Width}}px;background-color: #333 !important;" ng-repeat="th in attr[' + index + '].header">{{th.TextCol}}</th></tr></thead><tbody ng-init=' + attr[index].initfun + '><tr ng-if="' + attr[index].listobj + '==null" style="text-align: center;"><td colspan="{{attr[' + index + '].header.length}}"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></td></tr><tr class="getRow" ng-if="' + attr[index].listobj + '.length>0" ng-click=' + attr[index].keyupfun + '; ng-mouseover="mouseover(attr[' + index + '],' + index + ',$index)" ng-repeat="li in ' + attr[index].listobj + '|filter:' + attr[index].textModel + '" ><td ng-repeat="th in attr[' + index + '].header" ng-click="SetTextAndValue(li[attr[' + index + '].valueCol],li[attr[' + index + '].textCol],attr[' + index + ']);" ng-bind-html="trustAsHtml(li[th.ValueCol])"></td></tr></tbody></table></div></div><div class="text-box-msg-r"></div></div>');
        var target = document.getElementById(attr[index].name);
        angular.element(target).html(newEle);
        $compile(newEle)($scope);
        $scope[attr[index].valueModel] = "";
        $scope[attr[index].textModel] = "";

        $scope.$watch(attr[index].listobj, function () {

            if (attr[index].showdiv)
                setTimeout(function () {
                    var table = $('#tbl' + attr[index].name)
                    var trs = $(table).find('tr.getRow');

                    $.each(trs, function () {
                        var tr = this;
                        $(tr).attr('style', 'background-color: #fff;');
                        $(tr).find('td').attr('style', 'color: #000 !important');
                    })

                    $scope.Rowdata[index]['currentRow'] = 0;
                    $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);

                    $(".input-z-in").scrollTop(0);

                }, 100)
        })
        $scope.$watch(attr[index].textModel, function () {

            if (attr[index].showdiv)
                setTimeout(function () {
                    var table = $('#tbl' + attr[index].name)
                    var trs = $(table).find('tr.getRow');

                    $.each(trs, function () {
                        var tr = this;
                        $(tr).attr('style', 'background-color: #fff;');
                        $(tr).find('td').attr('style', 'color: #000 !important');
                    })

                    $scope.Rowdata[index]['currentRow'] = 0;
                    $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);

                    $(".input-z-in").scrollTop(0);

                }, 100)
        })
    }

    $scope.HighlightTableRow = function (attr, index, e) {
        var table = $('#tbl' + attr[index].name)
        var trs = $(table).find('tr.getRow');
        var numRows = trs.length;
        var keyID = (window.event) ? event.keyCode : e.keyCode;
        const key = event.key; // const {key} = event; ES6+
        switch (key) {
            case 'ArrowUp':
                if (parseInt($scope.Rowdata[index]['currentRow']) == parseInt(0)) {
                    // reached the top of the table; do nothing.
                    return true;
                } else {
                    if ($scope.Rowdata[index]['currentRow'] < numRows)
                        $scope.setCurrentRow(trs[$scope.Rowdata[index]['currentRow']]);
                    $scope.Rowdata[index]['currentRow']--;
                    scrollRow("up");
                    if ($scope.Rowdata[index]['currentRow'] + 6 < $scope[attr[index].listobj].length) {
                        $("." + attr[index].name).scrollTop(Number(($("." + attr[index].name).scrollTop())) - 25);
                    }
                    e.preventDefault();
                }
                break;
            case 'ArrowDown':
                if ($scope.Rowdata[index]['currentRow'] == (numRows - 1)) {
                    // reached the end of the table; do nothing
                    return true;
                } else {
                    $scope.Rowdata[index]['currentRow']++;
                    scrollRow("down");
                    if ($scope.Rowdata[index]['currentRow'] > 0)
                        $scope.setCurrentRow(trs[$scope.Rowdata[index]['currentRow'] - 1]);
                    if ($scope.Rowdata[index]['currentRow'] > $scope.Rowdata[index]['VISIBLE_ROWS']) {
                        $("." + attr[index].name).scrollTop(Number(($("." + attr[index].name).scrollTop())) + 25);
                    }
                    e.preventDefault();
                }
                break;
            case 'ArrowRight':
                if (table.hasClass('text-wraping-n') == false) {
                    $('#overflow' + attr[index].name).scrollLeft(Number(($('#overflow' + attr[index].name).scrollLeft())) + 50);
                }
                break;
            case 'ArrowLeft':
                if (table.hasClass('text-wraping-n') == false) {
                    if (isScrollable(document.getElementById('overflow' + attr[index].name)))
                        if (Number(($('#overflow' + attr[index].name).scrollLeft())) > 50)
                            $('#overflow' + attr[index].name).scrollLeft(Number(($('#overflow' + attr[index].name).scrollLeft())) - 50);
                        else if (Number(($('#overflow' + attr[index].name).scrollLeft())) > 0 && Number(($('#overflow' + attr[index].name).scrollLeft())) <= 50)
                            $('#overflow' + attr[index].name).scrollLeft(0);
                }
                break;
            case 'Enter':
                var currow = $scope.Rowdata[index]['currentRow'];
                if (attr[index].showdiv) {
                    var filterExpression = {};
                    filterExpression[attr[index].textCol] = $scope[attr[index].textModel];
                    $scope.FilterObj = $filter('filter')($scope[attr[index].listobj], filterExpression)
                    $scope.SetTextAndValue($scope.FilterObj[currow][attr[index].valueCol], $scope.FilterObj[currow][attr[index].textCol], attr[index]);
                }
                else {
                    $scope.show(attr[index], index);
                }
                break;
            case 'Backspace':
                $scope[attr[index].valueModel] = "";
                $scope[attr[index].textModel] = "";
                $scope.show(attr[index], index, '1');
                break;
            case 'Delete':
                $scope[attr[index].valueModel] = "";
                $scope[attr[index].textModel] = "";
                $scope.show(attr[index], index, '1');
                break;
            case 'Escape':
                $scope.show(attr[index], index);
                break;
        }

        function scrollRow(dir) {
            if (dir == "up") {
                $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);
            } else if (dir == "down") {
                $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);
            }
        }
    }

    $scope.highlightRow = function (tr) {
        $(tr).attr('style', 'background-color: #1b8bf9;');
        var td = $(tr).find('td');
        td.attr('style', 'color:#fff !important');
    }
    $scope.setCurrentRow = function (tr) {
        $(tr).attr('style', 'background-color: #fff;');
        $(tr).find('td').attr('style', 'color: #000 !important');
    }

    $scope.hide = function (attr) {
        setTimeout(function () {
            attr.showdiv = false;
            $scope.$applyAsync();
            $scope.move = true;
        }, 150);
    }

    $scope.show = function (attr, index, backspace) {
        if (backspace == null) {
            if (attr.Isdisabled == false)
                if (attr.showdiv) {
                    $scope.move = true;
                    attr.showdiv = false;
                }
                else {
                    $scope.move = false;
                    attr.showdiv = true;
                }
            else {
                $scope.move = true;
                attr.showdiv = false;
            }
        }
        else {
            $scope.move = false;
            attr.showdiv = true;
        }

        if (attr.showdiv) {
            var table = $('#tbl' + attr.name)
            var trs = $(table).find('tr.getRow');

            $.each(trs, function () {
                var tr = this;
                $(tr).attr('style', 'background-color: #fff;');
                $(tr).find('td').attr('style', 'color: #000 !important');
            })

            $scope.Rowdata[index]['currentRow'] = 0;
            $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);

            $(".input-z-in").scrollTop(0);
        }
        $scope.$applyAsync();
    }

    $scope.mouseover = function (attr, index, rowno) {
        var table = $('#tbl' + attr.name)
        var trs = $(table).find('tr.getRow');

        $.each(trs, function () {
            var tr = this;
            $(tr).attr('style', 'background-color: #fff;');
            $(tr).find('td').attr('style', 'color: #000 !important');
        })

        $scope.Rowdata[index]['currentRow'] = rowno;
        $scope.highlightRow(trs[$scope.Rowdata[index]['currentRow']]);
    }

    $scope.SetTextAndValue = function (val, txt, attr) {
        $scope[attr.valueModel] = val;
        $scope[attr.textModel] = txt
        document.getElementById('txt' + attr.name).focus();
        setTimeout(function () {
            attr.showdiv = false;
        }, 150);
        $scope.move = true;
        $scope.$applyAsync();
    }

    $scope.RemoveSpin = function (id) {
        var frameID = id;
        var tabID = "#btnrefresh" + frameID;

        var interval1 = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(interval1);
                $(tabID).removeClass('fa-spin');
            }
        }, 100);
    }
    $scope.RemoveSpinoutiframe = function (id) {
        var frameID = id;
        var tabID = "#btnrefresh" + frameID;

        var interval1 = setInterval(function () {
            if (document.readyState === 'complete') {
                clearInterval(interval1);
                $(tabID, window.parent.document).removeClass('fa-spin');
            }
        }, 100);
    }
    $scope.showLoader = function () {
        $('#cover-spin').show(0);
    };

    $scope.hideLoader = function () {
        $('#cover-spin').hide();
    };

    $scope.SelectFile = function (input, scope) {
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e) {
                $scope[scope] = e.target.result;
                $scope.$applyAsync();
            }
            filerdr.readAsDataURL(input.files[0]);
        };
    };

    $scope.SetPhotoUrl = function (photoPath, photoId, inputfileid) {

        if (photoPath!=null)
        try {
            photoPath = photoPath.replace("~", "..");
            if (photoPath != null) {
                if (inputfileid != null) {
                    ResetImage(photoPath, inputfileid);
                };

                $(photoId).attr("src", photoPath + '?date=' + new Date());
            }
            else {
                ResetImage("", inputfileid);
                $(photoId).removeAttr("src");
            }
        }
        catch (ex) {
            console.log(ex.message);
        }
        //debugger;

        return photoPath;
    }

    $scope.DocSize = "a4";
    $scope.DocOrientation = "portrait";
    $scope.FontSize = "14";
    $scope.FilterMsg = "";
    $scope.Filters = {};
    $scope.RepeatHeader = 1;
    $scope.keys = [];
    $scope.SummaryFilter = '1';
    $scope.showtblfooter = 0;
    $scope.BodyHeaderTitle = "";
    $scope.LeftFooterText = "";
    $scope.LeftFooterValue = "";
    $scope.RightFooterText = "";
    $scope.RightFooterValue = "";

    $scope.Replace = function (value) {
        if (value == null) return "";
        var str = value.split('$');
        var para = $('<p></p>');
        for (var i = "0"; i < str.length; i++) {
            para.append('<p style="font-size:'+$scope.FontSize+'px !important;">' + str[i] + '</p>');
        }
        return para.html();
    };

    $scope.Export = function (mode) {
        $scope.Orientation = $scope.DocOrientation == "portrait" ? 'p' : 'l';
        if (typeof (mode) === 'undefined') return;
        if (mode == "print") {
            //$.noConflict();
            var printContents = document.getElementById('ExportDiv').innerHTML;
            var popupWin = window.open('', '_blank', 'width=1000,height=1000');
            popupWin.document.open();
            popupWin.document.write('<html><head><meta charset="utf-8" /><style type="text/css" media="print">@page { size:' + $scope.DocSize.toUpperCase() + ' ' + $scope.DocOrientation.toUpperCase() + '; }</style><link href="../Content/plugins/assets/css/print/print-bootstrap.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/print/print-main.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/icofont.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/font-awesome.min.css" media="all" rel="stylesheet" /><link href="../Content/plugins/assets/css/font-icons/materialdesignicons.min.css" media="all" rel="stylesheet" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        return false;
    }

    $scope.GetFilterMsg = function () {
        var message = "";
        var seprator = "";
        var filter = "<span class='filter' >Filter  : </span> ";

        if (messagevalues.length > 0)
            $.each(messagevalues, function (i, values) {
                $.each(values, function (key, val) {
                    if (val != null && val != "") {
                        message = message + seprator + filter;
                        message = message + "<span class='filter-title-name' >" + key + "</span> : <span class='filter-title'>" + val + "</span>"
                        seprator = ", ";
                        filter = "";
                    };
                });
            });
        if (message.length > 0) {
            message = '(' + message + ')';
        }
        $scope.FilterMsg = message;
    }

    $scope.SearchReportGrid = function (object) {
     
        $scope.GetFilterMsg();
        $scope.tblheader = [];
        $scope.tblbody = [];
        $scope.tblfootermain = [];
        $scope.tblfooterrepeat = {};
        $scope.keys = [];
        $scope.RepeatHeader = 0;
        $scope.showtblfooter = object.showtblfooter
        if (object.BodyGrid == 1) {
            $scope.tblheader = object.tblheader
            $scope.tblbody = object.tblbody;
            $scope.TextMessage = object.TextMessage;


            if (object.showtblfooter == 1)
                $.each(object.FooterColumn.TextCol, function (index, array) {
                    $scope.tblfooterrepeat = {};
                    $.each($scope.tblheader, function (key, val) {
                        $scope.tblfooterrepeat[val.HeaderValue] = "";
                    });
                    $scope.tblfooterrepeat[array.Text] = array.Val;
                    $.each(object.tblbody, function (rowindex, values) {
                        if (Array.isArray(array.SumCol))
                        {
                            $.each(array.SumCol, function (index, val) {
                               
                                if ($scope.tblfooterrepeat[val] == "") {
                                    $scope.tblfooterrepeat[val] = 0;
                                }
                                if (isNaN(values[val])) {
                                    $scope.tblfooterrepeat[val] += 0
                                }
                                else {
                                    $scope.tblfooterrepeat[val] = $scope.tblfooterrepeat[val] + Number(values[array.Sum[index]]);
                                }
                            });
                        }
                        else {
                            if ($scope.tblfooterrepeat[array.SumCol] == "") {
                                $scope.tblfooterrepeat[array.SumCol] = 0;
                            }
                            if (isNaN(values[array.SumCol])) {
                                $scope.tblfooterrepeat[array.SumCol] += 0
                            }
                            else {
                                $scope.tblfooterrepeat[array.SumCol] = $scope.tblfooterrepeat[array.SumCol] + Number(values[array.Sum]);
                            }
                        }
                    });
                    $scope.tblfootermain.push($scope.tblfooterrepeat);
                });
        }
        else {
            $scope.tblbody = null;
        }

        $scope.HeadValue = [];
        $scope.tblheaderSummary = [];
        $scope.tblbodySummary = [];
        $scope.tblfooterSummary = {};

        if (object.SummaryGrid == 1) {
            //$scope.Repeater = object.Repeater;
            var HeadName = object.SummaryCol[0];
            //var HeadName1 = object.HeadName1;
            $.each(object.tblbody, function (index, vales) {
                key = vales[HeadName]
                if ($.inArray(key, $scope.HeadValue) === -1) {
                    $scope.HeadValue.push(key)
                }
            });

            $scope.tblheaderSummary = object.SummaryHeader;

            $scope.headerIndex = object.SummaryHeaderRow;

            $.each($scope.HeadValue, function (index, val) {

                key = val
                $scope.tblbodySummary1 = {};
                $scope.tblbodySummary1[object.SummaryCol[0]] = key;
                $.each(object.SummaryCol, function (index, values) {
                    if (index != 0) {
                        if (!$scope.tblbodySummary1[object.SummaryCol[index]]) {
                            $scope.tblbodySummary1[object.SummaryCol[index]] = 0;
                        }
                        var hh = object.SummaryCol[0];
                        $.each(object.tblbody, function (index1, array) {
                            if (array[object.SummaryCol[0]] == key) {
                                if (isNaN(array[object.SummaryCol[index]]))
                                    $scope.tblbodySummary1[object.SummaryCol[index]] += 0;
                                else
                                    $scope.tblbodySummary1[object.SummaryCol[index]] += Number(array[object.SummaryCol[index]]);
                            }
                        });
                    }
                });
                //console.log(JSON.stringify($scope.tblbodySummary1));
                $scope.tblbodySummary.push($scope.tblbodySummary1);
            });

            var rowindex = 0;


            $.each($scope.tblheaderSummary, function (index, row) {
                $scope.tblfooter = [];
                if (row[index].IsTitleRow != "Yes") {
                    $.each(row, function (key, val) {
                        if (val.IsFooterTotal != "Yes") {
                            if (val.FooterText == null)
                                $scope.tblfooter.push({ FooterText: '' })
                            else
                                $scope.tblfooter.push({ FooterText: val.FooterText, TextAlign: val.FooterTextAlign })
                        }
                        else {
                            var totalfooteramount = 0;
                            $.each($scope.tblbodySummary, function (keys, values) {
                                totalfooteramount += values[val.HeaderValue];
                            });
                            $scope.tblfooter.push({ FooterText: totalfooteramount, TextAlign: val.FooterTextAlign })
                        }

                    });
                    $scope.tblfooterSummary[rowindex] = $scope.tblfooter;
                }
                else
                    rowindex = index;
            });

        }

        if (object.tblbody.length > 0) {
            $(".section-toggle").slideToggle('slow');
            $(".filter-toggle").css("display", "block");
        }

        $scope.hideLoader();
    }

    $scope.Formatter = function (val) {
        //alert(val);
        if (isNaN(val) || val == "" || val == null) return val;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(val);
    }

    //View In Student Fee Structure Mapping Form
    $scope.CheckUnCheck = function (value, listName, keyName, filter) {
        if (filter == null) {
            $.each($scope[listName], function (index, obj) {
                obj[keyName] = value
            });
        } 
        else {
            $.each($filter('filter')($scope[listName], filter), function (index, obj) {
                obj[keyName] = value
            });
        }
    }

    //View In Student Fee Structure Mapping Form
    $scope.CheckUnCheckALL = function (listName, keyName, modelName, filter) {
        var flag = true;
        if (filter == null) {
            $.each($scope[listName], function (index, obj) {
                if (obj[keyName] == false) {
                    flag = false;
                    return;
                }
            });
        }
        else {
            $.each($filter('filter')($scope[listName], filter), function (index, obj) {
                if (obj[keyName] == false) {
                    flag = false;
                    return;
                }
            });
        }
        $scope[modelName] = flag;
    }

    $scope.GetReportHeaderUsingCategory = function (reportcategoryname, ngmodel) {
        //debugger
       var collectionobj = {};
        collectionobj.Action = 5;
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ReportCategoryName = reportcategoryname;

        var getData = myService.methode('POST', "../Api/GblMasterApi/GetReportHeader", collectionobj);
        getData.then(function (response) {
            if (response.data.length > 0) {
                if (ngmodel != null)
                    $scope[ngmodel] == $sce.trustAsHtml(response.data[0].HeaderHtml);
                else
                    $scope.ReportHeader = $sce.trustAsHtml(response.data[0].HeaderHtml);
            }
        });
    }

    $scope.SortbyDate = function (date) {
        return moment(new Date(date)).format('DDMMYYYY');
    }

    app.GetMasterController($scope, $element, $sce, $filter, $timeout, myService);    
    app.ddlBindings($scope, $element, $filter, myService);

    if (IsFunctionDefined('app.SwitchSchoolController')) {
        app.SwitchSchoolController($scope, $element, $sce, $filter, $timeout, myService);
    }
    //app.controller0265($scope, $element, myService);
    if (IsFunctionDefined('app.Authorization')) {
        app.Authorization($scope, $element, $interval, myService);
    }
  
    // Enquiry Module 

    if (IsFunctionDefined('app.CityAreaMasterController')) {
        app.CityAreaMasterController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.EnquirySourceMasterController')) {
        app.EnquirySourceMasterController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.EnquiryTypeMasterController')) {
        app.EnquiryTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EnquiryFormForSocialMediaWebsiteController')) {
        app.EnquiryFormForSocialMediaWebsiteController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EnquiryFormController')) {
        app.EnquiryFormController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EnquiryDashBoardController')) {
        app.EnquiryDashBoardController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EnquiryRegisterReportController')) {
        app.EnquiryRegisterReportController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.MonthlyEnquiryStatisticsReportController')) {
        app.MonthlyEnquiryStatisticsReportController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EnquiryFollowUpFormController')) {
        app.EnquiryFollowUpFormController($scope, $element, $filter, myService);
    }
    //8-March-2021 17:16 PM for Group Master 
    if (IsFunctionDefined('app.GroupMasterController')) {
        app.GroupMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SocietyMasterController')) {
        app.SocietyMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SchoolMasterController')) {
        app.SchoolMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BranchMasterController')) {
        app.BranchMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RoleMasterController')) {
        app.RoleMasterController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.RoleOptionsController')) {
        app.RoleOptionsController($scope, $element, $filter, myService);
    }
    
    //UserMaster 
    if (IsFunctionDefined('app.UserMasterController')) {
        app.UserMasterController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.UserRoleAssignmentsController')) {
        app.UserRoleAssignmentsController($scope, $element, $filter, myService, $compile);
    }
    if (IsFunctionDefined('app.UserPermissionController')) {
        app.UserPermissionController($scope, $element, $filter, myService);
    }
    //Registration 
    if (IsFunctionDefined('app.RegistrationFormFeeHeadMasterController')) {
        app.RegistrationFormFeeHeadMasterController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.RegistrationFormsReceiveMasterController')) {
        app.RegistrationFormsReceiveMasterController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.UserPermissionSchoolWiseController')) {
        app.UserPermissionSchoolWiseController($scope, $element, $filter, myService);
    }
    
    if (IsFunctionDefined('app.BackDateEntryPermissionController')) {
        app.BackDateEntryPermissionController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.RegistrationFormSaleEntryController')) {
        app.RegistrationFormSaleEntryController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EnquiryDashboardLavel2Controller')) {
        app.EnquiryDashboardLavel2Controller($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EnquiryDashboardLavel3Controller')) {
        app.EnquiryDashboardLavel3Controller($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.RegistrationFormSaleEntryOnlineController')) {
        app.RegistrationFormSaleEntryOnlineController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RegistrationFormSubmissionController')) {
        app.RegistrationFormSubmissionController($scope, $element, $filter, myService);
    }
    //Navigation 
    if (IsFunctionDefined('app.NavigationController')) {
        app.NavigationController($scope, $element, $filter, myService);
    }  
    if (IsFunctionDefined('app.FeeStructureGroupMasterController')) {
        app.FeeStructureGroupMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.FeeHeadMasterController')) {
        app.FeeHeadMasterController($scope, $element, $filter, myService);
    } 
    

    if (IsFunctionDefined('app.CreateBatchController')) {
        app.CreateBatchController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CreateBatchTimeSlotController')) {
        app.CreateBatchTimeSlotController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ChangeStudentBatchController')) {
        app.ChangeStudentBatchController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ClassFeeStructureMasterController')) {
        app.ClassFeeStructureMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ConcessionHeadMasterController')) {
        app.ConcessionHeadMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ConcessionFeeHeadMappingController')) {
        app.ConcessionFeeHeadMappingController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.ChangeStudentBatchController')) {
        app.ChangeStudentBatchController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.ClassMeritListPrePrimaryController')) {
        app.ClassMeritListPrePrimaryController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.ClassMeritListPrimaryJuniorController')) {
        app.ClassMeritListPrimaryJuniorController($scope, $element, $filter, myService);
    }
    
    if (IsFunctionDefined('app.EntranceMarksEntryPrimaryJuniorController')) {
        app.EntranceMarksEntryPrimaryJuniorController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.CourseMasterController')) {
        app.CourseMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassMasterController')) {
        app.ClassMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.StreamMasterController')) {
        app.StreamMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.SectionMasterController')) {
        app.SectionMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.CollegeCourseMasterController')) {
        app.CollegeCourseMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeBranchMasterController')) {
        app.CollegeBranchMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.SendEmailSMSScheduleController')) {
        app.SendEmailSMSScheduleController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.SubjectGroupMasterController')) {
        app.SubjectGroupMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.SubjectMasterController')) {
        app.SubjectMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.AdmissionFormDetailsController')) {
        app.AdmissionFormDetailsController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.SendEmailSMSForMeritListController')) {
        app.SendEmailSMSForMeritListController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SendEmailSMSForEntranceMeritListController')) {
        app.SendEmailSMSForEntranceMeritListController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.CollegeSemesterMasterController')) {
        app.CollegeSemesterMasterController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.CollegeApplicationFormGeneralDetails')) {
        app.CollegeApplicationFormGeneralDetails($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.CollegeApplicationFormOtherDetails')) {
        app.CollegeApplicationFormOtherDetails($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.CollegeApplicationFormQualificationDetails')) {
        app.CollegeApplicationFormQualificationDetails($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.GradeMasterController')) {
        app.GradeMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.DepartmentMasterController')) {
        app.DepartmentMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.DesignationMasterController')) {
        app.DesignationMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.EmployeeRegistrationController')) {
        app.EmployeeRegistrationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AbbreviationMasterController')) {
        app.AbbreviationMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LeaveTypeMasterController')) {
        app.LeaveTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DigitalNoticeCreationController')) {
        app.DigitalNoticeCreationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeAttendanceDateWiseController')) {
        app.EmployeeAttendanceDateWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherSettingController')) {
        app.TeacherSettingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassSettingController')) {
        app.ClassSettingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DigitalDiaryCreationController')) {
        app.DigitalDiaryCreationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassWiseSubjectMasterController')) {
        app.ClassWiseSubjectMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ShiftMasterController')) {
        app.ShiftMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ComplainRegisterController')) {
        app.ComplainRegisterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeLeaveApplicationController')) {
        app.EmployeeLeaveApplicationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SessionMasterController')) {
        app.SessionMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FinancialYearMasterController')) {
        app.FinancialYearMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeLeaveApprovalController')) {
        app.EmployeeLeaveApprovalController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassAndSubjectAssignmentSchoolWiseController')) {
        app.ClassAndSubjectAssignmentSchoolWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassWiseSubjectTopicConceptsController')) {
        app.ClassWiseSubjectTopicConceptsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LessonPlanSubjectTopicChaptersController')) {
        app.LessonPlanSubjectTopicChaptersController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ModifySubjectSubTopicConceptsParametersController')) {
        app.ModifySubjectSubTopicConceptsParametersController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SubjectTopicMasterController')) {
        app.SubjectTopicMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SubtopicParameterMasterController')) {
        app.SubtopicParameterMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SubtopicSubParameterMasterController')) {
        app.SubtopicSubParameterMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ShiftClassMappingController')) {
        app.ShiftClassMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ShiftAndPeriodsMappingController')) {
        app.ShiftAndPeriodsMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DefineClassTeacherController')) {
        app.DefineClassTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassSubjectMappingWithTeacherController')) {
        app.ClassSubjectMappingWithTeacherController($scope, $element, $filter, myService);
    }    
    if (IsFunctionDefined('app.ClassWiseSubjectPriorityController')) {
        app.ClassWiseSubjectPriorityController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ConsecutiveSubjectPeriodController')) {
        app.ConsecutiveSubjectPeriodController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.TeacherBreakMasterController')) {
        app.TeacherBreakMasterController($scope, $element, $filter, myService);
    } 
    
    if (IsFunctionDefined('app.SubjectDaysMasterController')) {
        app.SubjectDaysMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RelativeOptionalSubjectController')) {
        app.RelativeOptionalSubjectController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InstallmentMasterController')) {
        app.InstallmentMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InstallmentFeeHeadMappingMonthController')) {
        app.InstallmentFeeHeadMappingMonthController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LedgerGroupController')) {
        app.LedgerGroupController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GeneralLedgerMasterController')) {
        app.GeneralLedgerMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TDSSectionMasterController')) {
        app.TDSSectionMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TDSDeducteeTypeMasterController')) {
        app.TDSDeducteeTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TDSNatureMasterController')) {
        app.TDSNatureMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.VoucherNarrationController')) {
        app.VoucherNarrationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CashPaymentVoucherController')) {
        app.CashPaymentVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CashReceiveVoucherController')) {
        app.CashReceiveVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BankPaymentVoucherController')) {
        app.BankPaymentVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BankReceiveVoucherController')) {
        app.BankReceiveVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ContraVoucherController')) {
        app.ContraVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.JournalVoucherController')) {
        app.JournalVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GeneralTrialController')) {
        app.GeneralTrialController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GroupTrialController')) {
        app.GroupTrialController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DetailTrialController')) {
        app.DetailTrialController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LedgerReportController')) {
        app.LedgerReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.MultipleLedgerReportController')) {
        app.MultipleLedgerReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BankLedgerReportController')) {
        app.BankLedgerReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GenerateTimeTableManualController')) {
        app.GenerateTimeTableManualController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ClassWiseTimeTableController')) {
        app.ClassWiseTimeTableController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ReplaceTeacherController')) {
        app.ReplaceTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AllotNewTeacherController')) {
        app.AllotNewTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LayoutMasterController')) {
        app.LayoutMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.HomeworkController')) {
        app.HomeworkController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LayoutPartController')) {
        app.LayoutPartController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UnitTypeMasterController')) {
        app.UnitTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UnitMasterController')) {
        app.UnitMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherWiseTimeTableController')) {
        app.TeacherWiseTimeTableController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LeaveApprovalByLevelController')) {
        app.LeaveApprovalByLevelController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TabMasterController')) {
        app.TabMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.MenuMasterController')) {
        app.MenuMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SubMenuMasterController')) {
        app.SubMenuMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentAttendanceDateWiseController')) {
        app.StudentAttendanceDateWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FooterHeaderController')) {
        app.FooterHeaderController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UnitMenuDetailController')) {
        app.UnitMenuDetailController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherSubstitutionSuggestionsReportController')) {
        app.TeacherSubstitutionSuggestionsReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BodyContentController')) {
        app.BodyContentController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ConcessionOnFeeStructureController')) {
        app.ConcessionOnFeeStructureController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.AdmissionFeeDepositController')) {
        app.AdmissionFeeDepositController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ClassBranchMasterController')) {
        app.ClassBranchMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.ImageController')) {
        app.ImageController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AdminPhotoGalleryController'))
    {
        app.AdminPhotoGalleryController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AdminPhotoUploadingController')) {
        app.AdminPhotoUploadingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BannerMasterController')) {
        app.BannerMasterController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.ContactUsContentMasterController')) {
        app.ContactUsContentMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentAttendanceSubjectWiseController')) {
        app.StudentAttendanceSubjectWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UserMobilePermissionController')) {
        app.UserMobilePermissionController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.MobileRoleOptionController')) {
        app.MobileRoleOptionController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeAttendenceDateWiseReportController')) {
        app.EmployeeAttendenceDateWiseReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EventSliderMasterController')) {
        app.EventSliderMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeAttendanceMonthWiseReportController')) {
        app.EmployeeAttendanceMonthWiseReportController($scope, $filter, $element, myService)
    }
    if (IsFunctionDefined('app.StudentEnquiryReportController')) {
        app.StudentEnquiryReportController($scope, $filter, $element, myService)
    }
    if (IsFunctionDefined('app.StudentAttendanceSubjectWiseReportController')) {
        app.StudentAttendanceSubjectWiseReportController($scope, $filter, $element, myService)
    }
    if (IsFunctionDefined('app.ThemeMasterController')) {
        app.ThemeMasterController($scope, $filter, $element, myService)
    }
    if (IsFunctionDefined('app.StudentFeeStructureMappingController')) {
        app.StudentFeeStructureMappingController($scope, $element, $filter, $compile, myService);
    }
    if (IsFunctionDefined('app.FeeDepositController')) {
        app.FeeDepositController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentDateWiseFormSaleReportController')) {
        app.StudentDateWiseFormSaleReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentDateWiseFormReceiveReportController')) {
        app.StudentDateWiseFormReceiveReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentWiseConcessionMappingController')) {
        app.StudentWiseConcessionMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeeCollectionReportController')) {
        app.FeeCollectionReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PendingFeeHeadwiseReportController')) {
        app.PendingFeeHeadwiseReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeeDueVoucherController')) {
        app.FeeDueVoucherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SocialMediaPostController')) {
        app.SocialMediaPostController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeesReceiptCancellationController')) {
        app.FeesReceiptCancellationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ConceptMasterController')) {
        app.ConceptMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SyllabusBookMasterController')) {
        app.SyllabusBookMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookChapterMasterController')) {
        app.BookChapterMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ClassWiseSubjectWiseBookController')) {
        app.ClassWiseSubjectWiseBookController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ConceptChapterMappingController')) {
        app.ConceptChapterMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SocialMediaPostReportController')) {
        app.SocialMediaPostReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ShiftWiseClassWisePeriodMasterController')) {
        app.ShiftWiseClassWisePeriodMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ExamSubjectTeacherMappingController')) {
        app.ExamSubjectTeacherMappingController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.EmployeeAttendanceMonthlyReportController')) {
        app.EmployeeAttendanceMonthlyReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CreateQuestionsController')) {
        app.CreateQuestionsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeAttendanceMonthlyInAndOutReportController')) {
        app.EmployeeAttendanceMonthlyInAndOutReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentClassWiseAdmissionReportController')) {
        app.StudentClassWiseAdmissionReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentDateWiseAdmissionReportController')) {
        app.StudentDateWiseAdmissionReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeLeaveStatusReportController')) {
        app.EmployeeLeaveStatusReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UserMobileRoleAssignmentsController')) {
        app.UserMobileRoleAssignmentsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.HomeWorkReportController')) {
        app.HomeWorkReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentSessionWiseAdmissionReport')) {
        app.StudentSessionWiseAdmissionReport($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.VerifyHomeworkDetailsController')) {
        app.VerifyHomeworkDetailsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PendingFeeRegisterReportController')) {
        app.PendingFeeRegisterReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentFeeAdjustmentController')) {
        app.StudentFeeAdjustmentController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AdminVideoUploadController')) {
        app.AdminVideoUploadController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.AdminMediaGalleryController')) {
        app.AdminMediaGalleryController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.BankReconciliationController')) {
        app.BankReconciliationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeeDueVoucherCancellationController')) {
        app.FeeDueVoucherCancellationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RegistrationFeePostingController')) {
        app.RegistrationFeePostingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AdminBankReconciliationController')) {
        app.AdminBankReconciliationController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.DocsAndInformationController')) {
        app.DocsAndInformationController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.MinimumeWagesMasterController')) {
        app.MinimumeWagesMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PredefineParametersController')) {
        app.PredefineParametersController($scope, $element, $filter, myService);
    }    
    if (IsFunctionDefined('app.ChapterTopicMappingController')) {
        app.ChapterTopicMappingController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.TopicSubTopicMappingController')) {
        app.TopicSubTopicMappingController($scope, $element, $filter, myService);
    } 
    
    if (IsFunctionDefined('app.VehicleTypeMasterController')) {
        app.VehicleTypeMasterController($scope, $element, $filter, myService);
    }

    if (IsFunctionDefined('app.VehicleOwnerMasterController')) {
        app.VehicleOwnerMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.VehicleStoppageMasterController')) {
        app.VehicleStoppageMasterController($scope, $element, $filter, myService);
    } 
    
    if (IsFunctionDefined('app.ExamMasterController')) {
        app.ExamMasterController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.MarkingSchemeMasterController')) {
        app.MarkingSchemeMasterController($scope, $element, $filter, myService);
    } 

    if (IsFunctionDefined('app.HOBioMetricRegistrationMasterController'))
    {
        app.HOBioMetricRegistrationMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.HOEmployeeAttendanceDateWiseController')) {
        app.HOEmployeeAttendanceDateWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ApprovedNotificationsController'))
    {
        app.ApprovedNotificationsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TopSocialMedaiLinkController')) {
        app.TopSocialMedaiLinkController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SidebarLinkController')) {
        app.SidebarLinkController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.HOBioMetricRegistrationMasterController'))
    {
        app.HOBioMetricRegistrationMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.HOEmployeeAttendanceDateWiseController')) {
        app.HOEmployeeAttendanceDateWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ApprovedNotificationsController'))
    {
        app.ApprovedNotificationsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeeBillReportController')) {
        app.FeeBillReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ResourceMasterController')) {
        app.ResourceMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentVehicleRouteMappingController')) {
        app.StudentVehicleRouteMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.VehicleMasterController')) {
        app.VehicleMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.VehicleRouteMappingController')) {
        app.VehicleRouteMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TopSocialMedaiLinkController')) {
        app.TopSocialMedaiLinkController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SyllabusCoverageController')) {
        app.SyllabusCoverageController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherWorkLoadReportController')) {
        app.TeacherWorkLoadReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AdminPhotoMediaController')) {
        app.AdminPhotoMediaController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FeeConcessionChartReportController')) {
        app.FeeConcessionChartReportController($scope, $element, $filter, myService);
    }    
    if (IsFunctionDefined('app.DeviationClassWiseSubjectWiseReportController')) {
        app.DeviationClassWiseSubjectWiseReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UserRoleReportController')) {
        app.UserRoleReportController($scope, $element, $filter, myService);
    }    
    if (IsFunctionDefined('app.LaserOpeningController')) {
        app.LaserOpeningController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LaserOpeningController')) {
        app.LaserOpeningController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LedgerOpeningController')) {
        app.LedgerOpeningController($scope, $element, $filter, myService);
    }   
    if (IsFunctionDefined('app.EnquiryRegAdmReportController')) {
        app.EnquiryRegAdmReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketTypeMasterController')) {
        app.TicketTypeMasterController($scope, $element, $filter, myService);
    }    
    if (IsFunctionDefined('app.TicketStatusMasterController')) {
        app.TicketStatusMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketGenerateController')) {
        app.TicketGenerateController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketResponseController')) {
        app.TicketResponseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketDashboardLavel2Controller')) {
        app.TicketDashboardLavel2Controller($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketResponseViewController')) {
        app.TicketResponseViewController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TicketDashboardLavel1Controller')) {
        app.TicketDashboardLavel1Controller($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.FareMasterController')) {
        app.FareMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DriverDetailMasterController')) {
        app.DriverDetailMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.VehicleReportController')) {
        app.VehicleReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RouteMasterController')) {
        app.RouteMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentAttendanceDateWiseReportController')) {
        app.StudentAttendanceDateWiseReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ObservationCriteriaMasterController')) {
        app.ObservationCriteriaMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InterviewRoundMasterController')) {
        app.InterviewRoundMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StaffAttendanceSummaryReportController'))
    {
        app.StaffAttendanceSummaryReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GeneralLedgerMasterTempController')) {
        app.GeneralLedgerMasterTempController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LedgerRequestDashBoardController')) {
        app.LedgerRequestDashBoardController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.GeneralLedgerMasterRelationshipWiseController')) {
        app.GeneralLedgerMasterRelationshipWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.EmployeeAttendancePunchLogInAndOutReportController'))
    {
        app.EmployeeAttendancePunchLogInAndOutReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryUnitMasterController')) {
        app.InventoryUnitMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryItemGroupMasterController')) {
        app.InventoryItemGroupMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryItemCategoryMasterController')) {
        app.InventoryItemCategoryMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryCommodityMasterController')) {
        app.InventoryCommodityMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryItemMasterController')) {
        app.InventoryItemMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryModelMasterController')) {
        app.InventoryModelMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryItemWiseRateDetailsController')) {
        app.InventoryItemWiseRateDetailsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryReportController')) {
        app.InventoryReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryMaterialInwardEntryController')) {
        app.InventoryMaterialInwardEntryController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryMaterialApprovedController')) {
        app.InventoryMaterialApprovedController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AccordianAlbumController')) {
        app.AccordianAlbumController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AccordianDetailController')) {
        app.AccordianDetailController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ExamStatusMasterController')) {
        app.ExamStatusMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ExamStructureHeadController')) {
        app.ExamStructureHeadController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ExamGroupToExamController')) {
        app.ExamGroupToExamController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ReportCardComponentMasterController')) {
        app.ReportCardComponentMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SkillTypeMasterController')) {
        app.SkillTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SkillGroupMasterController')) {
        app.SkillGroupMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SkillNameMasterController')) {
        app.SkillNameMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SkillGradeMasterController')) {
        app.SkillGradeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ScholasticGroupMappingController')) {
        app.ScholasticGroupMappingController($scope, $element, $filter, myService, $q);
    }
    if (IsFunctionDefined('app.CoScholasticGroupMappingController')) {
        app.CoScholasticGroupMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherAssignMarkEntrySkillMasterController')) {
        app.TeacherAssignMarkEntrySkillMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.TeacherAssignMarkEntryCoSkillMasterController')) {
        app.TeacherAssignMarkEntryCoSkillMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SMSTemplateMasterController')) {
        app.SMSTemplateMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.SMSSubjectMasterController')) {
        app.SMSSubjectMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.ComposeSMSController')) {
        app.ComposeSMSController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.MonthlySchoolReportController')) {
        app.MonthlySchoolReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentAttendanceMonthlyReportController')) {
        app.StudentAttendanceMonthlyReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CashDepositInBankController'))
    {
        app.CashDepositInBankController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AlmeraMasterController')) {
        app.AlmeraMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.RackMasterController')) {
        app.RackMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BinMasterController')) {
        app.BinMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AuthorMasterController')) {
        app.AuthorMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BindingMasterController')) {
        app.BindingMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookAccessoriesController')) {
        app.BookAccessoriesController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PublisherMasterController')) {
        app.PublisherMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookMasterController')) {
        app.BookMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LibSubjectGrpMasterController')) {
        app.LibSubjectGrpMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LibSubjectMasterController')) {
        app.LibSubjectMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookEntryLibController')) {
        app.BookEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookStockLibController')) {
        app.BookStockLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookIssueEntryLibController')) {
        app.BookIssueEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookReturnEntryLibController')) {
        app.BookReturnEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BindingIssueEntryLibController')) {
        app.BindingIssueEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BindingReturnEntryLibController')) {
        app.BindingReturnEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.WriteOffEntryLibController')) {
        app.WriteOffEntryLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookSearchLibController')) {
        app.BookSearchLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookIssueRegisterLibController')) {
        app.BookIssueRegisterLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookReturnRegisterLibController')) {
        app.BookReturnRegisterLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.LateFineMasterLibController')) {
        app.LateFineMasterLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AccessionSettingLibController')) {
        app.AccessionSettingLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UpdateAdmissionNoController')) {
        app.UpdateAdmissionNoController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.OnlineFeeDepositController')) {
        app.OnlineFeeDepositController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.OnlineFeePaymentReportController')) {
        app.OnlineFeePaymentReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentDetailUpdateController')) {
        app.StudentDetailUpdateController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.StudentSectionUpdateController')) {
        app.StudentSectionUpdateController($scope, $element, $filter, myService);
    } 
    if (IsFunctionDefined('app.InventoryIndentEntryController')) {
        app.InventoryIndentEntryController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.InventoryIndentApprovalController')) {
        app.InventoryIndentApprovalController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DefineRemarksController')) {
        app.DefineRemarksController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DefineKeywordController')) {
        app.DefineKeywordController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UploadPrincipalSignatureController')) {
        app.UploadPrincipalSignatureController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.UploadClassTeacherSignatureController')) {
        app.UploadClassTeacherSignatureController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.DefineExamSubjectWiseController')) {
        app.DefineExamSubjectWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.AssignStudentRollNumberController')) {
        app.AssignStudentRollNumberController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PrintAcknowledgementController')) {
        app.PrintAcknowledgementController($scope);
    }
    if (IsFunctionDefined('app.BodyContentNewController')) {
        app.BodyContentNewController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.PrintBarCodeLibController')) {
        app.PrintBarCodeLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeStudentAdmissionFormDetailsController')) {
        app.CollegeStudentAdmissionFormDetailsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeDocumentDetailsController')) {
        app.CollegeDocumentDetailsController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollgeAdmissionOutputController')) {
        app.CollgeAdmissionOutputController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryFormController')) {
        app.CollegeEnquiryFormController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquirySourceMasterController')) {
        app.CollegeEnquirySourceMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeCityAreaMasterController')) {
        app.CollegeCityAreaMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryTypeMasterController')) {
        app.CollegeEnquiryTypeMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryRegisterReportController')) {
        app.CollegeEnquiryRegisterReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeMonthlyEnquiryStatisticsReportController')) {
        app.CollegeMonthlyEnquiryStatisticsReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryDashBoradLevel1Controller')) {
        app.CollegeEnquiryDashBoradLevel1Controller($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryDashboardLavel2Controller')) {
        app.CollegeEnquiryDashboardLavel2Controller($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryDashboardLavel3Controller')) {
        app.CollegeEnquiryDashboardLavel3Controller($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryFollowUpFormController')) {
        app.CollegeEnquiryFollowUpFormController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeEnquiryFormForSocialMediaWebsiteController')) {
        app.CollegeEnquiryFormForSocialMediaWebsiteController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeSocialMediaPostReportController')) {
        app.CollegeSocialMediaPostReportController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.BookStockOpeningLibController')) {
        app.BookStockOpeningLibController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeAdmissionDateWisedetailController')) {
        app.CollegeAdmissionDateWisedetailController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeStudentAttendanceDateWiseController')) {
        app.CollegeStudentAttendanceDateWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeStudentAttendanceSubjectWiseController')) {
        app.CollegeStudentAttendanceSubjectWiseController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeSubjectGroupMasterController')) {
        app.CollegeSubjectGroupMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeSubjectMasterController')) {
        app.CollegeSubjectMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeCourseWiseSubjectMasterController')) {
        app.CollegeCourseWiseSubjectMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeCourseSettingController')) {
        app.CollegeCourseSettingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeCourseSubjectMappingWithTeacherController')) {
        app.CollegeCourseSubjectMappingWithTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeTeacherSettingController')) {
        app.CollegeTeacherSettingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeShiftMasterController')) {
        app.CollegeShiftMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeShiftCourseMappingController')) {
        app.CollegeShiftCourseMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeShiftPeriodsMappingController')) {
        app.CollegeShiftPeriodsMappingController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeDefineCourseTeacherController')) {
        app.CollegeDefineCourseTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeCourseWiseSubjectPriorityController')) {
        app.CollegeCourseWiseSubjectPriorityController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeTeacherBreakMasterController')) {
        app.CollegeTeacherBreakMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeRelativeOptionalSubjectController')) {
        app.CollegeRelativeOptionalSubjectController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeShiftWiseCourseWisePeriodMasterController')) {
        app.CollegeShiftWiseCourseWisePeriodMasterController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeGenTimeTableManualController')) {
        app.CollegeGenTimeTableManualController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeReplaceTeacherController')) {
        app.CollegeReplaceTeacherController($scope, $element, $filter, myService);
    }
    if (IsFunctionDefined('app.CollegeTeacherSubstitutionSuggestionsController')) {
        app.CollegeTeacherSubstitutionSuggestionsController($scope, $element, $filter, myService);
    }
}); 
function IsFunctionDefined(functionName) {
    if (eval("typeof(" + functionName + ") == typeof(Function)")) {
        return true;
    }
}