# ♻️ EcoIncentivos - Lector de Residuos

EcoIncentivos es una aplicación móvil desarrollada para escanear y clasificar residuos sólidos (plástico, vidrio, papel y metal) utilizando la cámara del dispositivo e Inteligencia Artificial. Los usuarios ganan puntos en tiempo real por cada residuo reciclable detectado.

## 🛠️ Tecnologías Utilizadas

- **React Native (v0.86.0)**: Framework principal para construir la aplicación nativa usando JavaScript/TypeScript con la Nueva Arquitectura.
- **TypeScript**: Para escribir un código más seguro y predecible.
- **Supabase**: Base de datos en la nube (PostgreSQL) para guardar en tiempo real los puntos y perfiles de los usuarios.
- **React Native Vision Camera (v5)**: La librería más rápida y moderna para el control de la cámara.
- **TensorFlow Lite (TFLite)**: Motor de Inteligencia Artificial ejecutado 100% en local (sin internet) para el reconocimiento de los materiales.

---

## 📖 Guía de Instalación para Principiantes

Si eres nuevo y quieres probar o modificar esta aplicación en tu computadora con Windows, sigue estos pasos al pie de la letra:

### Paso 1: Instalar Requisitos Básicos (Software)
1. **Node.js**: Descarga e instala la versión LTS desde [nodejs.org](https://nodejs.org/).
2. **Java JDK 17**: Descarga e instala Microsoft OpenJDK 17 o cualquier distribución de Java 17. 
   - *Importante*: Debes configurar la variable de entorno `JAVA_HOME` apuntando a la carpeta de instalación de tu JDK.
3. **Android Studio**: Descárgalo desde [developer.android.com/studio](https://developer.android.com/studio). 
   - Durante la instalación, asegúrate de marcar las opciones **Android SDK**, **Android SDK Platform** y **Android Virtual Device**.
   - Configura la variable de entorno `ANDROID_HOME` apuntando a la ruta del SDK de Android (usualmente `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk`).

### Paso 2: Clonar el Proyecto y Descargar Dependencias
Abre una terminal (PowerShell o CMD) y ejecuta:

```bash
# 1. Clona este repositorio
git clone <URL_DE_TU_REPOSITORIO>

# 2. Entra a la carpeta del proyecto
cd Lector-de-residuos/EcoIncentivos

# 3. Instala todas las librerías de JavaScript
npm install
```

### Paso 3: Configurar la Base de Datos
La aplicación utiliza Supabase. Necesitas crear un proyecto gratuito en Supabase:
1. Entra a [supabase.com](https://supabase.com) y crea un proyecto.
2. Ve a la sección **SQL Editor** y ejecuta el siguiente código para crear la tabla de puntajes:
   ```sql
   create table users_points (
     user_id text primary key,
     total_points integer default 0
   );
   ```
3. Copia tu `URL` y tu `anon key` desde los ajustes de API de Supabase y reemplázalos en el archivo `src/config/supabaseClient.ts`.

### Paso 4: Arrancar la Aplicación
Con Android Studio abierto y un emulador corriendo (o tu celular Android conectado por USB con Depuración USB activada), corre el siguiente comando en tu terminal:

```bash
npx react-native run-android
```

> **Nota**: La primera vez que ejecutes este comando, puede tardar entre 5 y 10 minutos porque descargará y compilará herramientas de Gradle y C++ para la cámara y la IA.

¡Listo! La aplicación se instalará en tu dispositivo y podrás empezar a escanear residuos. 🌍
