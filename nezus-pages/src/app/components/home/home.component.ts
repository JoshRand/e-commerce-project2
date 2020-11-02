import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
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
  profilePic:string = "../../../assets/";
  selectedFile:Blob;
  src:string;
  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data=>{
      this.user = data[0];
      localStorage.setItem("user",JSON.stringify(data[0]));
      console.log(this.user);
     
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
   
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.name = localStorage.getItem("userName");
    
    // this.userService.getUser().subscribe(data=>{
    //   this.user = data[0];
    //  // localStorage.setItem("user",JSON.parse(data[0]))
    //   console.log(this.user);
    // })
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onToggleUpdate()
  {
    this.updateFlag = !this.updateFlag;
  }

  saveFile()
  {
    console.log(this.selectedFile);
    
    var fileToSave = new Blob([this.selectedFile],{type: this.selectedFile.type});
    console.log(fileToSave);
    //fs.writeFile(this.profilePic, fileToSave);
    this.userService.savePicture(fileToSave).subscribe(data=>{
      
    })
    // FileSaver.saveAs(fileToSave,""+this.profilePic+"profilePic_"+this.user.userId+".jpg");
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
