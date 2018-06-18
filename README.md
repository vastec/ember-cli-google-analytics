[![npm version](https://badge.fury.io/js/ember-cli-multi-google-analytics.svg)](https://badge.fury.io/js/ember-cli-multi-google-analytics)
[![Build Status](https://travis-ci.org/vastec/ember-cli-multi-google-analytics.svg?branch=master)](https://travis-ci.org/vastec/ember-cli-multi-google-analytics)
![ember-cli version](https://img.shields.io/badge/ember--cli-3.1.4-orange.svg)

ember-cli-multi-google-analytics
==============================================================================

Plugin for ember-cli that injects Google Analytics tracking code into HTML content.

## This is a fork

This is a fork of very good solution for injecting Google Analytics script: https://github.com/pgrippi/ember-cli-google-analytics

So everything works exactly the same like in that project.

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-multi-google-analytics
```

Usage
------------------------------------------------------------------------------

## What's different

The addon allows you to use multiple trackers on the same site.

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

Other stuff works exactly the same line in [ember-cli-google-analytics](https://github.com/pgrippi/ember-cli-google-analytics).

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

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-multi-google-analytics`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
