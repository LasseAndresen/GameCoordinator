import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

@Pipe({
  name: 'abstractControlFromForm',
  standalone: true
})
export class AbstractFormControlFromFormPipe implements PipeTransform {
  transform(eventForm: FormGroup, field: string): AbstractControl[] {
    return (eventForm.get(field) as FormArray).controls;
  }
}
