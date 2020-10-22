import {FC, ElementType} from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  makeStyles,
} from '@the_platform/react-uikit';
import {
  logger,
  validation,
  useTranslation,
  getObjectCache,
} from '@the_platform/core';
import {fetchRecoveryPassword} from '../../reducer';
import {
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_CREATE_ACCOUNT,
} from '../../constants/routes';

type TDispatch = (arg: any) => Promise<Record<string, string>>;

interface IProps {
  Link: ElementType;
}

interface IRecoveryPwdFormValues {
  email: string;
}

const initialValues: IRecoveryPwdFormValues = {
  email: '',
};
const notificationActions = getObjectCache('notificationActions') as {
  createToast: (message: {
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  }) => void,
};

const onSubmit = (dispatch: TDispatch) => (
  values: IRecoveryPwdFormValues,
  {setSubmitting}: Form.FormikHelpers<IRecoveryPwdFormValues>,
): Promise<unknown> =>
  dispatch(fetchRecoveryPassword(values))
    .then(
      (result: Record<string, unknown>): Promise<unknown> => {
        if (result.error) {
          throw result.error;
        }

        return dispatch(
          notificationActions.createToast({
            message: 'Success recovery password',
            type: 'success',
          }),
        );
      },
    )
    .catch(
      (e: Error): ReturnType<typeof dispatch> => {
        logger.error(E_CODE.E_1, e);
        return dispatch(
          notificationActions.createToast({
            message: e.message,
            type: 'error',
          }),
        );
      },
    )
    .finally((): void => {
      setSubmitting(false);
    });

const SPACING_TOP = 3;
const SPACING_BOTTOM = 2;
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(SPACING_TOP, 0, SPACING_BOTTOM),
  },
}));

export const RecoveryForm: FC<IProps> = ({Link}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const classes = useStyles();

  const validationSchema = validation.object({
    email: validation
      .string()
      .email(t('recovery.errors.invalidEmail'))
      .required(t('recovery.errors.required')),
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
        label={t('recovery.fields.email')}
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
        className={classes.submit}
        disabled={form.isSubmitting || form.isValidating}
        onClick={() => form.handleSubmit()}>
        {t('recovery.buttons.submit')}
      </Button>

      <Grid container>
        <Grid item xs>
          <Link to={ROUTE_AUTH_LOGIN} variant="body2">
            {t('recovery.buttons.signin')}
          </Link>
        </Grid>

        <Grid item>
          <Link to={ROUTE_AUTH_CREATE_ACCOUNT} variant="body2">
            {t('recovery.buttons.createAccount')}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

RecoveryForm.displayName = 'RecoveryForm';
