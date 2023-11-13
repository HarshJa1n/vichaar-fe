// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { UserService } from './services/user.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent {
//   title = 'vichaar-jar';
//   userService = inject(UserService);
//   constructor() {
//     const user = this.userService.getUserFromStorage();
//     if (!user) {
//       const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
//       const randomName = `user_${randomNumber}`;
//       this.userService.createUser(randomName).subscribe((user) => {
//         console.log('user created', user);
//         this.userService.saveUserToStorage(user);
//       });
//     }
//   }
// }
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  animals,
} from 'unique-names-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class AppComponent {
  title = 'vichaar-jar';
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      const config: Config = {
        dictionaries: [adjectives, animals], // colors can be omitted here as not used
        length: 2,
        separator: '_',
      };
      const randomName = uniqueNamesGenerator(config);
      this.userService.createUser(randomName).subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }
}
