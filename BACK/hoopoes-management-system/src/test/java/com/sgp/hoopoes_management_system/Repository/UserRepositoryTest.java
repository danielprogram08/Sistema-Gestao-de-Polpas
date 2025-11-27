package com.sgp.hoopoes_management_system.Repository;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.sgp.hoopoes_management_system.Domain.Users.User;
import com.sgp.hoopoes_management_system.Domain.Users.UserRole;
import com.sgp.hoopoes_management_system.Repository.Users.userRepository;

import jakarta.persistence.EntityManager;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private userRepository repository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("Register User Test")
    public void registerUser() {
        User user = new User();
        user.setLogin("UserTest@gmail.com");
        user.setPassword("UserTest1234");
        user.setRole(UserRole.USER);
        repository.save(user);
        entityManager.persist(user);
        entityManager.flush();

        Optional<User> foundUser = repository.findById((long) 1);
        assert(foundUser).isPresent();
    }

    @Test
    @DisplayName("Not Found User Test")
    public void notFoundUser() {
        Optional<User> foundUser = repository.findById((long) 2);
        assert(foundUser).isEmpty();
    }
}