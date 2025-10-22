package com.sgp.hoopoes_management_system.Domain.Users;

public enum userRole {
    
    ADMIN("admin"),
    USER("user");

    private final String role;

    private userRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}