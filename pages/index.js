import { useEffect, useState } from 'react'
import { supabase } from '../src/supabaseClient'


export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState('Checking...')
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: countData, error: countError } = await supabase
          .from('users')
          .select('count')
          .single()

        if (countError) {
          console.error('Connection check error:', countError)
          throw countError
        }

        console.log('Connection check successful:', countData)
        setConnectionStatus('Success')

        // Fetch users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id,name')

        if (userError) {
          console.error('User fetch error:', userError)
          setError(`Failed to fetch users: ${userError.message}`)
          setUsers([])
        } else if (userData && userData.length > 0) {
          setUsers(userData.map(user => user.name))
        } else {
          console.warn('No users found in the response')
          setUsers([])
          setError('No users found in the database')
        }
      } catch (error) {
        console.error('Error:', error)
        setConnectionStatus('Failed')
        setError(error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
      <p>Supabase Connection: {connectionStatus}</p>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <h2>Users:</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
