'use strict';

var CustomObjMgr = require('dw/object/CustomObjectMgr');
var CacheMgr = require('dw/system/CacheMgr');

/**
 * Function to pull the JSON config from Cache. If an entry isn't found in cache -- save one in cache.
 * @returns {object} : value from cache
 */
function enableMiniCart(requestLocale){
    var cache = CacheMgr.getCache( 'JSONConfig' );
    var jsonConfigString = cache.get( "JSONConfigValue", function loadSiteConfiguration() {return cacheLoader();} );
    var enableMiniCart;
    if(jsonConfigString){
        var jsonObj = JSON.parse(jsonConfigString);
        var localesArray = jsonObj.locales;
        if (Array.isArray(localesArray) && localesArray.length) {
            for(i=0; i< localesArray.length; i++){
                var localeConfigObject = localesArray[i];
                if(localeConfigObject && localeConfigObject.locale && localeConfigObject.locale === requestLocale){
                    enableMiniCart = localeConfigObject.enableMiniCart;
                    break;
                }    
            }
        }
    }
    return enableMiniCart;
}

/**
 * Callback function which is used if an entry does not exist in cache. This method will pull the JSON from custom object.
 * @returns {string} : JSON string from custom object
 */
function cacheLoader(){
    var configJsonObject = CustomObjMgr.getCustomObject("CustomCacheDemo", "1");
    if(configJsonObject && configJsonObject.custom.JSONConfig){
        return configJsonObject.custom.JSONConfig;
    }else{
        return;
    }
}

module.exports = {
    enableMiniCart:enableMiniCart
}