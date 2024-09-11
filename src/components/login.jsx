import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import url from './url';


export default function login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [message, setMessage] = useState()

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${url}/login`, { email, password })
      .then(res => {
        console.log(res.data.Role)
        if (res.data.Role === "Admin") {
          console.log(res.data.message)
          navigate('/leadList')
        }

        else if (res.data.Role === "Employee") {
          console.log(res.data.Message)
          console.log(res.data.Id)
          navigate(`/employeeLogin/${res.data.Id}`)
        }

        else {
          setMessage(res.data.Message)
          console.log(res.data.Message)
          setMessage(res.data.Message)
          navigate('/')
        }
      })
      .catch(err => console.log(err)
      )
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Login <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
                <div className='text-center text-black h-5'>
                  <p>{message}</p>
                </div>
              </div>
            </form>
          </div>
        </div>



        <div className="h-full w-full">
          <img
            className="mx-auto h-screen w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
