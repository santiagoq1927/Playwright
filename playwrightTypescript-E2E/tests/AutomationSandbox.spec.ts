import{test, Browser, Page, expect} from '@playwright/test'
import { SandboxPage } from './Pages/SandboxPage';

(async () =>{
    let browser: Browser;
    let page: Page;

    let texto = 'Playwright';

    test.describe("Acciones en el Automation sandbox", () => {

        test('Click en boton dinamico', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })

            await test.step('Puedo hacer click en el boton de id dinamico', async () => {
                const btnIdDinamico = page.getByRole('button',{name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto'});
                await btnIdDinamico.click();
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
            })
        })

        test('Lleno campo de texto', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })

            await test.step('Puedo ingresar texto en el campo', async () => {
                const txtTextBox = page.getByPlaceholder('Ingresá texto');
                await expect(txtTextBox).toBeEditable();
                await txtTextBox.fill(texto);
                await expect(txtTextBox).toHaveValue(texto);
                //await txtTextBox.press('Enter');
            })
        })

        test('Seleccion checkbox', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })

            await test.step('Puedo seleccionar el checkbox de Pasta', async () => {
                const sandbox = new SandboxPage(page);
                //const chkPasta = page.getByRole('checkbox', { name: 'Pasta 🍝' });
                //await chkPasta.check();
                await sandbox.checkPasta();
                await expect(sandbox.chkPasta, 'Elemento no esta seleccionado').toBeChecked();
            })

            await test.step('Puedo deseleccionar el checkbox de Pasta', async () => {
                const chkPasta = page.getByRole('checkbox', { name: 'Pasta 🍝' });
                await chkPasta.uncheck();
                await expect(chkPasta, 'Elemento esta seleccionado').not.toBeChecked();
            })
            
        })

        test('Seleccionar radio button', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Puedo seleccionar el radio button No', async () => {
                const rdbNo = page.getByRole('radio', { name: 'No' });
                await rdbNo.check();
                await expect(rdbNo, 'Elemento esta seleccionado').toBeChecked();
            })
        })

        test('Seleccionar un deporte del dropdown', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Puedo seleccionar un deporte del dropdown', async () => {
                const drpDeporte = page.getByLabel('Dropdown');
                await drpDeporte.selectOption('Tennis');
            })
        })

        test('Seleccionar un dia de la semana del dropdown', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Puedo seleccionar un dia de la semana del dropdown', async () => {
                const btnDiasSemana = page.getByRole('button', { name: 'Día de la semana' });
                await btnDiasSemana.click();
                const diaLunes = page.getByRole('link', { name: 'Martes' });
                await diaLunes.click();
                
            })
        })

        test('Subir archivos', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles(['path.pdf','pathArchivo2.pdf']);
            })
        })
        
        test('Drag and drop', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Hago drag', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));
            })
        })

        test('Validar nombres de tabla estatica', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Puedo validar los nombres de la tabla estatica', async () => {
                const valoresColNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)',elements =>elements.map(element => element.textContent));
                const nombresEsperados = ['Messi','Ronaldo','Mbappe'];
                
                expect(valoresColNombres).toEqual(nombresEsperados);
            })
        })

        test('Validar nombres de tabla dinamica', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Puedo validar los nombres de la tabla dinamica', async () => {
                const valoresColNombres = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements =>elements.map(element => element.textContent));
                await page.reload();
                const valoresPostReaload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements =>elements.map(element => element.textContent));
                
                expect(valoresColNombres).not.toEqual(valoresPostReaload);
            })
        })

        test('Soft assertions', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })
            
            await test.step('Valido que todos los elementos checkbox son los correctos', async () => {
                const chkPizza = page.getByRole('checkbox', { name: 'Pizza 🍕' });
                const chkBurguer = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });
                const chkPasta = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });
                const chkHelado = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });
                const chkTorta = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });

                await expect.soft(chkPizza,'No se encontro el elemento Pizza').toBeVisible();
                await expect.soft(chkBurguer).toBeVisible();
                await expect.soft(chkPasta).toBeVisible();
                await expect.soft(chkHelado).toBeVisible();
                await expect.soft(chkTorta).toBeVisible();
            })
        })

        test('Validar pop ups', async ({ page }) => {
            await test.step('Dado que navego a la pagina de Sandbox', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")  
            })

            await test.step('Seleccionar el boton pop up', async () => {
                const btnPopup = page.getByRole('button', { name: 'Mostrar popup' });
                await btnPopup.click();
            })
            
            await test.step('Validar elemento dentro del pop up', async () => {
                const txtPopup = page.getByText('¿Viste? ¡Apareció un Pop-up!');
                const btnCerrarPopup = page.getByRole('button', { name: 'Cerrar' });
            
                await expect(txtPopup).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await btnCerrarPopup.click();

            })
        })

        test('Hace mock de una fruta que no viene en el API real', async ({ page }) => {
    
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [{name:'Melocoton', id:27}];
            await route.fulfill({json});
        })

        await page.goto('https://demo.playwright.dev/api-mocking');

        await expect(page.getByText('Melocoton')).toBeVisible();
        })

        test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    
            await page.route('*/**/api/v1/fruits', async route => {
                const response = await route.fetch();
                const json = await response.json();
                json.push({name: 'Duvan Vergara', id:200});
                await route.fulfill({response,json});
            })

            await page.goto('https://demo.playwright.dev/api-mocking');

            await expect(page.getByText('Duvan Vergara', {exact:true})).toBeVisible();
        });
        
    })
})();