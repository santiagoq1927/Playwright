# Demoblaze E-Commerce Automation Framework

Automation testing framework para el sitio web **Demoblaze.com** usando **Playwright**, **TypeScript** y el patrón **Page Object Model**.

## 📋 Estructura del Proyecto

```
blazedemo-copilot/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts          # Clase base para todas las páginas
│   │   ├── HomePage.ts          # Página de inicio con categorías
│   │   ├── CategoryPage.ts      # Página de categorías de productos
│   │   ├── ProductPage.ts       # Página de detalles del producto
│   │   ├── CartPage.ts          # Página del carrito de compras
│   │   └── CheckoutPage.ts      # Página de checkout y confirmación
│   └── tests/
│       └── demoblaze.spec.ts    # Casos de prueba principales
├── playwright.config.ts          # Configuración de Playwright
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias del proyecto
└── README.md                      # Este archivo
```

## 🚀 Configuración Inicial

### Requisitos
- Node.js 16 o superior
- npm o yarn

### Instalación

1. **Clonar o descargar el proyecto**
```bash
cd blazedemo-copilot
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar navegadores de Playwright**
```bash
npx playwright install
```

## 🧪 Ejecutar Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar en modo headed (con visualización del navegador)
```bash
npm run test:headed
```

### Ejecutar en modo debug
```bash
npm run test:debug
```

### Ejecutar en modo UI
```bash
npm run test:ui
```

### Ver reporte HTML de resultados
```bash
npm run report
```

## 📝 Casos de Prueba

### 1. **Complete Purchase Flow** ✅
Automatiza el flujo completo de compra:
- Navega a la página de inicio
- Selecciona categoría de Phones
- Agrega un teléfono al carrito
- Selecciona categoría de Laptops
- Agrega una laptop al carrito
- Navega al carrito de compras
- Verifica los productos en el carrito
- Realiza checkout
- Completa la compra con datos ficticios
- Verifica la confirmación de compra

### 2. **Add Product from Phones Category** ✅
- Selecciona la categoría Phones
- Agrega el primer producto al carrito
- Verifica que está en el carrito

### 3. **Add Product from Laptops Category** ✅
- Selecciona la categoría Laptops
- Agrega el primer producto al carrito
- Verifica que está en el carrito

### 4. **Remove Product from Cart** ✅
- Agrega un producto al carrito
- Navega al carrito
- Elimina el producto
- Verifica que el carrito está vacío

### 5. **Verify Product Details** ✅
- Navega a un producto
- Verifica que todos los detalles sean visibles
- Valida título, precio y descripción

### 6. **Verify Category Transitions** ✅
- Verifica la transición entre categorías
- Valida que los productos se carguen correctamente para cada categoría

## 📄 Página de Objetos

### BasePage
Clase base con métodos comunes para todas las páginas:
- `navigate(path)` - Navega a una URL
- `click(selector)` - Hace clic en un elemento
- `fill(selector, text)` - Rellena un campo de entrada
- `getText(selector)` - Obtiene el texto de un elemento
- `isVisible(selector)` - Verifica si un elemento es visible
- `waitForElement(selector)` - Espera a que aparezca un elemento

### HomePage
Métodos específicos para la página de inicio:
- `navigateToHome()` - Va a la página de inicio
- `clickPhonesCategory()` - Hace clic en la categoría Phones
- `clickLaptopsCategory()` - Hace clic en la categoría Laptops
- `clickCartLink()` - Va al carrito de compras
- `getProductCount()` - Obtiene la cantidad de productos
- `clickProductByIndex(index)` - Hace clic en un producto por su índice

### ProductPage
Métodos para la página de detalles del producto:
- `navigateToProduct(productId)` - Navega a un producto específico
- `getProductTitle()` - Obtiene el título del producto
- `getProductPrice()` - Obtiene el precio del producto
- `getProductDescription()` - Obtiene la descripción
- `addToCart()` - Agrega el producto al carrito

### CartPage
Métodos para la página del carrito:
- `navigateToCart()` - Va al carrito
- `getCartItemCount()` - Obtiene la cantidad de artículos
- `getProductsInCart()` - Obtiene lista de productos en el carrito
- `getTotalPrice()` - Obtiene el precio total
- `deleteProductFromCart(productName)` - Elimina un producto
- `clickPlaceOrder()` - Hace clic en "Realizar Pedido"

### CheckoutPage
Métodos para el checkout:
- `fillCheckoutForm(...)` - Rellena el formulario de compra
- `clickPurchase()` - Completa la compra
- `fillAndCompletePurchase(...)` - Rellena y completa la compra en un paso
- `getTransactionDetails()` - Obtiene los detalles de la transacción

## 🔍 Aserciones

Cada página incluye métodos de aserción que validan:
- Que la página correcta esté cargada
- Que todos los elementos necesarios sean visibles
- Que los datos sean correctos
- Que los precios se calculen correctamente

Ejemplo:
```typescript
await homePage.assertHomePageLoaded();
await productPage.assertProductDetailsVisible();
await cartPage.assertProductInCart('Samsung galaxy s6');
await checkoutPage.assertPurchaseSuccessful();
```

## 🛠️ Tecnologías Utilizadas

- **Playwright** - Framework de automatización de pruebas
- **TypeScript** - Lenguaje de programación con tipos
- **Page Object Model** - Patrón de diseño para pruebas
- **Node.js** - Runtime de JavaScript

## 📊 Reporte de Pruebas

Después de ejecutar las pruebas, se genera un reporte HTML en la carpeta `playwright-report/`:

```bash
npm run report
```

## 🐛 Solución de Problemas

### Los tests no se ejecutan
- Verificar que Playwright está instalado: `npx playwright install`
- Verificar que TypeScript está instalado: `npm install typescript`
- Ejecutar: `npm install`

### Tests lentos
- Los tests pueden ser más lentos si el navegador está en modo headed
- Usar `npm test` para modo headless (más rápido)

### Elementos no encontrados
- Verificar que los selectores en las páginas son correctos
- Usar `npm run test:debug` para hacer debug en tiempo real

## 📚 Recursos

- [Documentación oficial de Playwright](https://playwright.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 👤 Autor

Automatización creada con GitHub Copilot

## 📄 Licencia

ISC
