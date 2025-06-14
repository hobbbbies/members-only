const bcrypt = require('bcryptjs');

// async function validPassword(password, hash, salt) {
async function validPassword(password, hash) {
    // const hashVerify = await bcrypt.hash(password, 10);
    // const hashverify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');
    // return hash === hashverify;
    const valid = await bcrypt.compare(password, hash)
    return valid;
}
async function genPassword(password) {
    // const salt = crypto.randomBytes(32).toString('hex');
    const genHash = await bcrypt.hash(password, 10);
    // var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');

    // return {
    //     salt: salt,
    //     hash: genHash
    // };
    return genHash;
}

/**
 * Middleware to check if the user is authenticated
 * If authenticated, continues to the next middleware/route handler
 * If not, redirects to login page
 */
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.status !== 'member') {
        return res.render('memberView', { title: 'Member-sign-up', user: req.user });
    }
    return next(); // User is authenticated, proceed to the next middleware/route handler
  }
  
  // User is not authenticated, redirect to login page
  res.redirect('/login'); // You can customize this redirect
}

/**
 * Middleware to check if the user is NOT authenticated
 * Useful for pages like login/register that should only be accessible to guests
 */
function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next(); // User is not authenticated, proceed to the next middleware/route handler
  }
  
  // User is authenticated, redirect to home or dashboard
  res.redirect('/'); // You can customize this redirect
}

module.exports = { validPassword, genPassword, isAuthenticated, isNotAuthenticated };
