package com.sgp.hoopoes_management_system.Domain.Users;

public record updatePasswordDTO (String login, String newPassword) {
    public users convert() {
        users user = new users();
        user.setLogin(login);
        user.setPassword(newPassword);
        return user;
    }
}