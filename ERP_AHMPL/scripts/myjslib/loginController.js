var myLoginApp = angular.module('myLoginApp', []);
myLoginApp.service("myLoginService", function ($http) {

    this.methode = function (methodType, virtualUrl, dataList) {

        var response = $http({
            method: methodType,
            url: virtualUrl,
            data: dataList,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json'
        });

        return response;
    };
});
myLoginApp.controller('myLoginController', function ($scope, myLoginService) {
    //$('#submit').prop('disabled', true);
    sessionStorage.clear();
    $('#txtUserName').focus();
    //$scope.GetUrl();

    $scope.SetDetailData = function (data) {
        $.each(data, function (i, item)
        {
            
            $scope.SchoolCode = item.DisplayCode;
            if (item.DisplayCode != null)
            {
                sessionStorage.setItem("displayCode", item.DisplayCode);
                sessionStorage.setItem("groupCode", item.GroupCode);
                sessionStorage.setItem("societyCode", item.SocietyCode);
                sessionStorage.setItem('schoolCode', item.SchoolCode);
                sessionStorage.setItem('branchCode', item.BranchCode);
                $('#submit').prop('disabled', false);
            }
            else {
                $('#submit').prop('disabled', true);
            }
        });
    };

    $scope.GetUrl = function () {

        var scurl = $(location).attr('host');

        var collectionobj = {};
        collectionobj.BranchUrl = scurl;
        

        var getDetails = myLoginService.methode('POST', '../api/LoginApi/ConnectionConnector', collectionobj);
        getDetails.then(function (response) {
            $scope.SetDetailData(response.data);
        });
    };

    $scope.PassWordEnterKey = function (event) {
        if (typeof (event.keyCode) === 'undefined') return;
        var keyCode = event.keyCode;
        if (keyCode == 13) {
            $scope.Login();
        }
    };
    
    $scope.Login = function () {
        
        if (isValidate()) {
            $('#btnLogin').html('<i class="fa fa-spinner fa-spin"></i>&nbsp; Please wait')
            $('#btnLogin').prop('disabled', true);
            var scurl = $(location).attr('host');

            var collectionobj = {};
            collectionobj.UserName = $scope.UserName;
            collectionobj.Password = $scope.Password;
            collectionobj.DisplayCode = sessionStorage.getItem("displayCode");
            collectionobj.GroupCode = sessionStorage.getItem("groupCode");
            collectionobj.SocietyCode = sessionStorage.getItem("societyCode");
            collectionobj.SchoolCode = sessionStorage.getItem("schoolCode");
            collectionobj.BranchCode = sessionStorage.getItem("branchCode");
            collectionobj.LastLoginWith = "W";
            var getDetails = myLoginService.methode('POST', '/api/LoginApi/UserAuthentication', collectionobj);

            getDetails.then(function (response) {
                if (response.data.length > 0) {
                    //debugger
                    sessionStorage.setItem('userid', response.data[0].UserId);
                    sessionStorage.setItem('profileName', response.data[0].UserName);
                    sessionStorage.setItem('loginTypeId', response.data[0].UserTypeId);
                    sessionStorage.setItem('loginAs', response.data[0].loginAs);
                    sessionStorage.setItem('LastLogin', response.data[0].LastLogin);
                    sessionStorage.setItem('sessionId', response.data[0].ActiveAcademicYearId);
                    sessionStorage.setItem('academicSession', response.data[0].ActiveAcademicYear);
                    sessionStorage.setItem('fyId', response.data[0].ActiveFinancialYearId);
                    sessionStorage.setItem('financialYear', response.data[0].ActiveFinancialYear);
                    sessionStorage.setItem('relationshipId', response.data[0].RelationshipId);
                    sessionStorage.setItem('SchoolName', response.data[0].SchoolName);
                    sessionStorage.setItem('schoolAddress', response.data[0].SchoolAddress);
                    sessionStorage.setItem('isHO', response.data[0].IsHO);
                    sessionStorage.setItem('isSchool', response.data[0].IsSchool);
                    sessionStorage.setItem('isCollege', response.data[0].IsCollege);
                    sessionStorage.setItem('isSociety', response.data[0].IsSociety);
                    sessionStorage.setItem('groupCode', response.data[0].GroupCode);
                    sessionStorage.setItem('societyCode', response.data[0].SocietyCode);
                    sessionStorage.setItem('societyName', response.data[0].SocietyName);
                    sessionStorage.setItem('schoolCode', response.data[0].SchoolCode);
                    sessionStorage.setItem('branchCode', response.data[0].BranchCode);
                    sessionStorage.setItem('code', response.data[0].Code);
                    sessionStorage.setItem('branchLogo', response.data[0].BranchLogo);
                    sessionStorage.setItem('designation', response.data[0].Designation);
                    sessionStorage.setItem('emailId', response.data[0].EmailId);
                    sessionStorage.setItem('mobileNo', response.data[0].MobileNo);

                    sessionStorage.setItem('schoolEmailId', response.data[0].SchoolEmailId);
                    sessionStorage.setItem('schoolContactNo', response.data[0].SchoolContactNo);
                    sessionStorage.setItem('schoolLiveWebSiteUrl', response.data[0].SchoolLiveWebSiteUrl);
                    sessionStorage.setItem('bankFeePayMode', response.data[0].BankFeePayMode);
                    sessionStorage.setItem('chqInfavourof', response.data[0].ChqInfavourof);
                    
                    
                    sessionStorage.setItem('affiliationNo', response.data[0].AffiliationNo);
                    sessionStorage.setItem('affiliationDate', response.data[0].AffiliationDate);
                    sessionStorage.setItem('schoolStatus', response.data[0].SchoolStatus);
                    sessionStorage.setItem('schoolNo', response.data[0].SchoolNo);
                    sessionStorage.setItem('srNo', response.data[0].SrNo);

                    var msg = response.data[0].Response;
                    $("#lblmsg").text(msg);

                    if (response.data[0].State == "1") {
                        $("#msgbox").attr("class", "box-v-g");

                        if (response.data[0].UserTypeId == '1' || response.data[0].UserTypeId == '2' || response.data[0].UserTypeId == '3' || response.data[0].UserTypeId == '4') {
                            window.location.href = '../DashBoard/QuickLinksDashBoard';
                        }
                        else {
                            window.location.href = '../DashBoard/GuardianDashBoard';
                        }
                    }
                    else {

                        $("#msgbox").attr("class", "box-v-r");
                        $('#btnLogin').html('Login');
                        $('#btnLogin').prop('disabled', false);
                    }

                }
            });
                $("#msgbox").fadeIn().delay(3000).fadeOut();
            };
    };

    $scope.FindWindow = function () {
        
        var inputs = $(".input-effect input");
        $.each(inputs, function (i, input) {
            if ($(this).hasClass("has-content") && $(this).val().length <= 0) {
                $(this).removeClass("has-content");
            } else {
                $(this).addClass("has-content");
            }
        })
    };

    $scope.hascontent = function (id) {  
        if ($(id).hasClass("has-content") && $(id).val().length <= 0) {
            $(id).removeClass("has-content");
        } else {
            $(id).addClass("has-content");
        }
    }

    $scope.RecoverPassword = function () {
        if (isValidate()) {
            $('#btnSubmit').html('<i class="fa fa-spinner fa-spin"></i>&nbsp; Please wait')
            $('#btnSubmit').prop('disabled', true);

            var getDetails = myLoginService.methode('POST', '../Login/RecoverPassword', '{username:' + JSON.stringify($scope.Username)+',mobileno:' + JSON.stringify($scope.MobileNo) + ',schoolcode:' + JSON.stringify($scope.SchoolCode) + '}');

            getDetails.then(function (response) {
                var data = response.data.replace(/"/g, "");
                var splitdata = data.split('$');
                if (splitdata[0] == '1') {
                    if (splitdata[1] == 'Email') {
                        $("#lblmsg").text("Password has been sent to your registered email.");
                    }
                    else if (splitdata[1] == 'Mobile') {
                        $("#lblmsg").text("Password has been sent to your registered mobile no.");
                    }

                    $("#msgbox").attr("class", "box-v-g");
                    $('#btnSubmit').html('Submit');
                    $('#btnSubmit').prop('disabled', false);

                    $scope.Username = "";
                    $scope.MobileNo = "";
                }
                else {
                    $("#lblmsg").html(splitdata[0]);
                    $("#msgbox").attr("class", "box-v-r");
                    $('#btnSubmit').html('Submit');
                    $('#btnSubmit').prop('disabled', false);
                }
            });

            $("#msgbox").fadeIn().delay(6000).fadeOut(function () { $("#lblmsg").html(''); });
        }
    };
});
