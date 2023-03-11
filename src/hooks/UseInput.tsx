import React, { useState } from "react";

const UseInput = (validateValue:(value:any) => boolean) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false)

    const validValue = validateValue(enteredValue)
    const hasError = !validValue && isTouched

    const enteredValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value)
    }
    const valueInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true)
    }
    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }
    return {
        value:enteredValue, 
        hasError: hasError,
        valueIsValid:validValue,
        enteredValueHandler,
        valueInputBlur, 
        reset
    };
}

export default UseInput;