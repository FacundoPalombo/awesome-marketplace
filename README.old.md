# Awesome Marketplace

- [Awesome Marketplace](#awesome-marketplace)
  - [Requisitos minimos](#requisitos-minimos)
    - [Instalación del proyecto](#instalación-del-proyecto)

## Requisitos minimos

Para correr este proyecto necesitamos:

- Docker 19.03^
- Docker Compose compatible con Docker compose 2.4^
- Node.js 15.12^
- npm 7.6.3^

Para instalar los requisitos minimos de software propongo seguir las siguientes guias:

- Manual de instalación de docker: https://docs.docker.com/engine/install/ubuntu/
- Manual de instalación de docker compose: https://docs.docker.com/compose/install/
- Manual para instalar Node.js y NPM con Node Version Manager: https://github.com/nvm-sh/nvm#installing-and-updating

### Instalación del proyecto

Ya instalado el software necesario, clonamos el proyecto:

```bash
$ git clone https://www.github.com/FacundoPalombo/awesome-marketplace/
```

Vamos al directorio

```bash
$ cd awesome-marketplace
```

Y corremos en nuestra consola:

```bash
$ sudo chmod -x ./init.sh && sh ./init.sh
```

Si el comando de arriba falla, prueba ejecutando con alguna consola basada en unix shell como bash...

Sinó, puedes ejecutar en secuencia los siguientes comandos para levantar el docker-compose.
Asegurate de estar en directorio root de awesome-marketplace y corre:

```bash
npm i
```

```bash
sudo docker-compose build
```

```bash
sudo docker-compose up
```
