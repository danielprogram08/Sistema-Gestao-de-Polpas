package com.sgp.hoopoes_management_system.Repository.User;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.sgp.hoopoes_management_system.Domain.Users.User;
import com.sgp.hoopoes_management_system.Domain.Users.UserRole;
import com.sgp.hoopoes_management_system.Repository.Users.UserRepository;

import jakarta.persistence.EntityManager;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("Register User Test")
    public void registerUser() {
        User userTest = new User();
        userTest.setLogin("UserTest@gmail.com");
        userTest.setPassword("UserTest1234");
        userTest.setRole(UserRole.USER);

        repository.save(userTest);
        entityManager.persist(userTest);
        entityManager.flush();

        assert(repository.findByLoginAndPassword("UserTest@gmail.com", "UserTest1234")).isPresent();
    }

    @Test
    @DisplayName("Not Found User Test")
    public void notFoundUser() { assert(repository.findById((long) 2)).isEmpty(); }

    @Test
    @DisplayName("Update Password Test")
    public void updatePassword() {
        User userTest = new User();
        userTest.setLogin("UserTest2@gmail.com");
        userTest.setPassword("UserTest2-1234");
        userTest.setRole(UserRole.USER);
        repository.save(userTest);
        entityManager.persist(userTest);
        entityManager.flush();

        repository.updatePassword("UserTest2-12345", "UserTest2@gmail.com");
        assert(repository.findByLoginAndPassword("UserTest2@gmail.com", "UserTest2-12345")).isPresent();
    }

    @Test
    @DisplayName("Failed Update Password Test")
    public void failedUpdatePassword() { 
        repository.updatePassword("UserTest2-123456", "UserTest2");
        assert(repository.findByLoginAndPassword("UserTest2@gmail.com", "UserTest2-123456")).isEmpty();
    }
}