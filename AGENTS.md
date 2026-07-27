<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — nsandev-front

Portfolio comercial de productos digitales (Next.js + React + TypeScript +
styled-components, i18n). Es la vidriera pública del trabajo: presenta cada producto del
ecosistema y la base tecnológica transversal.

## Harness de ingeniería

Antes de trabajar, leé en este orden:

1. `../kaizen-harness/dev-workflow.md` — invariantes de trabajo y routing por tipo de tarea.
2. `./project-profile.md` — stack, comandos y zonas sensibles de este repo.

Cargá **sólo** las responsabilidades (`../kaizen-harness/responsibilities/*.md`) que el
routing indique. Todo cambio visible carga además `interface.md`.

**Si el harness no está disponible** —la ruta no existe o no tenés acceso— no lo busques ni
lo reconstruyas. Seguí `project-profile.md` y las buenas prácticas estándar de la
industria: entender antes de modificar, alcance mínimo, reutilizar antes de crear,
respetar la arquitectura existente, y verificar con lint y build antes de dar algo por
terminado.

## Reglas de este repo

1. **Es material comercial.** Los textos de producto describen sistemas reales en
   producción: no inventes capacidades, métricas ni clientes. Si un dato no está en el
   README, preguntá antes de escribirlo.
2. El `README.md` es la fuente de verdad del contenido de producto. Si cambia lo que un
   producto hace, se actualiza ahí y después en la web.
3. Texto visible nuevo va con su clave de i18next.
4. `npm run dev:full` levanta este repo junto a `sagitar.io` con `concurrently`. Es
   deliberado: hay integración entre ambos.
5. `npm run build` tiene que pasar limpio antes de considerar terminada cualquier tarea.
