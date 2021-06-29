package com.serhii.security;

public enum ApplicationUserPermissions {
    CUSTOMER_READ("customer:read"),
    CUSTOMER_WRITE("customer:write"),
    ACCOUNT_READ("account:read"),
    ACCOUNT_WRITE("account:write"),
    EMPLOYER_READ("employer:read"),
    EMPLOYER_WRITE("employer:write");

    private final String permission;

    ApplicationUserPermissions(String permission) {
        this.permission = permission;
    }

    public String getPermission(){
        return permission;
    }
}
