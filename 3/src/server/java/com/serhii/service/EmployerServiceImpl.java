package com.serhii.service;

import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import com.serhii.exception_handling.NoSuchEmployerException;
import com.serhii.repository.EmployerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployerServiceImpl implements EmployerService {

    private final EmployerRepository employerRepository;

    @Override
    public Employer save(Employer employer) {
        return employerRepository.save(employer);
    }

    @Override
    public List<Employer> findAll() {
        return employerRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        employerRepository.deleteById(id);
    }

    @Override
    public Employer getOne(Long id) {
        Optional<Employer> employerOpt = employerRepository.findById(id);
        if (employerOpt.isPresent()) return employerOpt.get();
        else throw new NoSuchEmployerException("No employer with id: " + id + " in DB!");
    }

    @Override
    public Employer addCustomer(long employerId, Customer customer) {
        Optional<Employer> employer = employerRepository.findById(employerId);
        if (employer.isPresent()) {
            customer.addEmployer(employer.get());
            employerRepository.save(employer.get());
        } else throw new NoSuchEmployerException("No employer with id: " + employerId + " in DB!");
        return employer.get();
    }

    @Override
    public Employer createEmployer(String name, String address) {
        Employer employer = new Employer();
        employer.setName(name);
        employer.setAddress(address);
        return employer;
    }
}
