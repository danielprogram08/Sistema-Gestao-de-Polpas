package com.sgp.hoopoes_management_system.Service.Users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sgp.hoopoes_management_system.Domain.Users.registerDTO;
import com.sgp.hoopoes_management_system.Domain.Users.updatePasswordDTO;
import com.sgp.hoopoes_management_system.Domain.Users.users;
import com.sgp.hoopoes_management_system.Exception.BadRequestExceptionError;
import com.sgp.hoopoes_management_system.Repository.Users.userRepository;

@Service
public class AuthService {

    @Autowired
    private userRepository repository;

    @Transactional(readOnly = true)
    public Optional<users> authenticateUser(users data) {
        if (data.getLogin().isEmpty() || data.getPassword().isEmpty()) {
            throw new BadRequestExceptionError("Login e senha são obrigatórios.");
        }

        return repository.findByLoginAndPassword(data.getLogin(), data.getPassword());
    }

    @Transactional
    public registerDTO registerUser(users data) {
        if (repository.findByLoginAndPassword(data.getLogin(), data.getPassword()).isPresent()) {
            throw new BadRequestExceptionError("Usuário já cadastrado.");    
        }

        registerDTO dto = new registerDTO(data.getLogin(), data.getPassword(), data.getRole());
        repository.save(dto.convert());
        return dto;
    }

    @Transactional
    public void updatePassword(users data) {
        if (repository.findByLogin(data.getLogin()).isEmpty()) {
            throw new BadRequestExceptionError("Usuário não cadastrado.");
        }
        
        updatePasswordDTO dto = new updatePasswordDTO(data.getLogin(), data.getPassword());
        repository.updatePassword(dto.login(), data.getPassword());
    }

    @Transactional
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}