// Dynamic Currency Country Code (BAU)
// ~matt.milligan 20150324
// Calls ADX to determine country code for Dynamic Currency
//Included Currencies: Pound (UKP), Euro (EUR), Rupee (IND), Canadian Dollar (CAN), Australian Dollar (AUD), & US Dollar (USD) 

(function (global) {
	"use strict";

	var $;

	function isNyt5() {
		var nyt5meta = document.getElementsByName('sourceApp');
		var nytApps = {
			'nyt-v5': true,
			'blogs': true,
			'nytv': true
		};
		return (typeof nyt5meta[0] !== "undefined") && (nyt5meta[0].getAttribute('content') in nytApps);
	}

	if (isNyt5()) {
		require(['foundation/main'], function () {
			$ = require('jquery/nyt');
			adxrun();
		});
	} else {
		$ = window.NYTD && window.NYTD.jQuery || window.jQuery;
		adxrun();

	}

	function adxrun() {

		var loggingFlag = !!document.cookie.match(/abTestLogFlag/);
		var logToConsole = function (msg) {
			if (loggingFlag && console && msg && msg.length > 0) {
				console.log("INFO [Bar1] " + msg);
			}
		};



		var success = function (resp) {
			var creatives = '';
			if (!resp || !resp.ads) {
				error();
			}
			$.each(resp.ads, function (key, record) {
				logToConsole("Loading ADX Campaign -- " + key);
				creatives += record.creative;
			});

			$('body').append(creatives);
			$.getScript('http://graphics8.nytimes.com/marketing/ADX/dynamic_currency/mkt_assets_currency.js');
		};

		var error = function (jqXHR, textStatus) {
			var errorMsg = "ADX REMOTE " + textStatus;
			if (typeof jqXHR === 'object') {
				errorMsg += " -- Status: " + jqXHR.status + ' -- ' + jqXHR.statusText;
			}

		};

		$.ajax({
			url: 'http://www.nytimes.com/adx/bin/adxrun.html?v=3&jsonp=?',
			dataType: 'jsonp',
			timeout: 5000,
			data: {
				page: 'www.nytimes.com/LandingPage/AB',
				positions: 'data_country, data2, data3'
			},
			success: success,
			error: error
		});

	};
}(window));