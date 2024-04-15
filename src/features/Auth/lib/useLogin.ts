import {useFormik} from "formik";
import {authActions, selectIsLoggedIn} from "features/Auth/index";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";

export const useLogin = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn);

    const dispatch = useAppDispatch()

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers) => {
            const res = await dispatch(authActions.loginTC(values))
            if (authActions.loginTC.rejected.match(res)) {
                console.log(res)
                if (res.payload?.fieldsErrors?.length) {
                    const error = res.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error?.field, error.error)
                }
            }
        },
    })

    return {formik, isLoggedIn}
}