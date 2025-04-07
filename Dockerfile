# Fase de construcción
FROM node:16 as build

# Instalamos Python 3.10 y pip
RUN apt update \
    && apt install -y python3.10 python3-pip

# Instalamos pipenv
RUN /opt/app/venv/bin/pip install pipenv

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Copiamos los archivos de configuración (Pipfile y Pipfile.lock)
COPY Pipfile Pipfile.lock /opt/app/

# Creamos un entorno virtual
RUN python3 -m venv /opt/app/venv

# Instalamos dependencias con pipenv
RUN /opt/app/venv/bin/pipenv install --deploy --ignore-pipfile

# Etapa final (producción)
FROM node:16

# Copiamos los archivos del proyecto
COPY . /opt/app/

# Copiamos el entorno virtual de la etapa de construcción
COPY --from=build /opt/app/venv /venv

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Aseguramos que el entorno virtual esté disponible en el PATH
ENV PATH="/opt/app/venv/bin:$PATH"

# Ejecuta la aplicación
CMD ["pipenv", "run", "upgrade"]
