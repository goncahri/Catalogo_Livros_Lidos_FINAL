window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "./swagger.json",  // <- Aqui puxa seu arquivo local na pasta /docs
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};

