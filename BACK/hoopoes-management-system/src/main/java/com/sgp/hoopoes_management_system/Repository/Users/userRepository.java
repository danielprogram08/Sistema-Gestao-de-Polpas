package com.sgp.hoopoes_management_system.Repository.Users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sgp.hoopoes_management_system.Domain.Users.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginAndPassword(String login, String password);
    boolean existsByLogin(String login);

    @Modifying
    @Query
    (value = "UPDATE usuarios SET senha = :newPassword WHERE login = :login", nativeQuery = true)
    void updatePassword(@Param("newPassword") String newPassword, @Param("login") String login);
}