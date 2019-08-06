import { Component, OnInit } from '@angular/core';
import { TaskdataService }   from './taskdata.service';
import { Task }  from './task';
import { Router } from "@angular/router";
@Component({
  selector: 'app-taskdisplay',
  templateUrl: './taskdisplay.component.html',
  styleUrls: ['./taskdisplay.component.css']
})
export class TaskdisplayComponent implements OnInit {
  arr:Task[]=[];
  constructor(private _data:TaskdataService,private _router:Router) { }

  ngOnInit() {
    this._data.getAllTask().subscribe(
      (data:Task[])=>{
        this.arr=data;
      }
    );
  }
  onTaskDelete(item:Task){
    this._data.deleteTask(item.Id).subscribe(
      (data:any)=>{
        this.arr.splice(this.arr.indexOf(item),1);
        alert('deleted');
      }
    );
  }

  onTaskEdit(item:Task){
    this._router.navigate(['/editTask',item.Id]);
  }
  onSideBarClick(value) {
    if (value != "") {
      this.arr = this.arr.filter(x => x.Title.indexOf(value) != -1);
    } else {
      this._data.getAllTask().subscribe(
        (data: Task[]) => {
          this.arr = data;
        },
        function(error) {
          alert(error);
        },
        function() {}
      );
    }
  }
}

