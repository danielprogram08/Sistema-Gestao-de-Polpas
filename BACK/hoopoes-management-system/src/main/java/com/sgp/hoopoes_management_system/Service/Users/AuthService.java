package com.sgp.hoopoes_management_system.Service.Users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgp.hoopoes_management_system.Domain.Users.userDTO;
import com.sgp.hoopoes_management_system.Domain.Users.users;
import com.sgp.hoopoes_management_system.Repository.Users.userRepository;

@Service
public class AuthService {

    @Autowired
    private userRepository repository;

    public Optional<users> authenticateUser(users data) {
        if (data.getLogin() == null || data.getLogin().isBlank() || data.getPassword() == null || data.getPassword().isBlank()) {
            throw new IllegalArgumentException("Login e senha não podem ser nulos ou vazios.");
        }

        return repository.findByLoginAndPassword(data.getLogin(), data.getPassword());
    }

    public userDTO registerUser(users data) {
        userDTO dto = new userDTO(data.getLogin(), data.getPassword(), data.getRole());
        repository.save(data);
        return dto;
    }
}