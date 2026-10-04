import { router } from 'expo-router';

import { AffirmationForm } from '@/components/affirmation-form';
import { useAffirmations } from '@/context/affirmations-context';

export default function AddAffirmationScreen() {
  const { addAffirmation } = useAffirmations();

  return (
    <AffirmationForm
      submitLabel="Сохранить"
      onSubmit={async (title, text) => {
        await addAffirmation(title, text);
        router.dismissTo('/');
      }}
    />
  );
}
