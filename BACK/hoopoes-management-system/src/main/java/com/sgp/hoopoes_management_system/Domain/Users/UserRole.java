package com.sgp.hoopoes_management_system.Domain.Users;

public enum UserRole {
    
    ADMIN("admin"),
    USER("user");

    private final String role;

    private UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}