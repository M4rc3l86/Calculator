import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  #http: HttpClient = inject(HttpClient);

  calculate(operand: string, first: number, second: number): void {
    this.#http
      .post("http://localhost:3000/calculate", {
        operand,
        first,
        second,
      })
      .subscribe((response) => {
        console.log("Calculator Service", response);
      });
  }
}
