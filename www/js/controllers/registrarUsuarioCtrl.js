angular.module('starter')
  .controller('registrarUsuarioCtrl', function($scope, $rootScope, $ionicPopup, $state, $http) {
    $scope.userRegistro = {};
    $scope.controlDisabled = false;
    $scope.listaRoles = [];
    $scope.listaUsuarios = [];
    $scope.idCurrentId = null;

    $scope.init = function() {
      $scope.controlDisabled = false;
      $scope.obtenerRoles();
      $scope.obtenerUsuarios();
    };

    $scope.obtenerRoles = function() {
      $http.get($rootScope._host + "users/getRoles")
        .success(function(data) {
          if (data.state == 1) {
            $scope.listaRoles = data.data;
          }
        });
    };

    $scope.obtenerUsuarios = function() {
      $http.get($rootScope._host + "users/getUsers")
        .success(function(data) {
          if (data.state == 1) {
            $scope.listaUsuarios = data.data;
          }
        });
    };

    $scope.irAtras = function() {
      $scope.controlDisabled = true;
      $state.go("menu");
    };

    $scope.tratarUsuario = function() {

      if (!$scope.userRegistro.name) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique el nombre."
        });
        return;
      }

      if (!$scope.userRegistro.last_name) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique el apellido."
        });
        return;
      }

      if (!$scope.userRegistro.mail) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor verifique el correo electronico."
        });
        return;
      }

      if (!$scope.userRegistro.phone) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique el telefono."
        });
        return;
      }

      if (!$scope.userRegistro.rol_id.id) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique el tipo de usuario."
        });
        return;
      }

      var flag = false;

      for (var i = 0; i < $scope.listaUsuarios.length; i++) {
        if ($scope.userRegistro.mail == $scope.listaUsuarios[i].mail) {
          flag = true;
          $scope.updateUser();
          break;
        }
      }

      if (!flag) {
        $scope.createUser();
      }
    };

    $scope.createUser = function() {

      if (!$scope.userRegistro.password || !$scope.userRegistro.passwordConfirm) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique los campos de contraseña"
        });
        return;
      }

      if ($scope.userRegistro.password != $scope.userRegistro.passwordConfirm) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Las contraseñas no coinciden por favor revise."
        });
        return;
      }

      var confirmPopup = $ionicPopup.confirm({
        title: 'Crear Usuario',
        template: 'El correo de no se encuentra registrado, desea agregarlo?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.controlDisabled = true;
          var fileUploaded = angular.element(document.querySelector('#fileUploaded'));
          var flag = false;

          if (fileUploaded[0].files.length != 0 && $scope.userRegistro.rol_id.id == 2) {
            flag = true;
          }

          $scope.controlDisabled = true;

          var datosRegistro = {
            mail: $scope.userRegistro.mail,
            pass: $scope.userRegistro.password,
            name: $scope.userRegistro.name,
            last_name: $scope.userRegistro.last_name,
            phone: $scope.userRegistro.phone,
            plate: $scope.userRegistro.plate,
            rol_id: $scope.userRegistro.rol_id.id
          };

          var fd = new FormData();

          if (flag) {
            fd.append('file', fileUploaded[0].files[0]);
          }

          fd.append("data", JSON.stringify(datosRegistro));

          $http.post($rootScope._host + 'users/registerDelivery', fd, {
              withCredentials: false,
              headers: {
                'Content-Type': undefined
              },
              transformRequest: angular.identity
            })
            .success(function(data, status, headers, config) {
              $scope.controlDisabled = false;
              if (data.state == 1) {
                $scope.userRegistro = {};
                angular.element(document.querySelector('#fileUploaded'))[0].value = "";
                $scope.obtenerUsuarios();
                var alertPopup = $ionicPopup.alert({
                  title: 'Exito',
                  template: data.message
                });
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: data.message
                });
              }
            })
            .error(function(data) {
              $scope.controlDisabled = false;
            });
        }
      });
    }

    $scope.updateUser = function() {

      if ($scope.idCurrentId == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Seleccione el usuario que desea modificar'
        });
        return;
      };

      var confirmPopup = $ionicPopup.confirm({
        title: 'Modificar Usuario',
        template: 'El correo de ya se encuentra registrado, desea modificarlo?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.controlDisabled = true;
          var fileUploaded = angular.element(document.querySelector('#fileUploaded'));
          var flag = false;

          if (fileUploaded[0].files.length != 0 && $scope.userRegistro.rol_id.id == 2) {
            flag = true;
          }

          $scope.controlDisabled = true;
          var activo = 0;
          if ($scope.userRegistro.active) {
            activo = 1;
          }

          var fd = new FormData();

          if ($scope.userRegistro.rol_id.id == 2) {
            fd.append('file', fileUploaded[0].files[0]);
            fd.append("picture", 1);
          } else {
            fd.append("picture", 0);
          }

          fd.append("id", $scope.idCurrentId);
          fd.append("name", $scope.userRegistro.name);
          fd.append("last_name", $scope.userRegistro.last_name);
          fd.append("phone", $scope.userRegistro.phone);
          fd.append("active", activo);
          fd.append("rol_id", $scope.userRegistro.rol_id.id);
          fd.append("plate", $scope.userRegistro.plate);

          $rootScope.show();

          $http.post($rootScope._host + 'users/update_user', fd, {
              withCredentials: false,
              headers: {
                'Content-Type': undefined
              },
              transformRequest: angular.identity
            })
            .success(function(data, status, headers, config) {
              $rootScope.hide();
              $scope.controlDisabled = false;
              if (data.state == 1) {
                $scope.userRegistro = {};
                angular.element(document.querySelector('#fileUploaded'))[0].value = "";
                $scope.obtenerUsuarios();
                var alertPopup = $ionicPopup.alert({
                  title: 'Exito',
                  template: data.message
                });
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: data.message
                });
              }
            })
            .error(function(data) {
              $rootScope.hide();
              $scope.controlDisabled = false;
            });
        }
      });
    }

    $scope.gridClick = function(index) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Ver datos de usuario',
        template: 'Desea visualizar los datos del usuario seleccionado?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.userRegistro.mail = $scope.listaUsuarios[index].mail;
          $scope.userRegistro.name = $scope.listaUsuarios[index].name;
          $scope.userRegistro.last_name = $scope.listaUsuarios[index].last_name;
          $scope.userRegistro.phone = $scope.listaUsuarios[index].phone;
          $scope.userRegistro.plate = $scope.listaUsuarios[index].plate;
          $scope.userRegistro.passUser = $scope.listaUsuarios[index].pass;

          $scope.idCurrentId = $scope.listaUsuarios[index].id;

          $scope.userRegistro.active = $scope.listaUsuarios[index].active == '1' ? true : false;
          for (var i = 0; i < $scope.listaRoles.length; i++) {
            if ($scope.listaRoles[i].id == $scope.listaUsuarios[index].rol_id) {
              $scope.userRegistro.rol_id = $scope.listaRoles[i];
              break;
            }
          }
        }
      });
    };

    $scope.modificarPass = function() {
      if (!$scope.idCurrentId) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Seleccione el usuario que desea modificar'
        });
        return;
      };

      if (!$scope.userRegistro.password || !$scope.userRegistro.passwordConfirm) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Por favor indique los campos de contraseña"
        });
        return;
      };

      if ($scope.userRegistro.password != $scope.userRegistro.passwordConfirm) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Las contraseñas no coinciden por favor revise."
        });
        return;
      };

      var confirmPopup = $ionicPopup.confirm({
        title: 'Modificar Contraseña',
        template: 'Desea modificar la contraseña?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.controlDisabled = true;

          var data = {
            id: $scope.idCurrentId,
            newPass: $scope.userRegistro.password,
            oldPass: $scope.userRegistro.passUser
          };

          $http.put($rootScope._host + 'users/update_pass_admin', data)
            .success(function(data) {
              $scope.controlDisabled = false;
              if (data.state == "1") {
                $scope.userRegistro.password = "";
                $scope.userRegistro.passUser = "";

                var alertPopup = $ionicPopup.alert({
                  title: '',
                  template: data.message
                });
              } else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: data.message
                });
              }
            })
            .error(function(err) {
              $scope.controlDisabled = false;
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Ha ocurrido un error.'
              });
            });
        }
      });
    };
  })
