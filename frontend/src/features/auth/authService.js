export const loginUser = async (email, password) => {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (response.ok) {
    const data = await response.json()
    console.log(data.token)
    localStorage.setItem('token', data.token)
    return data
  } else {
    throw new Error('Invalid email and/or password')
  }
}

export const registerUser = async (name, username, email, password) => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, email, password })
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
  const response = await fetch('/api/user/me', {
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

export const updateUser = async (token, updates) => {
  const formData = new FormData();
  
  for (const key in updates) {
    if (updates[key] != '') {
      formData.append(key, updates[key]);
    }
  }

  const response = await fetch('/api/user/update', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user');
  }
}

export const deleteUser = async (token) => {
  const response = await fetch('/api/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
  if (response.ok) {
    return await response.json()
  } else {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to delete user')
  }

}

export const followUser = async (token, userId) => {
  const response = await fetch(`/api/user/${userId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to follow user');
  }
}

export const unfollowUser = async (token, userId) => {
  const response = await fetch(`/api/user/${userId}/unfollow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to unfollow user');
  }

}

export const refreshAccessToken = async () => {
  const response = await fetch('/api/user/refresh', {
    method: 'POST',
    credentials: 'include', // Ensure cookies are sent with the request
  });

  if (response.ok) {
    const data = await response.json();
    return data.accessToken;
  } else {
    throw new Error('Failed to refresh access token');
  }
};
