package com.service;

import com.entity.User;
import com.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }


    public List<User> showProfile(String user) {
        System.out.println("-------in user service show profile" + user);
        int id = Integer.parseInt(user);
        return userRepository.findById(id);
    }

    public User editProfile(JSONObject newUser) {
        System.out.println("-------in user service edit profile" + newUser);
        // int id = Integer.parseInt(userid);

        List<User> user = userRepository.findById(newUser.getInt("userid"));

        System.out.println("--------- back in user service" + user);

        user.get(0).setFirstname(newUser.getString("firstname"));
        user.get(0).setLastname(newUser.getString("lastname"));
        user.get(0).setContact(newUser.getString("contact"));

        user.get(0).setEducation((String) newUser.get("education"));
        user.get(0).setWork(newUser.getString("work"));
        user.get(0).setMusic(newUser.getString("music"));
        user.get(0).setShows(newUser.getString("shows"));
        user.get(0).setSports(newUser.getString("sports"));

        System.out.println("--------- in edit profile service" + user.get(0));
        return userRepository.save(user.get(0));
    }

    public List<User> login(String email, String password) {
        System.out.println("inLogin " + email + password);
        //System.out.println(userRepository == null);
        return userRepository.findByEmailAndPassword(email, password);
    }


}