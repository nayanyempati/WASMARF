import { Injectable } from '@angular/core';
import { OpencopsDrawerComponent } from '@opencops/components/drawer/drawer.component';

@Injectable({providedIn: 'root'})
export class OpencopsDrawerService
{
    private _componentRegistry: Map<string, OpencopsDrawerComponent> = new Map<string, OpencopsDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: OpencopsDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): OpencopsDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
