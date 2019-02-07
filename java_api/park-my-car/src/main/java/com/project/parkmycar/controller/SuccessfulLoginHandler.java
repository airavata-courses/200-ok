package com.project.parkmycar.controller;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.parkmycar.model.User;
import com.project.parkmycar.repository.UserRepository;


@Component
public class SuccessfulLoginHandler implements AuthenticationSuccessHandler{
	
	@Autowired
	UserRepository userRepo;

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	Authentication auth;

	public void onAuthenticationSuccess(HttpServletRequest hsRequest, HttpServletResponse hsResponse,
			Authentication authentication) throws IOException, ServletException {

		HttpSession session = hsRequest.getSession();
		Optional<User> user_list = userRepo.findAllByUserName(authentication.getName());

		if (null != session) {
			session.setAttribute("user", user_list.get());
		}
		auth = authentication;

		redirect(hsRequest, hsResponse, user_list.get());

	}

	private void redirect(HttpServletRequest hsRequest, HttpServletResponse hsResponse, User user) throws IOException {
		if (null != user) {
			redirectStrategy.sendRedirect(hsRequest, hsResponse, "/");
		}
	}
}
