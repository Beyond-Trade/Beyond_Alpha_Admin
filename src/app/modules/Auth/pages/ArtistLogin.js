import * as Yup from "yup";
import * as auth from "../_redux/authRedux";

import { FormattedMessage, injectIntl } from "react-intl";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../../../../configs/fbconfig";
import { login } from "../_redux/authCrud";
import { useFormik } from "formik";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function ArtistLogin(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [requestMessege, setRequestMessege] = useState(undefined);
  const [passwordType, setPasswordType] = useState("password");
  const LoginSchema = Yup.object().shape({
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
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then((res) => {
            console.log(res.user.uid);
            props.login(res.user.uid);

            firebase
              .firestore()
              .collection("artists")
              .doc(res.user.uid)
              .get()
              .then((docRef) => {
                console.log(docRef.data());
                if (docRef.data().role === "artist") {
                  firebase
                    .firestore()
                    .collection("artists")
                    .doc(res.user.uid)
                    .set({ isActive: true }, { merge: true });
                  disableLoading();
                  props.fulfillUser(docRef.data());
                } else {
                  disableLoading();
                  firebase.auth().signOut();
                  setRequestMessege(
                    "Please Wait For Your Request To Be Approved "
                  );
                }
              })
              .catch((error) => {
                disableLoading();
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
                );
              });
          })
          // .then(({ data: { accessToken } }) => {
          //   disableLoading();
          //   props.login(accessToken);
          // })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1 text-white">
          <FormattedMessage id="AUTH.ARTIST.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your Email and Password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )
        // : (
        //   <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
        //     <div className="alert-text ">
        //       Use account <strong>admin@demo.com</strong> and password{" "}
        //       <strong>demo</strong> to continue.
        //     </div>
        //   </div>
        // )
        }

        <div className="d-flex form-group fv-plugins-icon-container">
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
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type={passwordType}
            className={`form-control text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            show={true}
            {...formik.getFieldProps("password")}
          />
          {/* {
            passwordType === "password" ?
            <i className="far fa-eye" onClick={()=>setPasswordType("text")}/>
            : <i className="far fa-eye-slash" onClick={()=>setPasswordType("password")}/>
          } */}
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        {requestMessege ? (
          <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
            <span className="text-primary">{requestMessege}</span>
          </div>
        ) : null}
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-white text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            style={{ backgroundColor: "#FF1493" }}
            className={`btn text-white font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
          <Link
            to="/auth/login"
            className="text-white text-hover-primary my-3 mr-2"
          >
            Login As Admin?
          </Link>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(ArtistLogin));
