package com.hotbyte.hotbyte.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotbyte.hotbyte.entity.Address;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.AddressRepository;

@Service
public class AddressService {

	@Autowired
	private AddressRepository repo;

	public Address add(Address address, User user) {
		address.setUser(user);
		return repo.save(address);
	}

	public List<Address> get(User user) {
		List<Address> list = repo.findByUserId(user.getId());
		return list;
	}

	public Address update(Long id, Address newAddress) {
		Address a = repo.findById(id).orElseThrow();
		a.setAddressLine(newAddress.getAddressLine());
		a.setCity(newAddress.getCity());
		a.setPincode(newAddress.getPincode());
		a.setLabel(newAddress.getLabel());
		return repo.save(a);
	}

	public void delete(Long id) {
		repo.deleteById(id);
	}

	public Address getSelectedAddress(User user) {
		return repo.findByUserIdAndIsSelectedTrue(user.getId())
				.orElseGet(() -> repo.findByUserId(user.getId()).stream().findFirst().orElse(null));
	}

	public void setSelectedAddress(Long id, User user) {
		List<Address> list = repo.findByUserId(user.getId());
		// ✅ remove selection from all
		for (Address a : list) {
			a.setSelected(false);
		}
		// ✅ set selected one
		Address selected = repo.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
		selected.setSelected(true);
		repo.saveAll(list);
	}
}
