angular
    .module('app')
    .service('UserService', function (Usuario, UpdateUsuario, LoginUsuario, LogoutUsuario, $q, toaster, $cookies) {

	var self = {
		'hasMore': true,
		'isSaving': false,
		'incomingUser': null,
		'sessionUser': {},
		'logged': false,
		'createUser': function (newUser) {
			var d = $q.defer();
			self.isSaving = true;
			Usuario.save(newUser).$promise.then(function (data) {
				console.log(data);
				self.isSaving = false;
				self.incomingUser = null;
				self.hasMore = true;
				// Usuario se registra y tambien se loguea en la bd
				self.sessionUser.userID = data.user._id;
				self.sessionUser.usuario = data.user;
				self.sessionUser.nombre = data.user.name.first;
				self.sessionUser.apellido = data.user.name.last;
				// self.sessionUser.telefono = data.user.telefono;
				// self.sessionUser.direccion = data.user.direccion;
				self.logged = true;
				$cookies.putObject('usuario', data.user);
				$cookies.put('user_id', data.user._id);
				$cookies.put('user_name', data.user.name.first);
				$cookies.put('user_last', data.user.name.last);
				// $cookies.put('user_telf', data.user.telefono);
				// $cookies.put('user_dir', data.user.direccion);
				toaster.pop('success', 'Registrado: ' + self.sessionUser.nombre + ' ' + self.sessionUser.apellido);
				d.resolve()
			});
			return d.promise;
		},
		'loginUser': function (user){
			var d = $q.defer();
			LoginUsuario.save(user).$promise.then(function (data) {
				if (data.user === null) {
					console.log("NOO");
				} else {
					console.log(data.user);
					self.sessionUser.userID = data.user._id;
					self.sessionUser.usuario = data.user;
					self.sessionUser.nombre = data.user.name.first;
					self.sessionUser.apellido = data.user.name.last;
					// self.sessionUser.telefono = data.user.telefono;
					// self.sessionUser.direccion = data.user.direccion;
					self.logged = true;
					$cookies.putObject('usuario', data.user);
					$cookies.put('user_id', data.user._id);
					$cookies.put('user_name', data.user.name.first);
					$cookies.put('user_last', data.user.name.last);
					// $cookies.put('user_telf', data.user.telefono);
					// $cookies.put('user_dir', data.user.direccion);
					console.log(self.sessionUser);
					toaster.pop('success', 'Sesión Iniciada: ' + self.sessionUser.nombre + ' ' + self.sessionUser.apellido);
					d.resolve();
				}
			});
			return d.promise;
		},
		'logoutUser': function (user){
			var d = $q.defer();
			LogoutUsuario.delete(user).$promise.then(function (data) {
				console.log("Sesion de usuario borrada");
				self.sessionUser = {};
				self.logged = false;
				$cookies.remove('usuario');
				$cookies.remove('user_id');
				$cookies.remove('user_name');
				$cookies.remove('user_last');
				$cookies.remove('user_telf');
				$cookies.remove('user_dir');
			});
			return d.promise;
		},
		'checkUserSession': function () {
			var userCookie = $cookies.get('usuario');
			console.log(userCookie);
			if (userCookie) {
				self.sessionUser.userID = $cookies.get('user_id');
				self.sessionUser.usuario = $cookies.get('usuario');
				self.sessionUser.nombre = $cookies.get('user_name');
				self.sessionUser.apellido = $cookies.get('user_last');
				self.sessionUser.telefono = $cookies.get('user_telf');
				self.sessionUser.direccion = $cookies.get('user_dir');
				self.logged = true;
			}
		},	
		'checkStatus' : function(){
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/orden","/pedidos","/detalleOrden"];
            if(self.in_array($state.go(),rutasPrivadas) && typeof(self.sessionUser.email) == "undefined")
            {
                $state.go("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(self.in_array("/login",rutasPrivadas) && typeof(self.sessionUser.email) != "undefined")
            {
                $state.go("/home");
            }
        },
        'in_array' : function(needle, haystack){	
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        },
		'updateUser': function (user) {
			var d = $q.defer();
			self.isSaving = true;
			user.$update().then(function () {
				self.isSaving = false;
				toaster.pop('success', 'Te actualizaste ' + user.name);
				d.resolve()
			});
			return d.promise;
		},
		'removeUser': function (user) {
			var d = $q.defer();
			self.isDeleting = true;
			user.$remove().then(function () {
				self.isDeleting = false;
				var index = self.platos.indexOf(user);
				self.platos.splice(index, 1);
				self.selectedPerson = null;
				toaster.pop('success', 'Deleted ' + user.name);
				d.resolve()
			});
			return d.promise;
		}

	};

	self.checkUserSession();

	return self;
});