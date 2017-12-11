package com.controller;

import com.entity.User;
import com.entity.File;
import com.service.UserService;
import com.service.FileService;
import com.service.UserActivityService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/file") // This means URL's start with /demo (after Application path)
public class FileController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserActivityService userActivityService;

    @PostMapping(path = "/fileUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> fileUpload(@RequestPart MultipartFile file, @RequestPart("path")String path) {

        String UPLOADED_FOLDER = "/Users/rajvimodh/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/14/";

        if (((MultipartFile) file).isEmpty()) {
            System.out.println("file empty");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {

            byte[] bytes =  file.getBytes();
           System.out.println("- bytes -- " + bytes);
           System.out.println("- file name in try -- " + file.getOriginalFilename());
           Path filePath = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
           System.out.println("-- path to upload in try --" + path);
            System.out.println("file uploaded");

            //----------------------------------SAVE USER ACTIVITY FOR FILE UPLOAD--------------------------------------
            try {
                System.out.println("User Activity For File Upload");
                JSONObject requestBody = new JSONObject(file);
                String activityName = "FileUploaded";
                Integer userid = requestBody.getInt("userid");
                userActivityService.logActivity(activityName, userid);
            } catch (JSONException jsonException) {
                jsonException.printStackTrace();
            } catch (Exception exception) {
                exception.printStackTrace();
            }

            return new ResponseEntity(HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }



    @PostMapping(path = "/getDir", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDir(@RequestBody String file, HttpSession session) {
        JSONObject jsonObject = new JSONObject(file);
        return new ResponseEntity(fileService.getAllFiles(jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/makeDirectory", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> makeDirectory(@RequestBody String file) {
        JSONObject jsonObject = new JSONObject(file);
        System.out.println("------- in MAKE directory ------" + file);


        //----------------------------------SAVE USER ACTIVITY FOR MAKE DIRECTORY--------------------------------------
        try {
            System.out.println("User Activity For Make Directory");
            JSONObject requestBody = new JSONObject(file);
            String activityName = "DirectoryCreated from S";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return new ResponseEntity(fileService.makeDirectory(jsonObject.getString("name"), jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/deleteDirectory", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteDirectory(@RequestBody String file) {
        JSONObject jsonObject = new JSONObject(file);
        System.out.println("------- in DELETE directory ------" + file);


        //----------------------------------SAVE USER ACTIVITY FOR DELETE DIRECTORY--------------------------------------
        try {
            System.out.println("User Activity For Delete Directory");
            JSONObject requestBody = new JSONObject(file);
            String activityName = "FileDirectoryDeleted from Springboot";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return new ResponseEntity(fileService.deleteDirectory(jsonObject.getString("name"), jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/doStar", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> doStar(@RequestBody File file) {

        //----------------------------------SAVE USER ACTIVITY FOR STAR DIRECTORY--------------------------------------
        try {
            System.out.println("User Activity For Do Star File");
            JSONObject requestBody = new JSONObject(file);
            String activityName = "FileStarred from Springboot";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity( fileService.doStar(file),HttpStatus.OK);
    }

    @PostMapping(path = "/doUnStar", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> doUnStar(@RequestBody String file) {
          JSONObject jsonObject = new JSONObject(file);
        //----------------------------------SAVE USER ACTIVITY FOR UNSTAR DIRECTORY--------------------------------------
        try {
            System.out.println("User Activity For Do UNStar File");
            JSONObject requestBody = new JSONObject(file);
            String activityName = "FileUNStarred from Springboot";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return new ResponseEntity(fileService.doUnStar(jsonObject.getInt("userid"),jsonObject.getString("fileName")), HttpStatus.CREATED);
    }


    @PostMapping(path = "/getStarredFiles", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getStarredFiles(@RequestBody String file) {
        //JSONObject jsonObject = new JSONObject(file);
        System.out.println("In getStarredfiles" + file);

        JSONObject jsonObject = new JSONObject(file);
        return new ResponseEntity(fileService.getStarredFiles(jsonObject), HttpStatus.OK);
    }



    @PostMapping(path = "/getSharedFiles", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> shareFile(@RequestBody String file) {

        System.out.println("shareFile:" + file);

        JSONObject shareFileServiceReturnValues = fileService.shareFile(file);

        //----------------------------------SAVE USER ACTIVITY FOR FILE SHARING--------------------------------------
        try {
            System.out.println("User Activity For File Sharing");
            JSONObject requestBody = new JSONObject(file);
            String activityName = "FileShare";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return new ResponseEntity(shareFileServiceReturnValues.getString("message"), (HttpStatus) shareFileServiceReturnValues.get("httpStatus"));
    }

    /* @PostMapping(path = "/download", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> download(@RequestBody String user) throws IOException {


        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject);
        System.out.println(jsonObject.getString("userid"));
        System.out.println(jsonObject.getString("name"));

        File file = new File("/Users/rajvimodh/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/14"+ jsonObject.getString("name"));
        //InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return InputStreamResource;

    }*/

}