package com.serhii.controller;

import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import com.serhii.service.EmployerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.bytebuddy.agent.builder.AgentBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class EmployerController {

    private final EmployerService employerService;

    @GetMapping("/employer/{id}")
    public Employer getEmployer(@PathVariable Long id) {
        return employerService.getOne(id);
    }

    @GetMapping("/employer")
    public List<Employer> getAllEmployers(){
        System.out.println(employerService.findAll());
        return employerService.findAll();
    }

    @PostMapping("/employer")
    public Employer addNewEmployer(@RequestBody Employer employer){
        return employerService.save(employer);
    }

    @DeleteMapping("/employer/{id}")
    public List<Employer> deleteEmployerById(@PathVariable Long id) {
        employerService.deleteById(id);
        return employerService.findAll();
    }
}
