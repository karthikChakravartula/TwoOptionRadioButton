import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TwoOptionsRadio implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container!: HTMLDivElement;
  private _notifyOutputChanged!: () => void;

  private _value: boolean | null = null;

  private _radioTrue!: HTMLInputElement;
  private _radioFalse!: HTMLInputElement;
  private _labelTrue!: HTMLLabelElement;
  private _labelFalse!: HTMLLabelElement;

  private _groupName = `twooptions_${Math.random()}`;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;

    // Root
    const root = document.createElement("div");
    root.className = "twooptions-radio-root";

    // TRUE option
    const optTrue = document.createElement("div");
    optTrue.className = "twooptions-radio-option";

    this._radioTrue = document.createElement("input");
    this._radioTrue.type = "radio";
    this._radioTrue.name = this._groupName;
    this._radioTrue.value = "true";
    this._radioTrue.id = `${this._groupName}_true`;

    this._labelTrue = document.createElement("label");
    this._labelTrue.htmlFor = this._radioTrue.id;

    optTrue.appendChild(this._radioTrue);
    optTrue.appendChild(this._labelTrue);

    // FALSE option
    const optFalse = document.createElement("div");
    optFalse.className = "twooptions-radio-option";

    this._radioFalse = document.createElement("input");
    this._radioFalse.type = "radio";
    this._radioFalse.name = this._groupName;
    this._radioFalse.value = "false";
    this._radioFalse.id = `${this._groupName}_false`;

    this._labelFalse = document.createElement("label");
    this._labelFalse.htmlFor = this._radioFalse.id;

    optFalse.appendChild(this._radioFalse);
    optFalse.appendChild(this._labelFalse);

    root.appendChild(optTrue);
    root.appendChild(optFalse);
    this._container.appendChild(root);

    // Events
    this._radioTrue.addEventListener("change", () => {
      if (this._radioTrue.checked) {
        this._value = true;
        this._notifyOutputChanged();
      }
    });

    this._radioFalse.addEventListener("change", () => {
      if (this._radioFalse.checked) {
        this._value = false;
        this._notifyOutputChanged();
      }
    });

    // First render
    this.updateView(context);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Bound value (TwoOptions) can be null when empty/not ready
    const raw = context.parameters.value.raw;
    this._value = raw === undefined ? null : raw;

    const trueText = context.parameters.trueLabel.raw || "Yes";
    const falseText = context.parameters.falseLabel.raw || "No";
    this._labelTrue.textContent = trueText;
    this._labelFalse.textContent = falseText;

    this._radioTrue.checked = this._value === true;
    this._radioFalse.checked = this._value === false;

    const disabled = context.mode.isControlDisabled;
    this._radioTrue.disabled = disabled;
    this._radioFalse.disabled = disabled;
  }

  public getOutputs(): IOutputs {
    // If null, return undefined (don’t overwrite). If you want to CLEAR the field, handle that explicitly.
    if (this._value === null) return {};
    return { value: this._value };
    //return {};
  }

  public destroy(): void {
    // Clean up if needed (listeners etc.)
  }
}
