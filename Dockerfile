# Etapa de construcción: Crear el entorno con Python y Node.js
FROM node:16 AS build

# Instalamos dependencias de Python
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalamos dependencias de Node.js (si las tienes)
WORKDIR /opt/app
COPY . /opt/app
RUN npm install  # o el comando que uses para instalar tus dependencias de Node.js

# Instalamos gunicorn y las dependencias de Python en la etapa de construcción
RUN pip3 install gunicorn
RUN pip3 install -r requirements.txt  # Asegúrate de tener un requirements.txt con Flask y otras dependencias

# Etapa final: Preparar la imagen con los archivos del entorno de Python
FROM node:16

# Instalamos Python y pip3 en la imagen final para poder usar gunicorn
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiamos los archivos de la etapa de construcción
COPY --from=build /opt/app /opt/app

# Instalamos gunicorn y las dependencias de Python en la etapa final
RUN pip3 install gunicorn
RUN pip3 install -r /opt/app/requirements.txt  # Asegúrate de instalar las dependencias en la etapa final

# Configuramos el directorio de trabajo
WORKDIR /opt/app

# Establecemos las variables de entorno
ENV NODE_ENV=container

# Otros comandos de configuración que puedas necesitar...

# Comando para ejecutar la aplicación Flask con gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
