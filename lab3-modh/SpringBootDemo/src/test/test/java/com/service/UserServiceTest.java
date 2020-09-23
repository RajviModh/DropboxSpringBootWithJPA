package com.service;

import com.AbstractTest;
import com.entity.User;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;

@Transactional
public class UserServiceTest extends AbstractTest {

    @Autowired
    private UserService userService;


    @Test
    public void testLogin() {

        String email = "rajvi.modh@sjsu.edu";
        String password = "rajvi";
        List<User> users = userService.login(email, password);

        Assert.assertTrue(users != null && !users.isEmpty());
    }

    @Test
    public void testAddUser() {
        User user = new User();
        user.setFirstname("Rohan");
        user.setLastname("Athavale");
        user.setEmail("rohan.athavale@sjsu.edu");
        user.setPassword("roha");
        user.setContact("123456789");
        user.setEducation("MS");
        user.setMusic("Ed Sheeran");
        user.setShows("F1");
        user.setSports("F1");
        user.setWork("Capgemini");
        List<User> users = userService.addUser(user);

        Assert.assertTrue(users != null && !users.isEmpty() && users.get(0).getEmail().equals(user.getEmail()));
    }

    @Test
    public void testShowProfile() {
        Integer userid = 21;

        List<User> users = userService.showProfile("" + userid);
        Assert.assertEquals(userid.intValue(), ((users != null && !users.isEmpty()) ? users.get(0).getId() : -1));
    }

    @Test
    public void testEditProfile() {
        JSONObject userBeingEdited = new JSONObject();
        userBeingEdited.put("userid", 21);
        userBeingEdited.put("firstname", "Rajvi");
        userBeingEdited.put("lastname", "Modh");
        userBeingEdited.put("email", "rajvi.modh@sjsu.edu");
        userBeingEdited.put("password", "raaz");
        userBeingEdited.put("contact", "123456789");
        userBeingEdited.put("education", "MS");
        userBeingEdited.put("shows", "GoT");
        userBeingEdited.put("sports", "IceSkating");
        userBeingEdited.put("work", "CapGemini");
        userBeingEdited.put("music", "StephenCurry");

        User editedUser = userService.editProfile(userBeingEdited);
        System.out.println(editedUser.getEmail());
        Assert.assertTrue(editedUser != null && userBeingEdited.getString("email").equals(editedUser.getEmail()));
    }

    @Test
    public void testGetAllUsers() {
        int expectedNoOfUsers = 1;
        Iterable<User> users = userService.getAllUsers();
        Iterator iterator = users.iterator();
        int actualNoOfUsers = 0;
        while(iterator.hasNext()) {
            iterator.next();
            ++actualNoOfUsers;
        }
        Assert.assertEquals(expectedNoOfUsers, actualNoOfUsers);
    }
}
