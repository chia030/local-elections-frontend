export default function () {
    
    const isLocalhost =
      window.location.host.indexOf("127.0.0.1") != -1 ||
      window.location.host.indexOf("localhost") != -1;
  
    const localApiUrl = "http://localhost:9090";
  
    // SWAGGER: http://localhost:9090/swagger-ui.html#/
    
    window.apiUrl = isLocalhost ? localApiUrl : null;

  }