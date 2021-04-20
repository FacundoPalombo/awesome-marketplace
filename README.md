# 🚀 Awesome marketplace

- [🚀 Awesome marketplace](#-awesome-marketplace)
  - [Correr las pruebas](#correr-las-pruebas)
  - [Correr los ambientes de desarrollo](#correr-los-ambientes-de-desarrollo)
  - [Buildear el proyecto (TODO)](#buildear-el-proyecto-todo)
  - [Docs 📝](#docs-)


## Correr las pruebas
  Cada repo, server y client, tiene su script de coverage. Si bien  en el build se ejecutan. Puedes crear el reporte de coverage corriendo:
```node
  $ npm run coverage
```

## Correr los ambientes de desarrollo
  Para correr los ambientes de desarrollo en cada proyecto puedes utilizar

```node
  $ npm run dev
```

Webpack está configurado para que haga de proxy a las peticiones pasadas por los puertos locales de desarrollo.


## Buildear el proyecto (TODO)

Para buildear el proyecto, están provistas unas imagenes de docker que pueden correrse en multiples stages.
Este caso es para ejecutar el build de producción. 
Para comenzar, procura estar en el root del monorepo y ejecuta:

```bash

 $ docker build -t awesome-marketplace_client:prod \
 --target deploy ./client && \
 docker build -t awesome-marketplace_server:prod \
 --target prod ./server

```

Luego de ello, para hacer correr los containers ejecuta:

Para el cliente
```bash
  $ docker run -p 5004:80 awesome-marketplace_client:prod
```
Para el server
```bash
  docker run -p 5005:8080 awesome-marketplace_server:prod
```

Luego de utilizarlos para matar los procesos de docker puedes usar:

```bash
  docker container kill $(docker ps -q | grep "awesome-marketplace")
```
  ## Docs 📝
  Para ver los documentos de la api. Correr el servidor: `npm run dev || npm start` e ingresar a la ruta:
  ```http
    http://0.0.0.0/3001/api-docs/
  ```
- TODO: Faltan las configuraciones para inyectar las variables de entorno y sacarlas del process.env en el cliente y pasarlas al window.env. Por lo que todavía no se pueden comunicar las dos aplicaciones en el modo productivo. Pero se pueden correr en contenedores por separado a modo de pruebas.
- TODO2: Para el modo productivo también debería habilitar las reglas de CORS y CSP en el cliente y el server...