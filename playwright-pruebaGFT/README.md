# Prueba tecnica de Automatización en SauceDemo (Playwright + Cucumber + TypeScript)

# 1 Clonar el repositorio
git clone
# 2 Instala dependencias
npm install
# 3 Instala navegadores
npx playwright install
# 4 Ejecutar todos los test
npx cucumber-js
# 5 Ejecutar los test smoke
npx cucumber-js --tags "@smoke"
# 6 Abrir reporte
start reports/html/cucumber-report.html
# 7 Estructura del proyecto
features > Contiene la definición de los escenarios en Gherkin.
steps > Contiene la implementación de los pasos (Given/When/Then).
pages > Contiene Page Objects para abstraer la interacción con la UI.
world > Contiene CustomWorld y hooks de Cucumber (Before/After).
reports > Carpeta para almacenar screenshots, videos y reportes HTML.
cucumber.js > Configuración de Cucumber
package.json > Dependencias y scripts
tsconfig.json > Configuración TypeScript
# Videos de cada escenario
reports/videos/ .webm
# Screenshot de fallos
reports/screenshots/