package com.hostel_ms.backend.apitests;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class AuthAPITest extends BaseTest {

    @Disabled("Disabled until test DB is seeded with valid user")
    @Test
    public void testLoginWithValidCredentials() {
        given()
                .contentType(ContentType.JSON)
                .body("{\"username\": \"admin\", \"password\": \"password\"}") // Changed from "admin" to "password"
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .body("username", equalTo("admin"))
                .body("role", notNullValue())
                .body("message", equalTo("Login successful"));
    }
}