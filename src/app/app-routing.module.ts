import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterBrowserComponent } from './character-browser/character-browser.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [
  { path: '', component: CharacterBrowserComponent },
  { path: 'character/:id', component: CharacterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
