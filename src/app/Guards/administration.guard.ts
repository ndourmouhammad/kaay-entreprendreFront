import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Role } from "../Models/roles.model";

interface User {
    roles: Role[];
}

export const administrationGuard: CanActivateFn = () => {
    const router = inject(Router);
    let user: User = {roles: []};

    try {
        const userString = localStorage.getItem('user');
        user = userString ? JSON.parse(userString) : {roles: []};
    } catch (error) {
        console.error(error);
        user = {roles: []};
    }

    console.log('User Data: ', user);
    console.log('User Roles: ', user.roles);

    if (user && user.roles && user.roles.some((role: Role) => role.name === 'admin')) {
        console.log('User is admin');
        return true;
    } else {
        console.log('User is not admin');
        router.navigate(['login']);
        return false;
    }

}