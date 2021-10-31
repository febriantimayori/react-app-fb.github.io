/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";

const ProductForm = (props) => {
    const initialFieldValues = {
        id: '',
        name: '',
        total: '',
        desc: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if (props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.productObjects[props.currentId]
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId, props.productObjects])

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <input className="form-control" placeholder="Name" name="name"
                        value={values.name}
                        onChange={handleInputChange}
                    />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <input className="form-control" placeholder="Id" name="id"
                    value={values.id}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group input-group col-md-6">
                    <input className="form-control" placeholder="Total" name="total"
                        value={values.total}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Desc" name="desc"
                    value={values.desc}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId == '' ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form >
    );
}

export default ProductForm;