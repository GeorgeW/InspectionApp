import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.scss']
})
export class AddEditInspectionComponent implements OnInit {

  inspectionLists$!:Observable<any[]>;
  statusList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;

  constructor(private service:InspectionApiService) { }


  @Input() inspection:any;
  id:number = 0;
  status:string = "";
  comments:string = "";
  inspectionTypeId!:number;

  ngOnInit(): void {
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusList();
    this.inspectionLists$ = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();

  }

  addInspection(){
    var inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    };
    this.service.addInspection(inspection).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-close');
      if(closeModal){
        closeModal.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function() {
        if(showAddSuccess) showAddSuccess.style.display = 'none';
      }, 4000)
    });
  }
  updateInspection(){
    var inspection = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    };

    var id:number = this.id;

    this.service.updateInspection(id, inspection).subscribe(res => {
      var closeModal = document.getElementById('add-edit-modal-close');
      if(closeModal){
        closeModal.click();
      }

      var updateSuccess = document.getElementById('update-success-alert');
      if(updateSuccess){
        updateSuccess.style.display = 'block';
      }
      setTimeout(function() {
        if(updateSuccess) updateSuccess.style.display = 'none';
      }, 4000)
    });
  }


}
