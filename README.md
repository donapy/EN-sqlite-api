# testedge
 REST API
 
 Para instalar todas las dependencias:
 >npm i
 
 Para iniciar el servicio:
 >npm run start
 
 O para iniciar el servicio con nodemon:
 >npm run server
 
 --------------------------
 
 SQLite
 
 BD: testedge
 
 Tablas:
 
        *usuarios
        |__ci (PK, Unique, NotNull)
        |__password (NotNull)
        |__nombre (NotNull)
        |__apellido
        |__telefono
       
        *personas
        |__id (PK, AI)
        |__ci (Unique, NotNull)
        |__nombre
        |__apellido
        |__direccion
        |__telefono
        
--------------------------
 
 API
 
 >localhost:5000/api/ruta/request
 
 Ejemplo: 
 > localhost:5000/api/usuarios/newUsuario
 
 
 Rutas disponible:
 
 Los request con (P) significa que estan protegidos y que se necesita el token para realizar el request
 
        ruta 1: usuarios
                |__ /getUsuarios        => Obtiene todos los datos de los usuarios de la base de datos usuarios (P)
                |__ /getUsuario/ci      => Obtiene los datos de un especifico usuario de la base de datos usuarios mediante su ci (P)
                |__ /newUsuario         => Crea un nuevo registro en la base de datos usuarios
                |__ /updateUsuario/ci   => Actualiza los datos de un usuario especifico de la base de datos usuarios mediante su ci (P)
                |__ /deleteUsuario/ci   => Elimina un usuario especifico de la base de datos usuarios mediante su ci (P)
                |__ /loginUsuario       => Obtiene el token para realizar las demas solicitudes
                
                
        ruta 2: personas
                |__ /getPersonas        => Obtiene todos los datos de los usuarios de la base de datos usuarios (P)
                |__ /getPersona/ci      => Obtiene los datos de un especifico usuario de la base de datos usuarios mediante su ci (P)
                |__ /newPersona         => Crea un nuevo registro en la base de datos usuarios (P)
                |__ /updatePersona/ci   => Actualiza los datos de un usuario especifico de la base de datos usuarios mediante su ci (P)
                |__ /deletePersona/ci   => Elimina un usuario especifico de la base de datos usuarios mediante su ci (P)
 
