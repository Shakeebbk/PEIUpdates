define("ab/tests/bar1/bar1_intl_no_hover_0515/main",["ab/vendor/jquery","ab/libs/utils","ab/libs/tracking_strategies/delegation_tracking_strategy","ab/libs/tracking_facade","ab/libs/test/strict_test","ab/libs/variation","ab/libs/engine/ga","ab/libs/tracker/event_tracker","ab/tests/bar1/bar1_intl_no_hover_0515/config"],function(e,t,r,a,n,i,o,c,s){"use strict";var l=t.inherits(n,{name:"bar1_intl_no_hover_0515"}),_=e("#Bar1, #memberTools, .masthead-tools"),g=function(){e("head").append(t.Template("bar1_intl_no_hover_0515__common__style")),e.getScript("http://graphics8.nytimes.com/marketing/ADX/bar1/bar1_eventtracker_v1_3_inyt.js"),e.getScript("http://graphics8.nytimes.com/marketing/ADX/dynamic_currency/mkt_assets_country.js"),_.removeClass("hidden")},b=function(t){var r,a,n;for(a=s.options.campaignIds[t],r=0;r<a.length;r++)n=e(a[r].selector).attr("href")+a[r].code,e(a[r].selector).attr("href",n),m(a[r],n)},m=function(r,a){e(r.selector).click(function(){this.href!==a&&(this.href=t.appendParamsToUrl(this.href,{campaignId:r.code}))})},h=[{selector:"#nyt-button-sub",category:"button",action:"click",label:"subscribenowclick"}],d=t.inherits(i,{name:"control",changeDom:function(){g(),_.prepend(t.Template("bar1_intl_no_hover_0515__ctrl__html")),b("ctrl"),this.logger.info("control is applied")},setTracking:function(e){var t=[{selector:"#nyt-button-sub",category:"hover",action:"hover",eventType:"mouseover",label:"hovercarddisplay"},{selector:"#hovercard a",category:"button",action:"click",label:"digiclick"}];e.setTracking(t.concat(h))}}),p=t.inherits(i,{name:"Variation1",changeDom:function(){g(),_.prepend(t.Template("bar1_intl_no_hover_0515__var1__html")),b("var1"),this.logger.info("Variation1 is applied")},setTracking:function(e){e.setTracking(h)}}),u=new o({experimentId:s.experimentId,env:s.gaMode,variationId:o.getDebugVarFromUrl(s.gaMode)}),v=new c({expId:s.experimentId,testName:"INYT_Bar1_Apr15",module:"Bar1"},{isLiteTracking:!0});u.getUid().done(function(e){v.setAttrs({UIDplatform:"Google",globalUID:e})});var k=new l({variations:[d,p],trackerFacade:new a({gua:u,evt:v}),engine:u,trackers:s.trackers||{},trackingStrategy:r});return k.runExperiment(),k});
//# sourceMappingURL=main.js.map