import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import UseInput from "../hooks/UseInput";
import { useFormik } from "formik";
import * as Yup from "yup"
const Form = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: ''
        },
        validationSchema:Yup.object({
            firstName: Yup.string().min(9, "Must be 9 or more characters")
            .required("Required"),
            lastName: Yup.string().min(9, "Must be 9 or more characters")
            .required("Required")
        }),
        onSubmit: (values) => {
            values.firstName = ''
            values.lastName = ''
        }
    })

    let formIsValid = false

    const { value: email,
        hasError: emailInputIsInvalid,
        valueIsValid: validEmail,
        enteredValueHandler: emailHandler,
        reset: resetEmailInput,
        valueInputBlur: emailInputBlur } = UseInput(value => value.trim() !== '' && value.includes('@'));


    const { value: password,
        hasError: passwordInputIsInvalid,
        valueIsValid: validPassword,
        enteredValueHandler: passwordHandler,
        reset: resetPasswordInput,
        valueInputBlur: passwordInputBlur } = UseInput(value =>value.trim().length > 9);


    const formSubmissionHandler = (event: React.FormEvent) => {
        event.preventDefault()

        if (!validEmail) {
            return;
        }
        resetEmailInput()
        resetPasswordInput()
    }

    if (validEmail && !emailInputIsInvalid && validPassword && !passwordInputIsInvalid) {
        formIsValid = true
    }

    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <form onSubmit={formSubmissionHandler} style={{ position: 'relative', width: '600px', height: '400px', border: 'solid', display: 'flex', justifyContent: 'center' }}>

                    {emailInputIsInvalid ?
                        <div className="form-group">
                            <label className="form-label mt-4">Email address</label>
                            <input className="form-control is-invalid" onChange={emailHandler} value={email} onBlur={emailInputBlur} placeholder="Enter email" />
                            <div className="invalid-feedback">Invalid Email</div>
                        </div>
                        : !emailInputIsInvalid && !validEmail
                            ?
                            <div className="form-group">
                                <label className="form-label mt-4">Email address</label>
                                <input className="form-control" onChange={emailHandler} value={email} onBlur={emailInputBlur} placeholder="Enter email" />
                            </div>
                            :
                            <div className="form-group">
                                <label className="form-label mt-4">Email address</label>
                                <input className="form-control is-valid" onChange={emailHandler} value={email} onBlur={emailInputBlur} placeholder="Enter email" />
                                <div className="valid-feedback">Success</div>
                            </div>}

                    <br></br>

                    {passwordInputIsInvalid ?
                        <div className="form-group">
                            <label className="form-label mt-4">Password</label>
                            <input className="form-control is-invalid" onChange={passwordHandler} value={password} onBlur={passwordInputBlur} placeholder="Enter Password" />
                            <div className="invalid-feedback">Invalid Password</div>
                        </div>
                        : !passwordInputIsInvalid && !validPassword
                            ?
                            <div className="form-group">
                                <label className="form-label mt-4">Password</label>
                                <input className="form-control" onChange={passwordHandler} value={password} onBlur={passwordInputBlur} placeholder="Enter Password" />
                            </div>
                            :
                            <div className="form-group">
                                <label className="form-label mt-4">Password</label>
                                <input className="form-control is-valid" onChange={passwordHandler} value={password} onBlur={passwordInputBlur} placeholder="Enter Password" />
                                <div className="valid-feedback">Success</div>
                            </div>}
                    <div style={{ position: 'absolute', bottom: '50px', display: 'flex', justifyContent: 'center' }}>

                        {formIsValid ? <button className="btn btn-success" style={{ fontSize: '20px', width: '150px' }}>Submit</button>
                            : <button className="btn btn-success disabled" style={{ fontSize: '20px', width: '150px' }}>Submit</button>}
                    </div>

                </form>

            </div>


            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20em' }}>

                <form onSubmit={formik.handleSubmit} style={{ border: 'solid', padding: '3em' }}>
                    <div className="form-group">
                        <label className="form-label mt-4">First Name</label>
                        <input className="form-control" name = "firstName" onChange={formik.handleChange} value = {formik.values.firstName}></input>
                    </div>
                    {formik.errors.firstName ? <p>{formik.errors.firstName}</p> : <></>}
                    
                    <div className="form-group">
                        <label className="form-label mt-4">Last Name</label>
                        <input className="form-control" name = "lastName" onChange={formik.handleChange} value = {formik.values.lastName}></input>
                    </div>
                    {formik.errors.lastName ? <p>{formik.errors.lastName}</p> : <></>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Form;