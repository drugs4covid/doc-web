import { Component, NgIterable, OnInit, ViewChild } from '@angular/core';
import{ApiService} from '../../services/api/api.service';
import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatSidenav } from '@angular/material/sidenav';
import { Xtb } from '@angular/compiler';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent implements OnInit {
  foundindexes!:Array<Object>;
  allindex!: NgIterable<any>;
  public id: string="";
  index!: JSON;
  indexresult!:JSON;
  indexresult1!:any;
  indexresult2!:any;
  indexresult3!:any;
  indexNameInput!:string;
  public indexNameInput1: string="";
  public idinput: string="";
  public idinput1: string="";
  docinput!: JSON;
  docconverted!:any;
  componentToShow: String="allIndex";
  myUsername="";
  searchvar="";
  indexSelected="23";
  indexNameInputTodelete="";
  deleteResponse!:any;
  public file:any =[]
  indexSelectedTodeletedoc="23";
  docsname="";
  jsondoc!:any;
  _type="";
  _score="";
  _id="";
  _source
  jsondocmatch!:any;
  indexmapping="";
   
  constructor(
    public ApiService: ApiService,
    private observer: BreakpointObserver,
    private modalService: NgbModal
    ) {}
  ngOnInit() {
    //console.log("indexselected cambia a "+this.indexSelected)
    this.getallindex();
    this.myUsername=this.ApiService.getMyuser();
    
  }
  


  
  getallindex(){
    this.ApiService.getAllIndex().subscribe(data => {
      
      console.log(data)
      this.foundindexes = [];
      this.allindex=data;
      data.forEach((x)=>{this.foundindexes.push(x)});
      //this.foundindexes=Array.of(this.allindex)
      //console.log(this.allindex)
      //console.log(this.foundindexes)
     


    });
  }
  getIndex(){
    this.ApiService.getIndex(this.index,this.id).subscribe(data => {

        console.log(data)
        this.indexresult=data
    })
  }
  postindex(){
    this.ApiService.postIndex(this.indexNameInput1,this.idinput,this.docinput).subscribe(data => {

        console.log(data)
        this.indexresult1=data
        
    })
  }
  searchMatch(searchvar){
    this.searchvar=searchvar
    console.log("this.index selected is:",this.indexSelected)
    console.log("this.searchvar selected is:",searchvar)
    this.ApiService.searchMatch(this.indexSelected,searchvar).subscribe(data => {

      console.log("searchdata is : ",data)
      this.jsondocmatch=data['hits']['hits'] 
      for (var key in this.jsondocmatch) {
        console.log(this.jsondocmatch[key])
         
         this._id=this.jsondocmatch[key]['_id']
         this._type=this.jsondocmatch[key]['_type']
         this._score=this.jsondocmatch[key]['_score']
         this._source=this.jsondocmatch[key]['_source']['text']
         /*console.log("Jsonindex is "+this.jsondocmatch[key]['_index'])
         console.log("Jsonindex is "+this.jsondocmatch[key]['_type'])
         console.log("Jsonindex is "+this.jsondocmatch[key]['_score'])
         console.log("Jsonindex is "+this.jsondocmatch[key]['_id'])
         console.log("Jsonindex is "+this.jsondocmatch[key]['_source']['text'])
        */
 
         }

      
  })
  }
  getMapping(indexmapping){
    console.log(indexmapping)
    this.ApiService.getMapping(indexmapping).subscribe(data => {

      console.log(data)
      this.indexresult3=data
      
    })

  }
  files: File[] = [];
  changeindexselected(indexSelected){
   
    this.indexSelected=indexSelected
    console.log("indexselected is: "+indexSelected)
  }
  
  onSelectindex(indexSelected){
   
    this.indexNameInput1=indexSelected
    console.log("indexNameInput1 is: "+this.indexNameInput1)
    console.log("indexselected is: "+indexSelected)

    
  }
  changeindexselectedTodeleteDoc(indexSelectedTodeletedoc){
   
    this.indexSelectedTodeletedoc=indexSelectedTodeletedoc
    console.log("indexselectedto delete a doc is: "+this.indexSelectedTodeletedoc)
  }
  changeComponent(componentToShow) {
    console.log("componentToShow is "+componentToShow)
   
    this.componentToShow = componentToShow;
  }
  autochangeComponent(){
    //(click)="getuserdoc(item)" (click)="changeindexselected(item)"(click)="changeComponent(item)"
    console.log("estoy aqui!")
    
    
    this.changeComponent("")
    this.getuserdoc(this.indexSelected)
    this.componentToShow = this.indexSelected;
    this.changeComponent(this.componentToShow)
  }
  
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  captureFile(event):any{
    
    const filecaptured=event.target.files[0]
    this.file.push(filecaptured)
    console.log(event.target.files);
    var files = event.target.files;
    this.docsname= files [0].name
    console.log(this.docsname);

  }
  uploadFile(){//subir pdf 
    try{

      var formData: any = new FormData();
      
      
      this.file.forEach(element => {
      //console.log(element);
      formData.append("file",element)
      
      })
      
     
      this.ApiService.postpdf(formData,this.docsname,this.indexNameInput1,this.myUsername).subscribe(data => {

        console.log(data)
        this.indexresult2=data
        
      })
      

    }catch(e){
      console.log('ERROR',e)
    }

  }
   refreshPage(){
    window.location.reload();
} 
  deleteentireIndex(){
    console.log("DELETED")
    
    this.ApiService.deleteentireIndex(this.indexNameInputTodelete,).subscribe(data => {

        console.log(data)
        this.deleteResponse=data
        
    })
  }
  deletedoc(){
    this.indexNameInputTodelete=this.indexSelected
    console.log("DELETED")
    console.log(this.indexNameInputTodelete)
    console.log(this._id)
    this.ApiService.deletedoc(this.indexNameInputTodelete,this._id).subscribe(data => {
        
        this.deleteResponse=data
        
    })
  }
  clickMethod() {
    if(confirm("Are you sure to delete "+this.indexNameInputTodelete)) {this.deleteentireIndex()
      
    }
  }
  clickMethodfordoc() {
    if(confirm("Are you sure to delete "+this.docinput)) {this.deletedoc()
      
    }
  }
  getuserdoc(indexSelected){
    console.log("abogadoo");
    this.ApiService.getdocs(indexSelected).subscribe(data => {
    
   
    this.jsondoc=data['hits']['hits']
    console.log("jsondocis:",this.jsondoc);
      
     
      for (var key in this.jsondoc) {
       console.log(this.jsondoc[key])
        
        this._id=this.jsondoc[key]['_id']
        this._type=this.jsondoc[key]['_type']
        this._score=this.jsondoc[key]['_score']
        this._source=this.jsondoc[key]['_source']['text']
        /*console.log("Jsonindex is "+this.jsondoc[key]['_index'])
        console.log("Jsonindex is "+this.jsondoc[key]['_type'])
        console.log("Jsonindex is "+this.jsondoc[key]['_score'])
        console.log("Jsonindex is "+this.jsondoc[key]['_id'])
        console.log("Jsonindex is "+this.jsondoc[key]['_source']['text'])
       */

        }
  })
  }
  
 ondocSelected(selectedDoc){
  
  this._source=selectedDoc['_source']['text']
  this._id=selectedDoc['_id']
  console.log("delectedDoc is: ",selectedDoc['_id'])
  console.log("this._id is: ",this._id)
  //console.log("_source is: ",this._source)
 }
 changeindexselectedintoIndex(indexSelected){
   
  this.indexSelected=indexSelected['_index']
  console.log("indexselected is: "+indexSelected)
}


  closeResult: string = '';
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  logOut(){

      this.ApiService.logOut()
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
}