import {FC, ElementType} from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  TextField,
  Form,
  Grid,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from '@the_platform/react-uikit';
import {
  logger,
  validation,
  useTranslation,
  getObjectCache,
} from '@the_platform/core';
import {fetchLogin} from '../../reducer';
import {
  ROUTE_AUTH_RECOVERY_PASSWORD,
  ROUTE_AUTH_CREATE_ACCOUNT,
} from '../../constants/routes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TDispatch = (...args: any[]) => Promise<Record<string, string>>;

interface IProps {
  useNavigate?: (path?: string) => void;
  Link: ElementType;
}

interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: '',
  password: '',
};

const MIN_NUMBER_CHARS_IN_PASSWORD = 5;
const notificationActions = getObjectCache('notificationActions') as {
  createToast: (message: {
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  }) => void,
};

const onSubmit = (dispatch: TDispatch) => (
  values: ILoginFormValues,
  {setSubmitting}: Form.FormikHelpers<ILoginFormValues>,
): Promise<unknown> =>
  dispatch(fetchLogin(values))
    .then(
      (result: Record<string, unknown>): Promise<unknown> => {
        if (result.error) {
          throw result.error;
        }

        return dispatch(
          notificationActions.createToast({
            message: 'Success signin',
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const LoginForm: FC<IProps> = ({Link}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('auth');
  const classes = useStyles();

  const validationSchema = validation.object({
    password: validation
      .string()
      .min(
        MIN_NUMBER_CHARS_IN_PASSWORD,
        t('signin.errors.min', {min: MIN_NUMBER_CHARS_IN_PASSWORD}),
      )
      .required(t('signin.errors.required')),
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
        id="email"
        InputLabelProps={{
          shrink: true,
          htmlFor: 'email',
        }}
        type="email"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.email}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        name="password"
        helperText={form.touched.password ? form.errors.password : ''}
        error={form.touched.password && Boolean(form.errors.password)}
        label={t('signin.fields.password')}
        id="password"
        InputLabelProps={{
          shrink: true,
          htmlFor: 'password',
        }}
        type="password"
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.password}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox color="primary" />}
        label={t('signin.buttons.remember')}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        disabled={form.isSubmitting || form.isValidating}
        onClick={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
        {t('signin.buttons.submit')}
      </Button>

      <Grid container>
        <Grid item xs>
          <Link to={ROUTE_AUTH_RECOVERY_PASSWORD} variant="body2">
            {t('signin.buttons.forgot')}
          </Link>
        </Grid>

        <Grid item>
          <Link to={ROUTE_AUTH_CREATE_ACCOUNT} variant="body2">
            {t('signin.buttons.createAccount')}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

LoginForm.displayName = 'LoginForm';
