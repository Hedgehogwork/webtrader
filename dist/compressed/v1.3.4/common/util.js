function isTick(a){return-1!=a.indexOf("t")}function isMinute(a){return-1!=a.indexOf("m")}function isHourly(a){return-1!=a.indexOf("h")}function isDaily(a){return-1!=a.indexOf("d")}function convertToTimeperiodObject(a){return{intValue:function(){return parseInt(a.replace("t","").replace("h","").replace("d","").trim())},suffix:function(){return a.replace(""+this.intValue(),"").trim().charAt(0)},timeInMillis:function(){var a=0;switch(this.suffix()){case"t":a=0;break;case"m":a=60*this.intValue()*1e3;break;case"h":a=60*this.intValue()*60*1e3;break;case"d":a=24*this.intValue()*60*60*1e3}return a},timeInSeconds:function(){return this.timeInMillis()/1e3},humanReadableString:function(){var a="";switch(this.suffix()){case"t":a="tick";break;case"m":a="minute(s)";break;case"h":a="hour(s)";break;case"d":a="day(s)"}return this.intValue()+" "+a}}}function isDataTypeClosePriceOnly(a){return!("candlestick"==a||"ohlc"==a)}function isSmallView(){var a=!1;return Modernizr&&(Modernizr.mq("all and (max-width: 600px)")||Modernizr.mq("all and (max-device-width: 600px)"))&&(a=!0),a}function getParameterByName(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))}function getObjects(a,b,c){var d=[];for(var e in a)a.hasOwnProperty(e)&&("object"==typeof a[e]?d=d.concat(getObjects(a[e],b,c)):e==b&&a[b]==c&&d.push(a));return d}