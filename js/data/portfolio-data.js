// ========================================
// DATOS DEL PORTFOLIO
// ========================================

export const proyectos = [
  {
    id: 5,
    tipo: "principal",
    titulo: "BULK - Procesamiento masivo",
    cliente: "Telecom Argentina",
    descripcion: "Aplicación para procesamiento masivo de datos bajo arquitectura de microservicios. Incluye desarrollo de procesos batch, APIs REST y componentes frontend.",
    tags: [".NET", "C#", "Web API", "Microservicios", "React", "Oracle"],
    url: "#",
    tieneRepositorio: false
  },
  {
    id: 6,
    tipo: "principal",
    titulo: "Sistema SISFE",
    cliente: "Poder Judicial – Santa Fe",
    descripcion: "Sistema Integral de Expedientes Judiciales. Participación en relevamiento, análisis funcional, diseño de pruebas y capacitación a usuarios finales.",
    tags: ["Análisis Funcional", "SQL"],
    url: "#",
    tieneRepositorio: false
  },
  {
    id: 7,
    tipo: "principal",
    titulo: "App de Implementacion ",
    cliente: "Impronta Solución",
    descripcion: "Aplicación desktop para optimizar e implementar la migración de nuevos clientes, reduciendo tiempos operativos del equipo.",
    tags: [".NET", "WPF", "C#"],
    url: "https://github.com/JonatanMendez17/Implementador",
    tieneRepositorio: true
  },
  {
    id: 2,
    tipo: "principal",
    titulo: "Generador de Volumetría",
    cliente: "Proyecto personal",
    descripcion: "Herramienta en C#/.NET para generar archivos masivos de datos simulados para pruebas de rendimiento y procesamiento batch.",
    tags: ["C#", ".NET", "Batch"],
    url: "https://github.com/JonatanMendez17/GeneradorVolumetria",
    tieneRepositorio: true
  },
  {
    id: 9,
    tipo: "principal",
    titulo: "API de notificaciones escalable",
    cliente: "Impronta Solución",
    descripcion: "Desarrollo de API de notificaciones para el envío de mensajes a través de distintos canales, comenzando con integración a Telegram y diseñada para escalar a nuevas plataformas como WhatsApp",
    tags: [".NET", "Web API", "REST", "SOAP"],
    url: "https://github.com/JonatanMendez17/Notification-service",
    tieneRepositorio: true
  },
  {
    id: 8,
    tipo: "principal",
    titulo: "Automatización de proceso",
    cliente: "Impronta Solución",
    descripcion: "Automatización de procesos internos mediante n8n, reduciendo tareas manuales y mejorando la eficiencia operativa del equipo.",
    tags: ["n8n", "Automatización", "REST"],
    url: "https://github.com/JonatanMendez17/hitosMensuales",
    tieneRepositorio: true
  },
  {
    id: 3,
    tipo: "secundario",
    titulo: "Portafolio Web",
    descripcion: "Portafolio personal construido con HTML, CSS y JavaScript vanilla.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/JonatanMendez17/PortafolioWeb",
    tieneRepositorio: true
  },
  {
    id: 4,
    tipo: "secundario",
    titulo: "Tienda Online – Toselli Hogar",
    descripcion: "E-commerce completo desarrollado con WordPress, WooCommerce y plugins personalizados.",
    tags: ["WordPress", "WooCommerce"],
    url: "https://tosellihogar.com.ar",
    tieneRepositorio: false
  }
];

export const experiencias = [
  {
    empresa: "IMPRONTA SOLUCIÓN",
    periodo: "2025",
    cargo: "Desarrollador .NET",
    actual: true,
    lista: [
      "Desarrollo de aplicación desktop en <strong>WPF</strong> para optimizar la implementación de nuevos clientes",
      "Automatización de procesos mediante <strong>n8n</strong>, reduciendo tareas manuales y mejorando eficiencia operativa del equipo",
      "Implementación y consumo de servicios web (<strong>REST</strong>) para notificaciones e integración entre sistemas",
      "Desarrollo de funcionalidades backend en <strong>.NET</strong> para integración con sistemas internos"
    ]
  },
  {
    empresa: "2D SOLUCIONES",
    periodo: "2022 – 2025",
    cargo: "Desarrollador .NET",
    lista: [
      "Proyecto con <strong>Telecom Argentina</strong>: implementación de aplicación para procesamientos masivos bajo arquitectura de microservicios con .NET",
      "Mantenimiento y evolución de componentes frontend en <strong>React 17</strong>",
      "Desarrollo de procesos completos internas con validaciones automáticas en <strong>C#</strong>",
      "Documentación técnica y funcional de sistemas migrados",
      "Optimización de consultas en bases de datos <strong>Oracle</strong> y diseño de APIs REST"
    ]
  },
  {
    empresa: "I2T SOLUCIONES DE SOFTWARE",
    periodo: "2021 – 2022",
    cargo: "Desarrollador Backend ",
    lista: [
      "Proyecto con tienda <strong>Toselli Hogar</strong>: creación de página web para presentación de productos e implementación de ecommerce",
      "Proyecto con <strong>Jerárquicos Salud</strong>: implementación de sistema interno con consultas personalizadas a base de datos para optimizar procesos administrativos"
    ]
  },
  {
    empresa: "INDRA",
    periodo: "2018 – 2021",
    cargo: "Analista Funcional",
    lista: [
      "Proyecto de <strong>Transformación Digital</strong> para el <strong>Poder Judicial de la provincia de Santa Fe</strong>: implementación de Sistema Integral de Expedientes Judiciales",
      "Relevamiento de procesos y análisis de requerimientos",
      "Diseño de casos de prueba y elaboración de manuales de uso",
      "Capacitación a usuarios finales"
    ]
  }
];

export const freelancer = [
  {
    empresa: "Eprenda – Escuela de Cursos Técnicos",
    periodo: "2025",
    cargo: "Instructor en programación Full Stack",
    lista: [
      "Formación de nuevos desarrolladores desde fundamentos hasta tecnologías modernas",
      "Fundamentos técnicos: Python, JavaScript, MySQL, HTML/CSS, Bootstrap",
      "Integración de IA en desarrollo web y generación de código asistido",
      "Proyectos prácticos que simulan entornos laborales reales y buenas prácticas de programación"
    ]
  },
  {
    empresa: "Gesprender",
    periodo: "2025",
    cargo: "Desarrollador WordPress",
    lista: [
      "Desarrollo y diseño de landing page oficial para Software Factory Gesprender",
      "Desarrollo de e-commerce para tienda Alatul – Plataforma de servicios y productos"
    ]
  }
];

export const tecnologias = {
  backend: [
    { nombre: "C#", tech: "csharp", icono: "devicon-csharp-plain" },
    { nombre: ".NET", tech: "dotnet", icono: "devicon-dotnet-plain" },
    { nombre: "ASP.NET Core", tech: "aspnetcore", icono: "devicon-dotnetcore-plain" },
    { nombre: "ASP.NET Web API", tech: "webapi", icono: null, fa: "fas fa-plug" },
    { nombre: "WPF", tech: "wpf", icono: null, fa: "fab fa-windows" },
    { nombre: "Entity Framework", tech: "ef", icono: null, fa: "fas fa-database" },
    { nombre: "SQL Server", tech: "mssql", icono: "devicon-microsoftsqlserver-plain" },
    { nombre: "Oracle", tech: "oracle", icono: "devicon-oracle-original" },
    { nombre: "MySQL", tech: "mysql", icono: "devicon-mysql-plain-wordmark" },
    { nombre: "Git", tech: "git", icono: "devicon-git-plain" },
    { nombre: "Docker", tech: "docker", icono: "devicon-docker-plain" },
    { nombre: "Postman", tech: "postman", icono: "devicon-postman-plain" },
    { nombre: "n8n", tech: "n8n", icono: null, fa: "fas fa-cogs" }
  ],
  frontend: [],
  herramientas: [
    { nombre: "Jira", tech: "jira", icono: "devicon-jira-plain" },
    { nombre: "Confluence", tech: "confluence", icono: "devicon-confluence-plain" },
    { nombre: "React", tech: "react", icono: "devicon-react-original" },
    { nombre: "JavaScript", tech: "javascript", icono: "devicon-javascript-plain" },
    { nombre: "HTML", tech: "html", icono: "devicon-html5-plain" },
    { nombre: "CSS", tech: "css", icono: "devicon-css3-plain" }
  ],
  palabrasClaves: [
{ nombre: "Microservicios", keyword: "microservicios" },
    { nombre: "Integración de sistemas", keyword: "integracion" },
    { nombre: "Mensajería (RabbitMQ)", keyword: "rabbitmq" },
    { nombre: "Clean Architecture", keyword: "clean-architecture" }
  ]
};

export const certificados = [
  // Certificados Platzi
  {
    id: 1,
    titulo: "C# - Programación",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy - csharp_page-0001.jpg",
  },
  {
    id: 2,
    titulo: "Backend",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_Backend_page-0001.jpg",
  },
  {
    id: 3,
    titulo: "Computación Básica",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_ComputacionBasica_page-0001.jpg",
  },
  {
    id: 4,
    titulo: "Expresiones Regulares",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_ExpresionesRegulares_page-0001.jpg",
  },
  {
    id: 5,
    titulo: "Fundamentos de Ingeniería",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_FundamentosDeIngenieria_page-0001.jpg",
  },
  {
    id: 6,
    titulo: "Historia de la Programación",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_HistoriaDeLaProgramacion_page-0001.jpg",
  },
  {
    id: 7,
    titulo: "Introducción Web",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_IntroduccionWeb_page-0001.jpg",
  },
  {
    id: 8,
    titulo: "Introducción a Terminal",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_IntroTerminal_page-0001.jpg",
  },
  {
    id: 9,
    titulo: "Pensamiento Lógico",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_PensamientoLogico_page-0001.jpg",
  },
  {
    id: 10,
    titulo: "Pensamiento Lógico: Estructuras",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_PensamientoLogicoEstructuras_page-0001.jpg",
  },
  {
    id: 11,
    titulo: "Pensamiento Lógico: Lenguajes",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_PensamientoLogicoLenguajes_page-0001.jpg",
  },
  {
    id: 12,
    titulo: "Programación Básica",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_ProgramacionBasica_page-0001.jpg",
  },
  {
    id: 13,
    titulo: "Redes Informáticas",
    institucion: "Platzi",
    fecha: "2024",
    imagen: "./doc/Platzy_Diploma_RedesInformaticas_page-0001.jpg",
  },
  {
    id: 14,
    titulo: "Apis con .NET",
    institucion: "Platzi",
    fecha: "2025",
    imagen: "./doc/Platzy_Diploma_ApisConNET_page-0001.jpg",
  },
  {
    id: 15,
    titulo: "Entity Framework",
    institucion: "Platzi",
    fecha: "2025",
    imagen: "./doc/Platzy_Diploma_EntityFramework_page-0001.jpg",
  },
  // Certificados SoloLearn
  {
    id: 16,
    titulo: "CSS",
    institucion: "SoloLearn",
    fecha: "2024",
    imagen: "./doc/CERTIFICADO_SoloLearn_CSS_page-0001.jpg",
  },
  {
    id: 17,
    titulo: "HTML",
    institucion: "SoloLearn",
    fecha: "2024",
    imagen: "./doc/CERTIFICADO_SoloLearn_HTML_page-0001.jpg",
  },
  {
    id: 18,
    titulo: "Introducción a C#",
    institucion: "SoloLearn",
    fecha: "2024",
    imagen: "./doc/CERTIFICADO_SoloLearn_INTRODUCCIONCSHARP_page-0001.jpg",
  },
  {
    id: 19,
    titulo: "SQL",
    institucion: "SoloLearn",
    fecha: "2024",
    imagen: "./doc/CERTIFICADO_SoloLearn_SQL_page-0001.jpg",
  },
  {
    id: 20,
    titulo: "Team Building",
    institucion: "SoloLearn",
    fecha: "2024",
    imagen: "./doc/CERTIFICADO_SoloLearn_TEAM BUILDING_page-0001.jpg",
  }
];

