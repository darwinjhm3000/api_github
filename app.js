// Importa la librería 'dotenv' para cargar las variables de entorno desde un archivo .env
require('dotenv').config();
// Importa la librería 'axios' para realizar solicitudes HTTP
const axios = require('axios');

// URL base de la API de GitHub
const GITHUB_API_URL = 'https://api.github.com';

// Nombre de usuario de GitHub para el que queremos obtener los repositorios
const githubUsername = 'google';
// Obtiene el token de acceso desde las variables de entorno configuradas en el archivo .env
const githubToken = process.env.GITHUB_TOKEN;

// Función asincrónica para obtener los 10 repositorios más populares de un usuario en GitHub
async function getTopRepositories() {
  try {
    // Realiza una solicitud GET a la API de GitHub para obtener los repositorios del usuario
    const response = await axios.get(`${GITHUB_API_URL}/users/${githubUsername}/repos`, {
      // Parámetros de la solicitud para ordenar por estrellas y limitar a 10 resultados
      params: {
        sort: 'updated',
        per_page: 15,
      },
      // Encabezados de la solicitud, incluyendo el token de acceso para autenticación
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });

    // Devuelve los datos de los repositorios obtenidos de la respuesta
    return response.data;
  } catch (error) {
    // Captura errores en caso de que la solicitud falle
    console.error('Error fetching repositories:', error.message);
    throw error;
  }
}

// Función principal que se encarga de ejecutar la lógica principal del programa
async function main() {
  try {
    // Llama a la función para obtener los 10 repositorios más populares
    const repositories = await getTopRepositories();

    // Imprime en la consola el listado de los 10 repositorios con sus estrellas
    console.log(`Top 10 repositories for ${githubUsername}:`);
    repositories.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} - ${repo.stargazers_count} stars`);
    });
  } catch (error) {
    // Captura errores en caso de que ocurra un problema durante la ejecución
    console.error('An error occurred:', error.message);
  }
}

// Llama a la función principal para ejecutar el programa
main();
