package com.serhii.dto;

import com.serhii.entity.Employer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class EmployerDtoResponse {

    private final ModelMapper modelMapper;

    public EmployerDtoResponse() {
        this.modelMapper = new ModelMapper();
    }

    public EmployerDto convertToDto(Employer employer){
        return modelMapper.map(employer, EmployerDto.class);
    }
}
