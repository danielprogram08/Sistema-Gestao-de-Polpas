package com.sgp.hoopoes_management_system.Domain.Users;

public record registerDTO(String login, String password, UserRole role) {

    public User convert() {
        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        user.setRole(role);
        return user;
    }
}