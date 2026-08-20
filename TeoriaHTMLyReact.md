
1. Explicar con tus propias palabras
-¿Qué es una etiqueta HTML?
R//Una etiqueta HTML es una instrucción que sirve para estructurar y realizar cambios en la web, como el ingreso de un texto mediante la etiqueta `<p>`. La mayoría de las etiquetas deben tener una apertura y un cierre con la siguiente estructura: 

#-¿Qué etiquetas componen la estructura de un archivo HTML?
R//En un archivo HTML existen las siguientes etiquetas fundamentales:
`<html>`:** Es la etiqueta principal del archivo y la raíz de todo el documento.
`<head>`:** Es "la cabeza" de la página web. Dentro de ella se colocan los metadatos, los enlaces (*links*) a archivos externos y los estilos CSS. No es visible directamente en la pantalla para el usuario.
`<title>`:** Define el título que se muestra en la pestaña del navegador.
`<body>`:** Es el cuerpo de la página. Dentro de él se escribe el código de todo el proyecto y se utilizan las etiquetas visuales para el usuario.

#- 5 Etiquetas y elementos de texto en HTML
R//`<h1>`:** Se utiliza para los títulos principales. Tiene una familia que va desde el `<h1>` hasta el `<h6>`, donde el primero es el más grande e importante y el último es el más chico.
`<p>`:** Representa un párrafo. Es la forma básica y estándar de estructurar los textos en la web.
`Lorem Ipsum`:** No es una etiqueta en sí, sino un texto simulado de relleno que se inserta para ocupar espacios vacíos temporalmente mientras se diseña.
`<input type="text">`:** Es un campo de entrada (no un botón) donde el usuario puede escribir texto libre, ideal para capturar nombres, apellidos o apodos.
`<i>`:** Aplica el estilo de letra cursiva (*itálica*) al texto que encierra.

#- ¿Cómo funcionan los links en HTML y qué etiquetas usan?
R//Los enlaces funcionan a través de atributos y etiquetas específicas. Se utilizan tanto para dirigir al usuario hacia otro lugar (páginas web externas o secciones internas) como para importar recursos (imágenes, videos o dependencias). 

La etiqueta más utilizada para navegar es **`<a>`**, la cual requiere del atributo **`href`**:
```html
<a href="https://google.com">Ir a Google</a>


2. Investigar

#- ¿Qué es CSS?
R//Es el código que usas para dar estilo y diseño a una página web. Separa el contenido (escrito en HTML) de la apariencia visual, permitiendo controlar colores, tipos de letra, márgenes y la estructura de la pantalla en diferentes dispositivos.

#-¿Qué son los selectores CSS?
R//Son las herramientas que utilizamos para indicar qué cambios de diseño se van a realizar y exactamente en qué parte del documento aplicarlos. Uno de los más conocidos es el selector universal **`*`**, que selecciona todos los elementos de la página a la vez.

#- ¿Cómo una etiqueta puede ser modificada por múltiples selectores CSS?
R//Esto funciona gracias a dos conceptos pilares de CSS: **la herencia** y **la acumulación de estilos**. Si las propiedades de los diferentes selectores no se contradicen entre sí, el elemento adoptará los estilos de todos ellos de forma simultánea. En caso de contradicción, se resuelve mediante las regladas de especificidad y orden de lectura.



3. Explica con tus propias palabras

#- ¿Qué es un componente React?
R//Un componente es el lugar donde se gestionan los cambios de la página. Son las piezas de construcción independientes que unidas forman el sitio web completo (como el menú, el pie de página o un formulario).

#- ¿Cómo los componentes se relacionan con las etiquetas HTML? (Diferencias y parecidos)
Parecidos:** Un componente se invoca en el código de forma idéntica a una etiqueta HTML (cumplen inferencialmente la misma función de pintar e insertar cambios en el proyecto).
R//Diferencias:** Las etiquetas HTML son instrucciones nativas y estáticas del navegador. Por el contrario, los componentes son creados por el desarrollador, funcionan como un conjunto de archivos organizados para lograr un suceso específico (como el *Login*) y por dentro están llenos de etiquetas HTML y lógica de JavaScript.



4. Averiguar

#- Tipos de variables dentro de un componente
R//State (`useState`):** La memoria interna del componente. Al cambiar su valor, la pantalla se actualiza automáticamente (ej. abrir/cerrar un menú).
Props:** Información de solo lectura que el componente recibe desde afuera (un componente padre) para configurarse o mostrar datos.
Locales (`const`/`let`):** Variables temporales de JavaScript que se destruyen y recalculan cada vez que el componente se vuelve a dibujar.
Refs (`useRef`):** Variables que guardan datos en segundo plano sin alterar ni actualizar lo que el usuario ve en pantalla.

#- Glosario de términos en React
R//Props de un componente:** Son el equivalente exacto a las propiedades o atributos de las etiquetas HTML. Sirven para parametrizar un componente desde el exterior.
`useState`:** Es el gancho (*Hook*) que maneja la memoria. Funciona como cuando abres una nevera: tu cerebro (la variable) registra lo que hay dentro y sabe exactamente qué hacer en base a ese estado.
`useEffect`:** Es la función que maneja la reacción a la memoria. Monitorea los cambios y ejecuta de forma automática la acción que se debe realizar.
Diferencia entre `useState` y `useEffect`:** `useState` es el indicador físico (la memoria que almacena y precisa un dato), mientras que `useEffect` es la acción automatizada que se dispara justo cuando ese indicador cambia.
