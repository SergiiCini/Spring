package com.serhii.controller;

import com.serhii.dto.EmployerDtoReq;
import com.serhii.dto.EmployerDtoRes;
import com.serhii.entity.Employer;
import com.serhii.facade.EmployerFacade;
import com.serhii.service.EmployerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class EmployerController {

    private final EmployerService employerService;
    private final EmployerFacade employerFacade;

    @GetMapping("/employer/{id}")
    public EmployerDtoRes getEmployer(@PathVariable Long id) {
        return employerFacade.convertToDto(employerService.getOne(id));
    }

    @GetMapping("/employer")
    public List<EmployerDtoRes> getAllEmployers(){
        return employerService.findAll()
                .stream()
                .map(employerFacade::convertToDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/employer")
    public EmployerDtoRes addNewEmployer(@RequestBody EmployerDtoReq employerDtoReq){
        return employerFacade.convertToDto(employerService.save(employerFacade.convertToEntity(employerDtoReq)));
    }

    @DeleteMapping("/employer/{id}")
    public List<EmployerDtoRes> deleteEmployerById(@PathVariable Long id) {
        employerService.deleteById(id);
        return employerService.findAll()
                .stream()
                .map(employerFacade::convertToDto)
                .collect(Collectors.toList());
    }
}
