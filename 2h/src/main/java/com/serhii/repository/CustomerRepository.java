package com.serhii.repository;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

//    @Transactional
//    @Modifying
//    @Query("UPDATE Customer c SET c.c_name = ?2, c.c_age = ?3, c.c_email = ?4 WHERE c.c_id = ?1")
//    Customer updateCustomerData(long id, String name, Integer age, String email);

    Customer getCustomerByAccountsEquals(long id);
}
