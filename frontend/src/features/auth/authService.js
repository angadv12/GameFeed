export const loginUser = async (email, password) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (response.ok) {
    const data = await response.json()
    localStorage.setItem('token', data.token)
    return data
  } else {
    throw new Error('Invalid email and/or password')
  }
}

export const registerUser = async (name, email, password) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })

  if (response.ok) {
    const data = await response.json()
    localStorage.setItem('token', data.token)
    return data
  } else {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to register user')
  }
}

export const getUser = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    return await response.json()
  } else {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to get user')
  }
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}