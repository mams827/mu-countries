import {ActivatedRouteSnapshot, DetachedRouteHandle, BaseRouteReuseStrategy} from '@angular/router';

export class AppRouteReuseStrategy implements BaseRouteReuseStrategy {

    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}

    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
        return null;
    }

    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return (future.routeConfig === curr.routeConfig) && !future.data.reuseComponent;
    }

}
