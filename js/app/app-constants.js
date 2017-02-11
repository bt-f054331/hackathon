'use strict'
var wealthConstants = angular.module( 'wealthConstants', [] );

var appconfig = {
    timeouts : {
        initialLoad : 2000,
        serviceLoader : 500,
        accessibiltyLoad : 500,
        serviceCallWait : 12000,
        slideTop : 10
    }
}

wealthConstants.constant( 'appconfig', appconfig );