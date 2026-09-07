package quijano.stepsDefinitions;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import quijano.runners.Manager;

public class Hooks {
    //private static boolean reporteGenerado = false;

    @Before
    public static void before_all()
    {
        System.out.println("Estoy en metodo before all");
        File folder = new File("src/test/resources/screenshots");
        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles();
            for (File file : files) {
                if (file.isFile()) {
                    file.delete();
                }
            }
        } else {
            System.out.println("La carpeta de screenshots no existe.");
        }
    }

    @AfterStep
    public static void captureScreenshotAfterStep(Scenario scenario)
    {
        if(Manager.page != null)
        {
            System.out.println("Capturando!");
            try {
                String filePath = "src/test/resources/screenshots/" + scenario.getName().replaceAll(" ", "_") + ".png";
                byte[] screenshot = Manager.page.screenshot();

                Files.createDirectories(Paths.get("src/test/resources/screenshots"));
                Files.write(Paths.get(filePath), screenshot);

                scenario.attach(screenshot, "image/png", scenario.getName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
