const { spawn } = require("child_process");
const {chromium} = require("@playwright/test");


(async () => {

    const chrome = spawn(
        `"C:/Program Files/Google/Chrome/Application/chrome.exe"`,
        ["--remote-debugging-port=9222"],
        {shell:true}
    )
    await new Promise(r=> setTimeout(r,3_000))
    const browser = await chromium.connectOverCDP("http://localhost:9222")
    const defaultContext = browser.contexts()[0]
    const page = defaultContext.pages()[0]

    await page.goto("https://www.linkedin.com/mynetwork/grow/")

    const allContactsServiceTI = "//h2[contains(.,'Personas del sector Servicios y consultoría de TI que podrías conocer')]/ancestor::div[@class='discover-sections-list__item']//ul/li";
    const ocupation = "//span[@class='discover-person-card__occupation t-14 t-black--light t-normal']";
    const connectButton = "//button[contains(.,'Conectar')]";
    const nameContact = "//span[contains(@class,'discover-person-card__name')]";

    await page.waitForTimeout(5000)

    for(let i=0;i<4;i++){
        await page.evaluate(()=> window.scrollBy(0,document.body.scrollHeight));
        await page.waitForTimeout(3000);
    }

    const allContacts = await page.locator(allContactsServiceTI).all();
    await allContacts.at(0).scrollIntoViewIfNeeded();
    
    console.log("Numeber of Contacts found: ", allContacts.length);

    for(let contact of allContacts){
        let currentRol = await contact.locator(ocupation).textContent();
        console.log(currentRol);
    }

    const matches = ["qa","automation","pruebas", "tester"];
    const contactsMatch = [];

    for(let contact of allContacts){
        let currentRol = await contact.locator(ocupation).textContent().then(x=>x.toLocaleLowerCase());

        for(let match of matches){
            if(currentRol.includes(match)){
                contactsMatch.push(contact);
                break;
            }
        }
    }
    console.log("Contacts that match: ", contactsMatch.length)

    for(let contact of contactsMatch){
        let currentRol = await contact.locator(ocupation).textContent();
        let currentContact = await contact.locator(nameContact).textContent();
        await contact.locator(connectButton).click();
        console.log("Invitaing to: ",currentContact);
        console.log("Adding the role: ",currentRol);
        await page.waitForTimeout(4000);
    }

})
()