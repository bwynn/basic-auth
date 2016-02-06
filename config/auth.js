// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth': {
    'clientID': '1658219904438461',
    'clientSecret': 'ad81d2e4b3afa3c5b0c04f4e3e6291d2',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey': 'your-consumer-key-here',
    'consumerSecret': 'your-client-secret-here',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback'
  },

  'googleAuth': {
    'clientID': 'your-secret-clientID-here',
    'clientSecret': 'your-client-secret-here',
    'callbackURL': 'http://localhost:8080/auth/facebook/callback'
  }
};
