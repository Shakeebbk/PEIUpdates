(function () {
    "use strict";

    var $,
        utils = {
            setCookie: function (name, value, expires, path, domain, secure) {
                var expiresDate;

                if (expires && (expires < 1000)) {
                    expiresDate = new Date();
                    expiresDate.setTime(expiresDate.getTime() + expires * 24 * 60 * 60 * 1000);
                }

                return document.cookie = name + "=" + encodeURIComponent(value) +
                    ((path) ? ";path=" + path : ";path=/") +
                    ((expires) ? ";expires=" + expiresDate.toUTCString() : "") +
                    ((domain) ? ";domain=" + domain : ";domain=.nytimes.com") +
                    ((secure) ? ";secure" : "");
            },
            getParameterByName: function (name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };

    // -----------------------------------------
    // ------      Select NYT4/NYT5       ------

    function isNyt5() {
        var nyt5meta = document.getElementsByName('sourceApp');
        var nytApps = {
            'nyt-v5': true,
            'blogs': true
        };
        return (typeof nyt5meta[0] !== "undefined") && (nyt5meta[0].getAttribute('content') in nytApps);
    }

    function run() {
        checkEduUser(function (segments) {
            var propensityEduCookie = false,
                i = 0;
            
            for (i; i <= segments.length; i++) {
                if (segments[i].edu) {
                    propensityEduCookie = segments[i].edu === "yes";
                    if (propensityEduCookie && segments[i].org_name ) {
                        propensityEduCookie = segments[i].org_name;
                    }
                    break;
                }
            }

            if (propensityEduCookie) {
                utils.setCookie("propensityEDU", propensityEduCookie, 30);
            }
        });
    }

    function checkEduUser(onEduCheckReady, callbackAlias) {
        var isCallbackDone = false;

        var newCallback = function (data) {
            var dataIsObject = (typeof data === 'object'); // true or false
            var dataStatus = (data && data.status && (data.status.toUpperCase() === 'OK')); // true, false or undefined
            var segments;
            isCallbackDone = true;
            if (dataIsObject && dataStatus) {
                // getting items in according with API response data structure
                segments = data.payload.segments;
                onEduCheckReady(segments);
            }
        };

        var testIp = utils.getParameterByName("testIp");
        var testIpQueryStr = "";

        if (testIp) {
            testIpQueryStr = "test_ip=" + testIp + "&";
        }

        var ajaxParams = {
            url: "http://cigawsloadbalancer-17715275.us-east-1.elb.amazonaws.com/r1/jp/ip_seg.rep?" + testIpQueryStr + "jsoncallback=?",
            data: null,
            cache: true,
            dataType: "jsonp"
        };

        if (callbackAlias) {
            if (callbackAlias === 'default') {
                callbackAlias = 'jsonFeedCallback';
            }
            window[callbackAlias] = newCallback;
            ajaxParams.jsonpCallback = callbackAlias;
        } else {
            ajaxParams.success = newCallback;
        }

        $.ajax(ajaxParams); // NOTE: shared instance
    }

    if (isNyt5()) {
        require(['foundation/main', 'jquery/nyt'], function (main, jQuery) {
            $ = jQuery;
            run();
        });
    } else {
        $ = window.NYTD && window.NYTD.jQuery || window.jQuery;
        run();
    }
})();