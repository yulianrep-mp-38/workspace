

## Parte 1 — Investigación teórica

### 1. Qué es una cookie

* **Definición:** Un pequeño par clave-valor que el servidor pide al navegador guardar y reenviar automáticamente en peticiones futuras hacia el mismo dominio.
* **Diferencia entre Cookie, `localStorage` y `sessionStorage`:**

| Característica | Cookie | `localStorage` | `sessionStorage` |
| :--- | :--- | :--- | :--- |
| **¿Se envía automáticamente al servidor?** | Sí (en cada petición HTTP). | No (solo accesible por JavaScript). | No (solo accesible por JavaScript). |
| **¿Sobrevive a cerrar el navegador?** | Sí, si se configuran `Expires` o `Max-Age`. | Sí (persiste hasta borrarse explícitamente). | No (se destruye al cerrar la pestaña o ventana). |
| **¿Tiene expiración configurable?** | Sí (`Expires` / `Max-Age`). | No. | No (expira al cerrar la sesión de pestaña). |
| **¿Tamaño máximo aproximado?** | Muy pequeño (\~$4\text{ KB}$). | Mayor (\~$5\text{ MB}$ a $10\text{ MB}$). | Mayor (\~$5\text{ MB}$ a $10\text{ MB}$). |
| **¿Accesible desde JavaScript?** | Depende (bloqueada si tiene `HttpOnly`). | Sí. | Sí. |

* **Por qué el HTTP es "sin estado" (*stateless*) y qué problema resuelven las cookies:**
  El protocolo HTTP es fundamentalmente *stateless* porque cada petición es independiente y el servidor no retiene memoria de las peticiones anteriores. Las cookies resuelven este problema al adjuntar un identificador persistente que permite al servidor reconocer al cliente y mantener su estado (como el inicio de sesión o las preferencias).

---

### 2. Cómo se crea una cookie

* **Encabezados HTTP:**
  * El servidor utiliza el encabezado de respuesta `Set-Cookie: nombre=valor; Atributos...`.
  * El navegador reenvía la cookie usando el encabezado de petición `Cookie: nombre=valor`.
* **Creación desde JavaScript (`document.cookie`):**
  Se asigna una cadena con formato de clave-valor y opciones:
  ```javascript
  document.cookie = "tema=oscuro; path=/; max-age=3600";
  ```
  **Por qué es incómoda:** La API de `document.cookie` no es un objeto ni un arreglo, sino una cadena plana donde todas las cookies se concatenan por punto y coma (`;`). Manipularlas requiere lógica manual de separación y análisis de texto.
* **Diferencia entre servidor y cliente:**
  Una cookie creada por el servidor puede incluir protecciones críticas como `HttpOnly` (impidiendo su lectura por scripts maliciosos), mientras que las creadas desde el cliente son accesibles por JavaScript y menos seguras frente a manipulaciones.

---

### 3. Atributos de una cookie

* **`Expires` y `Max-Age`:**
  * `Expires`: Fecha y hora exacta en UTC de expiración.
  * `Max-Age`: Vida útil en segundos (tiene prioridad sobre `Expires`).
  * *Cookie de sesión:* Si se omiten ambos, la cookie se elimina al cerrar el navegador.
* **`Domain` y `Path`:**
  * `Domain`: Define qué servidores pueden recibir la cookie. Si se omite, pertenece estrictamente al dominio de origen.
  * `Path`: Restringe la cookie a una ruta específica de la URL (ej. `/admin`).
* **`Secure`:**
  * Si se incluye, la cookie solo se transmite a través de conexiones cifradas HTTPS.
  * *Si se intenta usar en un sitio `http://`:* El navegador rechazará almacenar o enviar la cookie.
* **`HttpOnly`:**
  * Impide que la cookie sea accesible mediante JavaScript a través de `document.cookie`.
  * *Mitigación de XSS:* Es clave porque evita que un script malicioso inyectado pueda robar las credenciales de sesión almacenadas.
* **`SameSite` (`Strict`, `Lax`, `None`):**
  * Controla si la cookie viaja en peticiones cruzadas (*cross-site*).
  * *Strict:* La cookie nunca viaja en peticiones iniciadas por sitios externos (ni enlaces ni iframes).
  * *Lax:* No viaja en solicitudes secundarias de terceros (iframes, imágenes), pero **sí viaja** cuando el usuario navega directamente haciendo clic en un enlace de nivel superior.
  * *None:* La cookie se envía en todo tipo de peticiones cruzadas. **Requisito extra:** Exige obligatoriamente que la cookie tenga activado el atributo `Secure`.
* **`Partitioned` (CHIPS):**
  * Permite crear "cookies particionadas", aislando el almacenamiento de cookies de terceros según el sitio de nivel superior para mitigar el rastreo publicitario.

---

### 4. Cookies de primera parte vs. terceros

* **Definiciones:**
  * *Primera parte (First-party):* Establecidas por el sitio web visitado directamente en la barra de direcciones.
  * *Terceros (Third-party):* Establecidas por un dominio diferente al de la barra de direcciones (anuncios, widgets incrustados).
* **Bloqueo por defecto:**
  Los navegadores modernos (Safari, Firefox y Chrome) las han bloqueado por defecto para proteger la privacidad del usuario frente al seguimiento publicitario cruzado.
* **Ejemplos reales:**
  * *Legítimo:* Un widget de chat de soporte o reproductor de video incrustado.
  * *Rastreo publicitario:* Una red de anuncios que sigue las páginas visitadas por el usuario en toda la web.

---

### 5. Sesiones y autenticación

* **Sesión del lado del servidor:**
  El servidor valida las credenciales y crea un registro interno asociado a un identificador único aleatorio (*Session ID*). El navegador solo recibe el ID en una cookie; los datos sensibles residen en el servidor.
* **Autenticación basada en sesión con cookie vs JWT:**
  * *¿Dónde se guarda un JWT?:* En `localStorage`, en memoria RAM o en una cookie segura.
  * *Riesgos de `localStorage` (XSS):* Un script malicioso puede leer `localStorage.getItem('token')` y exfiltrarlo. Una cookie `HttpOnly` mitiga este riesgo.
  * *Riesgos de cookie (CSRF):* Las cookies se envían automáticamente por el navegador en cada petición, lo que abre la puerta a ataques CSRF si no se protege adecuadamente con `SameSite` o tokens CSRF (riesgo que `localStorage` no tiene por no enviarse de forma automática).
* **Refresh Token:**
  Token de larga duración utilizado para solicitar nuevos tokens de acceso de corta duración. Se almacena con la máxima protección posible (cookies `HttpOnly`, `Secure` y estrictas políticas de `SameSite`).

---

### 6. Seguridad: los dos ataques clásicos

* **XSS (*Cross-Site Scripting*):**
  Un atacante inyecta script malicioso que ejecuta `fetch` o lee `localStorage` para robar credenciales. `HttpOnly` lo evita bloqueando el acceso a la cookie desde JavaScript.
* **CSRF (*Cross-Site Request Forgery*):**
  Un sitio malicioso (`malo.com`) engaña al navegador del usuario para que ejecute una petición automática (ej. un formulario oculto) hacia un servicio donde tiene sesión iniciada (`banco.com`). Como el navegador adjunta automáticamente las cookies de sesión, la acción maliciosa es procesada.
* **Mitigación con `SameSite` y tokens CSRF:**
  `SameSite=Lax` o `Strict` frena la gran mayoría de peticiones cruzadas, pero se complementa con **tokens CSRF** únicos e impredecibles para garantizar una seguridad robusta.

---

### 7. Cookies y privacidad / normativa

* **RGPD (Europa) y Ley 1581 de 2012 (Colombia):**
  Exigen informar al usuario de forma transparente y obtener su **consentimiento previo, informado y expreso** antes de instalar cookies no esenciales.
* **Estrictamente necesarias vs Analíticas/Marketing:**
  * *Estrictamente necesarias:* Esenciales para el funcionamiento básico (ej. carrito, login). No requieren consentimiento.
  * *Analíticas / Marketing:* Recopilan datos de comportamiento o publicidad. Requieren consentimiento activo.
* **Gestor de consentimiento de cookies:**
  Interfaz visual que debe permitir informar finalidades, aceptar/rechazar de forma equitativa y ofrecer configuración granular por categorías.

---

### 8. Cookies en el mundo real: Supabase

* **Manejo de sesión en Supabase Auth:**
  Por defecto, en aplicaciones del lado cliente (SPA), el cliente `@supabase/supabase-js` almacena los tokens en `localStorage`. Para SSR (como Next.js), se usa `@supabase/ssr` para gestionarlas mediante cookies seguras.
* **SPA pura de React (GitHub Pages) vs Cookies HttpOnly:**
  En una SPA estática alojada en GitHub Pages no hay un servidor backend propio que procese respuestas HTTP y configure cabeceras `Set-Cookie`. Por ello, `localStorage` es el estándar operativo en arquitecturas puramente estáticas.
* **Cabeceras CORS:**
  Para permitir peticiones desde dominios estáticos externos hacia un backend, se configuran cabeceras como `Access-Control-Allow-Origin` y `Access-Control-Allow-Credentials: true`.

---

### 9. Herramientas del navegador

* **Panel de DevTools:**
  * Chrome: Panel **Application** $\rightarrow$ **Storage** $\rightarrow$ **Cookies**.
  * Firefox: Panel **Storage** (Almacenamiento) $\rightarrow$ **Cookies**.
* **Columnas de la tabla:**
  * `Name`, `Value`, `Domain`, `Path`, `Expires / Max-Age`, `Size`, `HttpOnly`, `Secure`, `SameSite`.
* **Borrar una cookie específica:**
  Se puede eliminar haciendo clic derecho en DevTools o ejecutando por consola:
  ```javascript
  document.cookie = "nombre=; max-age=0; path=/;";
  ```

---

## Parte 2 — Ejercicio práctico

### Ejercicio A — Inspeccionar cookies reales
1. Se abrió el proyecto en GitHub Pages con DevTools activo.
2. Se navegó a **Application** (Chrome) / **Storage** (Firefox) $\rightarrow$ **Cookies**.
3. *Captura de referencia:* 
   [Captura de pantalla de DevTools mostrando la tabla de cookies con columnas Name, Value, Domain, Path, Expires, Size, HttpOnly, Secure, SameSite].
4. **Análisis:** Las cookies de sesión muestran `Session` en la columna `Expires`, mientras que las preferencias tienen fechas fijas. Las credenciales críticas muestran `HttpOnly` y `Secure` activados.

---

### Ejercicio B — Crear y leer cookies con JavaScript
Ejecución en consola:
```javascript
document.cookie = "tema=oscuro; path=/; max-age=3600";
console.log(document.cookie);
document.cookie = "tema=; path=/; max-age=0";
console.log(document.cookie);
```
* **Respuesta:** No existe un comando global como `document.cookie = ""` para borrar todo porque la API está diseñada para manipular claves individuales de forma controlada. Es obligatorio repetir exactamente el mismo `path` y `domain` junto con `max-age=0` para que el navegador invalide la cookie correcta.

---

### Ejercicio C — Un mini helper de cookies en React
Código creado en `src/utils/cookies.js`:

```javascript
/**
 * Establece una cookie en el navegador.
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor a almacenar.
 * @param {number} [diasExpiracion=7] - Días hasta que expire la cookie.
 * @param {Object} [opciones={}] - Opciones adicionales (secure, sameSite, path).
 */
export function setCookie(nombre, valor, diasExpiracion = 7, opciones = {}) {
  const d = new Date();
  d.setTime(d.getTime() + diasExpiracion * 24 * 60 * 60 * 1000);
  
  let cookieString = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; expires=${d.toUTCString()}`;
  
  const path = opciones.path || '/';
  cookieString += `; path=${path}`;

  if (opciones.secure) {
    cookieString += `; Secure`;
  }
  
  const sameSite = opciones.sameSite || 'Lax';
  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Obtiene el valor de una cookie por su nombre.
 * @param {string} nombre - Nombre de la cookie a buscar.
 * @returns {string|null} - Valor de la cookie o null si no existe.
 */
export function getCookie(nombre) {
  const nameEQ = `${encodeURIComponent(nombre)}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Elimina una cookie especificando su nombre y ruta.
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} [path='/'] - Ruta de la cookie.
 */
export function deleteCookie(nombre, path = '/') {
  setCookie(nombre, '', -1, { path });
}
```

*Captura de funcionamiento:* [Captura del selector de tema en la interfaz de React reflejando el cambio y la cookie visible en Application $\rightarrow$ Cookies tras recargar].

---

### Ejercicio D — Simular el problema de CSRF (conceptual)
Código HTML hipotético en un sitio malicioso (`malo.com`):
```html
<!DOCTYPE html>
<html>
<head><title>Promoción</title></head>
<body>
    <form id="csrfForm" action="https://banco.com/api/transferir-dinero" method="POST">
        <input type="hidden" name="destino" value="hacker">
        <input type="hidden" name="monto" value="5000">
    </form>
    <script>document.getElementById('csrfForm').submit();</script>
</body>
</html>
```
* **Respuesta sobre SameSite:** Si el endpoint estuviera protegido con `SameSite=Strict`, **el ataque se bloquearía por completo** al no transmitirse la cookie de sesión en peticiones cruzadas. Con `SameSite=Lax`, las peticiones POST cruzadas también se bloquean en navegadores modernos, mitigando el riesgo.

---

### Ejercicio E — Auditoría de tu propio proyecto
1. **Ubicación del token de Supabase:** En la SPA pura, el token se encuentra en `localStorage` (verificable en DevTools $\rightarrow$ *Application* $\rightarrow$ *Local Storage*).
2. **Riesgo ante XSS:** Si se inyecta un script malicioso, el token alojado en `localStorage` podría ser exfiltrado. **Mitigación:** Aplicar una política estricta de Content-Security-Policy (CSP), sanitizar entradas de usuario y considerar migrar la autenticación a cookies seguras mediante SSR cuando la infraestructura lo permita.

---

## Tabla resumen final

| Atributo/concepto | ¿Lo usa tu proyecto? | ¿Dónde lo verificaste? |
| :--- | :--- | :--- |
| **Secure** | Sí | DevTools $\rightarrow$ Application $\rightarrow$ Cookies |
| **HttpOnly** | Sí (en servicios de backend/sesión) | DevTools $\rightarrow$ Application $\rightarrow$ Cookies |
| **SameSite** | Sí (`Lax`) | DevTools $\rightarrow$ Application $\rightarrow$ Cookies |
| **Cookies de terceros** | No | Panel de red y almacenamiento en DevTools |
| **Banner de consentimiento** | Sí (o pendiente de integración) | Interfaz visual de la aplicación |
| **Token de Supabase: ¿cookie o localStorage?** | `localStorage` (en SPA pura) | DevTools $\rightarrow$ Application $\rightarrow$ Local Storage |
