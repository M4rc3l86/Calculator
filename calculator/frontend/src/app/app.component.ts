import { Component, HostBinding, OnDestroy, inject } from "@angular/core";
import { ButtonComponent } from "./components/button/button.component";
import { FormsModule } from "@angular/forms";
import { CalculatorService } from "./services/calculator/calculator.service";
import { Subscription } from "rxjs";

@Component({
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  selector: "calc-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnDestroy {
  calcSub: Subscription = new Subscription();
  @HostBinding("class") class = "w-8rem block";
  protected display = "0";

  protected buttonLabels = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ",",
    "=",
    "+",
  ];

  #calculatorService = inject(CalculatorService);
  #first = 0;
  #second = 0;
  #operand = "";

  onButtonClick(input: string): void {
    if (this.#isDigit(input)) {
      this.#handleDigit(input);
    } else if (this.#isOperand(input)) {
      this.#handleOperand(input);
    } else if (this.#isEquals(input)) {
      this.#handleEquals();
    } else if (this.#isComma(input)) {
      this.#handleComma();
    }
  }

  #isDigit(input: string): boolean {
    return input >= "0" && input <= "9";
  }

  #isOperand(input: string): boolean {
    return input === "+" || input === "-" || input === "*" || input === "/";
  }

  #isEquals(input: string): boolean {
    return input === "=";
  }

  #isComma(input: string): boolean {
    return input === ",";
  }

  #handleDigit(input: string): void {
    if (this.#operand === "") {
      if (this.display.includes(".")) {
        this.#first = Number(this.display + input);
      } else {
        this.#first = this.#first * 10 + Number(input);
      }
      this.display = this.#first.toString();
    } else {
      if (this.#second === 0 && this.display.includes(".")) {
        this.#second = this.#second * 10 + Number(input);
      } else if (this.display.includes(".")) {
        this.#second = Number(this.display + input);
      } else {
        this.#second = this.#second * 10 + Number(input);
      }
      this.display = this.#second.toString();
    }
  }

  #handleOperand(input: string): void {
    this.#operand = input;
  }

  #handleEquals(): void {
    let result = 0;

    this.calcSub = this.#calculatorService
      .calculate(this.#operand, this.#first, this.#second)
      .subscribe((value) => {
        result = value;
      });

    this.display = result.toString();
    this.#first = result;
    this.#second = 0;
    this.#operand = "";
  }

  #handleComma(): void {
    if (this.#operand === "") {
      this.display = this.#first.toString() + ".";
      console.log(this.#first);
    } else {
      this.display = this.#second.toString() + ".";

      console.log(this.#second);
    }
  }

  ngOnDestroy(): void {
    this.calcSub.unsubscribe();
  }
}
