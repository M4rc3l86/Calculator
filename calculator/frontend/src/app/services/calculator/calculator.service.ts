import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  #http: HttpClient = inject(HttpClient);

  calculate(
    operand: string,
    first: number,
    second: number
  ): Observable<number> {
    return this.#http.post<number>("http://localhost:3000/calculate", {
      operand,
      first,
      second,
    });
  }
}
