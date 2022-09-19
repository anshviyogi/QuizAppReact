import { LockClosedIcon } from '@heroicons/react/20/solid'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import {auth,provider} from './firebase'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
    const[teacher,setTeacher] = useState(false)

    // Login with Teacher using Google Auth
    function loginAsTeacher(){
        signInWithPopup(auth,provider)
            .then(res => {
              console.log(res)
              navigate('/admin')
            })
            .catch(err => console.log(err))
    }

    // Login with Student using Google Auth
    function loginAsStudent(){
        signInWithPopup(auth,provider)
            .then(res => {
              console.log(res)
              navigate('/play')
            })
                .catch(err => console.log(err))
    }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {/* Welcome to Student Portal */}
              {
                teacher?"Welcome to Teacher's Portal":"Welcome to Student Portal"
              }
            </h2>
          </div>

          {/* Login Teacher */}
          {teacher?(
            <div className='google-container' onClick={loginAsTeacher}>
            <img className='google-logo' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' alt="Google Logo"/>
            <span>Login In as Teacher</span>
        </div>
          ):(
            // Login Student
            <div className='google-container' onClick={loginAsStudent}>
                    <img className='google-logo' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' alt="Google Logo"/>
                    <span>Login In as Student</span>
                </div>
          )}


            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={e => setTeacher(!teacher)}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>

                {
                        teacher?<span>Student Portal</span>:<span>Teacher Portal</span>
                }

              </button>
            </div>
        </div>
      </div>
    </>
  )
}