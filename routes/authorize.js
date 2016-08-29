let express = require('express');
let router = express.Router();

/*
 * This path is used for account linking. The account linking call-to-action
 * (sendAccountLinking) is pointed to this URL.
 *
 */
router.get('/authorize', (req, res) => {
  let accountLinkingToken = req.query['account_linking_token'];
  let redirectURI = req.query['redirect_uri'];

  // Authorization Code should be generated per user by the developer. This will
  // be passed to the Account Linking callback.
  let authCode = "1234567890";

  // Redirect users to this URI on successful login
  let redirectURISuccess = `${redirectURI}&authorization_code=${authCode}`;

  res.render('authorize', {
    accountLinkingToken: accountLinkingToken,
    redirectURI: redirectURI,
    redirectURISuccess: redirectURISuccess
  });
});


module.exports = router;
