package quijano.utilities;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Random;

public class ReportUtils {

    public static void crearReporteExtent() throws IOException
    {
        //Crea el objeto base para el reporte html
        System.out.println("****creando el reporte****");
        ExtentSparkReporter htmlReporter = new ExtentSparkReporter("src/test/resources/reportes/index.html");
        File configFile = new File("src/test/resources/extent-config.xml");
        if (configFile.isFile()) {
            htmlReporter.loadXMLConfig(configFile);
        }

        //crea el objeto sobre el cual se añadira a información del reporte
        ExtentReports extent = new ExtentReports();
        extent.attachReporter(htmlReporter);

        //datos adicionales para la sección de ambiente
        extent.setSystemInfo("Ingeniero : ", "Santiago Quijano");
        extent.setSystemInfo("OS : ", System.getProperty("os.name"));
        extent.setSystemInfo("OS Architecture : ", System.getProperty("os.arch"));


        try {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(new FileReader("src/test/resources/cucumber.json"));
            JSONArray features = (JSONArray) obj;

            //Iteramos por los features
            for (Object featureObj : features) {
                JSONObject feature = (JSONObject) featureObj;
                String featureName = (String) feature.get("name");
                String featureDescription = (String) feature.get("description");
                JSONArray featureTags = (JSONArray) feature.get("tags");
                ExtentTest featureTest = extent.createTest(featureName, featureDescription);
                //identifica los tags del feature
                for (Object tagObj : featureTags) {
                    JSONObject tag = (JSONObject) tagObj;
                    String tagName = (String) tag.get("name");
                    featureTest.assignCategory(tagName);
                }

                //identifica Los escenarios
                JSONArray scenarios = (JSONArray) feature.get("elements");
                // Iterar a través de los escenarios
                for (Object scenarioObj : scenarios) {
                    JSONObject scenario = (JSONObject) scenarioObj;
                    String scenarioName = (String) scenario.get("name");
                    String scenarioDescription = (String) scenario.get("description");
                    JSONArray scenarioTags = (JSONArray) scenario.get("tags");
                    ExtentTest scenarioTest = featureTest.createNode(scenarioName, scenarioDescription);
                    // Agregar etiquetas al escenario
                    for (Object tagObj : scenarioTags) {
                        JSONObject tag = (JSONObject) tagObj;
                        String tagName = (String) tag.get("name");
                        scenarioTest.assignCategory(tagName);
                    }
                    //Itera por cada paso del scenario
                    JSONArray steps = (JSONArray) scenario.get("steps");
                    for (Object stepObj : steps) {
                        JSONObject step = (JSONObject) stepObj;
                        String stepName = (String) step.get("name");
                        JSONObject result = (JSONObject) step.get("result");
                        String status = (String) result.get("status");

                        // Agregar paso al reporte
                        ExtentTest stepTest;
                        if (status.equals("passed")) {
                            stepTest = scenarioTest.pass(stepName);
                        } else {
                            stepTest = scenarioTest.fail(stepName);
                            // Si el paso falla y hay un mensaje de error, agregarlo al reporte
                            String errorMessage = (String) result.get("error_message");
                            if (errorMessage != null && !errorMessage.isEmpty()) {
                                int endIndex = errorMessage.indexOf("at org.junit.Assert.fail");
                                if (endIndex != -1) {
                                    errorMessage = errorMessage.substring(0, endIndex).trim();
                                }
                                stepTest.fail("<strong>Detalle de la aserción:</strong>" +
                                        " <p style='color:red'><strong>" + errorMessage + "</strong></p>");
                            }
                        }


                        // Agregar captura de pantalla si está presente
                        JSONArray after = (JSONArray) step.get("after");
                        if (after != null) {
                            for (Object afterObj : after) {
                                JSONObject afterStep = (JSONObject) afterObj;
                                JSONArray embeddings = (JSONArray) afterStep.get("embeddings");
                                if (embeddings != null) {
                                    for (Object embeddingObj : embeddings) {
                                        JSONObject embedding = (JSONObject) embeddingObj;
                                        String mimeType = (String) embedding.get("mime_type");
                                        if (mimeType != null && mimeType.startsWith("image/")) {
                                            String imageData = (String) embedding.get("data");

                                            byte[] imageBytes = Base64.getDecoder().decode(imageData);
                                            ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
                                            BufferedImage bufferedImage = ImageIO.read(bis);
                                            bis.close();
                                            String outputFolderPath = "src/test/resources/screenshots/";
                                            File outputFolder = new File(outputFolderPath);
                                            outputFolder.mkdirs();

                                            /*Establece el nombre del screenshot*/
                                            String nombreEscenario = scenarioName.substring(0, 5).trim();
                                            String nombrePaso = stepName.substring(0, 5).trim();
                                            Random rand = new Random();
                                            int randomNumber = rand.nextInt(100) + 1;
                                            String nombreArchivo = nombreEscenario + "_" + nombrePaso + randomNumber + ".png";

                                            File outputFile = new File(outputFolder, nombreArchivo);
                                            ImageIO.write(bufferedImage, "png", outputFile);
                                            String screenshotPath = "../screenshots/" + outputFile.getName();

                                            if (status.equals("passed")) {
                                                stepTest.pass("Evidencia del paso: ", MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
                                            } else {
                                                stepTest.fail("Evidencia del paso: ", MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //Genera el reporte
            extent.flush();

            modificarHTML();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void modificarHTML()
    {
        String filePath = "src/test/resources/reportes/index.html";

        // Lee el contenido del archivo HTML
        try {
            Path path = Paths.get(filePath);
            String content = Files.readString(path, StandardCharsets.UTF_8);

            // Realiza la sustitución de texto
            String newContent = content.replaceAll("Tests", "Features");
            newContent = newContent.replaceAll("tests", "features");
            newContent = newContent.replaceAll("Steps", "Scenarios");
            newContent = newContent.replaceAll("steps", "scenarios");

            // Guarda el contenido modificado en el mismo archivo
            Files.write(path, newContent.getBytes(StandardCharsets.UTF_8));
        }catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
