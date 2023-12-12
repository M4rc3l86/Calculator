import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonType } from "../../types";

@Component({
  selector: "calc-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input({ required: true }) label!: string;
  @Output() buttonClicked = new EventEmitter<string>();
  @Input() type: ButtonType = "number";

  getTypeClass(): string {
    switch (this.type) {
      case "number":
        return "number";
      case "operator":
        return "operator";
      case "equal-sign":
        return "equal-sign operator";
      case "comma":
        return "comma";
      case "all-clear":
        return "all-clear";
    }
  }

  onButtonClicked(input: string) {
    this.buttonClicked.emit(input);
  }
}
