'use strict';

let merge = require('lodash-node/compat/objects/merge');
let googleAnalyticsConfigDefaults = {
  globalVariable: 'ga',
  tracker: 'analytics.js',
  webPropertyId: null,
  cookieDomain: null,
  cookieName: null,
  cookieExpires: null,
  displayFeatures: false,
  additionalTrackers: []
};

function additionalTrackers(config, gaConfig) {
  let configString = '';
  for (let i = 0, len = config.additionalTrackers.length; i < len; i++) {
    let at = config.additionalTrackers[i];
    gaConfig.name = at.name;

    configString += "" + config.globalVariable + "('create', '" + at.webPropertyId + "', " + stringifyGaConfig(gaConfig) + ");";
  }

  return configString;
}

function stringifyGaConfig(gaConfig) {
  if (Object.keys(gaConfig).length === 0) {
    return "'auto'";
  } else {
    return JSON.stringify(gaConfig);
  }
}

function analyticsTrackingCode(config) {
  let scriptArray,
      displayFeaturesString,
      gaConfig = {};

  if (config.cookieDomain != null) {
    gaConfig.cookieDomain = config.cookieDomain;
  }
  if (config.cookieName != null) {
    gaConfig.cookieName = config.cookieName;
  }
  if (config.cookieExpires != null) {
    gaConfig.cookieExpires = config.cookieExpires;
  }

  scriptArray = [
    "<script id='ember-cli-multi-google-analytics'>",
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){",
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),",
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)",
    "})(window,document,'script','https://www.google-analytics.com/analytics.js','" + config.globalVariable + "');",
    "",
    "" + config.globalVariable + "('create', '" + config.webPropertyId + "', " + stringifyGaConfig(gaConfig) + ");",
    "</script>"
  ];

  if (config.additionalTrackers.length > 0) {
    scriptArray.splice(-1, 0, additionalTrackers(config, gaConfig));
  }

  if (config.displayFeatures) {
    displayFeaturesString = "" + config.globalVariable + "('require', 'displayfeatures');";
    scriptArray.splice(-2, 0, displayFeaturesString);
  }

  return scriptArray;
}

function gaTrackingCode(config) {
  let scriptArray;

  scriptArray = [
    "<script id='ember-cli-multi-google-analytics'>",
    "var _gaq = _gaq || [];",
    "_gaq.push(['_setAccount', '" + config.webPropertyId + "']);",
    "_gaq.push(['_trackPageview']);",
    "",
    "(function() {",
    "  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;",
    "  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';",
    "  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);",
    "})();",
    "</script>"
  ];

  if (config.displayFeatures) {
    scriptArray.splice(-4, 1, "  ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';");
  }

  return scriptArray;
}

module.exports = {
  name: 'ember-cli-google-analytics',
  contentFor: function(type, config) {
    let googleAnalyticsConfig = merge({}, googleAnalyticsConfigDefaults, config.googleAnalytics || {});

    if (type === 'head' && googleAnalyticsConfig.webPropertyId != null) {
      let content;

      if (googleAnalyticsConfig.tracker === 'analytics.js') {
        content = analyticsTrackingCode(googleAnalyticsConfig);
      } else if (googleAnalyticsConfig.tracker === 'ga.js') {
        content = gaTrackingCode(googleAnalyticsConfig);
      } else {
        throw new Error('Invalid tracker found in configuration: "' + googleAnalyticsConfig.tracker + '". Must be one of: "analytics.js", "ga.js"');
      }

      return content.join("\n");
    }

    return '';
  }
};
