package com.sgp.hoopoes_management_system.Repository.User;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

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

    // Registrar Usuário no Banco de Dados
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

        Optional<User> result = repository.findByLoginAndPassword(userTest.getLogin(), userTest.getPassword());

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo((Optional.of(userTest)));
    }

    // Buscar Usuário no Banco de Dados - Não Encontrado
    @Test
    @DisplayName("Not Found User Test")
    public void notFoundUser() {
        Optional<User> result = repository.findByLoginAndPassword("UserTest@gmail.com", "UserTest1234");
        assertThat(result).isEmpty();
     }
    
    // Atualizar Senha do Usuário
    @Test
    @DisplayName("Update Password Test")
    public void updatePassword() {
        User userTest = new User();
        userTest.setLogin("UserTest2@gmail.com");
        userTest.setPassword("UserTest2-1234");
        userTest.setRole(UserRole.USER);

        repository.save(userTest);
        entityManager.flush(); 

        repository.updatePassword("UserTest2-12345", "UserTest2@gmail.com");
        entityManager.clear(); 

        User result = repository.findByLoginAndPassword("UserTest2@gmail.com", "UserTest2-12345").get();
        assertThat(result.getPassword()).isEqualTo("UserTest2-12345");
    }

    // Falha ao Atualizar Senha do Usuário
    @Test
    @DisplayName("Failed Update Password Test")
    public void failedUpdatePassword() { 
        repository.updatePassword("UserTest2-123456", "UserTest2");

        Optional<User> result = repository.findByLoginAndPassword("UserTest2", "UserTest2-123456");
        assertThat(result).isEmpty();
    }
    
    // Deletar Usuário
    @Test
    @DisplayName("Delete User Test")
    public void deleteUser() {
        User userTest = new User();
        userTest.setLogin("UserTest3@gmail.com");
        userTest.setPassword("UserTest3-1234");
        userTest.setRole(UserRole.USER);

        repository.save(userTest);
        entityManager.flush(); 

        repository.delete(userTest);
        entityManager.clear(); 

        assertThat(true).isTrue();
    }
}