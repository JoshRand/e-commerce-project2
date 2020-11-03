import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User = JSON.parse(localStorage.getItem("user"));
  name:string = localStorage.getItem("userName");
  pass:string;
  toggleShowDetails: boolean = false;
  updateFlag:boolean = false;
  public homeForm: FormGroup;
  public pictureForm: FormGroup;
  userId:string;
  userName:string;
  password:string;
  profilePic:string;
  selectedFile:Blob;
  src:string;
  constructor(private userService: UserService, private fb: FormBuilder) {
   
 
    this.userService.getUser().subscribe(data=>{
      this.profilePic = data.profilePicture;
      this.user = data.user;
      console.log(data);
      localStorage.setItem("user",JSON.stringify(data));
      console.log(this.user);
      
      //this.profilePic=data.profilePicture;
     
    },
    err => {
      
    });
    
    //localStorage.clear();
    this.homeForm = new FormGroup({
      
      userId: new FormControl(this.user.userId),
      userName: new FormControl(this.user.userName),
      password: new FormControl(this.user.password),
      repassword: new FormControl(this.user.password),
      role: new FormControl(this.user.role)
    })
    this.pictureForm = this.fb.group({
      file: [null, Validators.required]
    });
   
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.name = localStorage.getItem("userName");
    this.profilePic = localStorage.getItem("profilePic");
    
  }
  onShowDetails()
  {
    this.toggleShowDetails = !this.toggleShowDetails;
  }

  onDelete()
  {
    console.log(this.user.userId);
    this.userService.deleteUser(this.user.userId).subscribe(data=>{
     
    },err=>{},()=>{ localStorage.clear();
      window.location.reload();
      localStorage.setItem("fb","Home");
      localStorage.setItem("sb","Contact");
      localStorage.setItem("tb","Register");
      
      console.log(localStorage.getItem("loggedin"));
      if(localStorage.getItem("loggedin")==="true")
      {
        localStorage.setItem("fob","logout");
      }
      else if(localStorage.getItem("loggedin")===null)
      {
        localStorage.setItem("fob","Login");
      }
      localStorage.setItem("fib","Users");
      //localStorage.clear();
      
      localStorage.setItem("pageCondition", "login");
      }
      
      )
   
  }

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      //this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.pictureForm.patchValue({
          file: reader.result
        });
      };
    }
  }
  onToggleUpdate()
  {
    this.updateFlag = !this.updateFlag;
  }

  saveFile()
  {
    // console.log(this.selectedFile);
    // console.log(this.pictureForm.get('file').value);
    this.userService.savePicture(this.pictureForm.get('file').value).subscribe(data=>{
      //console.log(data);
      localStorage.setItem('profilePic',data.picture);
      //console.log(localStorage.getItem('profilePic'));
      this.profilePic = data.picture;

    },err=>{

    },()=>{
      window.location.reload();
    })
   
  }
  
  onUpdate()
  {
    //this.profilePictureFile = this.homeForm.profilePictureFile;
    console.log(localStorage.getItem("token"));
    this.userService.updateUser(this.homeForm.value.userName,this.homeForm.value.password,this.homeForm.value.repassword).subscribe(data=>{
     
    });
    this.userService.getUser().subscribe(data=>{
      this.user = data[0];
      localStorage.setItem("user",JSON.stringify(data[0]));
      console.log(this.user);
    },
    err => {
    },
     () => {
       window.location.reload();
    });
// console.log(this.user);
    // this.homeForm.value.userId = this.user.userId;
    // this.homeForm.value.userName = this.user.userName;
    // this.homeForm.value.password = this.user.password;
    // this.homeForm.value.role = this.user.role;
   
  }

}
