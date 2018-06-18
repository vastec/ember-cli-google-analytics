import { get, getWithDefault } from '@ember/object';
import { on } from '@ember/object/evented';
import Mixin from '@ember/object/mixin';
import ENV from '../config/environment';

export default Mixin.create({
  beforePageviewToGA: function (ga) {

  },

  pageviewToGA: on('didTransition', function(page, title) {
    var page = page ? page : this.get('url');
    var title = title ? title : this.get('url');

    if (get(ENV, 'googleAnalytics.webPropertyId') != null) {
      var trackerType = getWithDefault(ENV, 'googleAnalytics.tracker', 'analytics.js');

      if (trackerType === 'analytics.js') {
        var globalVariable = getWithDefault(ENV, 'googleAnalytics.globalVariable', 'ga');

        this.beforePageviewToGA(window[globalVariable]);

        window[globalVariable]('send', 'pageview', {
          page: page,
          title: title
        });
      } else if (trackerType === 'ga.js') {
        window._gaq.push(['_trackPageview']);
      }
    }
  })

});
