package com.sgp.hoopoes_management_system.Repository.Users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.sgp.hoopoes_management_system.Domain.Users.users;

public interface userRepository extends JpaRepository<users, Long> {
    Optional<users> findByLoginAndPassword(String login, String password);
    Optional<users> findByLogin(String login);

    @Modifying
    @Query(value = "UPDATE users SET password = :password WHERE login = :login", nativeQuery = true)
    void updatePassword(@Param("password") String password, @Param("login") String login);
}