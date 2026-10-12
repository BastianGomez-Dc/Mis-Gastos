# Mis Gastos — versión local para GitHub Pages

Aplicación PWA para registrar **nombre, tipo/categoría, monto CLP y fecha** de cada gasto. Muestra totales mensuales, resumen por categoría, gastos grandes y pequeños repetidos. Funciona sin conexión después de la primera carga completa.

## Publicar en GitHub Pages

1. Crea un repositorio de GitHub y sube **todos los archivos de esta carpeta a la raíz**, sin incluir ZIP ni la carpeta contenedora. El archivo principal debe llamarse `index.html`.
2. Abre **Settings → Pages**, selecciona **Deploy from a branch**, `main`, y **/(root)**. Guarda.
3. Abre la URL indicada por GitHub (`https://TU-USUARIO.github.io/TU-REPO/`) **con HTTPS**.
4. En iPhone, abre la URL en Safari, usa el menú **Compartir → Agregar a pantalla de inicio**. En Android, utiliza la opción **Instalar aplicación** del navegador compatible.
5. Registra un gasto escribiendo el **monto**, el **tipo**, el **nombre** y la **fecha** (la fecha actual viene seleccionada).

### Archivos que debes subir

- `index.html`: pantalla y política CSP.
- `style.css`: estilos locales sin Google Fonts ni dependencias externas.
- `app.js`: lógica, validaciones y respaldos cifrados.
- `sw.js`: Service Worker aislado que guarda únicamente archivos de esta PWA.
- `manifest.json`: configuración de instalación.
- `icon-180.png`, `icon-192.png`, `icon-512.png`: iconos originales.

**NO subas `wrangler.toml`, `worker.js` ni claves de API:** la versión manual no usa Cloudflare Workers, Claude, fotografías, cuentas ni servidor de datos. El archivo `wrangler.toml` original se retiró por no ser necesario. Si antes publicaste el Worker en Cloudflare, **desactívalo o elimínalo** y revoca las claves API que ya no utilices.

## Almacenamiento y respaldos

- Los registros se guardan en **localStorage del origen** donde abres la app; no se envían por internet ni se sincronizan entre dispositivos.
- **Importante en GitHub Pages:** todos los repositorios publicados en `https://TU-USUARIO.github.io/` comparten el mismo origen y, por lo tanto, el mismo `localStorage`. El JavaScript de cualquier otro proyecto tuyo en Pages podría leer estos gastos. Para aislarlos, usa un dominio o subdominio exclusivo (Settings → Pages → Custom domain), publica en Cloudflare Pages (`*.pages.dev`), o no publiques otros proyectos con Pages en la misma cuenta.
- Si cambias de URL/dominio, cambias de navegador o limpias los datos del sitio, **los gastos no se trasladan automáticamente**. Exporta y restaura un respaldo.
- En **Ajustes → Respaldo**, escribe una contraseña de **10 o más caracteres**, toca **Crear respaldo cifrado** y **Copiar**. Guarda el texto donde prefieras. Utiliza la misma contraseña al restaurar. **Si olvidas la contraseña no podrás descifrar el respaldo.**
- Se cifran los respaldos con AES-256-GCM y clave derivada mediante PBKDF2-SHA256 (600.000 iteraciones, recomendación OWASP). El respaldo indica cuántas iteraciones usa, así que los respaldos cifrados anteriores (250.000) se siguen pudiendo restaurar. La contraseña nunca se guarda. Se aceptan los respaldos JSON sin cifrar de versiones previas para facilitar la migración.
- Si los datos guardados se dañan, la app no los sobrescribe: guarda una copia en la clave `misgastos.v1.recuperacion` y avisa al abrir.
- Límite: 20.000 gastos (unos 2,5 MB).
- Los registros activos en localStorage **no están cifrados**. Evita ingresar datos bancarios, contraseñas o información sensible. GitHub Pages no almacena estos registros.
- El almacenamiento web no garantiza persistencia permanente; haz respaldos periódicos y no dependas del mismo como única copia.

## Seguridad y limitaciones

- CSP sin conexiones externas de la aplicación (`connect-src 'none'`) y JavaScript propio.
- Sin bibliotecas CDN, imágenes externas, API de IA, claves ni cámara.
- El Service Worker solo actualiza archivos propios, elimina únicamente la caché anterior de Mis Gastos y no toca las cachés de otros proyectos.
- Validación de fechas calendario, montos enteros positivos, categorías permitidas, identificadores y límites de importación.
- Texto aportado por el usuario escapado en las vistas; sin `eval` ni ejecución dinámica.
- Exportación cifrada, importación validada, borrado/reemplazo con confirmación y reversión si no se puede guardar.
- La app se niega a funcionar dentro de un iframe de otra página (protección contra clickjacking), ya que GitHub Pages no permite enviar `X-Frame-Options` ni `frame-ancestors`.
- Los datos del usuario se agrupan con `Map`, así que nombres como `constructor` o `__proto__` no afectan a la app.
- El navegador y cualquier otra página que comparta exactamente el **mismo origen** siguen representando parte del modelo de confianza.
- Esta es una app estática de uso personal. No hay autenticación ni protección contra alguien con acceso al teléfono desbloqueado o al propio navegador.

## Actualizar sin perder registros

Sube los archivos nuevos sobre los anteriores en el **mismo repositorio/ruta/dominio**.

**Cuenta de GitHub:** como el repositorio es público, quien controle tu cuenta controla el código que corre en tu teléfono. Activa la verificación en dos pasos (2FA) y revisa en *Commits* que ningún commit anterior contenga claves o archivos privados. Los datos locales usan la misma clave de almacenamiento `misgastos.v1`. Después de publicar, vuelve a abrir/reiniciar la PWA conectada a internet para descargar la versión nueva. Antes de cambiar de dominio o eliminar la app, genera un respaldo cifrado.

## Pruebas recomendadas después de publicar

- Agregar un gasto, cerrar y reabrir la app; comprobar que persiste.
- Cambiar de mes y consultar Gastos/Resumen.
- Probar borrar con doble confirmación.
- Exportar un respaldo cifrado y restaurarlo con la misma contraseña.
- Comprobar que abre sin conexión luego de la primera visita completa.
- Verificar en herramientas de desarrollador que la app no hace solicitudes a dominios externos.
