package com.repository;

import com.entity.File;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface FileRepository extends CrudRepository<File, Long> {
    List<File> findByUserid(Integer id);

    @Transactional
    void deleteFileByUseridAndFileName(Integer userid, String fileName);
   // File deleteFileByFileNameAndAndUserid()

}