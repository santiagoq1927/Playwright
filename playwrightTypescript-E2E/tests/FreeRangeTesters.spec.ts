import{test, Browser, Page, expect} from '@playwright/test'
(async () =>{
    let browser: Browser;
    let page: Page;

    test.describe('Navegacion en freerange',() =>{

        const secciones = [
            {nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos'},
            {nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers'},
            {nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'}
        ];
        for(const seccion of secciones){

            test(`Validar la redireccion a la seccion "${seccion.nombre}"`, async ({page})=>{
            
                await test.step('Estando en la pagina principal de freerenge', async ()=> {
                    page.goto('https://www.freerangetesters.com');  
                })
            
                await test.step(`Cuando selecciono la opcion "${seccion.nombre}"`, async () => {
                    page.locator('#page_header').getByRole('link',{name:seccion.nombre,exact:true}).click();
                    await page.waitForURL(`**${seccion.url}`);         
                })
    
                await test.step(`Redirige a la seccion de  "${seccion.tituloEsperado}"`, async () => {
                    await expect(page).toHaveTitle(seccion.tituloEsperado);
                })
    
            });

        }
    })

})();