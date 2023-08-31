import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OpencopsConfirmationConfig } from '@opencops/services/confirmation/confirmation.types';
import { OpencopsConfirmationDialogComponent } from '@opencops/services/confirmation/dialog/dialog.component';
import { merge } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class OpencopsConfirmationService
{
    private _matDialog: MatDialog = inject(MatDialog);
    private _defaultConfig: OpencopsConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel : {
                show : true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: OpencopsConfirmationConfig = {}): MatDialogRef<OpencopsConfirmationDialogComponent>
    {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(OpencopsConfirmationDialogComponent, {
            autoFocus   : false,
            disableClose: !userConfig.dismissible,
            data        : userConfig,
            panelClass  : 'opencops-confirmation-dialog-panel',
        });
    }
}
