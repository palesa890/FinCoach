// Minimal stubs to unblock UI
export async function InvokeLLM() {
  return {
    courses: [
      {
        title: "Personal Finance Basics",
        description: "Learn budgeting, saving, and smart spending.",
        platform: "Khan Academy",
        url: "https://www.khanacademy.org/college-careers-more/personal-finance",
        duration_minutes: 60,
        difficulty: "beginner",
        category: "budgeting",
        is_free: true,
        price: "Free"
      },
      {
        title: "Investing Fundamentals",
        description: "Understand stocks, ETFs, and risk.",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/financial-markets-global",
        duration_minutes: 120,
        difficulty: "intermediate",
        category: "investing",
        is_free: false,
        price: "R299"
      }
    ]
  }
}

export async function UploadFile({ file }) {
  return { file_url: `local://${file?.name || 'statement.pdf'}` }
}

export async function ExtractDataFromUploadedFile() {
  const now = new Date()
  const month = now.toISOString().slice(0,7)
  return {
    status: "success",
    output: {
      statement_months: [month],
      recurring_payments: [],
      total_monthly_commitments: 0,
      average_balance: 0,
      income_estimate: 0
    }
  }
}

