window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "./swagger.json",  // sempre ./ (está na mesma pasta do index.html)
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




