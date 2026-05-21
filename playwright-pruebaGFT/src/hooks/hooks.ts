import { Before, After, Status  } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom-world';

Before(async function (this: CustomWorld,scenario) {
  await this.init(scenario.pickle.name);
});

After(async function (this: CustomWorld, scenario) {

  if (scenario.result?.status === Status.FAILED) {
    const fileName = `fail_${Date.now()}.png`;
    const screenshot = await this.page.screenshot({path: `reports/screenshots/${fileName}`,fullPage: true});
    await this.attach(screenshot, 'image/png');
  }

  await this.close();
});