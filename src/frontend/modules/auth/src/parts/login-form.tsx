import * as React from 'react';
import {
  Button,
  TextField,
  Form,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@the_platform/react-uikit';
import {validation} from '@the_platform/core';
import {signIn} from '../provider';

interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = validation.object({
  password: validation
    .string()
    .min(5, 'Must be 5 characters or more')
    .required('Required'),
  email: validation
    .string()
    .email('Invalid email address')
    .required('Required'),
});

const onSubmit = (
  values: ILoginFormValues,
  {setSubmitting}: {setSubmitting: (value: boolean) => void},
): void => {
  signIn(values)
    .then(console.log)
    .catch(console.error)
    .finally(() => {
      setSubmitting(false);
    });
};

export const LoginForm = (): JSX.Element => {
  const form = Form.useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item md={true} sm={true} xs={true}>
          <TextField
            name="email"
            helperText={form.touched.email ? form.errors.email : ''}
            error={form.touched.email && Boolean(form.errors.email)}
            label="Email"
            fullWidth
            autoFocus
            type="email"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container spacing={8} alignItems="flex-end">
        <Grid item md={true} sm={true} xs={true}>
          <TextField
            name="password"
            helperText={form.touched.password ? form.errors.password : ''}
            error={form.touched.password && Boolean(form.errors.password)}
            label="Password"
            fullWidth
            type="password"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.password}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
        </Grid>
        <Grid item>
          <Button
            disableFocusRipple
            disableRipple
            style={{textTransform: 'none'}}
            variant="text"
            color="primary">
            Forgot password ?
          </Button>
        </Grid>
        <Grid item>
          <Button
            disableFocusRipple
            disableRipple
            style={{textTransform: 'none'}}
            variant="text"
            color="primary">
            Login via certificate
          </Button>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{marginTop: '10px'}}>
        <Button
          variant="outlined"
          color="primary"
          disabled={form.isSubmitting || form.isValidating}
          onClick={form.handleSubmit}>
          SignIn
        </Button>
      </Grid>
    </form>
  );
};

LoginForm.displayName = 'LoginForm';
