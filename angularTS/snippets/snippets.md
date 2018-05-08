

### Angular + ASP.NET Core
* Use Angular/ASP.NET Seed project
* `dotnet --new --install Microsoft.AspNetCore.Spatemplates::*
* `ng new [myproj] -sd wwwroot -dir .

### Promise vs Observable

Promise - returns a sign value

Observable - can return multiple values over time (think of an array into the future)

Promise - cannot cancel
Observable - Supports standard array function (map,filter, reduce, etc.)

### Services

```typescript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable
export class DataService {
    
    constructor(private http : Http) {}
}
```
##### RESTful call using Observable
```typescript
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable
export class DataService {
    constructor(private http: Http) {}

    getCustomers : Observable<Customer[]> {
        return this.get('api/customers')
                    .map((response: Respons) => response.json())
                    .catch(this.handleError);
    }

}

```


##### Inject a Service into a Component
```typescript
import { DataService } from '../shared/data.service';

// class decorator aka annotation
@Component({
    ...
})
export class CustomerComponent implements OnInit {
    customers: Customer[];
    constructor(private dataService: DataService) {}
    ngOnit() {
        this.dataService.getCustomers()
                .subscribe((customers: Customer[]) => {
                    this.customers = customers;
                });
    }
}
```



Sources

https://www.youtube.com/watch?v=Cme3PMqsUUc&t=3121s&list=PLFhmCW-N2VG5GZ1VzeeR65xSu9v-UdSG9&index=4

https://blog.codewithdan.com/2017/02/08/10-angular-and-typescript-projects-to-take-you-from-zero-to-hero/