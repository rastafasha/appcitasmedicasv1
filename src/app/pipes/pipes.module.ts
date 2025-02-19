import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminFilterPipe } from './admin-filter.pipe';

const components = [
  AdminFilterPipe
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule],
})
export class PipesModule {}
