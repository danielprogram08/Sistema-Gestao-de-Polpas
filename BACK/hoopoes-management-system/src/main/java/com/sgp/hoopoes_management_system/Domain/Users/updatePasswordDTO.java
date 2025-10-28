package com.sgp.hoopoes_management_system.Domain.Users;

public record updatePasswordDTO (String login, String newPassword) {
    public User convert() {
        User user = new User();
        user.setLogin(login);
        user.setPassword(newPassword);
        return user;
    }
}