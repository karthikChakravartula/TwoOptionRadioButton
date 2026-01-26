# Two Options Radio Button PCF Control (Dynamics 365 / Dataverse)

A Power Apps Component Framework (PCF) **field control** that renders a Dataverse **Two Options (Yes/No)** column as **radio buttons** for model-driven apps (Dynamics 365).

This repository also includes **both Managed and Unmanaged solution ZIPs** under the `Solutions/` folder for easy deployment.

---

## Features

- ✅ Renders a **Two Options** (Yes/No) field as **radio buttons**
- ✅ Optional configurable labels:
  - `trueLabel` (defaults to **Yes**)
  - `falseLabel` (defaults to **No**)
- ✅ **Untouched behavior**: if the user does **not** interact with the control, the PCF returns `{}` in `getOutputs()` so the control itself **does not write** a value.

> Note: Dataverse/business rules/plugins/defaults can still set the field on save. This control only ensures it **won’t set the value unless the user changes it**.

---

## Repository Structure

```
<repo-root>/
  pcf/
    TwoOptionsRadio/                 # PCF source (ControlManifest.Input.xml, index.ts, package.json, etc.)
  Solutions/
    KC_PCFRadioButtonControl/        # Solution artifacts
      Managed/
        KC_PCFRadioButtonControl_managed.zip
      Unmanaged/
        KC_PCFRadioButtonControl_unmanaged.zip
```

✅ **Managed and Unmanaged solution ZIPs are included inside the `Solutions/` folder**.

---

## Control Configuration

### Bound Property (Two Options)
| Property | Type       | Usage  | Description |
|---------:|------------|--------|-------------|
| `value`  | TwoOptions | bound  | Binds to a Dataverse Two Options (Yes/No) column |

### Optional Input Properties
| Property     | Type            | Default | Description |
|--------------|-----------------|---------|-------------|
| `trueLabel`  | SingleLine.Text | `Yes`   | Label shown for the **True** option |
| `falseLabel` | SingleLine.Text | `No`    | Label shown for the **False** option |

---

## Deployment (Recommended)

### Dev (Unmanaged)
1. Go to **Power Apps → Solutions → Import**
2. Import:
   - `Solutions/KC_PCFRadioButtonControl/Unmanaged/KC_PCFRadioButtonControl_unmanaged.zip`

### Test/UAT/Prod (Managed)
1. Go to **Power Apps → Solutions → Import**
2. Import:
   - `Solutions/KC_PCFRadioButtonControl/Managed/KC_PCFRadioButtonControl_managed.zip`

---

## Add the Control to a Two Options Field

1. Open your **Model-driven app form** in the designer
2. Select the **Two Options** field on the form
3. Go to **Controls** tab → **Add Control**
4. Select **Two Options Radio Button PCF**
5. (Optional) Set `trueLabel` / `falseLabel`
6. Save and Publish

---

## Developer Setup (VS Code)

### Prerequisites
- Node.js (LTS)
- Power Platform CLI (`pac`)

### Build
From the PCF project folder (where `package.json` exists):

```powershell
npm install
npm run build
```

### Local Test Harness (Optional)
```powershell
npm start watch
```

---

## Push to Dataverse (Unmanaged Dev)

1. Authenticate to your environment:
```powershell
pac auth create --url https://<yourorg>.crm.dynamics.com
pac auth select --index <n>
```

2. Confirm the solution unique name:
```powershell
pac solution list
```

3. Push the control into the solution:
```powershell
pac pcf push --solution-unique-name KC_PCFRadioButtonControl
```

> Important: `--solution-unique-name` must match the **solution unique name** in the target environment.

---

## Export Solutions (If you want to regenerate ZIPs)

Export **Unmanaged**:
```powershell
pac solution export --name KC_PCFRadioButtonControl --path .\Solutions\KC_PCFRadioButtonControl\Unmanaged\KC_PCFRadioButtonControl_unmanaged.zip
```

Export **Managed**:
```powershell
pac solution export --name KC_PCFRadioButtonControl --managed --path .\Solutions\KC_PCFRadioButtonControl\Managed\KC_PCFRadioButtonControl_managed.zip
```

---

## Important Notes / Constraints

- **PCF constructor name rule**: the `constructor` in `ControlManifest.Input.xml` must be **alphanumeric only** (no underscores/hyphens/spaces).
- **“Blank until chosen”**: Two Options is boolean semantics; the control can appear blank when the underlying value is null/undefined and it will not write unless changed, but platform defaults or business rules may still set a value on save.

---

## Support

If the control does not appear in the form designer:
- Ensure the solution import succeeded
- Ensure the control is added to the correct field type (**Two Options**)
- Publish all customizations
- Hard refresh the browser (Ctrl+F5)

---
