const isLocal = window.location.hostname.match(
  /^(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)$/
);

function getConfig() {
  if (isLocal) {
    return {
      development: true,
      apiEndpoint: 'http://integration.atlasbeacon.com/api',
      //apiEndpoint: 'http://localhost:8000/api',
    };
  } else {
    return {
      development: false,
      apiEndpoint: '/api',
    };
  }
}

export const Config = getConfig();
