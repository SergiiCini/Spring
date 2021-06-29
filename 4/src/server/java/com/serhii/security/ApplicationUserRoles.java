package com.serhii.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.serhii.security.ApplicationUserPermissions.*;

public enum ApplicationUserRoles {
    USER(Sets.newHashSet(ACCOUNT_READ, CUSTOMER_READ, EMPLOYER_READ)),
    ADMIN(Sets.newHashSet(ACCOUNT_READ, ACCOUNT_WRITE, CUSTOMER_READ, CUSTOMER_WRITE, EMPLOYER_READ, EMPLOYER_WRITE));

    private final Set<ApplicationUserPermissions> permissions;

    ApplicationUserRoles(Set<ApplicationUserPermissions> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermissions> getPermissions(){
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities(){
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(p -> new SimpleGrantedAuthority(p.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
