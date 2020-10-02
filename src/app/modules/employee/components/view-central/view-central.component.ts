import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalSignOutComponent } from 'src/app/modules/core/components/modal-sign-out/modal-sign-out.component';

@Component({
  selector: 'app-view-central',
  templateUrl: './view-central.component.html',
  styleUrls: ['./view-central.component.css'],
})
export class ViewCentralComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public user$: Observable<any> = this.authServices.afAuth.user;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private authServices: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  onSignOut(){
    const dialogRef = this.dialog.open(ModalSignOutComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.logout();
      }
    });
  }
  logout() {
    try {
      this.authServices.logout();
      this.router.navigate(['/']);
    } catch (ex) {
      this.toastr.warning('Ocurrió un problema al cerrar sesión','Advertencia');
    }
  }
  showManageClient(){
    this.router.navigate(['manage-clients'], { relativeTo: this.route });
  }
  showManageRepair(){
    this.router.navigate(['manage-repairs'], { relativeTo: this.route });
  }
}
