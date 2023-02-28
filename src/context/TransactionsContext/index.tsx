import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../../lib/axios'

interface TransactionsContextProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface Transaction {
  id: number
  category: string
  createdAt: string
  description: string
  price: number
  type: 'income' | 'outcome'
}

export interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export const TransactionsContextProvider = ({
  children,
}: TransactionsContextProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [...state, response.data])
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
