import{test, expect} from '@playwright/test'
import { title } from 'process';

const REPO = 'Repotest';
const USER = 'santiagoq1927';

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos',{
        data:{
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
})


test('Se puede crear un issue en el repositorio de github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`,{
        data:{
            title: '[Bug] reporte 1',
            body: 'Descripcion del bug',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/respos/${USER}/${REPO}/issues`);
    
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[Bug] reporte 1',
            body: 'Descripcion del bug',
    }));
});

test('Puedo crear un request de feature', async ({ request }) => {
    const newIssue = await request.post(`/${USER}/${REPO}/issues`,{
        data:{
            title: '[Feature] request 1',
            body: 'Descripcion de la feature'
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/respos/${USER}/${REPO}/issues`);
    
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[Feature] request 1',
            body: 'Descripcion de la feature'
    }));
})

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`,);
    expect(response.ok()).toBeTruthy();
})


