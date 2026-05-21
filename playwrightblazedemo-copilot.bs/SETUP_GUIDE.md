# 🎯 Demoblaze Automation Framework - Gía de Uso

## ✅ Proyecto Completado

He creado un **framework completo de automatización** para la página web Demoblaze usando **Playwright**, **TypeScript** y el patrón **Page Object Model**.

## 📦 Estructura del Proyecto

```
blazedemo-copilot/
├── src/
│   ├── pages/                    # Page Object Model Classes
│   │   ├── BasePage.ts          # Clase base con métodos comunes
│   │   ├── HomePage.ts          # Página de inicio y categorías
│   │   ├── CategoryPage.ts      # Gestión de categorías de productos
│   │   ├── ProductPage.ts       # Página de detalles del producto
│   │   ├── CartPage.ts          # Página del carrito de compras
│   │   └── CheckoutPage.ts      # Página de checkout y confirmación
│   └── tests/
│       └── demoblaze.spec.ts    # Casos de prueba (6 tests)
├── playwright.config.ts          # Configuración de Playwright
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias
├── README.md                      # Documentación completa
├── .gitignore
└── SETUP_GUIDE.md               # Este archivo
```

## 🚀 Instalación Rápida

```bash
# Las dependencias ya están instaladas, pero si necesitas:
npm install

# Instalar navegadores Playwright (si es necesario)
npx playwright install
```

## 🧪 Cómo Ejecutar los Tests

### Ejecutar TODO
```bash
npm test
```

### Ejecutar en Modo Headed (ver el navegador)
```bash
npm run test:headed
```

### Ejecutar Test Especifico
```bash
# Test de detalles de producto
npx playwright test --grep "Verify product details"

# Test de añadir producto desde Phones
npx playwright test --grep "Add product from Phones"

# Test de compra completa
npx playwright test --grep "Complete purchase flow"
```

### Ejecutar en Modo Debug
```bash
npm run test:debug
```

### Ejecutar en Modo UI (Recomendado para ver lo que sucede)
```bash
npm run test:ui
```

### Ver Reporte HTML
```bash
npm run report
```

## 📋 Casos de Prueba Incluidos

### 1. **Complete Purchase Flow** ✅
- Selecciona categoría Phones
- Agrega un teléfono al carrito
- Navega a Laptops
- Agrega una laptop al carrito
- Verifica carrito con 2 productos
- Realiza checkout con datos ficticios
- Verifica confirmación de compra

**Ejecutar:**
```bash
npx playwright test --grep "Complete purchase flow"
```

### 2. **Add Product from Phones** ✅
- Selecciona Phones
- Agrega producto al carrito
- Verifica producto en carrito

**Ejecutar:**
```bash
npx playwright test --grep "Add product from Phones category"
```

### 3. **Add Product from Laptops** ✅
- Selecciona Laptops
- Agrega producto al carrito
- Verifica producto Sony

**Ejecutar:**
```bash
npx playwright test --grep "Add product from Laptops category"
```

### 4. **Verify Product Details** ✅
- Navega a un producto
- Verifica título, precio y descripción
- Valida formato de precio

**Ejecutar:**
```bash
npx playwright test --grep "Verify product details"
```

### 5. **Verify Navigation Between Categories** ✅
- Navega entre Phones, Laptops y Monitors
- Verifica que se cargan productos para cada categoría

**Ejecutar:**
```bash
npx playwright test --grep "Verify navigation between categories"
```

### 6. **Verify Cart Functionality** ✅
- Agrega producto al carrito
- Verifica contenido del carrito
- Valida cálculo de total

**Ejecutar:**
```bash
npx playwright test --grep "Verify cart functionality"
```

## 📖 Clases en el Page Object Model

### BasePage
```typescript
// Métodos comunes disponibles en todas las páginas
navigate(path)              // Navega a una URL
waitForPageToLoad()         // Espera a que la página cargue
click(selector)             // Hace clic en un elemento
fill(selector, text)        // Rellena un campo
getText(selector)           // Obtiene el texto
isVisible(selector)         // Verifica visibilidad
waitForElement(selector)    // Espera un elemento
getInputValue(selector)     // Obtiene valor de input
```

### HomePage
```typescript
// Métodos específicos de la página de inicio
navigateToHome()            // Navega al inicio
clickPhonesCategory()       // Selecciona Phones
clickLaptopsCategory()      // Selecciona Laptops
clickMonitorsCategory()     // Selecciona Monitors
clickCartLink()             // Va al carrito
getProductCount()           // Cuenta de productos
getProductNameByIndex()     // Obtiene nombre del producto
clickProductByIndex()       // Abre un producto
assertHomePageLoaded()      // Verifica página cargada
assertProductsDisplayed()   // Verifica productos visibles
```

### ProductPage
```typescript
// Métodos de la página de producto
navigateToProduct(id)       // Navega a producto específico
getProductTitle()           // Obtiene título
getProductPrice()           // Obtiene precio
getProductDescription()     // Obtiene descripción
addToCart()                 // Agrega al carrito
assertProductDetailsVisible()  // Verifica detalles visibles
assertAddToCartButtonVisible() // Verifica botón de agregar
```

### CartPage
```typescript
// Métodos de la página del carrito
navigateToCart()            // Navega al carrito
getCartItemCount()          // Cantidad de artículos
getProductsInCart()         // Lista de productos
getTotalPrice()             // Precio total
deleteProductFromCart()     // Elimina producto
clickPlaceOrder()           // Realiza pedido
assertCartPageLoaded()      // Verifica página cargada
assertProductsInCart()      // Verifica cantidad
assertProductInCart()       // Verifica producto específico
```

### CheckoutPage
```typescript
// Métodos de la página de checkout
fillCheckoutForm()          // Rellena formulario de compra
clickPurchase()             // Completa compra
fillAndCompletePurchase()   // Rellena y compra en un paso
getTransactionDetails()     // Obtiene detalles de transacción
assertCheckoutModalDisplayed()       // Verifica modal
assertCheckoutFormFieldsVisible()    // Verifica campos
assertPurchaseSuccessful()  // Verifica éxito
```

## 🔍 Ejemplos de Uso

### Ejemplo 1: Agregar Producto Manualmente
```typescript
const homePage = new HomePage(page);
const productPage = new ProductPage(page);

// Navegación
await homePage.navigateToHome();
await homePage.clickPhonesCategory();

// Seleccionar producto
await homePage.clickProductByIndex(0);

// Verificar detalles
const title = await productPage.getProductTitle();
const price = await productPage.getProductPrice();

// Agregar al carrito
await productPage.addToCart();
```

### Ejemplo 2: Verificar Carrito
```typescript
const cartPage = new CartPage(page);

// Navegar a carrito
await cartPage.navigateToCart();

// Obtener datos
const count = await cartPage.getCartItemCount();
const products = await cartPage.getProductsInCart();
const total = await cartPage.getTotalPrice();

// Verificar
console.log(`Productos: ${count}`);
console.log(`Total: ${total}`);
```

### Ejemplo 3: Completar Compra
```typescript
const checkoutPage = new CheckoutPage(page);

// Llenar formulario
await checkoutPage.fillCheckoutForm(
  'John Doe',           // Nombre
  'United States',      // País
  'New York',          // Ciudad
  '1234567890123456',  // Tarjeta de crédito
  '12',                // Mes
  '2025'               // Año
);

// Completar compra
await checkoutPage.clickPurchase();

//Verificar éxito
await checkoutPage.assertPurchaseSuccessful();
```

## 🎮 Recomendaciones para Usar el Framework

1. **Ejecutar en modo UI** para desarrollo:
   ```bash
   npm run test:ui
   ```

2. **Ver reportes HTML** después de ejecutar:
   ```bash
   npm run report
   ```

3. **Crear nuevos tests** siguiendo el patrón de `demoblaze.spec.ts`

4. **Usar la clase BasePage** como modelo para crear nuevas páginas

5. **Agregar aserciones** personalizadas según necesites

## 🐛 Solución de Problemas

### Los tests se ejecutan lentamente
- El sitio Demoblaze puede ser lento
- Usar: `npm run test:headed` para ver el progreso
- Aumentar timeouts en `playwright.config.ts` si es necesario

### Elemento no encontrado
- Verificar que el selector es correcto en las páginas
- Usar modo debug: `npm run test:debug`
- Ver las screenshots en test-results/

### Diálogos no se manejan correctamente
- Los diálogos de alerta se manejan automáticamente en ProductPage
- Si hay problemas, ejecutar en modo headed para debug

## 📚 Recursos Útiles

- [Documentación Playwright](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## ✨ Características del Framework

✅ Page Object Model completo
✅ Todos los elementos validados
✅ Tipos TypeScript estrictos
✅ 6 casos de prueba funcionales
✅ Reportes HTML detallados
✅ Screenshots en fallos
✅ Traces para debugging
✅ Configuración flexible
✅ Fácil de extender
✅ Documentación completa

---

**Creado con**: GitHub Copilot + Playwright + TypeScript
