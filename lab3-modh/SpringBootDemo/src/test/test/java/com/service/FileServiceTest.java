package com.service;

import com.AbstractTest;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.file.Paths;

@Transactional
public class FileServiceTest extends AbstractTest {

    @Autowired
    private FileService fileService;

    @Test
    public void testFileUpload() {
        int userid = 14;
        String fileName = "Forces.jpg";
        // String dynamicPathToUserFile = Paths.get("").toAbsolutePath().toString() + "/src/files/" + userid + "/" + fileName;
        Assert.assertEquals(HttpStatus.OK, fileService.fileUpload(Paths.get("").toAbsolutePath().toString() + "/src/files/" + userid + "/" + fileName));
    }

    @Test
    public void testMakeDirectory() {
        String directoryName = "rajvi";
        String path = Paths.get("").toAbsolutePath().toString();
        Assert.assertEquals(HttpStatus.OK, fileService.makeDirectory(directoryName, path));
    }

    @Test
    public void testDeleteDirectory() {
        String directoryName = "anu";
        String path = Paths.get("").toAbsolutePath().toString();
        Assert.assertEquals(HttpStatus.OK, fileService.makeDirectory(directoryName, path));
    }

    @Test
    public void testShareFile() {
        JSONObject fileData = new JSONObject();
        fileData.put("userid", 14);
        fileData.put("fileName", "OAG.jpg");
        fileData.put("recipientEmail", "rajvi.modh@sjsu.edu");
        JSONObject returnValues = fileService.shareFile(fileData.toString());
        Assert.assertEquals(HttpStatus.OK, returnValues.get("httpStatus"));
    }

    @Test
    public void testDelete() throws Exception {
        File file = new File("OAG.jpg");
        Assert.assertEquals(HttpStatus.OK, fileService.delete(file));
    }


}
