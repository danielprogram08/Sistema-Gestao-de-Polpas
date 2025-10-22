package com.sgp.hoopoes_management_system.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

@Override
public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
    // Regra 1: Para endpoints da API que exigem autenticação
    // registry.addMapping("/login/**")
    registry.addMapping("/**")
        // .allowedOrigins("http://localhost:3000/login") -> Permissão concedida a tela de login (EndPoint usado de Exemplo);
        .allowedOrigins("*")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*");
    }

    /*  Regra 2: Para endpoints públicos, que podem ser mais abertos
    registry.addMapping("/home/**")
        .allowedOrigins("*") 
        .allowedMethods("GET"); 
    }*/
}