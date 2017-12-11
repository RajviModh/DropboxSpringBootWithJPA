import React, {Component} from 'react';
import * as API from '../api/API';

import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';
import FileDownload from 'react-file-download';
import {Modal} from 'react-bootstrap';
import sidebar from '../images/sidebar.png';
import cat from '../images/cat.png';

var logout={float:'right', position:'fixed', top:30, right:240, color:"grey"};
var profile={float:'right', position:'fixed', top:90, right:240, color:"grey"};
var upload={float:'right', position:'fixed', top:150, right:10, color:"grey"};
var uploadbutton={float:'right', position:'fixed', top:190, right:205, color:"grey"};
var useractivity={float:'right', position:'fixed', top:240, right:200, color:"grey"};
var tablestyle={textAlign:'left'};
//var profile={float:'right', position:'fixed', top:50, right:100};
var starredfiles={paddingLeft:'15px',paddingTop:'5px', textAlign:'left'};
var body={paddingLeft:'15px',paddingTop:'15px', textAlign:'left'};
var home ={paddingLeft:'15px', textAlign:'left', color:"grey"};


class Welcome extends Component {


    static propTypes = {
        username: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    state = {
        username : '',
        root:'',
        userId:'',
        rootDir:'',
        size:'',
        type:'',
        filename :'',
        userActivityList:[],
        starredlist:[],
        isStarFlag:'',
        recipientEmail:'',
        directoryName : '',
        lastModifiedDate:'',
        data_uri:'',
        filearray:[],
        path1:[],
        isSelfCall:false,
        showModal: false
    };


    componentWillMount() {
        var root = localStorage.getItem("root");
        var userid = localStorage.getItem("userid");
        var username = localStorage.getItem("username");
        this.setState({
            username: username,
            root:root,
            userid:userid
        });
       // alert("in will mount --" +root);
        this.getDirectories(root);
        this.getStarredFiles(userid);
        document.title = `Welcome, ${this.state.username} !!`;
    }

    handleFileUpload = (event) => {

        const payload = new FormData();
        console.log("after payload init");
        var userid = localStorage.getItem("userid");
        payload.append('mypic', this.refs.mypic.files[0]);
        console.log('files:', this.refs.mypic.files);
        console.log("mypic:", this.refs.mypic.files[0]);
        console.log("after mypic append" , payload);
        // payload.append('userid',userid);

        //var payload = {'userid': userid}
        alert("in upload ----" + payload);

        API.doUpload(payload)
            .then((res) => {
                if (res.status === '501') {
                    localStorage.removeItem("token");
                    localStorage.removeItem("root");
                    this.props.history.push('/login');

                }
                else{
                    this.getDirectories(userid);
                }
            });
    };
    goBack = () =>{
        debugger;
        if(this.state.path1.length>1){
            this.getDirectories(this.state.path1[this.state.path1.length-2]);
            this.state.path1.splice(this.state.path1.length-2, 2);
        }else{
            this.getDirectories(this.state.root);
            this.state.path1.splice(this.state.path1.length-1, 1);
        }

    };
    createDirectory= (name) =>{
        var path = "";
        if(this.state.path1.length>0){
            path = (this.state.path1[this.state.path1.length-1]);
        }else{
            path = (this.state.root);
        }
        var payload = {'name':name, 'path': path};
       // alert("in create dir : "+JSON.stringify(payload));
        console.log("create directory data " +JSON.stringify(payload));
        API.doMakedirectory(payload)
            .then((res) => {
                console.log(res);
                //alert("in response create dir : "+JSON.stringify(res));
                if (res === undefined) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("root");
                    this.props.history.push('/login');

                }else{
                    alert(" in 201")
                    this.getDirectories(path);
                }
            });
    };

    getDirectories= (path) =>{
        var payload = {'path':path};
       // alert("-------------------get directories " +JSON.stringify(payload));
        API.getDirectories(payload)
            .then((res) => {
                alert("-------------------response get directories " +JSON.stringify(res));
                if (res) {
                    this.state.path1.push(path);
                    this.setState({
                        filearray: res,
                        isSelfCall: true
                    });
                }else if(res.status===''){
                    localStorage.removeItem("token");
                    localStorage.removeItem("root");
                }
            })
    };
    deleteDirectory= (name) =>{
       /* var path = "";
        if(this.state.path1.length>0){
            path = (this.state.path1[this.state.path1.length-1]);
        }else{
            path = (this.state.root);
        }*/
        var path = localStorage.getItem("userid");
        var payload = {'name':name, 'path': path};
        alert("delete directory data " +JSON.stringify(payload));
        API.deleteDirectory(payload)
            .then((res) => {
            alert("in response delete directory -------------- " + JSON.stringify(res));
                if (res.status === '501') {
                    localStorage.removeItem("token");
                    localStorage.removeItem("root");
                    this.props.history.push('/login');

                }else{
                    this.getDirectories(path);
                }
            });
    };


   download= (filepath,filename) =>{

        var data = {'path':filepath,'name':filename};
        alert("download data " + JSON.stringify(data));
        API.doDownload(data)
            .then((res) => {
                if(res.status === '201') {
                    FileDownload(res.file, filename);
                }
            })
    };

    dostarFile=(filename)=>{
        var userid = localStorage.getItem("userid");
        var payload = {'fileName':filename,'isStar':"true", 'userid' :userid};
        API.doStarFiles(payload)
            .then((status) => {
                alert(JSON.stringify("Star files welcome" + JSON.stringify(status)));
                if (status.status === '501') {
                    localStorage.removeItem("token");
                }else{
                    this.setState({
                        starFileName: status,
                    });
                }

            });
    };

    dounStarFile=(filename)=>{
        var userid = localStorage.getItem("userid");
        var payload = {'fileName':filename, 'isStar':false, "userid":userid};
        alert("----------- in  unstar" + JSON.stringify(payload));
        API.doUnStarFiles(payload)
            .then((status) => {
                alert("welcome unstar file " +JSON.stringify(status));
                if (status) {
                    this.setState({
                        starFileName: status,
                    });
                }
            });
    };

    getStarredFiles=(userid)=>{
        var payload={'userid':userid};
        API.getStarredFiles(payload)
            .then((res)=>{
                alert(JSON.stringify("back in getStarred files"+JSON.stringify(res)));
                if (res) {
                    alert("before set state -----  -- "+JSON.stringify(res) + "-----" + JSON.stringify(res[0].fileName));
                    this.setState({
                        starredlist: res,
                        isStarFlag:'true'
                    });


                }

            });
    };

    shareFile=(filename,recipientEmail)=>{
        var userid = localStorage.getItem("userid");
        var payload = {'path':userid,'name':filename, 'recipientEmail':recipientEmail};
        alert("in sharefile" +JSON.stringify(payload));
        API.doShareFiles(payload)
            .then((res) => {
                alert(JSON.stringify(res));
                if (res.status === '200') {
                    alert("File Shared"+JSON.stringify(res));
                }else{
                }

            });
    };

    render(){


        var filearray1 = [];
        if(this.state.filearray && this.state.filearray!=''){
            filearray1 = this.state.filearray;
        }
        var username = this.state.userid;

        var starredlist1 = [];

        starredlist1 = this.state.starredlist;

        console.log("-------------" + JSON.stringify(this.state.starredlist));




        return(

            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <img src={sidebar} height="715" width="300"/>
                       {/* <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#news">Files</a></li>
                            <li><a href="#contact">Paper</a></li>
                        </ul>*/}
                    </div>


                <div className="col-md-6">
                    <div style={home}>
                    <h4>Home</h4>
                    <hr/>

                    <button className="btn btn-primary" onClick={() => this.goBack()}>
                        back
                    </button>
                    &nbsp; &nbsp;
                    <input placeholder="Enter Directory Name"  type='text' onChange={(event) => {
                        const value=event.target.value;
                        this.setState({
                            filename: event.target.value
                        });
                    }}/>
                        &nbsp; &nbsp;
                    <button  className="btn btn-primary" onClick={() => this.createDirectory(this.state.filename)}>
                        Create Directory
                    </button>

                        <br/><br/>
                        Enter email address to SHARE File :
                        <input type="text"
                               label="email"
                               placeholder="Enter Email Address"
                               value={this.state.recipientEmail}
                               onChange={(event) => {
                                   this.setState({
                                       recipientEmail: event.target.value
                                   });
                               }}
                        />



                    </div>

                    <div style={starredfiles}>
                        <hr/>
                        <h4 style={{color:"grey"}}>Starred Files</h4>
                        <table> {starredlist1.map((files, i) =>
                            <tr key={i}>{
                                (   <div>

                                            <td> {files.fileName} </td>
                                            <td><input type="checkbox" name="files" onClick={() => this.dounStarFile(files.fileName)}/></td>

                                    </div>
                                )}</tr>
                        )}
                        </table>
                        <hr/>
                    </div>


                    <div style={body}>
                        <h4 style={{color:"grey"}}>Recent</h4>
                        <table style={tablestyle}>

                                {filearray1.map((file, i) =>
                                    <tr key={i} >
                                        <td>
                                        {file.isFolder==true ?
                                            (<button onClick={() => this.getDirectories(file.path)}>
                                                {file}
                                            </button>)
                                            :
                                            (<span>
                                        {file}
                                    </span>)}
                                        </td>
                                        &nbsp; &nbsp;

                                        <td><input type="checkbox" name="files" onClick={() => this.dostarFile(file)}/>Star</td>
                                        <td>

                                        </td><td><button className="btn btn-primary" onClick={()=>this.shareFile(file,this.state.recipientEmail)}>Share</button>
                                            {/*<Modal show={this.state.showModal}>
                                            <Modal.Body>
                                                <input type="text"
                                                       label="email"
                                                       placeholder="Enter Email Address"
                                                       value={this.state.recipientEmail}
                                                       onChange={(event) => {
                                                           this.setState({
                                                               recipientEmail: event.target.value
                                                           });
                                                       }}
                                                />
                                                <br/>
                                                <button className="btn btn-primary" onClick={()=>this.shareFile(file.path,file.name,this.state.recipientEmail)}>Share</button>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <div className="col-sm-5 col-md-5">
                                                    <button onClick={this.close}>Close</button>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
*/}



                                        </td>


                                        <td><button className="btn btn-primary" onClick={()=>this.download(file.path,file.name)}>Download</button></td>
                                        &nbsp; &nbsp;
                                        <td><button className="btn btn-primary" onClick={() => this.deleteDirectory(file)}>Delete</button></td>
                                    </tr>
                                )}


                        </table>


                    </div>
                </div>
                    <div className="col-md-3">
                       {this.state.username},!
                    <div style={logout}>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.props.handleLogout(this.state)}>
                            Logout
                        </button>
                    </div>
                        <div style={profile}>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    this.props.history.push("/profile");
                                }}>Profile</button>
                        </div>
                        <div style={upload}>
                            <input
                                type="file"
                                ref="mypic"
                                name="mypic"
                            />
                        </div>

                        <div style={uploadbutton}>
                            <button className="btn btn-primary" onClick={() => this.handleFileUpload()}>Upload files</button>
                        </div>
                        <div style={useractivity}>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.props.history.push("/userActivity");}}>
                            User Activity
                        </button>
                        </div>
                        <div style={{ marginTop:"400", marginRight:"100"}}>
                            <img src={cat} height="280" width="200"/>
                    </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Welcome);