import { useState, useEffect, PropTypes } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Members({ session }) {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
      document.title = `${naming}'s Dashboard`;
})

function name() {
    if (username === '') {
        return `${session.user.email}`
    }
    else {
        return `${username}`
    }
  }

  const naming = name();

  return (
    <div>
        <h1>Hey, {naming}</h1>
        <h2>Welcome to the Turner Fenton Hack Club Dashboard!</h2>
        <br/><br/>
        <div> 
        </div>
        <br/><br/>
        <div className="row collection">
        <div className="col-12 collection">
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
      </div>
         </div>
         <div className="row collection">
        <div className="col-12 collection">
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
      </div>
         </div>
      <div>
      </div>
    </div>
  )
}