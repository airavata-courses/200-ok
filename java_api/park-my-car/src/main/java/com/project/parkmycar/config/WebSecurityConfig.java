package com.project.parkmycar.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.project.parkmycar.controller.SuccessfulLoginHandler;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private SuccessfulLoginHandler successHandler;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
      http
      .authorizeRequests()
          .antMatchers("/", "/api/users", "/api/register", "/api/googlelogin",	"/api/login", "/api/getAllGarages","/api/dashboard").permitAll()
          .anyRequest().authenticated()
          .and()
      .formLogin()
      	.successHandler(successHandler)
          .loginPage("/api/googlelogin")
          .permitAll()
          .and()
      .logout()
          .permitAll();
//        http
//            .authorizeRequests()
//                .antMatchers("/api/login", "/api/getAllGarages","/api/dashboard").permitAll()
//                .anyRequest().authenticated()
//                .and()
//            .formLogin()
//                .successHandler(successHandler)
//                .loginPage("/api/login").permitAll()
//                .and()
//            .logout()
//                .permitAll();
////        http
//        .authorizeRequests()
//            .antMatchers("/", "/api/users", "/api/register", "/api/login", "/api/getAllGarages","/api/dashboard").permitAll()
//            .anyRequest().authenticated()
//            .and()
//            .formLogin().successHandler(successHandler)
//            .loginPage("/login").permitAll()
//        .formLogin()
//            .loginPage("/api/login")
//            .permitAll()
//            .and()
//        .logout()
//            .permitAll();
        
    }
}
