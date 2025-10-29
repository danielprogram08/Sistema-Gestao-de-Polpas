package com.sgp.hoopoes_management_system.Controller.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sgp.hoopoes_management_system.Domain.Users.User;
import com.sgp.hoopoes_management_system.Service.Users.UserService;


@RestController
@RequestMapping("auth")
public class UserAuthenticationController {

    @Autowired
    UserService service;

    // EndPoint de autenticação de usuário;
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User data) {
        return ResponseEntity.ok(service.authenticateUser(data));
    }

    // EndPoint de cadastro de usuário;
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerUser(data));
    }

    // EndPoint de alteração de senha;
    @PutMapping("/update-password")
    public ResponseEntity updatePassword(@RequestParam String newPassword, @RequestParam String login) {
        service.updatePassword(newPassword, login);
        return ResponseEntity.ok().body("Senha alterada com sucesso!");
    }

    // EndPoint de exclusão de usuário;
    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam Long id) {
        service.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário excluído com sucesso!");
    }

    }