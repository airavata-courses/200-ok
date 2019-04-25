package com.project.parkmycar.controller;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.parkmycar.model.ParkingGarage;
import com.project.parkmycar.model.User;
import com.project.parkmycar.repository.ParkingGarageRepository;
import com.project.parkmycar.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ParkingGarageRepository parkingGarageRepository;
	
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
	
	@CrossOrigin
	@RequestMapping("/login")
	public ResponseEntity<User> login(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("social") String social, @RequestParam("firstname") String firstname, @RequestParam("lastname") String lastname, HttpServletRequest request, Model m, HttpSession session){
		if(social == "") {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//			String hashedPassword = passwordEncoder.encode(password);
			Optional<User> user = userRepository.findAllByUserName(username);
			System.out.println("Hellllllllooooooo");
			System.out.println(session.getAttribute("user"));
			if(user.get().getUserName().equals(username) && passwordEncoder.matches(password, user.get().getPassword())) {
				return new ResponseEntity<>(user.get(),HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@CrossOrigin
	@RequestMapping("/register")
	public ResponseEntity<User> saveUser(@RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName, @RequestParam("username") String username, @RequestParam("password") String password, HttpServletRequest request, Model m){
		
		Optional<User> userlist = userRepository.findAllByUserName(username);
		if(userlist.isPresent()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setUserName(username);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		user.setPassword(hashedPassword);
		String userId = generateUniqueId().toString();
		user.setUserId(userId);
		userRepository.save(user);
		Optional<User> user_list = userRepository.findAllByUserName(username);
		return new ResponseEntity<>(user_list.get(), HttpStatus.OK);
	}
	
	@CrossOrigin
	@RequestMapping("/googlelogin")
	public ResponseEntity<User> googlelogin(@RequestParam("username") String username, @RequestParam("firstname") String firstName, @RequestParam("lastname") String lastName, HttpServletRequest request, Model m, HttpSession session){
		
		Optional<User> userlist = userRepository.findAllByUserName(username);
		if(userlist.isPresent()) {
			Optional<User> user = userRepository.findAllByUserName(username);

			System.out.println(session.getAttribute("user"));
			if(user.get().getUserName().equals(username)) {
				return new ResponseEntity<>(user.get(),HttpStatus.OK);
			}
		}
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setUserName(username);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String userId = generateUniqueId().toString();
		user.setUserId(userId);
		String hashedPassword = passwordEncoder.encode(userId);
		user.setPassword(hashedPassword);
		userRepository.save(user);
		Optional<User> user_list = userRepository.findAllByUserName(username);
		return new ResponseEntity<>(user_list.get(), HttpStatus.OK);
		
	
	}
	
	// Get All Parking Garages
	@CrossOrigin
	@RequestMapping("/getAllGarages")
	public List<ParkingGarage> getAllGarages() {
	    return parkingGarageRepository.findAll();
	}
	
}
