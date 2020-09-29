// @ts-nocheck

import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  makeStyles,
} from '@the_platform/react-uikit';
import {logger, validation, useTranslation} from '@the_platform/core';
import {fetchRecoveryPassword} from '../../reducer';
import {ROUTE_AUTH_LOGIN, ROUTE_AUTH_CREATE_ACCOUNT} from '../../constants/routes';

interface IRecoveryPwdFormValues {
  email: string;
}

interface ISubmitting {
  setSubmitting: (value: boolean) => void;
}

const initialValues: IRecoveryPwdFormValues = {
  email: '',
};

const onSubmit = (dispatch: any): void => (
  values: IRecoveryPwdFormValues,
  {setSubmitting}: ISubmitting,
): Promise<any> =>
  dispatch(fetchRecoveryPassword(values))
    .then(() => {
      console.log('Success');
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

export const RecoveryForm = connect()(
  (): JSX.Element => {
    const dispatch = useDispatch();
    const {t} = useTranslation('auth');
    const classes = useStyles();

    const validationSchema = validation.object({
      email: validation
        .string()
        .email(t('signin.errors.invalidEmail'))
        .required(t('signin.errors.required')),
    });
    const form = Form.useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmit(dispatch),
    });

    return (
      <form className={classes.form}>
        <TextField
          name="email"
          helperText={form.touched.email ? form.errors.email : ''}
          error={form.touched.email && Boolean(form.errors.email)}
          label={t('signin.fields.email')}
          autoFocus
          type="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
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
          {t('recovery.buttons.submit')}
        </Button>

        <Grid container>
          <Grid item xs>
            <Link to={ROUTE_AUTH_LOGIN} variant="body2">
              {t('recovery.buttons.signin')}
            </Link>
          </Grid>

          <Grid item xs>
            <Link to={ROUTE_AUTH_CREATE_ACCOUNT} variant="body2">
              {t('recovery.buttons.createAccount')}
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  },
);

RecoveryForm.displayName = 'RecoveryForm';
