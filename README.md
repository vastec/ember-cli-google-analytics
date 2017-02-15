# ember-cli-multi-google-analytics

Plugin for ember-cli that injects Google Analytics tracking code into HTML content.

## This is a fork

This is a fork of very good solution for injecting Google Analytics script: https://github.com/pgrippi/ember-cli-google-analytics

So everything works exactly the same like in that project.

## What's different

It allows you to use multiple trackers on the same site.

To make it happen you need to specify a new tracker in your `config/environment.js` file, like this:

```javascript
ENV.googleAnalytics = {
  webPropertyId: 'DEFAULT TRACKER ID',
  additionalTrackers: [{
    webPropertyId: 'ADDITIONAL TRACKER ID',
    name: 'trackerName'
  }]
};
```

Then you use it in your application this way for example:

```javascript
if (isPresent(window.ga)) {
  window.ga('trackerName.send', 'pageview', {
    page: '/special-page',
    title: 'Special Page tracked by additional tracker'
  });
}
```

So... make sure that `window.ga` is available in your app with `isPresent` helper to avoid errors.

## What's next

Plan:
- make service that is a good proxy for `window.ga` object and move the responsibility for checking if script is injected to that service
- update to more recent `ember-cli` version
- write some tests
