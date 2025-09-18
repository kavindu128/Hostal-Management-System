package com.hostel_ms.backend.selenium;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class AddStudentTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.chrome.driver",
                "D:\\Acadamic\\Web_Project\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().window().setSize(new Dimension(1280, 800));
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test
    public void testAddStudentViaUI() {
        // login first (re-use your working login)
        driver.get("http://localhost:5173/login");
        wait.until(ExpectedConditions.elementToBeClickable(By.name("username"))).sendKeys("admin");
        driver.findElement(By.name("password")).sendKeys("password");
        driver.findElement(By.xpath("//button[@type='submit']")).click();

        // wait until dashboard loads
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("Dashboard")));

        // navigate to register/new student page
        driver.get("http://localhost:5173/register"); // adjust if route differs
        // wait for form fields
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("regNo"))).sendKeys("EG5999");
        driver.findElement(By.name("fullName")).sendKeys("Test Student");
        driver.findElement(By.id("dateOfBirth")).sendKeys("2000-01-01");
        driver.findElement(By.id("addressLine1")).sendKeys("Colombo");

        WebElement submit = driver.findElement(By.xpath("//button[@type='submit']"));
        submit.click();

        // wait for success — either success toast or student list update
        // example: wait for row with reg no in students table
        boolean added = wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.cssSelector("table"), "EG5999"));
        assertTrue(added, "New student should appear in the students table");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}
