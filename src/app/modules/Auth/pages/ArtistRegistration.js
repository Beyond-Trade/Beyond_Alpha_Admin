import * as Yup from "yup";
import * as auth from "../_redux/authRedux";
import {useAlert} from "react-alert"
import { FormattedMessage, injectIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import firebase from "../../../../configs/fbconfig";
import { useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  changepassword: "",
};

function ArtistRegistration(props) {
  const alert =useAlert()
  const history = useHistory();
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [progressBar, setProgressBar] = useState(undefined);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [formikValues, setFormikValues] = useState(undefined);
  const fileRef = useRef(null);

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
      .min(6, "Minimum 6 symbols")
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
  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      if (fileToUpload) {
        if (fileToUpload.size <= 2097152) {
          uploadFile(values.firstName, values.lastName);
          setFormikValues(values);
         
        }
      }
      if (!fileToUpload) {
        setSubmitting(false)
        disableLoading()
      }
    },
  });

  useEffect(() => {
    if (fileUrl) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          formikValues.email,
          formikValues.password
        )
        .then(async (data) => {
          console.log("uid", data.user.uid);
          console.log("----------", formikValues);
          const allData = {
            createdAt: Date.now(),
            favoriteOf: [],
            firstName:
              formikValues.firstName.charAt(0).toUpperCase() +
              formikValues.firstName.slice(1),
            email: formikValues.email,
            followerCount: 0,
            id: data.user.uid,
            imgUrl: fileUrl,
            isActive: false,
            lastName:
              formikValues.lastName.charAt(0).toUpperCase() +
              formikValues.lastName.slice(1),
            updatedAt: Date.now(),
            role: null,
          };
          console.log(allData);
          await firebase
            .firestore()
            .collection("artists")
            .doc(data.user.uid)
            .set(allData)
            .then(() => {
              disableLoading();
              alert.show("Plases wait until admin approve your request",{type:"success"})
              console.log("plases wait until admin approve your request");
              history.push("auth/login")
            });

          //Here if you want you can sign in the user
        })
        .catch(function(error) {
          //Handle error
        });
    }
  }, [fileUrl]);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    fileRef.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    if(fileUploaded){setFileToUpload(fileUploaded);
    setFilePreview(URL.createObjectURL(fileUploaded));}
  };

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
  const addHyphens = (toChange) => {
    return toChange.replace(/\s+/g, "-").toLowerCase();
  };
  const uploadFile = async (firstName, lastName) => {
    var storage = firebase.storage();
    const storageRef = storage.ref(
      `artists/${addHyphens(firstName)}${"-"}${addHyphens(
        lastName
      )}${"."}${fileToUpload.name.slice(
        ((fileToUpload.name.lastIndexOf(".") - 1) >>> 0) + 2
      )}`
    );
    await storageRef.put(fileToUpload).on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress);
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        storageRef.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-10">
        <h3 className="font-size-h1 text-white">
          SIGN UP
          {/* <FormattedMessage id="AUTH.REGISTER.TITLE" /> */}
        </h3>
        <p className="text-muted text-white font-weight-bold">
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

        <div className="form-group fv-plugins-icon-container d-flex justify-content-center mb-1">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle bg-secondary"
            style={{
              height: "120px",
              width: "120px",
              // backgroundColor: "rgba(255,255,255,0.1)",
              backgroundColor: "#000000",
              backgroundImage: `url(${filePreview})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
          >
            <label
              for="files"
              className="btn mb-0 "
              onClick={() => handleClick}
            >
             {
               !filePreview ? <i className="flaticon2-image-file icon-2x p-0"></i>:null
             }
            </label>

            <input
              id="files"
              style={{ display: "none" }}
              type="file"
              ref={fileRef}
              onChange={handleChange}
            />
          </div>
          {/* <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            // onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            className="rounded-circle"
          /> */}
        </div>
        <h5 className="d-flex justify-content-center text-white font-weight-bold mt-5 mb-10">
          Select Profile Picture
        </h5>
        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="First name"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            type="text"
            className={`form-control font-weight-bold text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
            className={`form-control font-weight-bold font-weight-bold text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
            className={`form-control font-weight-bold text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
            className={`form-control font-weight-bold text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
            className={`form-control font-weight-bold text-white form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
            disabled={formik.isSubmitting && !fileToUpload}
            className="btn font-weight-bold text-white px-9 py-4 my-3 mx-4"
            style={{ backgroundColor: "#FF1493" }}
          >
            <span>SignUp</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn font-weight-bold px-9 py-4 my-3 mx-4"
              style={{ backgroundColor: "#808080" }}
            >
              Cancel
            </button>
          </Link>
        </div>
        <div className="text-center"> <Link
                    to="/auth/artist_login"
                    className="font-weight-bold text-white ml-2"
                    id="kt_login_signup"
                  >
                    Already have an account? SIGN IN
                  </Link></div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(ArtistRegistration));
