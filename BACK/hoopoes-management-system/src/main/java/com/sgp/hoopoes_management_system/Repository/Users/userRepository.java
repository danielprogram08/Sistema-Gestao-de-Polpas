package com.sgp.hoopoes_management_system.Repository.Users;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sgp.hoopoes_management_system.Domain.Users.users;
import java.util.Optional;

public interface userRepository extends JpaRepository<users, Long> {

    Optional<users> findByLoginAndPassword(String login, String password);
}