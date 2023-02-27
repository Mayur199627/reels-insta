import { Alert, LinearProgress } from '@mui/material';
import React, { Component } from 'react'
import {v4 as uuidv4} from 'uuid'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { storage, database } from './firebase';
import { addDoc } from 'firebase/firestore';

export default class VideoUpload extends Component {
    constructor(){
        super();
        const user = JSON.parse(localStorage.getItem("user"))
        this.state = {
            err : "",
            loading : '',
            user:user
        }
    }
    handleupload = (file) =>{
        if(file === undefined){
            this.setState({err:"please upload file"})
            setTimeout(()=>{
                this.setState({err:""})
            },2000)
        }
        if(file.size/(1024*1024)>100){
            this.setState({err:"file is too big"})
            setTimeout(()=>{
                this.setState({err:""})
            },2000)
        }

        
       const f1 = (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is "+ progress + " % done")
        }

       const f2 = (error) =>{
            this.setState({err:error,loading: false})
            setTimeout(()=>{
                this.setState({err:""})
            },2000)
        }

       const f3 = () =>{
        this.setState({loading: false})
        console.log("completed")
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            console.log(downloadUrl)

            let obj = {
                likes : [],
                commnts : [],
                pId : uid,
                pUrl : downloadUrl,
                uName : this.state.user.email,
                createdAt : Date.now()
            }
            addDoc(database.posts, obj).then((refrences) =>{
                console.log(refrences)
            })
        })
        }

        let uid = uuidv4()
        this.setState({loading:true})
        const uploadRef = ref(storage, `/posts/${uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(uploadRef, file);
        uploadTask.on('state_changed',f1,f2,f3);

        console.log(file)
    }
  
    render() {
    return (
        <div>
        {this.state.err && <Alert severity='error'>{this.state.err}</Alert>}
        <input type="file" accept='video/*' onChange={(e)=>{this.handleupload(e.target.files[0])}} />
        {this.state.loading && <LinearProgress />}
      </div>
    )
  }
}
