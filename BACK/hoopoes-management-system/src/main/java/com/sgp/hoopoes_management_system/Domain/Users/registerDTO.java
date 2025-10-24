package com.sgp.hoopoes_management_system.Domain.Users;

public record registerDTO(String login, String password, userRole role) {

    public users convert() {
        users user = new users();
        user.setLogin(login);
        user.setPassword(password);
        user.setRole(role);
        return user;
    }
}