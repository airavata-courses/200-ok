package com.project.parkmycar.controller;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.parkmycar.model.User;
import com.project.parkmycar.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	//@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static Long generateUniqueId() {
		long val = -1;
		do {
			final UUID uid = UUID.randomUUID();
			final ByteBuffer buffer = ByteBuffer.wrap(new byte[16]);
			buffer.putLong(uid.getLeastSignificantBits());
			buffer.putLong(uid.getMostSignificantBits());
			final BigInteger bi = new BigInteger(buffer.array());
			val = bi.longValue();
		}
		while (val < 0);
		return val;
	}
	
	// Get All Users
	@GetMapping("/users")
	public List<User> getAllUsers() {
	    return userRepository.findAll();
	}
	
	// Create a new User
	@PostMapping("/users")
	public User createUser(@Valid @RequestBody User user) {
	    return userRepository.save(user);
	}
	
	@RequestMapping("/login")
	public ResponseEntity<User> login(@RequestParam("username") String username, @RequestParam("password") String password, HttpServletRequest request, Model m){
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String hashedPassword = passwordEncoder.encode(password);
		Optional<User> user = userRepository.findAllByUserName(username);
		if(user.get().getUserName().equals(username) && passwordEncoder.matches(password, user.get().getPassword())) {
			return new ResponseEntity<>(user.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@RequestMapping("/register")
	public void saveUser(@RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName, @RequestParam("username") String username, @RequestParam("password") String password, HttpServletRequest request, Model m){
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setUserName(username);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		user.setPassword(hashedPassword);
		Long userId = generateUniqueId();
		user.setUserId(userId);
		userRepository.save(user);
	}
	
}
