#### Descripción General

Este proyecto consiste en una aplicación con un backend desarrollado en Flask que utiliza MQTT para la comunicación en tiempo real y MongoDB para la gestión de datos. El sistema está diseñado para ser ejecutado en contenedores Docker, facilitando su despliegue y escalabilidad. El frontend se desarrolla con React Native CLI, proporcionando una interfaz móvil para interactuar con el servidor.

#### Características

- **Backend en Flask**: API para manejar la comunicación con dispositivos IoT mediante MQTT.
- **MQTT**: Utilizado para la comunicación en tiempo real entre el servidor y dispositivos.
- **MongoDB**: Base de datos para almacenar estados y eventos de los dispositivos.
- **Docker**: Contenerización del entorno de backend y base de datos para facilitar el despliegue.
- **Cliente React Native CLI**: Interfaz móvil para control y monitorización.

#### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:
- Docker y Docker Compose
- Node.js y npm
- React Native CLI
- Un broker MQTT (como Mosquitto)

#### Configuración y Despliegue

1. **Clonar el repositorio:**
   ```
   git clone https://github.com/6aligula/Smart_Dispenser
   cd Smart_Dispenser
   ```

2. **Configuración del entorno:**
   - Copiar el archivo `.env.example` a `.env` y ajustar las configuraciones necesarias.

3. **Ejecutar con Docker:**
   ```
   docker-compose up --build
   ```

4. **Configurar el cliente React Native:**
   - Navega al directorio del cliente:
     ```
     cd cliente
     ```
   - Instala las dependencias:
     ```
     npm install
     ```
   - Ejecuta la aplicación (asegúrate de tener un emulador corriendo o un dispositivo conectado):
     ```
     npx react-native run-android
     ```

#### Uso de la API

- **Encender Dispensador**:
  `POST /dispensar/encender?seconds=10`
  Activa el dispensador durante el número especificado de segundos.

- **Obtener Estado del Dispensador**:
  `GET /getDispensar`
  Devuelve los últimos estados del dispensador.

#### Contribuir

Para contribuir a este proyecto, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu característica (`git checkout -b feature/fooBar`).
3. Haz tus cambios y confirma (`git commit -am 'Add some fooBar'`).
4. Empuja a la rama (`git push origin feature/fooBar`).
5. Crea una nueva Pull Request.

#### Licencia

Este proyecto está licenciado bajo la Licencia XYZ 

---
