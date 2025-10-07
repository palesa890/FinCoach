// Lightweight localStorage-backed entities for demo/dev
import { User as RealUser } from "./User.js";

function storageKey(name) { return `fincoach_${name.toLowerCase()}` }
function readAll(name) {
  const json = localStorage.getItem(storageKey(name))
  return json ? JSON.parse(json) : []
}
function writeAll(name, arr) {
  localStorage.setItem(storageKey(name), JSON.stringify(arr))
}
function genId() { return `${Date.now()}_${Math.random().toString(36).slice(2,8)}` }

function makeEntity(name) {
  return class {
    static async list(sort = "-created_date", limit) {
      let items = readAll(name)
      items = sortItems(items, sort)
      if (limit) items = items.slice(0, limit)
      return items
    }
    static async filter(query = {}, sort = "-created_date", limit) {
      let items = readAll(name).filter(it => Object.entries(query).every(([k,v]) => it[k] === v))
      items = sortItems(items, sort)
      if (limit) items = items.slice(0, limit)
      return items
    }
    static async create(data) {
      const items = readAll(name)
      const now = new Date().toISOString()
      const obj = { id: genId(), created_date: now, updated_date: now, ...data }
      items.unshift(obj)
      writeAll(name, items)
      return obj
    }
    static async update(id, data) {
      const items = readAll(name)
      const idx = items.findIndex(i => i.id === id)
      if (idx === -1) throw new Error(`${name} not found`)
      items[idx] = { ...items[idx], ...data, updated_date: new Date().toISOString() }
      writeAll(name, items)
      return items[idx]
    }
    static async delete(id) {
      const items = readAll(name).filter(i => i.id !== id)
      writeAll(name, items)
      return { success: true }
    }
  }
}

function sortItems(items, sort) {
  if (!sort) return items
  const desc = sort.startsWith('-')
  const key = desc ? sort.slice(1) : sort
  return [...items].sort((a,b) => {
    const av = a[key] || ''
    const bv = b[key] || ''
    if (av === bv) return 0
    return (av > bv ? 1 : -1) * (desc ? -1 : 1)
  })
}

export const Budget = makeEntity('Budget')
export const Transaction = makeEntity('Transaction')
export const Challenge = makeEntity('Challenge')
export const CreditProfile = makeEntity('CreditProfile')
export const Debt = makeEntity('Debt')
export const Stokvel = makeEntity('Stokvel')
export const Course = makeEntity('Course')
export const CourseProgress = makeEntity('CourseProgress')

export const User = RealUser

