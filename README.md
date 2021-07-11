# QueryLac Frontend

Una linda app hecha en React/Redux para obtener información de profesores de la página
web https://scienti.minciencias.gov.co/cvlac y de grupos de investigación https://scienti.minciencias.gov.co/gruplac. 

## Instalación

Primero clona el repositorio localmente:

```bash
git clone https://github.com/uapa-team/querylac-frontend.git
cd querylac-api/
```

Luego instala los paquetes necesarios:
> **_NOTA:_** Este proyecto se hizo con la versión [13.14.0 de node](https://nodejs.org/es/).

```bash
npm install
```

Iniciar el proyecto localmente:

```bash
node npm run serve
```

Mostrar los errores en consola:

```bash
node npm run lint
```

Iniciar el proyecto para producción 

```bash
node npm run start
```

## Lista de enpoints

#### CvLac

  El enpoint principal es /api/cvlac/teacher/:dni
  Ejemplo: /api/cvlac/teacher/79523926/articles

  Propiedad                        | Modificación
  ------------------               | -------------
  TODO                             | /
  Detalles básicos                 | /basicDetails
  Artículos                        | /articles
  Capítulos de libro               | /bookChapters
  Distinciones                     | /awards
  Eventos                          | /events
  Idioma                           | /languages
  Libros                           | /books
  Redes                            | /networks
  Software                         | /softwares
  Formación Académica              | /titles
  Jurados en comite de evaluación  | /judges
  Proyectos                        | /projects
  Par evaluador                    | /couplesEvaluators

#### GroupLac

  El enpoint principal es /api/groupLac/group/:cod
  Ejemplo: /api/groupLac/group/COL0066893/institutions

  Propiedad                        | Modificación
  ------------------               | -------------
  TODO                             | /
  Detalles básicos                 | /basicDetails
  Instituciones                    | /institutions
  Áreas de investigación           | /investigationAreas
  Miembros                         | /members