package com.serhii.facade;

import com.serhii.dto.EmployerDtoReq;
import com.serhii.dto.EmployerDtoRes;
import com.serhii.entity.Employer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class EmployerFacade {

    private final ModelMapper modelMapper;

    public EmployerFacade() {
        this.modelMapper = new ModelMapper();
    }

    public EmployerDtoRes convertToDto(Employer employer){
        return modelMapper.map(employer, EmployerDtoRes.class);
    }

    public Employer convertToEntity(EmployerDtoReq employerDtoReq) { return modelMapper.map(employerDtoReq, Employer.class);}

}
