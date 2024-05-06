import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '../../components/Input';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Name is required'),
    lastName: yup.string().required('Email is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  const { handleSubmit, values, handleChange, handleBlur } = formik;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mt-10">
        Edit Profile
      </h1>
      <div className="flex flex-col md:flex-row mt-10 md:mt-20">
        <div className="flex flex-col items-center md:w-1/2 w-full">
          <img
            src="https://avatars.githubusercontent.com/u/31558600?v=4"
            alt="Profile"
            className="rounded-full w-32 h-32 md:w-80 md:h-80"
          />
          <div className="mt-4">
            <span className="text-2xl md:text-4xl">{user?.firstName + user?.lastName || ``}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full mt-8 md:mt-0">
          <form onSubmit={handleSubmit} className="flex flex-col max-md:w-full gap-3">
            <Input
              name="firstName"
              label="First Name"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="lastName"
              label="Last Name"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              className="bg-primary text-white rounded p-2 mt-4 w-full md:w-80 hover:bg-secondary transition-all duration-300">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
