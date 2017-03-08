// middleware function to see if the user is authenticated
function isLoggedInMiddleware () {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			console.log('El usuario esta logueado adooooo');
        	console.log(req.user);
			return next()
		}
		res.redirect('/')
	}
}

module.exports = {
	isLoggedInMiddleware
}
