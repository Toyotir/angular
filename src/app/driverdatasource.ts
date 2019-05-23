import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable,BehaviorSubject,of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Driver,DriverService} from "./driver.service"


export class DriverDataSource extends DataSource<Driver>{
    // private driversSubject = new BehaviorSubject<Driver[]>([]);

    // private loadingSubject = new BehaviorSubject<boolean>(false);

    // public loading$ = this.loadingSubject.asObservable();

    constructor(private driverService:DriverService){
        super()
    }

    public refresh(){
        console.log("refresh datasoruce")
        // return this.driverService.getAll()
    }

    connect():Observable<Driver[]>{
        console.log("conect")
        this.driverService.dataChange
        // return this.driverService.getAll()
        return 
    }

    disconnect(){}
}