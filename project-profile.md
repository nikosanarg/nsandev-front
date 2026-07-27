# Project Profile — nsandev-front

**Portfolio comercial** de productos digitales. Es la vidriera pública: presenta cada
producto del ecosistema con foco en impacto real de uso, adopción sostenida y escalabilidad
técnica, y describe la base tecnológica transversal.

Los productos que presenta son sistemas reales en producción: Grupo Kaizen
(mundokaizen.org), Tuxon Lab (tuxon.pro), Taboo (taboo.ar), Valle Verde (valleverde.ar),
TutiPoker Academy (tutipoker.academy), PlatenZen (platenzen.com), Sagitar.io y Astrohooks.
Cada uno tiene su propio repo en este workspace.

> El [`README.md`](README.md) es la **fuente de verdad del contenido de producto**: qué
> hace cada proyecto, qué problema resuelve y qué se experimentó técnicamente en él. No se
> duplica acá.

## Stack

- Next.js + React + TypeScript.
- styled-components.
- i18next (`react-i18next`) para internacionalización.

## Arquitectura

Aplicación Next.js estándar en `src/`. Sin backend propio: es contenido y presentación.

---

## Comandos

| Propósito | Comando |
|---|---|
| Lint | `npm run lint` |
| Build | `npm run build` |
| Tests | no hay suite configurada |
| Suite de verificación antes de cerrar | `npm run lint && npm run build` |
| Levantar local | `npm run dev` |
| Levantar en 3001 | `npm run dev:portfolio` |
| Levantar junto a sagitar.io | `npm run dev:full` (concurrently: monolito + portfolio) |

`npm run dev:sagitar-io` levanta el repo hermano `../sagitar.io`. Requiere que exista como
checkout hermano.

## Convenciones propias

- Texto visible nuevo va con su clave de i18next.
- Los textos de producto se derivan del README, no se improvisan.

## Zonas sensibles

- **Es material comercial.** Las descripciones hablan de sistemas reales: no inventar
  capacidades, métricas, volúmenes de uso ni clientes. Si un dato no está en el README,
  preguntá antes de escribirlo.
- La integración con `sagitar.io` vía `dev:full` es deliberada. No la rompas al reorganizar
  scripts.

---

## Interfaz

- Componentes propios con styled-components. No hay librería externa.
- i18n con i18next.

## Tests

No hay framework de testing configurado. Si una tarea lo necesita, plantealo antes de
introducir uno.

## Control de versiones

Sin reglas propias declaradas. Aplica `commit.md` del harness.

---

## Responsabilidades que no aplican

- `database` — no hay acceso a datos.
- `test` — no hay suite configurada.
