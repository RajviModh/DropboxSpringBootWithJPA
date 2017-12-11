package com.service;

import com.entity.UserActivity;
import com.repository.UserActivityRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@Service
public class UserActivityService {

    @Autowired
    private UserActivityRepository userActivityRepository;

    public void logActivity(String activityName, Integer userId) {
        try {
            UserActivity userActivity = new UserActivity();
            userActivity.setActivityName(activityName);
            userActivity.setUserId(userId);
            userActivity.setTimestamp(new Timestamp(Calendar.getInstance().getTimeInMillis()));
            userActivityRepository.save(userActivity);
            /*returnValues.put("message", "Activity Saved Successfully");
            returnValues.put("status", HttpStatus.OK);*/
        } catch (Exception exception) {
            exception.printStackTrace();
            /*returnValues.put("message", "Unable to Log Activity");
            returnValues.put("status", HttpStatus.INTERNAL_SERVER_ERROR);*/
        }

        //return returnValues;
    }

    public List<UserActivity> getActivities(Integer userId) {
        List<UserActivity> userActivities = null;
        try{
            userActivities = userActivityRepository.findByUserId(userId);
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            return userActivities;
        }
    }



}