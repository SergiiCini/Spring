package com.serhii.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.serhii.security.ApplicationUserPermissions.*;
import static com.serhii.security.ApplicationUserRoles.*;

@Configuration
@EnableWebSecurity

public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
//                .antMatchers("/api/**").hasRole(USER.name())
                .antMatchers(HttpMethod.POST, "/api/**").hasAuthority(CUSTOMER_WRITE.getPermission())
                .antMatchers(HttpMethod.PUT, "/api/**").hasAuthority(CUSTOMER_WRITE.getPermission())
                .antMatchers(HttpMethod.DELETE, "/api/**").hasAuthority(CUSTOMER_WRITE.getPermission())
                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole(ADMIN.name(), USER.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Override
    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails defaultUser = User.builder()
                .username("user")
                .password(passwordEncoder.encode("password123"))
//                .roles(USER.name()) //ROLE_USER
                .authorities(USER.getGrantedAuthorities())
                .build();

        UserDetails adminUser = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("password123"))
//                .roles(ADMIN.name()) // ROLE_ADMIN
                .authorities(ADMIN.getGrantedAuthorities())
                .build();


        return new InMemoryUserDetailsManager(
                defaultUser,
                adminUser
        );
    }
}
