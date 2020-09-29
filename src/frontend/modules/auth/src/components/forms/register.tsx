// @ts-nocheck

import * as React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  makeStyles,
} from '@the_platform/react-uikit';
import {logger, validation, useTranslation} from '@the_platform/core';
import {fetchRegister} from '../../reducer';
import {
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_RECOVERY_PASSWORD,
} from '../../constants/routes';

interface IRegisterFormValues {
  email: string;
  password: string;
}

interface ISubmitting {
  setSubmitting: (value: boolean) => void;
}

const initialValues: IRegisterFormValues = {
  email: '',
  password: '',
};

const MIN_NUMBER_CHARS_IN_PASSWORD = 5;

const onSubmit = (dispatch: any): void => (
  values: IRegisterFormValues,
  {setSubmitting}: ISubmitting,
): Promise<any> =>
  dispatch(fetchRegister(values))
    .then(() => {
      console.log('Register success!');
    })
    .catch((e: Error) => logger.error(E_CODE.E_1, e))
    .finally(() => {
      setSubmitting(false);
    });

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterForm = connect()(
  (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation('auth');
    const classes = useStyles();

    const validationSchema = validation.object({
      password: validation
        .string()
        .min(
          MIN_NUMBER_CHARS_IN_PASSWORD,
          `Must be ${MIN_NUMBER_CHARS_IN_PASSWORD} characters or more`,
        )
        .required(t('register.errors.required')),
      email: validation
        .string()
        .email(t('register.errors.invalidEmail'))
        .required(t('register.errors.required')),
      fullName: validation.string().required(t('register.errors.required')),
    });
    const form = Form.useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmit(navigate, dispatch),
    });

    return (
      <form className={classes.form}>
        <TextField
          name="email"
          helperText={form.touched.email ? form.errors.email : ''}
          error={form.touched.email && Boolean(form.errors.email)}
          label={t('register.fields.email')}
          autoFocus
          type="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          name="fullName"
          helperText={form.touched.fullName ? form.errors.fullName : ''}
          error={form.touched.fullName && Boolean(form.errors.fullName)}
          label={t('register.fields.fullName')}
          type="input"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.fullName}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          name="password"
          helperText={form.touched.password ? form.errors.password : ''}
          error={form.touched.password && Boolean(form.errors.password)}
          label={t('register.fields.password')}
          type="password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={form.isSubmitting || form.isValidating}
          onClick={form.handleSubmit}>
          {t('register.buttons.submit')}
        </Button>

        <Grid container>
          <Grid item xs>
            <Link to={ROUTE_AUTH_LOGIN} variant="body2">
              {t('register.buttons.signin')}
            </Link>
          </Grid>

          <Grid item xs>
            <Link to={ROUTE_AUTH_RECOVERY_PASSWORD} variant="body2">
              {t('register.buttons.forgot')}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  },
);

RegisterForm.displayName = 'RegisterForm';
