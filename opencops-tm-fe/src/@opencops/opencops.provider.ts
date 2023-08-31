import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, importProvidersFrom, inject, Provider } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { OpencopsConfig } from '@opencops/services/config';
import { OPENCOPS_CONFIG } from '@opencops/services/config/config.constants';
import { OpencopsConfirmationService } from '@opencops/services/confirmation';
import { opencopsLoadingInterceptor, OpencopsLoadingService } from '@opencops/services/loading';
import { OpencopsMediaWatcherService } from '@opencops/services/media-watcher';
import { OpencopsPlatformService } from '@opencops/services/platform';
import { OpencopsSplashScreenService } from '@opencops/services/splash-screen';
import { OpencopsUtilsService } from '@opencops/services/utils';
import { OPENCOPS_MOCK_API_DEFAULT_DELAY } from './lib/mock-api/client-api.constants';
import { mockApiInterceptor } from './lib/mock-api/client-api.interceptor';
import { getSaver, SAVER } from 'app/class/saver.service';
import { ReportService } from 'app/server-api/report/report.service';

export type OpencopsProviderConfig = {
    mockApi?: {
        delay?: number;
        services?: any[];
    },
    opencops?: OpencopsConfig
}

/**
 * Opencops provider
 */
export const provideOpencops = (config: OpencopsProviderConfig): Array<Provider | EnvironmentProviders> => {
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: OPENCOPS_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide: OPENCOPS_CONFIG,
            useValue: config?.opencops ?? {},
        },

        importProvidersFrom(MatDialogModule),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsConfirmationService),
            multi: true,
        },

        provideHttpClient(withInterceptors([opencopsLoadingInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsLoadingService),
            multi: true,
        },

        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsMediaWatcherService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsPlatformService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsSplashScreenService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(OpencopsUtilsService),
            multi: true,
        },
        {
            provide: SAVER,
            useFactory: getSaver,
        },
    ];

    // Mock Api services
    if (config?.mockApi?.services) {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            {
                provide: APP_INITIALIZER,
                deps: [...config.mockApi.services],
                useFactory: () => (): any => null,
                multi: true,
            },
        );
    }

    // Return the providers
    return providers;
};
