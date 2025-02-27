import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminFilter',
})
export class AdminFilterPipe implements PipeTransform {
  constructor() {
    //
  }
  transform<T extends { name: string }>(roles: T[]): T[] {
   
    return roles.filter((role) => 
        role.name === 'ADMIN' || 
        role.name === 'DOCTOR' || 
        role.name === 'ASISTENTE' || 
        role.name === 'ENFERMERA' || 
        role.name === 'PERSONAL' || 
        role.name === 'LABORATORIO' || 
        role.name === 'RECEPCION'
    );
  }
}
