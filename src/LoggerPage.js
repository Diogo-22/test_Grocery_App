import React from 'react'

const LoggerPage = ({user, setUser, pwd, setPwd, loginuser}) => {
  return (
    <main>
        <form className='loginForm' onSubmit={(e) => e.preventDefault()} >
            <label htmlFor='login'>Login</label>
            <input className='usernameForm'
                autoFocus
                id='login'
                type='text'
                placeholder='username'
                required
                 value={user}
                onChange={(e) => {setUser(e.target.value)}}
                
            />
            <label htmlFor='password'>Password</label>
            <input className='usernameForm'
                autoFocus
                //ref={inputRef}
                id='password'
                type='text'
                placeholder='password'
                required
                value={pwd}
                onChange={(e) => {setPwd(e.target.value)}}
            />
            <button
                className='loginButton'
                type='submit'
                aria-label='Login'
                onClick={() => loginuser()}
            >Login
            </button>
        </form>
        <p>Don't have an accout?</p>
    </main>
  )
}

export default LoggerPage