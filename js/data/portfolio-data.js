// ========================================
// DATOS DEL PORTFOLIO
// ========================================
// 
// Para agregar un nuevo proyecto, simplemente agrega un objeto al array:
// {
//   id: número único,
//   titulo: "Nombre del proyecto",
//   descripcion: "Descripción del proyecto",
//   imagen: "ruta/a/imagen.png",
//   url: "https://url-del-proyecto.com",
//   tieneRepositorio: true/false
// }
//
// ========================================

export const proyectos = [
  {
    id: 1,
    titulo: "Calculadora Web",
    descripcion: "Calculadora interactiva desarrollada con JavaScript puro, HTML5 y CSS3. Incluye operaciones básicas. Escalable para operaciones mas avanzadas.",
    imagen: "./img/calculadora.png",
    url: "https://github.com/JonatanMendez17/CalculadoraWeb",
    tieneRepositorio: true
  },
  {
    id: 2,
    titulo: "Generador de Volumetría",
    descripcion: "Herramienta en C#/.NET para generar archivos masivos de datos simulados para pruebas de rendimiento y batch.",
    imagen: "./img/generadorVolumetria.png",
    url: "https://github.com/JonatanMendez17/GeneradorVolumetria",
    tieneRepositorio: true
  },
  {
    id: 3,
    titulo: "Portafolio Web",
    descripcion: "Portafolio personal con proyectos, experiencia y contacto. Construido con HTML, CSS y JavaScript.",
    imagen: "./img/logo.png",
    url: "https://github.com/JonatanMendez17/PortafolioWeb",
    tieneRepositorio: true
  },
  {
    id: 4,
    titulo: "Tienda Online – Toselli Hogar",
    descripcion: "E-commerce completo desarrollado con WordPress, WooCommerce y plugins personalizados.",
    imagen: "./img/tosseliHogar.png",
    url: "https://tosellihogar.com.ar",
    tieneRepositorio: false
  },
  {
    id: 5,
    titulo: "Tienda Alatul",
    descripcion: "Plataforma web con experiencias guiadas, contenido multimedia y tienda de gemas.",
    imagen: "./img/alatul.png",
    url: "https://alatul.app",
    tieneRepositorio: false
  },
  {
    id: 6,
    titulo: "Gesprender",
    descripcion: "Software Factory: soluciones a medida, e‑commerce y automatizaciones para negocios.",
    imagen: "./img/gesprender.png",
    url: "https://gesprender.com",
    tieneRepositorio: false
  }
];

export const experiencias = [
  {
    empresa: "2D SOLUCIONES",
    fecha: "2022 - Al presente | Desarrollador FullStack",
    descripcion: "Proyecto con <strong>Telecom Argentina</strong> Colabore con la implementacion de una aplicacion para procesamientos masivos, bajo arquitectura de microservicios utilizando .NET, combinado con el mantenimiento y la evolución de componentes frontend en React 17. <br><br> <strong> Contribuciones principales:</strong> Desarrollo de procesos completos, creación de herramientas internas y validaciones automáticas en C#, documentación técnica y funcional de sistemas migrados, optimización de consultas en bases de datos Oracle, diseño de APIs Rest, mantenimiento de componentes"
  },
  {
    empresa: "I2T SOLUCIONES DE SOFTWARE",
    fecha: "2021 - 2022 | Desarrollador WordPress & Back-end",
    descripciones: [
      "Proyecto con tienda <strong>Toselli Hogar</strong> colaborando en la creación de página web para presentación de sus productos e implementando ecommerce.",
      "Proyecto con <strong>Jerárquicos Salud</strong>  participado en Implementación de sistema interno con interfaz intuitiva y consultas personalizadas a base de datos para optimizar procesos administrativos."
    ],
    tieneMargenInferior: true
  },
  {
    empresa: "INDRA",
    fecha: "2018 - 2021 | Analista Funcional",
    descripcion: "Colaboré en el Proyecto de <strong>Transformación Digital</strong> para el <strong>Poder Judicial de la provincia de Santa Fe</strong>, en la implementación de un Sistema Integral de Expedientes Judiciales. <br><br> <strong> Contribuciones principales:</strong> Relevamiento de procesos · Análisis de requerimientos · Diseño de casos de prueba · Elaboración de manuales de uso · Capacitación a usuarios finales"
  }
];

export const freelancer = {
  titulo: "Freelancer",
  experiencias: [
    {
      empresa: "Eprenda - Escuela de Cursos Técnicos",
      fecha: "2025 | Instructor en Programación Full Stack",
      descripcion: "Me dedico a la formación de nuevos desarrolladores, guiando su crecimiento desde los fundamentos hasta el dominio de tecnologías modernas.",
      lista: [
        "Fundamentos técnicos: Python, JavaScript, MySQL, HTML/CSS, Boostrap",
        "Integración de IA en desarrollo web y generación de código asistido",
        "Proyectos prácticos que simulan entornos laborales reales y buenas prácticas de programación"
      ]
    },
    {
      empresa: "Gesprender",
      fecha: "2025 | Desarrollador WordPress",
      descripcion: "Desarrollo y diseño de landing page oficial para Software Factory Gesprender <br> Desarrollo de e-commerce para tiena Alatul - Plataforma de servicios y productos"
    }
  ]
};

export const servicios = [
  {
    titulo: "Desarrollo Web",
    descripcion: "Desarrollo de aplicaciones web con HTML, CSS, JavaScript y tecnologías modernas."
  },
  {
    titulo: "Desarrollo Backend",
    descripcion: "Implementación de soluciones backend con C#, .NET y SQL Server."
  },
  {
    titulo: "Análisis Funcional",
    descripcion: "Análisis de requerimientos, diseño de sistemas y documentación técnica."
  }
];

export const tecnologias = {
  backend: [
    { nombre: "C#", tech: "csharp", icono: "devicon-csharp-plain" },
    { nombre: ".NET", tech: "dotnet", icono: "devicon-dotnet-plain" },
    { nombre: "Node.js", tech: "nodejs", icono: "devicon-nodejs-plain" },
    { nombre: "Python", tech: "python", icono: "devicon-python-plain" },
    { nombre: "SQL Server", tech: "mssql", icono: "devicon-microsoftsqlserver-plain" },
    { nombre: "Oracle", tech: "oracle", icono: "devicon-oracle-original" },
    { nombre: "MySQL", tech: "mysql", icono: "devicon-mysql-plain-wordmark" }
  ],
  frontend: [
    { nombre: "React", tech: "react", icono: "devicon-react-original" },
    { nombre: "JavaScript", tech: "javascript", icono: "devicon-javascript-plain" },
    { nombre: "HTML5", tech: "html", icono: "devicon-html5-plain" },
    { nombre: "CSS3", tech: "css", icono: "devicon-css3-plain" },
    { nombre: "Bootstrap", tech: "bootstrap", icono: "devicon-bootstrap-plain" }
  ],
  diseno: [
    { nombre: "WordPress", tech: "wordpress", icono: "devicon-wordpress-plain" },
    { nombre: "Figma", tech: "figma", icono: "devicon-figma-plain" },
    { nombre: "Photoshop", tech: "photoshop", icono: "devicon-photoshop-plain" },
    { nombre: "Elementor", tech: "elementor", icono: null, svg: true },
    { nombre: "Divi", tech: "divi", icono: null, svg: true },
    { nombre: "WooCommerce", tech: "woocommerce", icono: "devicon-woocommerce-plain" }
  ],
  herramientas: [
    { nombre: "Git", tech: "git", icono: "devicon-git-plain" },
    { nombre: "Jira", tech: "jira", icono: "devicon-jira-plain" },
    { nombre: "Confluence", tech: "confluence", icono: "devicon-confluence-plain" },
    { nombre: "VSC", tech: "vscode", icono: "devicon-vscode-plain" },
    { nombre: "VC 2022", tech: "visualstudio", icono: "devicon-visualstudio-plain" },
    { nombre: "Postman", tech: "postman", icono: "devicon-postman-plain" }
  ],
  palabrasClaves: [
    { nombre: "APIs", keyword: "apis" },
    { nombre: "Microservicios", keyword: "microservicios" },
    { nombre: "MVC", keyword: "mvc" },
    { nombre: "Metodologías Scrum", keyword: "scrum" }
  ]
};

export const certificados = [
  // Certificados Platzi
  {
    id: 1,
    titulo: "C# - Programación",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy - csharp.pdf"
  },
  {
    id: 2,
    titulo: "Backend",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_Backend.pdf"
  },
  {
    id: 3,
    titulo: "Computación Básica",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_ComputacionBasica.pdf"
  },
  {
    id: 4,
    titulo: "Expresiones Regulares",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_ExpresionesRegulares.pdf"
  },
  {
    id: 5,
    titulo: "Fundamentos de Ingeniería",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_FundamentosDeIngenieria.pdf"
  },
  {
    id: 6,
    titulo: "Historia de la Programación",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_HistoriaDeLaProgramacion.pdf"
  },
  {
    id: 7,
    titulo: "Introducción Web",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_IntroduccionWeb.pdf"
  },
  {
    id: 8,
    titulo: "Introducción a Terminal",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_IntroTerminal.pdf"
  },
  {
    id: 9,
    titulo: "Pensamiento Lógico",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_PensamientoLogico.pdf"
  },
  {
    id: 10,
    titulo: "Pensamiento Lógico: Estructuras",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_PensamientoLogicoEstructuras.pdf"
  },
  {
    id: 11,
    titulo: "Pensamiento Lógico: Lenguajes",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_PensamientoLogicoLenguajes.pdf"
  },
  {
    id: 12,
    titulo: "Programación Básica",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_ProgramacionBasica.pdf"
  },
  {
    id: 13,
    titulo: "Redes Informáticas",
    institucion: "Platzi",
    fecha: "2024",
    archivo: "./doc/Platzy_Diploma_RedesInformaticas.pdf"
  },
  // Certificados SoloLearn
  {
    id: 14,
    titulo: "CSS",
    institucion: "SoloLearn",
    fecha: "2024",
    archivo: "./doc/CERTIFICADO_SoloLearn_CSS.pdf"
  },
  {
    id: 15,
    titulo: "HTML",
    institucion: "SoloLearn",
    fecha: "2024",
    archivo: "./doc/CERTIFICADO_SoloLearn_HTML.pdf"
  },
  {
    id: 16,
    titulo: "Introducción a C#",
    institucion: "SoloLearn",
    fecha: "2024",
    archivo: "./doc/CERTIFICADO_SoloLearn_INTRODUCCION A C#.pdf"
  },
  {
    id: 17,
    titulo: "SQL",
    institucion: "SoloLearn",
    fecha: "2024",
    archivo: "./doc/CERTIFICADO_SoloLearn_SQL.pdf"
  },
  {
    id: 18,
    titulo: "Team Building",
    institucion: "SoloLearn",
    fecha: "2024",
    archivo: "./doc/CERTIFICADO_SoloLearn_TEAM BUILDING.pdf"
  }
];

