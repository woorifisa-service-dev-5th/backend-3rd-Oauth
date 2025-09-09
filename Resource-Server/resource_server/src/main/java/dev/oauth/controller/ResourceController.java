package dev.oauth.controller;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;

public class ResourceController {
    @GetMapping("/user")
    public String showUserInfo(JwtAuthenticationToken authenticationToken) {
        System.out.println(authenticationToken);
        String name = authenticationToken.getTokenAttributes().toString();

        return "{\"안녕, %s!\"}".formatted(name);
    }
}
