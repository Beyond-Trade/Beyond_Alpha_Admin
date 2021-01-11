import * as Yup from "yup";
import * as auth from "../_redux/authRedux";

import { FormattedMessage, injectIntl } from "react-intl";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../_redux/authCrud";
import { useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  changepassword: "",
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),

    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      register(values.email, values.fullname, values.username, values.password)
        .then(({ data: { accessToken } }) => {
          props.register(accessToken);
          disableLoading();
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
    },
  });

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-10">
        <h3 className="font-size-h1 text-white">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="First name"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="text"
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "firstName"
            )}`}
            name="firstName"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.firstName}</div>
            </div>
          ) : null}
        </div>
        {/* end: Fullname */}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Last name"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="text"
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "lastName"
            )}`}
            name="lastName"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.lastName}</div>
            </div>
          ) : null}
        </div>

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="email"
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Username */}

        {/* end: Username */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="password"
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="password"
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn text-white font-weight-bold px-9 py-4 my-3 mx-4"
            style={{ backgroundColor: "#FF1493" }}
          >
            <span>SignUp</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn text-white font-weight-bold px-9 py-4 my-3 mx-4"
              style={{ backgroundColor: "#808080" }}
            >
              Cancel
            </button>
          </Link>
        </div>
        {/* <div className="form-group d-flex flex-wrap flex-center">
          <Link
            to="/auth/artist_registration"
            className="text-white mx-auto text-hover-primary my-3 mr-2"
          >
            Sign Up as artist!
          </Link>
        </div> */}
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
