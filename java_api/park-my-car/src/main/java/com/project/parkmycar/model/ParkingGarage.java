package com.project.parkmycar.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "parking_garage_detail")
@EntityListeners(AuditingEntityListener.class)
//@JsonIgnoreProperties(value = {"userType"}, 
//        allowGetters = true)
public class ParkingGarage implements Serializable{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false)
    private Long id;
	
	@Column(name = "address", nullable = false)
    private String address;
	
	@Column(name = "city", nullable = false)
    private String city;
	
	@Column(name = "pincode", nullable = false)
    private String pincode;
	
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "user_profile_id", referencedColumnName = "user_profile_id")
	private User user;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Column(name = "parking_garage_id", nullable = false)
	private Long parkingGarageId;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public Long getParkingGarageId() {
		return parkingGarageId;
	}

	public void setParkingGarageId(Long parkingGarageId) {
		this.parkingGarageId = parkingGarageId;
	}

}
