# Etapa de construcción: Crear el entorno con Python y Node.js
FROM node:16 AS build

# Instalamos dependencias de Python
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de Node.js (si las tienes)
WORKDIR /opt/app
COPY . /opt/app
RUN npm install  # o el comando que uses para instalar tus dependencias de Node.js

# Etapa final: Preparar la imagen con los archivos del entorno de Python
FROM node:16

# Copiamos los archivos de la etapa de construcción
COPY --from=build /opt/app /opt/app

# Configuramos el directorio de trabajo
WORKDIR /opt/app

# Establecemos las variables de entorno
ENV NODE_ENV=container

# Si no estás usando un entorno virtual (venv), omite la siguiente línea
# Si lo tienes, asegúrate de que se copie correctamente
# COPY --from=build /opt/app/venv /venv

# Otros comandos de configuración que puedas necesitar...
