¿Qué pasa al escribir una URL?
Cuando escribimos una URL en el navegador ocurren estos pasos 
1. URL: el navegador identifica la dirección que queremos visitar.
2. DNS: Convierte el nombre del dominio en una dirección IP para encontrar el servidor 
3. TCP: se establece una conexión entre el navegador y el servidor mediante un handshake de tres pasos.
4. TLS: Si usamos HTTPS, se crea una conexión segura y cifrada.
5. Petición HTTP:el navegador le pide al servidor la página o recurso.
6. Respuestas HTTP: El servidor devuelve los archivos solicitados, como HTML. CCS JavaScript e imágenes.
7. Página web: El navegador procesa esos archivos y muestra la página en pantalla 
RESUMEN: URL > DNS > TCP > TLS > Petición HTTP > Respuestas > Página.

PARTES DE UNA URL
Ejemplo: https://blog.ejemplo.com:433/productos?color=azul#camisas

+ Esquema: https -> protocolo utilizado.
+ Subdominio: blog-> sección del sitio.
+ Dominio: ejemplo.com-> nombre del sitio-
+ TLD: .com-> extension del dominio 
+ Puerto: 433-> puerto usado para HTTPS. 
+ Ruta: /productos-> recurso solicitado.
+ Query string: ?color=azul-> información adicional enviada.
+ Fragmento: #camisas-> sección específica de la pagina.


DOMINIO, SUBDOMINIO Y HOSTING

Dominio: Es el nombre de un sitio, por ejemplo: ejemplo.com

Subdominio: Es una parte del dominio, por ejemplo: blog.ejemplo.com

Hosting: es el servicio donde se almacena los archivos de la página web 

¿Por qué se contratan por separado?
Porque cumplen funciones diferentes. El dominio es la dirección, mientras que el hosting es el espacio está almacenado la página. Se pueden contratar con empresas diferentes según el precio y las características que necesitemos.

¿Qué es el DNS y por qué se le llama “la agenda de contactos de Internet”?
El DNS es el sistema que convierte un nombre de dominio, como google.com, en una dirección IP. Se llama “agenda de contactos de Internet” porque relaciona los nombres de las páginas con sus respectivas direcciones IP.

Jerarquía del DNS

La jerarquía funciona así:

Root servers → TLD servers → servidores autoritativos → resolver recursivo.

Los root servers indican dónde encontrar el TLD. Los TLD servers manejan extensiones como .com o .org. Los servidores autoritativos tienen la información oficial del dominio y el resolver recursivo busca esa información y se la entrega al usuario.

Tipos de registros DNS
 
 A: relaciona un dominio con una dirección IPv4.
Ejemplo: ejemplo.com → 192.0.2.1

AAAA: relaciona un dominio con una dirección IPv6.
Ejemplo: ejemplo.com → 2001:db8::1

CNAME: crea un alias que apunta a otro dominio.
Ejemplo: www.ejemplo.com → ejemplo.com

ALIAS / ANAME: permiten apuntar el dominio principal hacia otro nombre, de forma similar a CNAME.

MX: indica qué servidores reciben los correos del dominio.
Ejemplo: ejemplo.com → mail.ejemplo.com

TXT: almacena información de texto, como verificaciones de dominio o configuraciones de correo.

NS: indica cuáles son los servidores DNS responsables de un dominio.

SOA: contiene información principal sobre una zona DNS, como el servidor principal y datos de administración.

¿Qué es el TTL?
El TTL indica cuánto tiempo puede permanecer guardada una información DNS en la caché. Por eso, cuando se cambia un DNS, el cambio puede tardar en aparecer.

¿Qué es la propagación DNS?

Es el tiempo que tardan los cambios de DNS en actualizarse en diferentes servidores y cachés de Internet. Normalmente puede tardar desde unos minutos hasta 24-48 horas, dependiendo de la configuración.

 Ejercicio práctico

 Los comandos sirven para consultar información de DNS:

nslookup github.io → consulta información del dominio.

dig github.com A → consulta la dirección IPv4 del dominio.

dig github.com MX → consulta los servidores de correo.

dig +trace anthropic.com → muestra el recorrido de la consulta DNS desde los servidores raíz hasta los servidores autoritativos.

En Windows, si no tienes dig, puedes usar:

nslookup -type=MX github.com  ..


 
  ¿Qué es un registrador y qué diferencia hay con un proveedor de DNS y un hosting?

Un registrador es una empresa donde se puede registrar y renovar un nombre de dominio.

Un proveedor de DNS administra los registros que indican hacia dónde debe dirigirse un dominio.

El hosting es el servicio donde se almacenan los archivos de una página web.

En resumen: registrador = registra el nombre, DNS = indica a dónde apunta, hosting = almacena la página.

 TLD genéricos vs. TLD de código de país

Los TLD genéricos (gTLD) son extensiones como .com, .dev y .app. Generalmente pueden ser utilizados por personas o empresas de distintos países.

Los TLD de código de país (ccTLD) representan países o territorios, como .co para Colombia. Algunos tienen requisitos especiales de registro dependiendo de sus normas.

 ¿Qué es WHOIS y qué es la privacidad de dominio?

WHOIS es un sistema que permite consultar información relacionada con el registro de un dominio, como datos del registrante, fechas y servidores.

La privacidad de dominio oculta los datos personales del propietario en los registros públicos cuando el registrador ofrece este servicio.

 ¿Qué son los nameservers y qué significa “apuntar el dominio a otro proveedor”?

Los nameservers indican qué servidores DNS administran un dominio.

Apuntar un dominio a otro proveedor significa cambiar la configuración para que otro servicio se encargue de administrar el DNS o dirigir el dominio hacia otro servidor.

 Precios reales de un .com y un .co

Los precios cambian según el registrador y las promociones. Por ejemplo, actualmente Porkbun muestra el .com alrededor de US$11,08 y el .co con una promoción de primer año de US$15,76, mientras que su precio regular/renovación del .co es de US$31,20. 

Cloudflare vende dominios al precio de costo, sin añadir recargos. Su documentación indica que el precio de renovación corresponde al precio establecido por el registro. 

El precio de renovación suele ser diferente al del primer año porque los registradores pueden ofrecer promociones para atraer nuevos clientes. Después, se cobra la tarifa normal de renovación. Además, el precio del registro puede aumentar con el tiempo.

 HTTPS y certificados

 - **TLS/SSL:** protege la comunicación entre el navegador y el servidor mediante **cifrado, integridad y autenticación**. SSL es el nombre antiguo; actualmente se usa TLS.
- **CA:** entidad que verifica y emite certificados digitales. **Let's Encrypt** es una CA gratuita que automatiza la emisión de certificados.
- **DV, OV y EV:**
  - **DV:** valida que controlas el dominio.
  - **OV:** valida el dominio y la organización.
  - **EV:** realiza una validación más exhaustiva de la organización.
- **Wildcard:** certificado que cubre un dominio y sus subdominios de un nivel. Ejemplo: `*.ejemplo.com` cubre `www.ejemplo.com` y `api.ejemplo.com`.
- **“Certificado no válido para este nombre”:** aparece cuando el dominio visitado no coincide con los nombres incluidos en el certificado. Es común al configurar un dominio personalizado.
- **HSTS:** obliga al navegador a usar **HTTPS** para un sitio, evitando conexiones HTTP inseguras.

                  Modelos de alojamiento

    Hosting compartido

 Ejemplos: Hostinger, cPanel.

 - **Ventajas:** barato y fácil de usar.
- **Desventajas:** recursos limitados y poco control.
- **Uso típico:** blogs, páginas personales y webs pequeñas.

    VPS

 Ejemplos: DigitalOcean Droplet, Linode, AWS EC2.

 - **Ventajas:** más control, recursos y flexibilidad.
- **Desventajas:** requiere conocimientos de administración.
- **Uso típico:** aplicaciones web medianas y APIs.

  Servidor dedicado

 Ejemplos: OVH, Hetzner.

 - **Ventajas:** máximo rendimiento y control.
- **Desventajas:** más caro y requiere mantenimiento.
- **Uso típico:** aplicaciones grandes o con mucho tráfico.

    PaaS

 Ejemplos: Render, Railway, Heroku, Fly.io.

 - **Ventajas:** despliegue sencillo y poco mantenimiento.
- **Desventajas:** menos control y puede ser más caro al crecer.
- **Uso típico:** aplicaciones web y APIs que necesitan desplegarse rápidamente.

    Serverless / Functions

 Ejemplos: Vercel Functions, AWS Lambda, Supabase Edge Functions.

 - **Ventajas:** escala automáticamente y pagas según el uso.
- **Desventajas:** límites de ejecución y posibles _cold starts_.
- **Uso típico:** APIs pequeñas, tareas y funciones bajo demanda.

     Hosting estático + CDN

 Ejemplos: GitHub Pages, Netlify, Cloudflare Pages, Vercel.

 - **Ventajas:** rápido, económico y seguro.
- **Desventajas:** no permite un backend tradicional.
- **Uso típico:** portfolios, documentación y páginas frontend.

    BaaS

 Ejemplos: Supabase, Firebase, Appwrite.

 - **Ventajas:** ofrece base de datos, autenticación y APIs listas.
- **Desventajas:** menos control y dependencia del proveedor.
- **Uso típico:** aplicaciones que necesitan backend sin desarrollarlo desde cero.

## CDN

 Un **CDN (Content Delivery Network)** es una red de servidores distribuidos geográficamente que entrega archivos desde un servidor cercano al usuario.

 Resuelve principalmente:

 - **Latencia:** el contenido viaja desde un servidor cercano.
- **Carga del origen:** el servidor original recibe menos solicitudes.
- **Caché:** archivos como HTML, CSS, JS e imágenes pueden almacenarse temporalmente en los nodos del CDN.

 ## Sitio estático vs. dinámico

 - **Estático:** el servidor entrega archivos ya generados (`.html`, `.css`, `.js`, imágenes). No necesita ejecutar código para construir la página en cada petición.
- **Dinámico/renderizado en servidor (SSR):** el servidor ejecuta código y genera HTML según la petición, usuario, datos, sesión, etc.

 ## React + Vite/CRA

 Aunque React permite crear aplicaciones complejas, al ejecutar `npm run build`, **Vite o CRA convierten la aplicación en archivos estáticos**:

```
index.html
assets/
  app.js
  styles.css
```

 El navegador descarga esos archivos y **React se ejecuta allí**. Por eso puedes alojar una SPA de React en un hosting estático.

 ## El problema de `/dashboard`

 Una **SPA (Single Page Application)** normalmente usa enrutamiento del lado del cliente:

```
/          → Home
/login     → Login
/dashboard → Dashboard
```

 Si navegas desde `/` a `/dashboard`, React Router puede mostrar correctamente `Dashboard`.

 Pero si recargas directamente:

```
https://ejemplo.com/dashboard
```

 el navegador solicita `/dashboard` **al servidor**. Un hosting estático busca normalmente un archivo llamado:

```
/dashboard
```

 Como no existe, responde **404**.

 La solución habitual es configurar el hosting para que **todas las rutas desconocidas devuelvan `index.html`**. Entonces React recibe la petición y su router decide qué componente mostrar.


 Comparación
GitHub Pages: 100 GB/mes, 10 builds/hora y sitios de hasta 1 GB. Permite variables mediante GitHub Actions. No soporta SPA directamente ni backend. Tiene dominio personalizado, HTTPS y previews mediante Actions.

Netlify: 100 GB/mes y 300 minutos de build/mes. Permite variables de entorno, funciones serverless, dominio personalizado y HTTPS. Para SPA normalmente necesitas configurar un rewrite. Tiene previews por Pull Request.

Vercel: 100 GB/mes y builds de hasta 45 minutos. Permite variables de entorno, funciones serverless y SPA sin configuración adicional. Incluye dominio personalizado, HTTPS y previews por Pull Request.

Cloudflare Pages: ancho de banda estático ilimitado y 500 builds/mes. Permite variables de entorno, funciones, dominio personalizado y HTTPS. Las SPA funcionan sin configuración extra y tiene previews por Pull Request.

Render: 5 GB/mes y 500 minutos de build al mes. Permite variables de entorno, backend y funciones. Para SPA normalmente requiere configurar un rewrite. Incluye dominio personalizado, HTTPS y previews por Pull Request.

¿Cuál elegiría?
Elegiría Cloudflare Pages para un proyecto React + Vite porque tiene muy buen límite de ancho de banda, muchos builds gratuitos y facilita especialmente el despliegue de una SPA. Si necesitara más funcionalidades de backend, Vercel sería una excelente alternativa.




  ¿Qué es un BaaS?

 **BaaS (Backend as a Service)** es un servicio que te proporciona un backend ya preparado, sin tener que construir y administrar todo desde cero.

 Supabase  ofrece principalmente:

 - **Postgres:** base de datos SQL.
- **Auth:** registro, login y gestión de usuarios.
- **Storage:** almacenamiento de archivos.
- **Realtime:** recibir cambios de la base de datos en tiempo real.
- **Edge Functions:** funciones backend que se ejecutan en el servidor.  Supabase

  `anon key` vs `service_role`

 - **`anon key`:** puede estar en el **frontend**. Se considera pública y los permisos deben estar protegidos mediante RLS.
- **`service_role`:** tiene acceso elevado y **jamás debe estar en el frontend**. Bypassea RLS y debe permanecer únicamente en el backend.  Supabase

 > Nota: Supabase está reemplazando progresivamente `anon`/`service_role` por **publishable/secret keys**, con la migración prevista para finales de 2026.  Supabase

  ¿Qué es RLS?

 **RLS (Row Level Security)** permite definir qué filas puede consultar o modificar cada usuario.

 Es fundamental porque la `anon key` está en el navegador y, por tanto, cualquiera puede verla. **La seguridad no puede depender de ocultar esa key**; debe depender de las políticas RLS.  Supabase

 Por ejemplo, suponiendo una tabla `posts` con una columna `user_id`:

```
alter table posts enable row level security;

create policy "Users can read their own posts"
on posts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can edit their own posts"
on posts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

 Así, un usuario autenticado solo puede leer y modificar las filas cuyo `user_id` coincide con su propio `auth.uid()`.

   CORS y URLs de Auth

 En Supabase Auth debes configurar:

 - **Site URL:** URL principal de producción, por ejemplo `https://miapp.com`.
- **Redirect URLs:** URLs permitidas a las que Supabase puede redirigir después del login, OAuth, recuperación de contraseña, etc.  Supabase

 Si dejas configurado solamente `localhost` y despliegas en producción, los **redirects de autenticación pueden fallar**, especialmente confirmación de email, recuperación de contraseña y OAuth.

 Para previews de Vercel/Netlify puedes añadir patrones de URL permitidos.  Supabase

 **CORS:** controla desde qué orígenes puede acceder un navegador a una API. Si tu frontend está en `https://miapp.com`, la configuración debe permitir ese origen cuando corresponda.

   Límites del plan gratuito

 Algunos límites importantes actuales son:

 - **2 proyectos gratuitos activos** por organización.  Supabase
- Los proyectos gratuitos con poca actividad pueden **pausarse después de un período de baja actividad de 7 días**. Se pueden restaurar durante hasta un año.  Supabase
- **Base de datos:** máximo **500 MB** en el plan Free. Si se supera, la base entra en modo de solo lectura. El proyecto dispone de 1 GB de almacenamiento de disco, pero el límite de la base de datos es 500 MB.  Supabase
- **Edge Functions:** máximo **100 funciones por proyecto**, 256 MB de memoria y 150 segundos de duración máxima en Free.  Supabase

 En resumen: **Supabase permite tener el frontend con la `anon`/publishable key en el navegador, pero la verdadera protección de los datos debe estar en Auth + RLS. La `service_role`/secret key nunca debe llegar al navegador.**


 Variables de entorno

 Una **variable de entorno** es un valor que se configura fuera del código, por ejemplo:

```
API_URL=https://api.example.com
API_KEY=123456
```

 `.env` suele ponerse en `.gitignore` para evitar subir credenciales o configuraciones privadas al repositorio.

   Variables en Vite

 En Vite, las variables que empiezan con `VITE_` están disponibles en el código del frontend:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

 Pero **no son secretas**: Vite las incluye en el bundle final.

 Por eso:

 > Todo lo que tenga `VITE_` debe considerarse **público**.

 Nunca pongas ahí contraseñas, `service_role`, tokens privados, etc.

   Build secret vs. runtime secret

 - **Build secret:** GitHub Secrets permite guardar un secreto que GitHub Actions utiliza durante el proceso de compilación. Pero si ese secreto termina incluido en el JavaScript generado, **se vuelve público**.
- **Runtime secret:** permanece en el servidor y solo se utiliza cuando el backend ejecuta una petición. **No llega al navegador**.

   Si subiste una clave por error

 **Borrar el archivo o el commit no es suficiente**, porque la clave puede seguir en el historial de Git.

 Lo correcto es:

 1. **Revocar/rotar la clave inmediatamente.**
2. Crear una nueva.
3. Actualizarla donde corresponda.
4. Eliminar la clave antigua del repositorio/historial si es necesario.
5. Revisar logs para comprobar si pudo haber sido utilizada.

 La regla más importante: **si una clave secreta llegó a Git, considérala comprometida aunque después borres el commit.**


## `npm run build`

 Ejecuta el proceso de **compilación para producción**. En Vite, normalmente genera la carpeta `dist/`.

 `dist/` contiene los archivos que se suben al hosting:

 - `index.html`
- JavaScript
- CSS
- imágenes y otros recursos
- archivos con nombres con hash, como `app-a8f31c.js`

 ## Optimización

 - **Minificación:** elimina espacios, comentarios y código innecesario para reducir el tamaño.
- **Tree shaking:** elimina código que no se utiliza.
- **Code splitting:** divide el JavaScript en varios archivos para cargar solo lo necesario.
- **Hashing:** añade un hash al nombre de los archivos para que el navegador detecte cuándo cambió un archivo y no use una versión vieja de la caché.

 ## CI/CD y GitHub Actions

 **CI/CD** es la automatización de procesos como:

```
push → instalar → test → build → deploy
```

 **GitHub Actions** permite crear workflows que ejecutan esos pasos automáticamente cuando ocurre algo en GitHub, por ejemplo, un `push` o un Pull Request.

 ## `gh-pages` vs Actions

 **Desplegar desde `gh-pages`:**

 - Se utiliza una rama específica para almacenar directamente los archivos de producción.
- Es sencillo, pero mezcla el resultado del build con el repositorio.

 **Desplegar con GitHub Actions:**

 - El código permanece en ramas normales (`main`, `develop`, etc.).
- Actions ejecuta `npm run build` y publica `dist/` automáticamente.
- Permite añadir tests, variables/secrets y otros pasos.

 En general, **Actions es más flexible y automatizable**, mientras que `gh-pages` es una solución más simple para proyectos pequeños.
