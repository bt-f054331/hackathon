'use strict'
var wealthConstants = angular.module( 'wealthConstants', [] );

var appconfig = {
	service : {
        questions : 'json/questions.json',
		message: 'json/message.json'
    },
    timeouts : {
        initialLoad : 2000,
        serviceLoader : 500,
        accessibiltyLoad : 500,
        serviceCallWait : 12000,
        slideTop : 10
    }
}

wealthConstants.constant( 'appconfig', appconfig );