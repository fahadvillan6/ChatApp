import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../ApiRequests';
import { setAuth, setId, setName } from '../Store/AuthSlice';
import Toast from '../Shared/Toast';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('invalid email address')
      .required('email is required'),
    password: Yup.string().min(6, 'Must be 6 charecters').required('required'),
  });
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async () => {
      const body = formik.values;
      try {
        const { data } = await LoginApi(body);
        if (data.success) {
          dispatch(setAuth(true));
          dispatch(setName(data.Name));
          dispatch(setId(data.id));
          setTimeout(() => {
            navigate('/');
          }, 300);
        } else {
          toast.error('login failed');
        }
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
    },
  });

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://img.freepik.com/premium-vector/logo-talk-speak-speech-chat-bubble-icon-logo-sign-vector_8169-144.jpg?w=2000'
            alt='logo'
          />
          ChatApp
        </a>
        <Toast />
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-4 md:space-y-6'
              action='#'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
                <label className='text-red-600' htmlFor='name'>
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </label>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <label className='text-red-600' htmlFor='name'>
                  {formik.errors.Password &&
                    formik.touched.Password &&
                    formik.errors.Password}
                </label>
              </div>
              <div className='flex items-center '>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'></div>

                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Don’t have an account yet?{' '}
                    <a
                      href='/signup'
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
              <button
                disabled={formik.isSubmitting}
                type='submit'
                className='w-full text-black bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
