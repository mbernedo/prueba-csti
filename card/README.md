- Pasos:
    1) Ir a la ruta de la carpeta card
    2) Instalar dependencias (npm install)
    3) Correr comando docker para iniciar redis en local: 
        docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
    4) Crear un archivo .env dentro de la carpeta card (al mismo nivel del .gitignore, package.json) con la siguiente variable dentro
        JWT_KEY=prueba
    5) Prender el servicio usando yarn dev
    6) Probar primer servicio de creación de token 
        localhost:4000/token
        request body: {
            "email": "mbernedo5@gmail.com",
            "card_number": 41113123131231,
            "cvv": 222,
            "expiration_month": "09",
            "expiration_year": "2013"
        }
        response body: {
            "success": true,
            "data": {
                "token": "pk_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWFhYSIsImNhcmRfbnVtYmVyIjo0MTExMzEyMzEzMTIzMSwiY3Z2IjoyMjIsImV4cGlyYXRpb25fbW9udGgiOiIwOSIsImV4cGlyYXRpb25feWVhciI6IjIwMTMiLCJpYXQiOjE3MDA0NDkyODYsImV4cCI6MTcwMDQ0OTg4Nn0.dKwdZLk7fB0_TqXf3FjmwaeBRsPZneC4YRSdac7eOXU"
            }
        }
        Guardar el token que devuelve este servicio para el siguiente servicio
    7) Probar el servicio de obtener datos de tarjeta
        localhost:4000/card
        Header token: {{Ingresar token del servicio anterior}}
        response body: {
            "success": true,
            "data": {
                "card_number": 41113123131231,
                "expiration_month": "09",
                "expiration_year": "2013",
                "email": "mbernedo5@gmail.com"
            }
        }
    8) Para las pruebas usar el comando yarn test
    9) La prueba de find card correcta se debe generar poniendo en el texto un token valido