---
title:  "Use tabs with angular.js"
date:   2013-12-31 12:01:00
category: angularjs
tags: [angularjs, javascript, tabs]
---

_This page was first published on December 31th 2013 and was last updated on January 4th 2014. See the update <a href="#angulartab-update1">below</a>._

It's not complicated to create tabs with custom templates in angular but I had to research a bit so maybe you won't have to.

We will use [ngSwitch directive](http://docs.angularjs.org/api/ng.directive:ngSwitch) to check the `activeTab` variable and [ngInclude](http://docs.angularjs.org/api/ng.directive:ngInclude) to load the right template. In earlier versions of angular it was a bit simpler to do this because we were able to use the same tag for `ng-switch-when` and `ng-include` but it's not the case [since 1.2 RC3](https://github.com/angular/angular.js/issues/4731). You can read the explanation [here](https://github.com/angular/angular.js/issues/3584#issuecomment-26553693).

~~~html
<ul>
    <li class="pure-button"
        ng-class="{'pure-button-active': activeTab === 'signup'}"
        ng-click="activeTab = 'signup'">
        Sign Up
    </li>
    <li class="pure-button"
        ng-class="{'pure-button-active': activeTab === 'login'}"
        ng-click="activeTab = 'login'">
        Log in
    </li>
</ul>
<div class="tab-content">
    <div ng-switch="activeTab">
        <div ng-switch-when="signup">
            <div ng-include="'partials/signup.html'"></div>
        </div>
        <div ng-switch-when="login">
            <div ng-include="'partials/login-box.html'"></div>
        </div>
    </div>
</div>
~~~

Of course we will need a default value for `activeTab` so we set it in the controller.

~~~javascript
angular.module('frontendApp.controllers', []).
  controller('LoginSignUpCtrl', ['$scope', function($scope) {
      $scope.activeTab = 'login';
}]);
~~~

Angular is pretty smart here, it loads only the default tab and if you reopen an already visited tab it won't download the template again.

<a name="angulartab-update1"></a>
**Update (04 Jan 2014)**: The solution above works until we don't want to do other operations when a user switch to another tab. I modified the original code which turned out to be more readable.

~~~html
 <ul>
    <li class="pure-button"
        ng-class="{'pure-button-active': activeTab === 'signup'}"
        ng-click="switchTabTo('signup')">
        Sign Up
    </li>
    <li class="pure-button"
        ng-class="{'pure-button-active': activeTab === 'login'}"
        ng-click="switchTabTo('login')">
        Log in
    </li>
</ul>
<div class="tab-content">
    <div ng-include="tabTemplates[activeTab]">
</div>
~~~

~~~javascript
angular.module('frontendApp.controllers', []).
  controller('LoginSignUpCtrl', ['$scope', function($scope) {
      $scope.activeTab = 'login';
      $scope.tabTemplates = {
        login: 'partials/login-box.html',
        signup: 'partials/signup.html'
      };

      $scope.switchTabTo = function (tabId) {
        $scope.activeTab = tabId;
        /* other stuff to do */
      };
}]);
~~~
