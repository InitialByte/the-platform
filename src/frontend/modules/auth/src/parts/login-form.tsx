import * as React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button, TextField} from '@the_platform/react-uikit';

interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const onSubmit = (values: ILoginFormValues, {setSubmitting}): void => {
  setTimeout(() => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

export const LoginForm = (): JSX.Element => {
  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form>
      <TextField
        name="email"
        helperText={form.touched.email ? form.errors.email : ''}
        error={form.touched.email && Boolean(form.errors.email)}
        label="Email"
        type="email"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.email}
        variant="outlined"
      />

      <TextField
        name="password"
        helperText={form.touched.password ? form.errors.password : ''}
        error={form.touched.password && Boolean(form.errors.password)}
        label="Password"
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.password}
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        disabled={form.isSubmitting || form.isValidating}
        onClick={form.handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

LoginForm.displayName = 'LoginForm';
