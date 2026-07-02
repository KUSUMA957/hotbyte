package com.hotbyte.hotbyte.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotbyte.hotbyte.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	List<Address> findByUserId(Long userId);
	Optional<Address> findByUserIdAndIsSelectedTrue(Long userId);
}
