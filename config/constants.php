<?php
/* --- CONSTANTES GLOBALES --- */

/* DIRECTORIOS DEV */
define("ROOT", $_SERVER["DOCUMENT_ROOT"] . "/mdr/mdr");
define("ROOT_URL", $_SERVER["SERVER_NAME"] . "/mdr/mdr");
define("PROFILE_PIC_PATH", $_SERVER["DOCUMENT_ROOT"] . "/mdr_profile_pics/");

/* DIRECTORIOS PRD */
//define("ROOT", $_SERVER["DOCUMENT_ROOT"] . "/..");
//define("ROOT_URL", $_SERVER["SERVER_NAME"] . "/");
//define("PROFILE_PIC_PATH", $_SERVER["DOCUMENT_ROOT"] . "/../mdr_profile_pics/");

/* SESSION */
define("SESSION_TIMEOUT", 900);	// En segundos

/* REGEX */
define("REGEX_PROPERTIES_KEYS", '/^[a-zA-Z0-9áàÁÀéèÉÈíìÍÌóòÓÒúùÚÙñÑäëïöüÄËÏÖÜÇç@®£©°ß#$%&*+~\.,;:=¡!¿?\"\’\`\´\'\^\/|_\-\\\[\]\{\}\(\)\<\>\s]+$/');
define("REGEX_PROPERTIES_VALUES", '/^$|^[a-zA-Z0-9áàÁÀéèÉÈíìÍÌóòÓÒúùÚÙñÑäëïöüÄËÏÖÜÇç@®£©°ß#$%&*+~\.,;:=¡!¿?\"\’\`\´\'\^\/|_\-\\\[\]\{\}\(\)\<\>\s]+$/');

/* HTTP REQUESTS RESPONSES */

// USER
define("USER_ALREADY_LOGGED_IN", "El usuario ya se encuentra logueado en el sistema");
define("INVALID_USERNAME_FORMAT", "El nombre de usuario no tiene un formato válido");
define("USER_LOCKED", "El usuario está BLOQUEADO");
define("USER_UNLOCKED", "Usuario desbloqueado con éxito");
define("PASSWORD_EQUAL_USER", "El password no puede ser igual al nombre de usuario");
define("USER_CREATED", "Usuario creado satisfactoriamente");
define("USER_ALREADY_EXISTS", "El nombre de usuario que desea crear ya existe. Por favor, intente con otro");
define("USER_DOESNOT_EXISTS", "Usuario inexistente");
define("USER_NOT_LOGGED_IN", "No se encuentra logueado en el sistema");
define("USER_WAS_NOT_DELETED", "Error: No fue posible eliminar el usuario");
define("USER_DELETED", "El usuario fue eliminado exitosamente");
define("INVALID_CREDENTIALS", "Las credenciales que ha ingresado son incorrectas");
define("LOGIN_SUCCESSFUL", "Usuario autenticado exitosamente");
define("LOGOUT_SUCCESSFUL", "Sesión cerrada exitosamente");
define("INVALID_PASSWORD_FORMAT", "El password ingresado no tiene un formato válido");
define("CHANGE_PASSWORD", "El usuario debe cambiar el password");
define("PASSWORD_IDENTICAL", "El nuevo password debe ser distinto del actual");
define("PASSWORD_CHANGED", "El password ha sido cambiado exitosamente");
define("ALREADY_UNLOCKED", "Imposible realizar la acción. El usuario ya se encuentra desbloqueado");
define("ALREADY_LOCKED", "Imposible realizar la acción. El usuario ya se encuentra bloqueado");
define("INSUFFICIENT_PRIVILEGES", "Lo siento. No tiene permisos suficientes para realizar esta acción.");
define("NO_ROLES_CREATED", "Error. No existen roles creados en el sistema");
define("ROLE_DOESNOT_EXISTS", "El rol especificado no existe");
define("SAME_ROL", "El usuario ya tiene el rol que desea asignar");
define("ROLE_ASSIGNED", "El rol fue asignado exitosamente");
define("CANNOT_DELETE_YOURSELF", "El usuario no puede borrarse a sí mismo");
define("CANNOT_LOCK_YOURSELF", "El usuario no puede bloquearse a sí mismo");
define("MAP_NOT_ALLOWED", "No puede visualizar su red. Su usuario no posee un Nodo asociado.");
define("NODE_ALREADY_USED", "El nodo que desea utilizar, ya se encuentra asignado a un usuario");

// HTTP
define("INVALID_CMD", "El cmd no es válido");
define("WRONG_REQUEST_METHOD", "Método solicitado erróneo");
define("PARAM_NOT_FOUND", "Faltan parámetros");
define("INVALID_PARAM", "Parámetros inválidos");

// INTERNAL ERRORS
define("INVALID_DB", "Base de datos especificada es inválida");
define("INTERNAL_ERROR", "Se ha producido un error interno");
define("DB_INTERNAL_ERROR", "Error inesperado en la consulta a la base de datos.");

// NEO4J
define("WRONG_NETWORK_LEVEL", "El nivel de relaciones ingresado es incorrecto");
define("WRONG_NODE_ID", "El ID de nodo solicitado es incorrecto");
define("NODE_DOESNOT_EXIST", "El nodo especficado no existe");
define("TYPE_NODE_NOT_EXIST", "No existe el tipo de Nodo que se desea crear");
define("TYPE_NODE_SEARCHED_NOT_EXIST", "No existe el tipo de Nodo que se desea buscar");
define("ORDER_BY_NOT_EXIST", "El order establecido no existe, seleccione otro tipo de order");
define("NODE_CREATED_OK", "El Nodo se ha creado correctamente");
define("NODE_EDITED_OK", "El Nodo se ha editado correctamente");
define("UNKNOWN_NODE_ID", "El id del Nodo no fue correctamente proporcionado");
define("NODE_DELETED_OK", "El Nodo se ha borrado correctamente");
define("FAILED_UPLOAD_NODE_IMG", "El nodo se ha creado correctamente. Por favor intente subir la imagen en otro momento");
define("FAILED_DELETE_NODE_IMG", "No se ha podido borrar la imagen del nodo, por favor intente borrar el nodo en otro momento");
define("PROPERTY_NOT_ERASABLE", "Imposible editar el Nodo, el atributo Nombre o Apellido no es posible eliminarlo");
define("INVALID_LABEL", "El tipo de Nodo proporcionado no es válido");
define("INVALID_NAME_NODE", "La propiedad Nombre sólo admite caracteres alfanuméricos, espacios, guión bajo y un máximo de 50 caracteres");
define("INVALID_SURNAME_NODE", "La propiedad Apellido solo admite caracteres alfanuméricos, espacios, guión bajo y un máximo de 50 caracteres");
define("RELATION_CREATED_OK", "La Relación se ha creado correctamente");
define("RELATION_EDITED_OK", "La Relación se ha editado correctamente");
define("UNKNOWN_RELATION_ID","El id de la Relación no fue correctamente proporcionado");
define("RELATION_DELETED_OK", "La Relación se ha borrado correctamente");
define("RELATION_TYPE_CREATED_OK", "El Tipo de Relación se ha creado correctamente");
define("RELATION_TYPE_EDITED_OK", "El Tipo de Relación se ha editado correctamente ");
define("RELATION_TYPE_DELETED_OK", "El Tipo de Relación se ha borrado correctamente");
define("RELATION_TYPE_EXIST","Imposible borrar el Tipo de Relación, existe una Relación de este tipo entre dos Nodos");
define("DUPLICATE_RELATIONSHIP_TYPE", "No se ha podido crear el Tipo de Relación porque ya existe");
define("RELATION_TYPE_NOT_EXIST", "El Tipo de Relación que se desea editar no existe");
define("INVALID_RELATION_TYPE", "El tipo de Relación proporcionada no es válida");
define("IMPOSSIBLE_GENERATED_RELATION_TYPE", "No es posible generar el Tipo de Relación, la descripción proporcionada no es válida");
define("INVALID_DESCRIPTION_RELATION_TYPE", "La descripción del Tipo de Relación no es válida");
define("RELATION_TYPE_NOT_FOUND", "El tipo de relación que se busca no se ha sido encontrado");
define("INVALID_IMAGE", "La imagen de perfil no es válida");
define("NOT_ALPHANUMERIC_RELATION_TYPE", "Los Tipos de Relación solo admiten caracteres alfanuméricos, guion bajo y espacios");
define("NOT_ALPHANUMERIC_PROPERTY_KEY", "El nombre de las propiedades solo admiten caracteres alfanuméricos, espacios y los caracteres especiales");
define("NOT_ALPHANUMERIC_PROPERTY_VALUE", "El valor de las propiedades solo admiten caracteres alfanuméricos, espacios y los caracters especiales");
define("RANKING_NOT_ZERO", "Al menos una ponderación debe ser mayor a cero");

/* IMAGES */
define("PERSON_IMG_NOT_FOUND", 'undefined.png');
define("ORGANIZATION_IMG_NOT_FOUND", 'undefined-organization.png');

/* mySQL VARIABLES */
define("MYSQL_SERVER", "127.0.0.1");
define("MYSQL_DB_NAME", "mdr");
define("MYSQL_DB_USER", "mdrWebApplication");
define("MYSQL_DB_PASSWORD", "mdr55hU!");
