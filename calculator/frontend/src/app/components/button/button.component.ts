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

  #typeClassMap = {
    number: "number",
    operator: "operator",
    "equal-sign": "equal-sign operator",
    comma: "comma",
    "all-clear": "all-clear",
  };

  getTypeClass(): string {
    return this.#typeClassMap[this.type];
  }

  onButtonClicked(input: string) {
    this.buttonClicked.emit(input);
  }
}
