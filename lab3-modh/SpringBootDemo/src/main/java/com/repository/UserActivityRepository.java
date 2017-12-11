package com.repository;

import com.entity.User;
import com.entity.UserActivity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserActivityRepository extends CrudRepository<UserActivity, Long> {
    List<UserActivity> findByActivityId(Integer activityId);
    List<UserActivity> findByActivityName(String activityName);
    List<UserActivity> findByUserId(Integer userId);
}
