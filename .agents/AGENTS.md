# Prompts para Antigravity IDE

## Prompt de Inicialización de Sesión / Contexto:
SISTEMA: Actúa como ingeniero de software senior.
ENTORNO: Fedora 44, Antigravity IDE.
PROYECTO: Portfolio Web Ciberseguridad (React, Zustand, R3F).
ACCIÓN: Revisa el árbol de directorios actual y el último commit. Responde únicamente con un mapeo mental de los componentes activos y espera la orden de modificación. No sugieras código aún.

## Prompt de Refactorización y Rendimiento (GLSL/React):
ACCIÓN: Refactorizar el componente adjunto.
REGLAS ESTRICTAS:
1. Eliminar renders innecesarios en el hilo principal.
2. Si es un componente 3D, aislar los cálculos matemáticos en buffers o shaders, no en bucles JS estándar.
3. Si es estado de UI, utilizar selectores de Zustand para evitar mutaciones globales.
ENTREGABLE: Código refactorizado con los bloques exactos para copiar y pegar.

## Prompt de Reporte de Cambios (Al finalizar una sesión):
ACCIÓN: Generar informe de estado.
ESTRUCTURA OBLIGATORIA:
- Archivos Modificados: [Lista]
- Alteraciones de Estado (Zustand): [Nuevos nodos o reducers]
- Advertencias de Rendimiento: [Fugas de memoria detectadas o cuellos de botella en R3F]
- Siguiente Paso Lógico: [Una sola frase]
Proporciona el formato limpio y sin explicaciones superfluas.

# [PROMPT_ANALISIS_ESTRUCTURAL]
OBJETIVO: Auditar la coherencia del árbol de componentes antes de escribir código.
REGLAS:
1. Revisa el directorio actual.
2. Identifica código duplicado, dependencias circulares o renderizados innecesarios en React.
3. Responde estrictamente con un listado de problemas encontrados y la propuesta de refactorización. No escribas el código final hasta recibir confirmación.

# [PROMPT_SISTEMA_DISENO]
OBJETIVO: Mantener la coherencia visual (CyberSec/Terminal).
REGLAS:
1. Todo nuevo componente debe utilizar las variables CSS globales (ej. var(--bg-dark), var(--accent-green)).
2. Prohibido el uso de estilos en línea (inline-styles) a menos que sean cálculos dinámicos de posición (ej. sistema Tiling).
3. La tipografía debe ser estrictamente monospace para datos e interfaces de usuario.
ENTREGABLE: Código del componente estructurado con clases CSS modulares.

# [PROMPT_REPORTE_OPERACION]
OBJETIVO: Confirmar la finalización de un bloque de trabajo.
ESTRUCTURA DE SALIDA REQUERIDA:
- ESTADO: [Éxito / Fallo Parcial]
- MODIFICACIONES: [Archivos alterados]
- RIESGOS: [Posibles fugas de memoria en Three.js, cuellos de botella en el DOM, etc.]
- SOLICITUD DE INSTRUCCIÓN: [Pregunta binaria o directa sobre el siguiente paso]
