# ⚡ QUICK START - Comience en 2 minutos

## 1️⃣ Verificar que todo esté listo
```bash
cd c:\Users\Equipo\Downloads\blazedemo-copilot
npm install
```

## 2️⃣ Ejecutar un test (elija uno)

### Opción A: Ver Test en Navegador (RECOMENDADO) 🎮
```bash
npm run test:headed
```
✨ Ver en vivo cómo se ejecuta el test en el navegador

### Opción B: Test en Modo UI Interactivo 🎨
```bash
npm run test:ui
```
✨ Interfaz gráfica para ejecutar y debuggear

### Opción C: Tests Rápidos en Terminal ⚡
```bash
npm test
```
✨ Ejecuta todos si es rápido

### Opción D: Test Específico 🎯
```bash
npx playwright test --grep "Complete purchase"
```
✨ Reemplaza "Complete purchase" con el nombre del test

## 3️⃣ Ver Resultados 📊
```bash
npm run report
```
✨ Abre reporte HTML con detalles completos

---

## 📝 Tests Disponibles

1. **Complete purchase flow** - Flujo completo de compra (2 productos)
2. **Add product from Phones** - Agrega producto de Phones
3. **Add product from Laptops** - Agrega producto de Laptops
4. **Verify product details** - Verifica detalles del producto
5. **Verify navigation** - Navega entre categorías
6. **Verify cart** - Verifica funcionamiento del carrito

---

## 💡 Tips Útiles

| Comando | Qué hace |
|---------|----------|
| `npm test` | Ejecuta todos los tests sin navegador |
| `npm run test:headed` | Ejecuta tests CON navegador visible |
| `npm run test:ui` | Interfaz gráfica para controlar tests |
| `npm run test:debug` | Modo debug paso a paso |
| `npm run report` | Ver reporte HTML de resultados |
| `npm run build` | Compilar TypeScript a JavaScript |

---

## 🎯 Próximos Pasos

1. **Ejecuta un test con navegador visible** para ver cómo funciona
2. **Lee README.md** para entender la estructura
3. **Mira los archivos en src/pages/** para aprender el patrón
4. **Crea tu propio test** siguiendo el patrón de demoblaze.spec.ts

---

## 🆘 Problemas Comunes

### "Playwright no está instalado"
```bash
npx playwright install
```

### "Puerto en uso"
Los tests usan navegador pero no puertos, no es problema de puertos

### "Test muy lento"
Es normal con navegador gráfico, usa `npm test` para más velocidad

### "No veo el navegador"
Usa `npm run test:headed` en lugar de `npm test`

---

**¡Que disfrutes probando! 🚀**

Documentación completa en `README.md` y `SETUP_GUIDE.md`
