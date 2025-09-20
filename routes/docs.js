const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
const router = express.Router();

// Cargar lenguajes necesarios
loadLanguages(['javascript', 'json', 'bash']);

// Configurar marked para mejor renderizado
marked.setOptions({
  highlight: function(code, lang) {
    // Si hay un lenguaje especificado, usar Prism.js para syntax highlighting
    if (lang && Prism.languages[lang]) {
      const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
      return `<pre><code class="language-${lang}">${highlighted}</code></pre>`;
    }
    return `<pre><code>${code}</code></pre>`;
  },
  breaks: true,
  gfm: true,
  langPrefix: 'language-'
});

// Función para generar el HTML completo con estilos
function generarHTML(contenidoMarkdown) {
  const htmlContent = marked.parse(contenidoMarkdown);
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentación de la API - Servidor de Usuarios</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: #fafafa;
            color: white;
            padding: 1.5rem 0;
            margin-bottom: 2rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2rem;
            margin-bottom: 0.3rem;
            font-weight: 600;
        }
        
        .header p {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            font-size: 2rem;
        }
        
        h2 {
            color: #34495e;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 0.3rem;
            margin: 2rem 0 1rem 0;
            font-size: 1.5rem;
        }
        
        h3 {
            color: #34495e;
            margin: 1.5rem 0 1rem 0;
            font-size: 1.3rem;
        }
        
        h4 {
            color: #34495e;
            margin: 1rem 0 0.5rem 0;
            font-size: 1.1rem;
        }
        
        p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        ul, ol {
            margin: 1rem 0 1rem 2rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        code {
            background-color: #f1f3f4;
            border: 1px solid #dadce0;
            border-radius: 4px;
            padding: 0.2rem 0.4rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            color: #d73a49;
        }
        
        pre {
            background-color: #1e1e1e;
            color: #d4d4d4;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1rem 0;
            border-left: 4px solid #007acc;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        pre code {
            background: none;
            border: none;
            padding: 0;
            color: inherit;
            font-size: 0.9rem;
        }
        
        /* Syntax highlighting con Prism.js - Estilo VSCode */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
            color: #6a9955;
        }
        
        .token.punctuation {
            color: #d4d4d4;
        }
        
        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
            color: #b5cea8;
        }
        
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
            color: #ce9178;
        }
        
        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
            color: #d4d4d4;
        }
        
        .token.atrule,
        .token.attr-value,
        .token.keyword {
            color: #569cd6;
        }
        
        .token.function,
        .token.class-name {
            color: #dcdcaa;
        }
        
        .token.regex,
        .token.important,
        .token.variable {
            color: #d16969;
        }
        
        /* Colores específicos para JSON */
        .language-json .token.property {
            color: #9cdcfe;
        }
        
        .language-json .token.string {
            color: #ce9178;
        }
        
        .language-json .token.number {
            color: #b5cea8;
        }
        
        .language-json .token.boolean {
            color: #569cd6;
        }
        
        .language-json .token.null {
            color: #808080;
        }
        
        .language-json .token.punctuation {
            color: #d4d4d4;
        }
        
        /* Colores específicos para JavaScript */
        .language-javascript .token.keyword {
            color: #569cd6;
        }
        
        .language-javascript .token.string {
            color: #ce9178;
        }
        
        .language-javascript .token.number {
            color: #b5cea8;
        }
        
        .language-javascript .token.function {
            color: #dcdcaa;
        }
        
        .language-javascript .token.comment {
            color: #6a9955;
        }
        
        .language-javascript .token.operator {
            color: #d4d4d4;
        }
        
        /* Colores específicos para Bash */
        .language-bash .token.function {
            color: #dcdcaa;
        }
        
        .language-bash .token.string {
            color: #ce9178;
        }
        
        .language-bash .token.comment {
            color: #6a9955;
        }
        
        .language-bash .token.operator {
            color: #d4d4d4;
        }
        
        blockquote {
            border-left: 4px solid #3498db;
            background-color: #f8f9fa;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0 8px 8px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }
        
        th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #495057;
        }
        
        tr:hover {
            background-color: #f8f9fa;
        }
        
        .endpoint {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;
            display: inline-block;
            margin: 0.5rem 0;
        }
        
        .method-get { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); }
        .method-post { background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); }
        .method-put { background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); }
        .method-delete { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); }
        
        .status-code {
            display: inline-block;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.8rem;
            margin: 0.2rem;
        }
        
        .status-200 { background-color: #d4edda; color: #155724; }
        .status-201 { background-color: #d1ecf1; color: #0c5460; }
        .status-400 { background-color: #f8d7da; color: #721c24; }
        .status-404 { background-color: #f8d7da; color: #721c24; }
        .status-500 { background-color: #f8d7da; color: #721c24; }
        
        .json-example {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 1rem;
            margin: 1rem 0;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
        }
        
        /* Mejorar la apariencia de los bloques de código con Prism.js */
        pre[class*="language-"] {
            position: relative;
            background-color: #1e1e1e !important;
            color: #d4d4d4 !important;
        }
        
        pre[class*="language-"]::before {
            content: attr(class);
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.1);
            color: #d4d4d4;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            font-size: 0.7rem;
            text-transform: uppercase;
            font-weight: 600;
            z-index: 1;
        }
        
        /* Colores específicos para diferentes tipos de código */
        .language-javascript {
            border-left-color: #f7df1e;
        }
        
        .language-json {
            border-left-color: #ff6b6b;
        }
        
        .language-bash {
            border-left-color: #4ecdc4;
        }
        
        /* Asegurar que los tokens de Prism.js tengan los colores correctos */
        pre[class*="language-"] code {
            background: transparent !important;
            color: inherit !important;
        }
        
        
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            background-color: #1e1e1e;
            color: white;
            border-radius: 10px;
        }
        
        .footer a {
            color: #3498db;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .content {
                padding: 1rem;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            pre {
                padding: 1rem;
                font-size: 0.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
      
        <div class="content">
            ${htmlContent}
        </div>
        
        <div class="footer">
            <p>🚀 <strong>Servidor de Usuarios</strong> - Documentación generada automáticamente</p>
            <p>Base URL: <code>http://localhost:3000/api/usuarios</code></p>
            <p><a href="/">← Volver al servidor</a> | <a href="/api/usuarios">Ver usuarios</a></p>
        </div>
    </div>
</body>
</html>`;
}

// Ruta para mostrar la documentación
router.get('/', (req, res) => {
  try {
    // Leer el archivo de documentación
    const docPath = path.join(__dirname, '..', 'documentacion.md');
    const contenidoMarkdown = fs.readFileSync(docPath, 'utf8');
    
    // Convertir a HTML y enviar
    const html = generarHTML(contenidoMarkdown);
    res.send(html);
  } catch (error) {
    console.error('Error al cargar la documentación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cargar la documentación',
      error: error.message
    });
  }
});

module.exports = router;
