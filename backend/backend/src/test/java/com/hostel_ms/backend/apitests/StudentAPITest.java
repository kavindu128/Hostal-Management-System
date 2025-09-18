package com.hostel_ms.backend.apitests;



import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StudentAPITest extends BaseTest{

    @Test
    public void testCreateAndGetStudent() {
        // Create a student
        String studentJson = "{\n" +
                "  \"regNo\": \"TEST001\",\n" +
                "  \"fullName\": \"John Doe\",\n" +
                "  \"dateOfBirth\": \"2000-01-01\",\n" +
                "  \"addressLine1\": \"123 Test St\",\n" +
                "  \"city\": \"Test City\",\n" +
                "  \"emergencyContactName\": \"Parent\",\n" +
                "  \"emergencyContactNo\": \"123-456-7890\"\n" +
                "}";

        given()
                .contentType(ContentType.JSON)
                .body(studentJson)
                .when()
                .post("/students")
                .then()
                .statusCode(201)
                .body("regNo", equalTo("TEST001"))
                .body("fullName", equalTo("John Doe"));

        // Get the student
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/students/TEST001")
                .then()
                .statusCode(200)
                .body("regNo", equalTo("TEST001"))
                .body("fullName", equalTo("John Doe"));
    }

}