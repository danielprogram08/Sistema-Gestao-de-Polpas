package com.sgp.hoopoes_management_system.Service.Users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sgp.hoopoes_management_system.Domain.Users.UserDTO;
import com.sgp.hoopoes_management_system.Domain.Users.User;
import com.sgp.hoopoes_management_system.Exception.BadRequestExceptionError;
import com.sgp.hoopoes_management_system.Repository.Users.userRepository;

@Service
public class UserService {

    @Autowired
    private userRepository repository;

    // Autenticar usuário;
    @Transactional(readOnly = true)
    public Optional<User> authenticateUser(User data) {
        if (data.getLogin().isEmpty() || data.getPassword().isEmpty()) {
            throw new BadRequestExceptionError("Login e senha são obrigatórios.");
        }

        return repository.findByLoginAndPassword(data.getLogin(), data.getPassword());
    }

    // Cadastrar usuário;
    @Transactional
    public UserDTO registerUser(User data) {
        if (repository.existsByLogin(data.getLogin())) {
            throw new BadRequestExceptionError("Usuário já cadastrado.");
        }

        UserDTO dto = new UserDTO(data.getLogin(), data.getPassword(), data.getRole());
        repository.save(dto.convert());
        return dto;
    }

    // Alterar senha;
    @Transactional
    public void updatePassword(String newPassword, String login) {
        if (!repository.existsByLogin(login)) {
            throw new BadRequestExceptionError("Usuário não cadastrado.");
        }
        repository.updatePassword(newPassword, login);
    }

    // Excluir usuário;
    @Transactional
    public void deleteUser(Long id) {
        if (!repository.existsById(id)) {
            throw new BadRequestExceptionError("Usuário não cadastrado.");
        }
        repository.deleteById(id);
    }
}