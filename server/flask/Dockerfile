# Usa una imagen oficial de Python como imagen base
FROM python:3.9

# Establece un directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY . /app

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt
# Establecer la variable de entorno para desactivar el buffering de Python
# dejar ENV PYTHONUNBUFFERED 1 en producción no es inherentemente malo y puede ser beneficioso para ciertos tipos de aplicaciones, 
# especialmente aquellas donde la inmediatez de la salida de logs es importante. 
ENV PYTHONUNBUFFERED 1

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "./app.py"]