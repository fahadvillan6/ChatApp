import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { registerApi } from '../ApiRequests';

export default function SignupForm() {
  const validationSchema = Yup.object({
    Name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .min(4, 'minmum 4 characters')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    Password: Yup.string()
      .min(6, 'Must be  minimum 6 characters ')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(6, 'Must be  minimum 6 characters ')
      .required('Required')
      .oneOf([Yup.ref('Password')], 'Passwords must be same'),
  });

  const formik = useFormik({
    initialValues: { Name: '', email: '', Password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async () => {
      const body = formik.values;
      console.log(body);
      const { data } = await registerApi(body);
      try {
      } catch (error) {
        console.log(error);
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
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Register New User
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-4 md:space-y-6'
              noValidate
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your Name
                </label>
                <input
                  type='text'
                  name='Name'
                  id='name'
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='UserName'
                />
                <label className='text-red-600' htmlFor='name'>
                  {formik.errors.Name && formik.errors.Name}
                </label>
              </div>

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
                  name='Password'
                  id='password'
                  placeholder='••••••••'
                  value={formik.values.Password}
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
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  ConfirmPassword
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirmpassword'
                  placeholder='confirm your password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <label className='text-red-600' htmlFor='name'>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </label>
              </div>
              <div className='flex items-center '>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'></div>

                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Already have Account ?{' '}
                    <a
                      href='/login'
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Login
                    </a>
                  </p>
                </div>
              </div>
              <button
                type='submit'
                disabled={formik.isSubmitting}
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
