package quijano.runners;

import java.io.IOException;

import org.junit.AfterClass;
import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import quijano.utilities.ReportUtils;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/java/quijano/features",
        glue = "quijano.stepsDefinitions",
        tags = "@range",
        //plugin = {"pretty", "json:target/cucumber-report.json", "html:target/cucumber-report.html"}
        plugin = {"json:src/test/resources/cucumber.json", "html:src/test/resources/reportes/cucumber-report.html"}
)
public class TestRunner {
    @AfterClass
    public static void endTest() throws IOException {
        Manager.tearDown();
        ReportUtils.crearReporteExtent();
        
    }
}
