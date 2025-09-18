package com.hostel_ms.backend.apitests;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class StudentControllerTest extends BaseTest {

    @Test
    public void testGetAllStudents() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/students")
                .then()
                .statusCode(200)
                .body("$", instanceOf(java.util.List.class))
                .body("size()", greaterThanOrEqualTo(0));
    }

    @Test
    public void testCreateStudent() {
        String requestBody = "{\n" +
                "  \"regNo\": \"TEST123\",\n" +
                "  \"fullName\": \"Test Student\",\n" +
                "  \"dateOfBirth\": \"2000-01-01\",\n" +
                "  \"addressLine1\": \"123 Test St\",\n" +
                "  \"addressLine2\": \"Apt 1\",\n" +
                "  \"city\": \"Test City\",\n" +
                "  \"emergencyContactName\": \"Test Contact\",\n" +
                "  \"emergencyContactNo\": \"123-456-7890\"\n" +
                "}";

        given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/students")
                .then()
                .statusCode(201)
                .body("regNo", equalTo("TEST123"))
                .body("fullName", equalTo("Test Student"));
    }

    @Test
    public void testGetStudentByRegNo() {
        // First create a student
        String requestBody = "{\n" +
                "  \"regNo\": \"TEST124\",\n" +
                "  \"fullName\": \"Test Student 2\",\n" +
                "  \"dateOfBirth\": \"2000-01-01\",\n" +
                "  \"addressLine1\": \"124 Test St\",\n" +
                "  \"city\": \"Test City\",\n" +
                "  \"emergencyContactName\": \"Test Contact\",\n" +
                "  \"emergencyContactNo\": \"123-456-7890\"\n" +
                "}";

        given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/students")
                .then()
                .statusCode(201);

        // Then get the student by regNo
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/students/TEST124")
                .then()
                .statusCode(200)
                .body("regNo", equalTo("TEST124"))
                .body("fullName", equalTo("Test Student 2"));
    }
}