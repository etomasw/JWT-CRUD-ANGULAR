package io.ernest.test.service.impl;

import io.ernest.test.enumeration.Role;
import io.ernest.test.model.User;
import io.ernest.test.model.UserPrincipal;
import io.ernest.test.repository.UserRepository;
import io.ernest.test.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private UserRepository repository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User create(User user) {
        User createUser = new User();
        createUser.setEmail(user.getEmail());
        createUser.setFirstName(user.getFirstName());
        createUser.setLastName(user.getLastName());
        createUser.setPhone(user.getPhone());
        createUser.setRole(Role.ROLE_USER.name());
        createUser.setAuthorities(Role.ROLE_USER.getAuthorities());
        createUser.setActive(true);
        createUser.setPassword(encodePassword(user.getPassword()));
        createUser.setNotLocked(true);
        LOGGER.info("[!] Created user: " + user.getEmail() + " with ROLE: " + createUser.getRole());
        return repository.save(createUser);
    }

    @Override
    public User edit(User user) throws Exception {
        User editUser = repository.findById(user.getId()).orElse(null);
        if(editUser != null) {
            editUser.setId(user.getId());
            editUser.setEmail(user.getEmail());
            editUser.setFirstName(user.getFirstName());
            editUser.setLastName(user.getLastName());
            editUser.setPhone(user.getPhone());
            editUser.setActive(true);
            editUser.setRole(user.getRole());
            editUser.setAuthorities(user.getAuthorities());
            editUser.setNotLocked(true);
            return repository.save(editUser);
        } else {
            throw new Exception("User not found");
        }

    }

    @Override
    public void delete(Long id) throws Exception {
        if(repository.findById(id).orElse(null) == null) {
            throw new Exception("User not found");
        }
        repository.deleteById(id);
    }

    @Override
    public User get(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return repository.findUserByEmail(email);
    }

    @Override
    public List<User> listAll() {
        return repository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Email not found: " + email);
        } else {
            UserPrincipal userPrincipal = new UserPrincipal(user);
            LOGGER.info("Found user with email: " + email);
            return userPrincipal;
        }
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
