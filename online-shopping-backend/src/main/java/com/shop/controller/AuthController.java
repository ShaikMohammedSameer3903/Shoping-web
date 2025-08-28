package com.shop.controller;

import com.shop.dto.*;
import com.shop.entity.User;
import com.shop.repository.UserRepository;
import com.shop.service.JwtService;
import com.shop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserRepository userRepository,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email already registered"));
        }

        // Save user
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // Will be encoded inside userService.save
        user.setRoles(Set.of("CUSTOMER"));

        User saved = userService.save(user);

        // Load UserDetails for JWT generation
        UserDetails userDetails = userService.loadUserByUsername(saved.getEmail());

        // Generate token
        String token = jwtService.generateToken(
                Map.of("roles", saved.getRoles().stream().collect(Collectors.toList())),
                userDetails
        );

        UserDto dto = new UserDto(saved.getId(), saved.getName(), saved.getEmail(), saved.getRoles());

        return ResponseEntity.ok(new AuthResponse(token, dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(
                Map.of("roles", user.getRoles().stream().collect(Collectors.toList())),
                userDetails
        );

        UserDto dto = new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRoles());

        return ResponseEntity.ok(new AuthResponse(token, dto));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@AuthenticationPrincipal UserDetails ud) {
        User user = userRepository.findByEmail(ud.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDto dto = new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRoles());
        return ResponseEntity.ok(dto);
    }
}

