# Instrucciones para agregar tu CV

## Pasos para agregar tu CV al portafolio:

### 1. Preparar tu CV
- Crea tu CV en formato PDF
- Asegúrate de que el archivo esté optimizado (tamaño recomendado: menos de 2MB)
- Incluye toda la información relevante: experiencia, educación, habilidades, etc.

### 2. Nombrar el archivo
- Renombra tu archivo PDF como: `CV_Jonatan_Mendez.pdf`
- Colócalo en la carpeta `cv/` de tu proyecto

### 3. Verificar la funcionalidad
- Abre `index.html` en tu navegador
- Haz clic en el botón "Descargar CV" en la sección hero
- Haz clic en el botón "📄 Descargar CV" en la sección de contacto
- Verifica que ambos botones funcionen correctamente

### 4. Personalizar (opcional)
Si quieres cambiar el nombre del archivo o la ruta, edita estas líneas en `js/scripts.js`:

```javascript
enlace.href = 'cv/CV_Jonatan_Mendez.pdf'; // Cambia la ruta aquí
enlace.download = 'CV_Jonatan_Mendez.pdf'; // Cambia el nombre de descarga aquí
```

## Características implementadas:

✅ **Botón en la sección hero**: "Descargar CV"
✅ **Botón en la sección de contacto**: "📄 Descargar CV" 
✅ **Notificación de confirmación**: Aparece cuando se descarga el CV
✅ **Scroll automático**: El botón "Contratarme" lleva a la sección de contacto
✅ **Diseño responsive**: Los botones se adaptan a diferentes tamaños de pantalla

## Estructura de archivos:
```
porfo/
├── cv/
│   ├── CV_Jonatan_Mendez.pdf  ← Tu CV va aquí
│   └── INSTRUCCIONES_CV.md    ← Este archivo
├── css/
├── js/
└── index.html
```
