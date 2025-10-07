export class User {
  static async me() {
    // Simulate async auth check
    await new Promise(r => setTimeout(r, 200))
    const loggedIn = localStorage.getItem('fincoach_logged_in') === 'true'
    if (!loggedIn) {
      throw new Error('Not authenticated')
    }
    const json = localStorage.getItem('fincoach_user')
    return json ? JSON.parse(json) : {
      full_name: 'FinCoach User',
      email: 'user@example.com',
      trust_score: 100,
      current_streak: 0
    }
  }

  static login() {
    localStorage.setItem('fincoach_logged_in', 'true')
    localStorage.setItem('fincoach_user', JSON.stringify({
      full_name: 'FinCoach User',
      email: 'user@example.com',
      trust_score: 100,
      current_streak: 0
    }))
    window.location.reload()
  }

  static logout() {
    localStorage.removeItem('fincoach_logged_in')
    localStorage.removeItem('fincoach_user')
    window.location.reload()
  }
}

