/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm"
import firebaseDb from "../firebase";
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from "../firebase"

const Products = () => {

    const { user } = useAuthState()
    var [productObjects, setProductObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('products').on('value', snapshot => {
            if (snapshot.val() != null)
                setProductObjects({
                    ...snapshot.val()
                })
            else
                setProductObjects({})

        })
    }, [])// similar to componentDidMount

    const addOrEdit = obj => {
        if (currentId == '')
            firebaseDb.child('products').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`products/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if (window.confirm('Are you sure to delete this record?')) {
            debugger
            firebaseDb.child(`products/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h1 className="display-4">Product List</h1>
                    <h3>Welcome {user?.email}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ProductForm {...({ addOrEdit, currentId, productObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Id</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(productObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{productObjects[id].name}</td>
                                        <td>{productObjects[id].id}</td>
                                        <td>{productObjects[id].total}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(id) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-lg-2 float-right">
                    <button className="btn btn-outline-danger" onClick={() => signOut(getAuth())}>Sign out</button>
            </div>
        </>
    );
}

export default Products;