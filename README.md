## WhatsTeDigo - WhatsApp Daemon Interceptor

Este repositorio contiene una aplicación escrita en Node.js llamada WhatsTeDigo que levanta un daemon para interceptar todos los mensajes de WhatsApp. Cuando detecta un mensaje enviado por un usuario en una lista predefinida, envía ese mensaje a través de una API a ChatGPT para obtener una respuesta generada por inteligencia artificial.

### Funcionalidades

- Intercepta mensajes de WhatsApp en tiempo real.
- Detecta mensajes de usuarios específicos basados en una lista predefinida.
- Utiliza la API de ChatGPT para generar respuestas automáticas basadas en los mensajes recibidos.

### Requisitos del Sistema

- Node.js
- Bash (para ejecutar el script `systemrequirements.sh`)
- Redis Server (para usar con la biblioteca `redis`)

### Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu_usuario/WhatsTeDigo.git
```

2. Ejecuta el script de requisitos del sistema para instalar las dependencias necesarias:

```bash
bash systemrequirements.sh
```

3. Instala las dependencias de Node.js especificadas en el archivo `package.json`:

```bash
npm install
```

### Configuración

Antes de ejecutar la aplicación, debes configurar algunos parámetros:

1. Agrega tus credenciales de la API de ChatGPT en el archivo `.env`. (existe un archivo de ejemplo de enviroment llamado .env.sample)
2. Asegúrate de tener WhatsApp Web conectado y configurado en el dispositivo donde se ejecutará la aplicación.

### Uso

Ejecuta el siguiente comando para iniciar el daemon:

```bash
node main.js
```

La aplicación comenzará a interceptar mensajes de WhatsApp y enviará aquellos de usuarios permitidos a la API de ChatGPT para obtener respuestas automáticas.

### Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar esta aplicación, siéntete libre de enviar una solicitud de extracción.

### Problemas

Si encuentras algún problema, por favor, abre un problema en este repositorio y lo abordaremos lo antes posible.

### Licencia

Este proyecto está sin licencia (UNLICENSED).
