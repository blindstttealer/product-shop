import { EmailConfirmation } from '@/features/auth/ui/authorization-menu/components/email-confirmation';
import { useAuthStore } from '@/providers/AuthProvider';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';

function EmailConfirmationPage() {
  const authStore = useAuthStore();
  const location = useLocation();

  console.log('authstore', authStore.authenticatedUser);
  console.log('location', location);

  const emailFromState = location.state?.email;

  const emailFromStore = authStore.authenticatedUser?.email;

  const emailToConfirm = emailFromState || emailFromStore;

  if (!emailToConfirm) {
    return <div>Email не найден. Пожалуйста, завершите регистрацию.</div>;
  }

  return <EmailConfirmation emailToConfirm={emailToConfirm} />;
}

export default observer(EmailConfirmationPage);
