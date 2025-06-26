import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { haveTalentsAtom, registerFormAtom, wantTalentsAtom } from '../../atoms/registerAtoms';
import { useRegisterMutation } from './useRegisterMutation';

export const useRegisterFlow = () => {
  const [formData] = useAtom(registerFormAtom);
  const [, setHaveTalents] = useAtom(haveTalentsAtom);
  const [, setWantTalents] = useAtom(wantTalentsAtom);
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const proceedToProfile = () => {
    navigate('/profile');
  };

  const proceedToTalentRegistration = () => {
    navigate('/profile/register-talent');
  };

  const proceedToLearningTalentRegistration = (haveTalents: string[]) => {
    setHaveTalents(haveTalents);
    navigate('/profile/register-learning-talent');
  };

  const completeRegistration = (wantTalents: string[]) => {
    setWantTalents(wantTalents);
    registerMutation.mutate(formData);
  };

  return {
    formData,
    proceedToProfile,
    proceedToTalentRegistration,
    proceedToLearningTalentRegistration,
    completeRegistration,
    isLoading: registerMutation.isPending
  };
};