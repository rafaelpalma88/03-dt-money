import { createContext, ReactNode, useState, useEffect } from 'react'
import axios from 'axios';

interface TransactionsContextProviderProps {
  children: ReactNode
}

export interface Transaction {
    id: number;
    category: string;
    createdAt: string;
    description: string;
    price: number;
    type: 'income' | 'outcome';
}

export interface TransactionContextType {
    transactions: Transaction[];
} 

export const TransactionsContext = createContext({} as TransactionContextType)

export const TransactionsContextProvider = ({ children }: TransactionsContextProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        console.log('caiu aqui')
        getTransactions();
      
      },[])
    
      const getTransactions = async () => {
    
        try {
    
          const response = await axios.get(
            `http://localhost:3000/transactions`
          );
    
          console.log(response.data)
          setTransactions(response.data)
    
        } catch (error) {
    
          console.log(error);
    
        }
      }

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
            }}
        >
            { children }
        </TransactionsContext.Provider>
    )
}