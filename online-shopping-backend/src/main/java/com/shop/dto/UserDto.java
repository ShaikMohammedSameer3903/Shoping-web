package com.shop.dto;

import java.util.Set;

public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Set<String> roles;

    // No-args constructor
    public UserDto() {}

    // All-args constructor
    public UserDto(Long id, String name, String email, Set<String> roles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    // Optional: Builder-like pattern (if you want to keep it)
    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private Set<String> roles;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder roles(Set<String> roles) {
            this.roles = roles;
            return this;
        }

        public UserDto build() {
            return new UserDto(id, name, email, roles);
        }
    }
}
