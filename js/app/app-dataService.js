'use strict'
var wealthDataServices = angular.module( 'wealthDataServices', [
    'ngResource', 'wealthConstants'
] );

wealthDataServices.factory( 'wpDataService', [
    '$http', '$q', '$window', 'appconfig', function ( $http, $q, $window, appconfig ) {
        var getDataService = function ( url ) {
            var request = $http( {
                method : 'get',
                url : url,
                timeout : appconfig.timeouts.serviceCallWait
            } );
            return ( request.then( handleSuccess, handleError ) );
        };

        var postDataService = function ( url, data, serviceType ) {
            var request = $http( {
                method : 'post',
                url : url,
                timeout : appconfig.timeouts.serviceCallWait,
                contentType : 'application/json',
                data : data
            } );
            return ( request.then( handleSuccess, handleError ) );
        };

        var handleError = function ( response ) {
            // The API response from the server should be returned
            // in a
            // nomralized format. However, if the request was not
            if ( response.status === 403 || response.status === 401 ) {
                return ( JSON.parse( '{"version":"1.00","status":1,"errors":{"global":["unauthonticated"]}}' ) );
            } else {
                return ( JSON.parse( '{"version":"1.00","status":1,"errors":{"global":["SystemError"]}}' ) );
            }
        };

        // I transform the successful response, unwrapping the
        // application data
        // from the API response payload.
        var handleSuccess = function ( response ) {
            try {
                var responseData = JSON.parse( JSON.stringify( response.data ) );
                if ( responseData.status === 4 ) {
                    return ( JSON.parse( '{"version":"1.00","status":1,"errors":{"global":["unauthonticated"]}}' ) );
                } else {
                    return ( responseData );
                }
            } catch ( e ) {
                return ( JSON.parse( '{"version":"1.00","status":1,"errors":{"global":["SystemError"]}}' ) );
            }
        };

        return {
            getDataService : getDataService,
            postDataService : postDataService
        };
    }
] );