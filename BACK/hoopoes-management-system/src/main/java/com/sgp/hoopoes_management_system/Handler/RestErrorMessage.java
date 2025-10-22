package com.sgp.hoopoes_management_system.Handler;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RestErrorMessage {

    private String message;
    private HttpStatus status;
}
