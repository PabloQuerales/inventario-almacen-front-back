# Etapa de construcción (build stage)
FROM python:3.10-slim AS build

# Instalamos las dependencias necesarias
RUN apt update && apt install -y nodejs npm

WORKDIR /opt/app
COPY . /app/

# Creamos un entorno virtual y lo activamos
RUN python3 -m venv /opt/app/venv

# Instalamos dependencias de Python usando pipenv
RUN /opt/app/venv/bin/pip install pipenv
RUN /opt/app/venv/bin/pipenv install --deploy --ignore-pipfile

# Etapa final (production stage)
FROM python:3.10-slim

WORKDIR /opt/app

# Copiamos el entorno virtual de la etapa anterior
COPY --from=build /opt/app/venv /venv

# Copiamos los archivos del proyecto
COPY . /app/

# Exponer el puerto que usarás para Gunicorn
EXPOSE 5000

# Ejecuta la aplicación
CMD ["/venv/bin/pipenv", "run", "upgrade"]