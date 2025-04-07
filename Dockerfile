FROM node:16

# Instalamos Python 3.10 y pip
RUN apt update \
    && apt install -y python3.10 python3-pip

# Instalamos pipenv
RUN pip install pipenv

# Establecemos el directorio de trabajo
WORKDIR /opt/app

# Copiamos los archivos del proyecto
COPY . /opt/app/

# Instalamos las dependencias de pipenv desde el archivo Pipfile
RUN pipenv install --dev

# Aseguramos que el entorno virtual de pipenv esté disponible en el PATH
ENV PATH="/opt/app/.venv/bin:$PATH"

# Fase de release (si es necesario, copiamos otros archivos de configuración)
# Aquí asumimos que el entorno de pipenv ya está listo y no se necesita copiar nada más

# Comando para correr la aplicación, que ahora utilizará pipenv con el entorno virtual
CMD ["pipenv", "run", "upgrade"]
