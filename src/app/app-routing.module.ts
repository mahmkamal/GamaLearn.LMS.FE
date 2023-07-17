import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'book',
    loadChildren: () =>
      import('./book/book.module').then((m) => m.BookModule),
  },
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: '*', redirectTo: 'book', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
