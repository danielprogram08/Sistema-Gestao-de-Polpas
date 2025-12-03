package com.sgp.hoopoes_management_system.Service.User;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.sgp.hoopoes_management_system.Domain.Users.User;
import com.sgp.hoopoes_management_system.Domain.Users.UserDTO;
import com.sgp.hoopoes_management_system.Domain.Users.UserRole;
import com.sgp.hoopoes_management_system.Repository.Users.UserRepository;
import com.sgp.hoopoes_management_system.Service.Users.UserService;
import com.sgp.hoopoes_management_system.Exception.BadRequestExceptionError;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;

    // Teste - Regitrar Usuário
    @Test
    @DisplayName("Service Resgister User - Success")
    public void testRegisterUser_Success() {
        User user = new User();
        user.setLogin("UserTest@gmail.com");
        user.setPassword("Test@1234");
        user.setRole(UserRole.USER);

        when(repository.existsByLogin(user.getLogin())).thenReturn(false);
        when(repository.save(any(User.class))).thenReturn(user);
        
        UserDTO result = service.registerUser(user);
        assertThat(result).isNotNull();
        assertThat(result.login()).isEqualTo("UserTest@gmail.com");
    }

    // Teste - Registrar Usuário - Falha
    @Test
    @DisplayName("Service Resgister User - Fail")
    public void testRegisterUser_Fail() {
        User user = new User();
        user.setLogin("UserTest@gmail.com");
        user.setPassword("Test@1234");
        user.setRole(UserRole.USER);

        when(repository.existsByLogin(user.getLogin())).thenReturn(true);

        assertThrows(BadRequestExceptionError.class, () -> {
            service.registerUser(user);
        });
    }

    // Teste - Autenticar Usuário
    @Test
    @DisplayName("Service Authenticate User - Success")
    public void testAuthenticateUser_Success() {
        User user = new User();
        user.setLogin("UserTest@gmail.com");
        user.setPassword("Test@1234");
        user.setRole(UserRole.USER);

        when(repository.findByLoginAndPassword(user.getLogin(), user.getPassword())).thenReturn(java.util.Optional.of(user));

        Optional<User> result = service.authenticateUser(user);
        assertThat(result).isNotNull();
    }

    // Teste - Autenticar Usuário - Falha
    @Test
    @DisplayName("Service Authenticate User - Exception")
    public void testAuthenticateUser_Exception() {
        User user = new User();
        user.setLogin("");
        user.setPassword("");
        user.setRole(UserRole.USER);

        assertThrows(BadRequestExceptionError.class, () -> {
            service.authenticateUser(user);
        });
    }

    // Teste - Atualizar Senha
    @Test
    @DisplayName("Service Update Password - Success")
    public void testUpdatePassword_Success() {
        String login = "UserTest@gmail.com";
        String newPassword = "UserTest-1234";

        when(repository.existsByLogin(login)).thenReturn(true);

        assertDoesNotThrow(() -> service.updatePassword(newPassword, login));
        verify(repository).updatePassword(newPassword, login);
    }

    // Teste - Atualizar Senha - Falha
    @Test
    @DisplayName("Service Update Password - Fail")
    public void testUpdatePassword_Fail() {
        String login = "UserTest5";
        String newPassword = "UserTest5-1234";

        when(repository.existsByLogin(login)).thenReturn(false);

        assertThrows(BadRequestExceptionError.class, () -> {
            service.updatePassword(newPassword, login);
        });
    }

    @Test
    @DisplayName("Service Delete User - Success")
    public void testDeleteUser_Success() {
        Long userId = 1L;

        when(repository.existsById(userId)).thenReturn(true);
        Mockito.doNothing().when(repository).deleteById(userId);

        assertDoesNotThrow(() -> service.deleteUser(userId));
        verify(repository).deleteById(userId);
    }
    
    // Teste - Deletar Usuário - Falha
    @Test
    @DisplayName("Service Delete User - Fail")
    public void testDeleteUser_Fail() {
        Long userId = 999L;
        when(repository.existsById(userId)).thenReturn(false);

        assertThrows(BadRequestExceptionError.class, () -> {
            service.deleteUser(userId);
        });
    }
}