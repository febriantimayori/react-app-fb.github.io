import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button'

export const Login = () => {
  const handleSubmit = useCallback(async e => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {
      alert(e.message)
    }
  }, [])

  return (
    <>
      <div className="body-l outer">
        <div className="inner">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
            <p className="forgot-password text-right">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}