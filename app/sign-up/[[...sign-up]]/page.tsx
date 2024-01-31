import { SignUp } from "@clerk/clerk-react"

const SignUpPage =  () => {
      return(
            <SignUp afterSignInUrl="/new-user" redirectUrl="/new-user" />
      )
}

export default SignUpPage