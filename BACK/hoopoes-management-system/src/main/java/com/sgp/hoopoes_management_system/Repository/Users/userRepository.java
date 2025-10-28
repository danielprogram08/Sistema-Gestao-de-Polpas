package com.sgp.hoopoes_management_system.Repository.Users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.sgp.hoopoes_management_system.Domain.Users.User;

public interface userRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginAndPassword(String login, String password);
    Optional<User> findByLogin(String login);

    @Modifying
    @Query(value = "UPDATE users SET password = :password WHERE login = :login", nativeQuery = true)
    void updatePassword(@Param("password") String password, @Param("login") String login);
}