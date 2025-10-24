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

import com.sgp.hoopoes_management_system.Domain.Users.users;
import com.sgp.hoopoes_management_system.Service.Users.AuthService;


@RestController
@RequestMapping("auth")
public class UserAuthenticationController {

    @Autowired
    AuthService authorizationService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody users data) {
        return ResponseEntity.ok(authorizationService.authenticateUser(data));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody users data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authorizationService.registerUser(data));
    }

    @PutMapping("/update-password")
    public ResponseEntity updatePassword(@RequestBody users data) {
        authorizationService.updatePassword(data);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam Long id) {
        authorizationService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    }