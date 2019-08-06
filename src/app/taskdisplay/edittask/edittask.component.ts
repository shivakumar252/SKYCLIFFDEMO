import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskdataService  } from '../taskdata.service';
import { Task } from '../task';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  Id: number;
  Title: string = "";
  Status: string = "";

  constructor(
    private _act: ActivatedRoute,
    private _data: TaskdataService
  ) { }

  ngOnInit() {
    this.Id = this._act.snapshot.params["Id"];

    this._data.getTaskById(this.Id).subscribe(
      (data: Task[]) => {
        this.Id=data[0].Id;
        this.Title=data[0].Title;
        this.Status=data[0].Status;
    });
  }
  onEditTask(f){
    this._data.editTask( f.value).subscribe(
      (data:any)=>{
        alert('updated');

      }
    );
      }
    }
