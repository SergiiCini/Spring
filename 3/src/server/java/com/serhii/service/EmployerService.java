package com.serhii.service;

import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployerService {

    public Employer save(Employer employer);

    public List<Employer> findAll();

    public void deleteById(Long id);

    public Employer getOne(Long id);

    public Employer addCustomer(long employerId, Customer customer);

    public Employer createEmployer(String name, String address);
}
