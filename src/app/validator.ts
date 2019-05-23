import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateTaxi(array:any=[]): ValidatorFn{
    console.log('jesuisla1',array)
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log('jesuisla2')
        array.forEach(element => {
            if (control.value == element.numTaxi) {
                console.log('ok',array)
                return { 'validate': true }
            }
        });
        return null
    };
}

