// middleware function to see if the user is authenticated
function authenticationMiddleware () {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			console.log('El usuario esta logueado adooooo');
        	console.log(req.user);
			return next()
		}
		res.redirect('/')
	}
}
