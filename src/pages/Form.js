import React, { useState } from "react";

const Form = ({initialTodo, handleSubmit, buttonLabel, history}) => {
    //Form data state
    const [formData, setFormData] = useState(initialTodo);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmission = e => {
        e.preventDefault();

        handleSubmit(formData);

        history.push('/');
    }
    return (
        <form onSubmit={handleSubmission}>
            <input 
                type="text"
                name="subject"
                onChange={handleChange}
                value={formData.subject}
            />
             <input
                type="text"
                onChange={handleChange}
                value={formData.details}
                name="details"
            />
            <input type="submit" value={buttonLabel} />
        </form>
    )

};

export default Form;