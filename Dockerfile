# Usamos una imagen base de Node.js
FROM node:16

# Instalamos dependencias de Python
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3.10 python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Copiamos el entorno virtual creado en el contenedor de build
COPY --from=build /opt/app/venv /venv

# Configuramos el entorno
ENV PATH="/opt/app/venv/bin:$PATH"
ENV NODE_ENV=container

# Otros comandos de configuración que puedas necesitar...
