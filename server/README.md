# Sistema de Control MQTT con Flask y MongoDB

Este proyecto es un sistema de control que utiliza MQTT para la comunicación entre dispositivos IoT y una aplicación web desarrollada con Flask. Utiliza MongoDB como base de datos para almacenar datos recibidos de los dispositivos.

## Características

- **Interfaz Web**: Controla dispositivos IoT a través de una interfaz web fácil de usar.
- **Comunicación en Tiempo Real**: Utiliza MQTT, un protocolo ligero de mensajería, ideal para dispositivos de baja potencia y redes lentas.
- **Persistencia de Datos**: Almacena información de los dispositivos y eventos en MongoDB, permitiendo análisis y seguimiento histórico.

## Tecnologías Utilizadas

- **Flask**: Un microframework de Python para el desarrollo de aplicaciones web.
- **MongoDB**: Una base de datos NoSQL que ofrece alto rendimiento y escalabilidad.
- **MQTT**: Un protocolo de mensajería para dispositivos de Internet de las Cosas (IoT).
- **Docker**: Utilizado para contenerizar la aplicación y sus dependencias, facilitando el despliegue y la ejecución en cualquier entorno.

## Estructura del Proyecto

```plaintext
/server
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── /config
│   ├── mosquitto.conf
│   └── mosquitto_passwd
├── /data
│   └── mosquitto.db
├── /flask
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── /log
│   └── mosquitto.log
└── README.md
```

## Configuración y Despliegue

### Pre-requisitos

- Docker y Docker Compose instalados en el sistema.
- Conocimientos básicos de Python, Flask, y Docker.

### Configuración

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/6aligula/Mosquitto_docker.git
   cd Mosquitto_docker
   ```

2. **Configurar el Archivo `.env`:**

   Asegúrate de configurar todas las variables necesarias en el archivo `.env` dentro del directorio `flask`. Este archivo debe contener las credenciales para MQTT y MongoDB, así como los detalles de configuración.

3. **Construir y Ejecutar con Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   Esto construirá las imágenes necesarias y lanzará los contenedores.

### Uso

Accede a la interfaz web a través de `http://localhost:5000` desde cualquier navegador para controlar los dispositivos IoT conectados.

## Mantenimiento y Soporte

Para obtener soporte, puedes abrir un issue en el repositorio de GitHub o enviar un pull request si deseas contribuir al proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. 
