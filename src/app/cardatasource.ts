import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable,BehaviorSubject,of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Car,CarService} from "./car.service"


export class CarDataSource extends DataSource<Car>{
    // private driversSubject = new BehaviorSubject<Driver[]>([]);

    // private loadingSubject = new BehaviorSubject<boolean>(false);

    // public loading$ = this.loadingSubject.asObservable();

    constructor(private carService:CarService){
        super()
    }

    public refresh(){
        console.log("refresh datasoruce")
        return this.carService.getAll()
    }

    connect():Observable<Car[]>{
        console.log("conect")
        // this.carService.dataChange
        return this.carService.getAll()
    }

    disconnect(){}
}