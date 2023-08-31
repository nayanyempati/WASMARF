import { AuthMockApi } from 'app/client-api/common/auth/api';
import { MessagesMockApi } from 'app/client-api/common/messages/api';
import { NavigationMockApi } from 'app/client-api/common/navigation/api';
import { NotificationsMockApi } from 'app/client-api/common/notifications/api';
import { UserMockApi } from 'app/client-api/common/user/api';
import { IconsMockApi } from 'app/client-api/ui/icons/api';

export const clientApiServices = [
    AuthMockApi,
    IconsMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    UserMockApi,
];
