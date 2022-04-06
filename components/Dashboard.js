import { useState, useEffect, PropTypes } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', 
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  let favicon = document.getElementById('favicon');

  function name() {
    if (username === null || 'email_address') {
        return `${session.user.email}`
    }
    else {
        return `${username}`
    }
  }
  
  const naming = name();

  useEffect(() => {
    document.title = `${naming}'s Dashboard`;
    favicon = `${avatar_url}`;
  })

  return (
    <div>
        <h1>Hey, {naming}</h1>
        <h2>Welcome to the Turner Fenton Hack Club Dashboard!</h2>
        <br/><br/>
        <div>Update your preferences <Link href='/account'>here!</Link></div>
        <div>
      </div>
      <div>
      </div>
    </div>
  )
}
