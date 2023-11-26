// simple login page using nextjs and tailwindcss
'use client';

function Login() {
  const onSubmit = (e: any) => {
    e.preventDefault()
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/github`
  }
  return (
      <form onSubmit={onSubmit}>

        <button type="submit">Login with Github</button>
      </form>
  )
}

export default Login