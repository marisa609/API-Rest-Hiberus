import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
/*   cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Nombres más populares', 
            cols: 1, 
            rows: 1 },
          { title: 'Histograma de la longitud de los password', cols: 1, rows: 1 },
     
        ];
      }

      return [
        { title: 'Nombres más populares', cols: 2, rows: 1 },
        { title: 'Histograma de la longitud de los password', cols: 1, rows: 1 },
      
      ];
    })
  ); */

  fotoHiberusLogoEquipo:string = "assets/LogoEquipo.png";

  constructor(private breakpointObserver: BreakpointObserver) {}
}
