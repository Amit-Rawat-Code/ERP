app.service("myservice0265", function ($http) {
    this.getSubject = function (SubjectGroupId) {
        debugger
        if (SubjectGroupId == null || SubjectGroupId == 'undefined') {
            SubjectGroupId = "-1";
        };
        var response = $http({
            url: '../Administrator/SubjectMasterList',
            method: 'POST',
            data: '{subjectgroupid:' + JSON.stringify(SubjectGroupId) + '}',
            dataType: 'json',
            contentType: 'application/json charset:utf-8'
        });
        return response;

    };

    this.getEmployee = function () {
        var response= $http({
            url: "../Employee/EditEmployeeRegistration",
            method: 'POST',
            data: '',
            dataType:'json',
            contentType:'application/json charset:utf-8'
        
        });
        return response;
    };
});