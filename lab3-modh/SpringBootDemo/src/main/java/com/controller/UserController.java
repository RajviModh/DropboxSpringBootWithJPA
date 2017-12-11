package com.controller;

import com.entity.User;
import com.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user) {
        System.out.println("In Dir" + user);

        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject.getString("password"));
        //session.setAttribute("name", jsonObject.getString("email"));
        userService = new UserService();
        return new ResponseEntity(userService.login(jsonObject.getString("email"), jsonObject.getString("password")), HttpStatus.OK);
    }


    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return new ResponseEntity(userService.addUser(user), HttpStatus.CREATED);
    }


    @PostMapping(path = "/getProfile", consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> showProfile(@RequestBody String user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject.getString("userid"));

        System.out.println("--------in get profile" + user);

        //userService.showProfile(jsonObject.getString("userid"));
        //System.out.println(userService.showProfile(jsonObject.getString("userid")));
        return new ResponseEntity(userService.showProfile(jsonObject.getString("userid")), HttpStatus.OK);
    }

    @PostMapping(path = "/editProfile", consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> editProfile(@RequestBody String user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        JSONObject jsonObject = new JSONObject(user);
        //System.out.println(jsonObject.getString("userid"));

        System.out.println("--------in get profile" + user);

        //userService.showProfile(jsonObject.getString("userid"));
        //System.out.println(userService.showProfile(jsonObject.getString("userid")));
        //System.out.println(jsonObject.getString("userid"));
        return new ResponseEntity(userService.editProfile(jsonObject), HttpStatus.OK);
    }


/*

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }
*/



    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }
}