package com.serhii.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PasswordValidation implements ConstraintValidator<ValidatePassword, String> {

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}");
        Matcher matcher = pattern.matcher(s);
        try {
            if(!matcher.matches()){
                return false;
            } else {
                for(int i = 1; i <= 4; i++){
                    int res = Integer.valueOf(matcher.group(i));
                    if(res > 255) {
                        return false;
                    }
                }
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
