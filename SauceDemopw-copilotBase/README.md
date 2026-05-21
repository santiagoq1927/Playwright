# Playwright TypeScript Automation Project

Este proyecto está configurado para automatizar pruebas de aplicaciones web utilizando Playwright con TypeScript.

## Requisitos previos

- Node.js (versión 16 o superior)
- npm

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalar:

```bash
npm install
```

Los navegadores de Playwright ya están instalados. Si necesitas reinstalar:

```bash
npx playwright install
```

## Ejecutar pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo headed (ver el navegador)
```bash
npm run test:headed
```

### Ejecutar pruebas con UI de Playwright
```bash
npm run test:ui
```

### Ver el reporte de pruebas
```bash
npm run report
```

## Ejecutar pruebas específicas

Para ejecutar solo la automatización de DemoBlaze:
```bash
npm test -- demoblaze.spec.ts
```

## Estructura del proyecto

- `tests/` - Directorio con los archivos de pruebas
- `pages/` - Directorio con los Page Objects (HomePage, ProductPage, CartPage)
- `playwright.config.ts` - Configuración de Playwright
- `tsconfig.json` - Configuración de TypeScript

## Automatización implementada

La prueba `demoblaze.spec.ts` automatiza el siguiente flujo en https://www.demoblaze.com:

1. Agregar un producto de la categoría "Phones" (Samsung galaxy s6)
2. Agregar un producto de la categoría "Laptops" (Sony vaio i5)
3. Verificar que los 2 productos estén en el carrito
4. Completar la compra con datos de prueba
5. Verificar el mensaje de éxito de la compra

Utiliza el patrón Page Object Model para mantener el código organizado y reutilizable.

## Documentación

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)