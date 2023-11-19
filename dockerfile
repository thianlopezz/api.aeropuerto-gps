#Definimos el la version de node que tendrá mi contenedor
FROM node:18.16.1-alpine
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN apk update && \
    apk upgrade && \
    apk add chromium
#Defino el directorio en donde se va a ejecutar mi configuración dentro del contenedor
WORKDIR /home/api.aeropuerto-gps
#Copio el archivo package.js para posteriormente instalar las dependencias de mi repositorio
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

COPY ecosystem.config.example.js ./ecosystem.config.js
RUN npm install

#Instalo de manera global pm2
RUN npm install pm2 -g
#Copio todos los archivos de mi repositorio hacia WORKDIR
COPY . .
RUN npm run build
#Esta configuración hace que el puerto en donde voy a alojar mi aplicación pueda ser accedido
EXPOSE 3000
RUN ls -l
#Por último configuro los comandos que se van a ejecutar para poner arriba nuesra app
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]