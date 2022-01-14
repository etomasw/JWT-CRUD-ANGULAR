package io.ernest.test.service;

import io.ernest.test.model.User;

import java.util.List;

public interface UserService {

    User create(User user);
    User edit(User user) throws Exception;
    void delete(Long id) throws Exception;
    User get(Long id);
    User findByEmail(String email);
    List<User> listAll();
}
