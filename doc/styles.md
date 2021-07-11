# General
El diseño general de Querylac está hecho utilizando el preprocesador css [Sass](https://sass-lang.com/) junto con la
librería de componentes [Ant Design](https://ant.design/).

# Estilos globales
La carpeta [styles](../src/styles) es donde se alojan los estilos globales de Querylac. Se divide en dos grandes ramas;
[theme/](../src/styles/theme) y [vendors/](../src/styles/vendors) 

### Theme
Es el tema de la aplicación, es decir, los archivos que manejan la tipografía, colores, animaciones, etc. 
Una de las más importantes secciones es la carpeta [mixin/](../src/styles/theme/mixin) donde se alojan 
mixins(muy parecidas a corrientes funciones) que básicamente son utilidades para reciclar código.

### Vendors
En esta carpeta se alojan todos los <code>imports</code> correspondientes a las librerías de terceros.


## Personalizar un componente
Cada componente sigue la metodología BEM para bautizar los elementos HTML, metodología que directamente se sigue al
personalizar cada componente. 

> **_NOTA:_**  En el caso de utilizar algún componente de Ant Design se recomienda dejar una nota/bandera cuando se sobrescriban los
estilos del componente.

Ejemplo:

```Scss
.ComponentName {
  display: grid;
  background: #000c17;

  &--modificator {
    background: red;
  }

  &__block {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  //FLAG: Overwriting slick styles
  .slick-arrow {
    color: var(--primary-dark--0) !important;

    &:hover, &:active, &:focus-within {
      color: var(--secondary) !important;
    }

    &::before, &::after {
      font-size: 1rem;
    }
  }
}
```
## Responsive
Se sigue el patrón de css llamado *Mobile First*. Se escriben primero los estilos de resoluciónes de pantallas 
de celular y a partir de estos, se escriben <code>media-queries</code> para acomodar los estilos para 
pantallas más grandes. Los <code>breakpoints</code> que se tienen en cuenta son:

* Celulares *320px*
* Tablets pequeñas y celulares grandes: *576px*
* Tablets *768px*
* Tablets grandes y pequeñas pantallas de escritorio: *992px*
* Pantallas estándar de escritorio *1200px*
* Portátiles *1400px*

A la hora de realizar un <code>media-query</code>, éste se hace inmediatamente debajo de los estílos a modificar y 
con ayuda de los mixins predefinidos para estas operaciones.

Ejemplo: 

```Scss
.container {

  width: 100%;

  @include sm() {
    max-width: 540px;
  }

  @include md() {
    max-width: 720px;
  }

  @include lg() {
    max-width: 960px;
  }

  @include xl() {
    max-width: 1140px;
  }

  @include xxl() {
    max-width: 1320px;
  }
}

```
