import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.scss']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!: Observable<any[]>;
  inspectionTypeList: any = [];

  inspectionTypeMap:Map<number, string> = new Map();

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();
    this.refreshInspectionTypeMap();

  }

  modalTitle:string = '';
  activateAddEditInspectionComponent:boolean = false;
  inspection:any;

  modalAdd(){
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId: null
    }
    this.modalTitle = 'Add Inspection';
    this.activateAddEditInspectionComponent = true;

  }

  modalClose(){
    this.activateAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
  }

  modalEdit(item:any){
    this.inspection = item;
    this.modalTitle = "Edit Inspection";
    this.activateAddEditInspectionComponent = true;
  }

  modalDelete(item:any){
    if (confirm(`Are you sure you want to delete ${item.id}`)) {
      this.service.deleteInspection(item.id).subscribe(res => {
        var closeModal = document.getElementById('add-edit-modal-close');
        if(closeModal){
          closeModal.click();
        }
  
        var deleteSuccess = document.getElementById('delete-success-alert');
        if(deleteSuccess){
          deleteSuccess.style.display = 'block';
        }
        setTimeout(function() {
          if(deleteSuccess) deleteSuccess.style.display = 'none';
        }, 4000)
        this.inspectionList$ = this.service.getInspectionList();
      });
    }
  }

  refreshInspectionTypeMap(){
    this.service.getInspectionTypeList().subscribe(data => {
      this.inspectionTypeList = data;

      for (let i = 0; i < data.length; i++) {
        this.inspectionTypeMap.set(this.inspectionTypeList[i].id, this.inspectionTypeList[i].inspectionName);
        
      }
    });
  }

}
