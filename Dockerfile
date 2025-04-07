# Etapa de construcción
FROM node:16 AS build

# Instalamos dependencias de Python
RUN apt update \
    && apt install -y software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt update \
    && apt install -y python3.10 python3-pip

# Creamos el entorno virtual
WORKDIR /opt/app
RUN python3 -m venv /opt/app/venv

# Instalamos pipenv en el entorno virtual
RUN /opt/app/venv/bin/pip install pipenv

# Instalamos las dependencias de Python desde el Pipfile
COPY Pipfile Pipfile.lock /opt/app/
RUN /opt/app/venv/bin/pipenv install --deploy --ignore-pipfile

# Etapa de producción
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Copiamos el entorno virtual de la etapa de construcción
COPY --from=build /opt/app/venv /venv

# Aseguramos que el entorno virtual esté disponible en el PATH
ENV PATH="/opt/app/venv/bin:$PATH"
ENV NODE_ENV=container

# Copiamos los archivos del proyecto
COPY . /opt/app/

# Ejecuta la aplicación (reemplaza esto según la forma en que ejecutas tu app)
CMD ["pipenv", "run", "upgrade"]
