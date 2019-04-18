import Raven from "raven-js";
function init() {
  Raven.config("https://31dd3da442c04c7a98baf75896b7ebfb@sentry.io/1406711", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
