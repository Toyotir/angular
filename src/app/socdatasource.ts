import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable,BehaviorSubject,of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {SocietyService , Society} from "./society.service";



export class SocDataSource extends DataSource<any> {

    public societiesSubject:BehaviorSubject<Society[]> = new BehaviorSubject<Society[]>([]);

    public loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private societiesService: SocietyService) {
        super();
        this.loading$        
    }
    public refresh(){
        this.societiesSubject
    }

    // public loadSocieties(
    //             filter:string,
    //             sortDirection:string,
    //             pageIndex:number,
    //             pageSize:number) {
    //                 console.log("Connecting lsoc");
    //     this.loadingSubject.next(true);
    //                 console.log(filter,
    //                     sortDirection,
    //                     pageIndex,
    //                     pageSize)
    //     this.societiesService.findSocieties(filter, sortDirection,
    //         pageIndex, pageSize).pipe(
    //             catchError(() => of([])),
    //             finalize(() => this.loadingSubject.next(false))
    //         )
    //         .subscribe(societies => this.societiesSubject.next(societies));

    // }

    connect(): Observable<Society[]> {
        console.log("Connecting data source");
        return this.societiesService.getAll();
    }

    public disconnect() {
        console.log("disConnecting data source");
        return this.societiesService.getAll();
    }

}