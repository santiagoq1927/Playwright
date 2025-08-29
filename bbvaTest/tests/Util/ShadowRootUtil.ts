import { Page } from '@playwright/test';

export class ShadowRootUtils {
    private page: Page;
    private timeout: number;

    constructor(page: Page, timeout: number = 900000) {
        this.page = page;
        this.timeout = timeout;
    }

    public async interactWithShadow(action: string, text: string | null, ...selectors: string[]) {
        let currentContext: any = this.page;

        for (let i = 0; i < selectors.length; i++) {
            const selector = selectors[i];
            console.log(`Buscando selector: ${selector}`);
            let elementHandle;

            if (i === 0) {
                // Espera explícita para el primer elemento
                elementHandle = await this.page.waitForSelector(selector, { timeout: this.timeout });
                console.log(`Elemento encontrado: ${selector}`);
            } else {
                // Encuentra el elemento dentro del shadowRoot
                elementHandle = await currentContext.evaluateHandle(
                    (shadowRoot: ShadowRoot | null, sel: string) => shadowRoot?.querySelector(sel) || null,
                    selector
                );

                if (!elementHandle) {
                    console.error(`No se encontró el elemento en el Shadow DOM: ${selector}`);
                    throw new Error(`No se encontró el elemento en el Shadow DOM: ${selector}`);
                }
                console.log(`Elemento encontrado dentro del shadowRoot: ${selector}`);
            }

            if (i === selectors.length - 1) {
                // Realizar la acción en el último elemento
                await this.performAction(elementHandle, action, text);
            } else {
                // Obtén el shadowRoot para el siguiente contexto
                console.log(`Obteniendo shadowRoot para el elemento: ${selector}`);
                currentContext = await elementHandle.evaluateHandle((el: HTMLElement) => el.shadowRoot);

                if (!currentContext) {
                    console.error(`El shadowRoot es null para el selector: ${selector}`);
                    throw new Error(`El shadowRoot es null para el selector: ${selector}`);
                }

                // Espera a que el shadowRoot esté listo
                await this.page.waitForTimeout(500);
            }
        }
    }

    private async performAction(elementHandle: any, action: string, text: string | null) {
        switch (action.toLowerCase()) {
            case 'click':
                await elementHandle.click();
                console.log('Acción de clic ejecutada.');
                break;
            case 'clickjs':
                await elementHandle.evaluate((el: HTMLElement) => el.click());
                console.log('Acción de clic ejecutada con JavaScript.');
                break;
            case 'sendkeys':
                if (text === null) throw new Error('El texto no puede ser nulo para la acción sendKeys.');
                await elementHandle.fill(text);
                console.log(`Texto '${text}' ingresado correctamente.`);
                break;
            case 'scroll':
                await elementHandle.scrollIntoViewIfNeeded();
                console.log('Acción de scroll ejecutada.');
                break;
            case 'wait':
                await elementHandle.waitForSelector(900000);
                console.log('Acción de wait ejecutada.');
                break;
            default:
                throw new Error(`Acción no soportada: ${action}`);
        }
    }
}
