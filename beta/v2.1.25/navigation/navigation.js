define(["exports","jquery","moment","lodash","../websockets/binary_websockets","../common/rivetsExtra","text!./navigation.html","../common/util","css!navigation/navigation.css"],function(a,b,c,d,e,f,g){"use strict";function h(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=a.getLandingCompany=a.updateDropdownToggles=void 0;var i=h(b),j=h(c),k=h(d),l=h(e),m=h(f),n=h(g),o=a.updateDropdownToggles=function(){i["default"]("#nav-menu .nav-dropdown-toggle").each(function(){i["default"](this).unbind("click").on("click",function(){var a=i["default"](this).next();a&&i["default"](a[0]).css("hidden"===i["default"](a[0]).css("visibility")?{visibility:"visible",opacity:1,display:"block"}:{visibility:"",opacity:"",display:""})})}),i["default"]("#nav-menu li").each(function(){var a=i["default"](this).attr("class")&&i["default"](this).attr("class").split(" ")[0];"account"!==a&&"login"!==a&&(i["default"](this).unbind("click").on("click",function(){"A"===i["default"](this)[0].lastChild.nodeName&&i["default"](this).trigger("mouseleave")}),i["default"](this).unbind("mouseleave").on("mouseleave",function(){var a=i["default"](this).find("ul");a&&i["default"](a[0]).css({visibility:"",opacity:"",display:""})}))})},p=function(a){if(a){var b={MLT:"Investment",MF:"Gaming",VRTC:"Virtual",REAL:"Real"};return a=a.match(/^(MLT|MF|VRTC)/i)?a.match(/^(MLT|MF|VRTC)/i)[0]:"REAL",b[a]+" Account"}},q=function(a){var b=a.find(".account-menu"),c=a.find("span.time"),d={show_login:local_storage.get("oauth")?!1:!0,login_disabled:!1,currency:"",logout_disabled:!1,account:{show:!1,type:"",id:"",balance:"",is_virtual:0},show_submenu:!1};d.oauth=local_storage.get("oauth")||[],d.oauth=d.oauth.map(function(a){return a.type=p(a.id),a}),d.showLoginWin=function(){d.login_disabled=!0,require(["oauth/login"],function(a){d.login_disabled=!1,a.init()})},d.toggleVisibility=function(a){d.show_submenu=a},d.logout=function(){l["default"].invalidate(),d.logout_disabled=!0},d.switchAccount=function(a){l["default"].switch_account(a)["catch"](function(a){i["default"].growl.error({message:a.message}),"SelfExclusion"===a.code&&l["default"].invalidate()})},m["default"].bind(b,d);var e=function(a){if(!d.currency){if(!local_storage.get("currency"))return;d.currency=local_storage.get("currency")}var b="0";b=a.authorize?a.authorize.balance:a.balance?a.balance.balance:"0",d.account.balance=formatPrice(b,d.currency)};l["default"].events.on("balance",e),l["default"].events.on("logout",function(){i["default"](".webtrader-dialog[data-authorized=true]").dialog("close").dialog("destroy").remove(),d.logout_disabled=!1,d.account.show=!1,d.show_login=!0,d.account.id="",d.account.balance="",d.account.type="",d.currency="",local_storage.remove("currency")}),l["default"].events.on("login",function(a){i["default"](".webtrader-dialog[data-authorized=true]").dialog("close").dialog("destroy").remove(),d.show_login=!1,d.account.show=!0,d.account.id=a.authorize.loginid,d.account.is_virtual=a.authorize.is_virtual,d.oauth=local_storage.get("oauth")||[],d.oauth=d.oauth.map(function(a){return a.type=p(a.id),a}),d.account.type=p(a.authorize.loginid),d.currency=a.authorize.currency,local_storage.set("currency",d.currency),e(a);0===a.authorize.is_virtual;s().then(function(a){d.show_financial_link="upgrade-mf"===a,d.show_realaccount_link="upgrade-mlt"===a;var b=Cookies.loginids();d.has_real_account=k["default"].some(b,{is_real:!0}),d.has_disabled_account=k["default"].some(b,{is_disabled:!0}),k["default"].some(b,{is_disabled:!0})&&i["default"].growl.error({fixed:!0,message:"<a href='https://www.binary.com/en/contact.html' target='_blank'>"+"Your account is locked, please contact customer support for more info.".i18n()+"</a>"})})}),i["default"](".login").on("login-error",function(){d.show_login=!0}),c.text(j["default"].utc().format("YYYY-MM-DD HH:mm")+" GMT"),setInterval(function(){c.text(j["default"].utc().format("YYYY-MM-DD HH:mm")+" GMT")},15e3)},r=function(a){a=a.find("#topbar").addBack("#topbar");var b={lang:{value:"en",name:"English"},confirm:{visible:!1},languages:[{value:"en",name:"English"},{value:"ar",name:"Arabic"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"id",name:"Indonesia"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"th",name:"Thai"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}]};b.onclick=function(a){b.confirm.visible=!1;var c=k["default"].find(b.languages,{value:a});c.value!=b.lang.value&&(local_storage.set("i18n",{value:c.value}),window.location.reload())},b.toggleVisibility=function(a){b.confirm.visible=a};var c=(local_storage.get("i18n")||{value:"en"}).value;b.lang=k["default"].find(b.languages,{value:c}),m["default"].bind(a[0],b),l["default"].cached.send({website_status:1}).then(function(a){var c=(a.website_status||{}).supported_languages||[];c=k["default"].map(c,function(a){return{value:a.toLowerCase()}});var d=k["default"].intersectionBy(b.languages,c,"value")||[];b.languages.length=0,d.forEach(function(a){return b.languages.push(a)})})["catch"](console.error)},s=a.getLandingCompany=function(){return l["default"].cached.authorize().then(function(a){return l["default"].cached.send({landing_company:a.authorize.country}).then(function(a){var b=a.landing_company.financial_company,c=a.landing_company.gaming_company,d=Cookies.loginids(),e=local_storage.get("oauth")[0];return e.is_mlt=/MLT/.test(e.id),c&&b&&"maltainvest"===b.shortcode?!k["default"].some(d,{is_mlt:!0})||!k["default"].some(d,{is_mf:!0})&&e.is_mlt?k["default"].some(d,{is_mlt:!0})?"upgrade-mf":"upgrade-mlt":"do-nothing":b&&"maltainvest"===b.shortcode&&!c?k["default"].some(d,{is_mf:!0})?"do-nothing":"upgrade-mf":k["default"].some(d,{is_mlt:!0})||k["default"].some(d,{is_mx:!0})||k["default"].some(d,{is_cr:!0})?"do-nothing":"upgrade-mlt"})})},t=a.init=function(a){var b=i["default"](n["default"]).i18n();i["default"]("body").prepend(b),q(b),r(b),require(["themes/themes"]),o(),a&&a(i["default"]("#nav-menu")),is_beta()&&b.find("a.config").closest("li").show()};a["default"]={init:t,getLandingCompany:s,updateDropdownToggles:o}});