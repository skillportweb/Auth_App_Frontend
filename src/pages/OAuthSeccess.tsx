import useAuth from '@/auth/store';
import { Spinner } from '@/components/ui/spinner';
import { refreshToken } from '@/services/AuthServices';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const OAuthSeccess = () => {
  const changeLocalLoginData = useAuth(
    (state) => state.changeLocalLoginData
  );
  const navigate = useNavigate()

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const responseLoginData = await refreshToken();

        changeLocalLoginData(
          responseLoginData.accessToken,
          responseLoginData.user,
          true
        );

        toast.success('Login success !!');
        navigate("/dashboard")
      } catch (error) {
        toast.error('Error while login !!');
        console.log(error);
      }
    };

    getAccessToken();
  }, [changeLocalLoginData]);

  return (
    <div className="p-10 flex flex-col gap-3 justify-center items-center">
      <Spinner />
      <h1 className="text-sm font-semibold">
        Please wait ....
      </h1>
    </div>
  );
};

export default OAuthSeccess;