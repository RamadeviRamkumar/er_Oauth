const router = require("express").Router();
const passport = require("passport");


router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect("https://www.google.com");
// });
router.get("/logout", (req, res) => {
	req.logout();
  
	// Clear the session
	req.session = null;
  
	// Redirect to Google logout URL
	const logoutURL = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${process.env.CLIENT_URL1}`;
	res.redirect(logoutURL);
  });

module.exports = router;
