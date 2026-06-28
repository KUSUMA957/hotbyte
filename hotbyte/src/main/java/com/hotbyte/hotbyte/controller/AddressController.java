package com.hotbyte.hotbyte.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.hotbyte.hotbyte.dto.AddressRequest;
import com.hotbyte.hotbyte.entity.Address;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.service.AddressService;
import com.hotbyte.hotbyte.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/address")
public class AddressController {

    @Autowired
    private AddressService service;

    @Autowired
    private UserService userService;

    // ✅ ADD ADDRESS
    @PostMapping
    public Address add(@Valid @RequestBody AddressRequest req,
                       Authentication authentication) {

        String email = authentication.getName();   // ✅ correct
        User user = userService.findByEmail(email);

        Address address = new Address();
        address.setLabel(req.getLabel());
        address.setAddressLine(req.getAddressLine());
        address.setCity(req.getCity());
        address.setPincode(req.getPincode());
        address.setUser(user);

        return service.add(address, user);
    }

    // ✅ GET ADDRESSES
    @GetMapping
    public List<Address> get(Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email);

        return service.get(user);
    }

    // ✅ UPDATE ADDRESS
    @PutMapping("/{id}")
    public Address update(@PathVariable("id") Long id,
                          @RequestBody AddressRequest req,
                          Authentication authentication) {

        String email = authentication.getName();
        userService.findByEmail(email); // ✅ ensures user exists

        Address address = new Address();
        address.setLabel(req.getLabel());
        address.setAddressLine(req.getAddressLine());
        address.setCity(req.getCity());
        address.setPincode(req.getPincode());

        return service.update(id, address);
    }

    // ✅ DELETE ADDRESS
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id,
                       Authentication authentication) {

        String email = authentication.getName();
        userService.findByEmail(email);

        service.delete(id);
    }
    @PutMapping("/select/{id}")
    public String selectAddress(@PathVariable("id") Long id,
                                Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email);

        service.setSelectedAddress(id, user);

        return "Address selected ✅";
    }
}