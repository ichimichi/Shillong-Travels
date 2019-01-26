import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/services/auth-status.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // loggedIn: boolean;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog,
    public authStatusService: AuthStatusService,
    private router: Router) {
    // this.loggedIn = this.authStatusService.isLoggedIn()
  }

  openDialog(): void {
    if (!this.authStatusService.isLoggedIn()) {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else {
      this.router.navigate(['/search']);
    }
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

