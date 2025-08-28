package com.shop.dto;

public class AuthResponse {
    private String token;
    private UserDto user;

    // --- Constructors ---
    public AuthResponse() {}

    public AuthResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    // --- Getters ---
    public String getToken() {
        return token;
    }

    public UserDto getUser() {
        return user;
    }

    // --- Setters ---
    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
