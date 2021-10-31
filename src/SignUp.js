import { useCallback } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
      alert(e.message)
    }
  }, [])

  return (
    <>
      <div className="body-l outer">
        <div className="inner">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">SignUp</button>
            <p className="forgot-password text-left">
              <i className="fa fa-angle-left"></i>          
              <Link to="/login"> Back</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}