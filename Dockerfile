# Usar una imagen base de Python 3.10
FROM python:3.10-slim

# Instalamos Node.js
RUN apt update \
    && apt install -y nodejs npm

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Copiamos los archivos del proyecto
COPY . /app/

# Instalamos dependencias de Node.js
WORKDIR /app/src/front
RUN npm install

# Instalamos pipenv
RUN pip install pipenv

# Instalamos las dependencias de Python
WORKDIR /opt/app
RUN pipenv install --deploy --ignore-pipfile

# Exponer el puerto que usarás para Gunicorn
EXPOSE 5000

# Fase de release (si es necesario, copiamos otros archivos de configuración)
COPY --from=build /opt/app/venv /venv 

# Ejecuta la aplicación
CMD ["pipenv", "run", "upgrade"]
