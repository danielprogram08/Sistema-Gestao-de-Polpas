package com.sgp.hoopoes_management_system.Repository.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.sgp.hoopoes_management_system.Domain.Users.User;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails FindByLogin(String login);
}