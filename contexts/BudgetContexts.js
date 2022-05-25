import { createContext, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export const useBudgets = () => {
	return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage('budgets', [])
	const [expenses, setExpenses] = useLocalStorage('expenses', [])

	const getBudgetExpenses = (budgetId) => {
		return expenses.filter((expense) => expense.budgetId === budgetId)
	}

	const addBudget = ({ name, max }) =>
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets
			}
			return [...prevBudgets, { id: uuid(), name, max }]
		})

	const addExpense = ({ description, amount, budgetId }) =>
		setExpenses((prevExpense) => {
			return [...prevExpense, { id: uuid(), description, amount, budgetId }]
		})

	const deleteBudget = ({ id }) =>
		//TODO: deal with expenses
		setBudgets((prevBudgets) =>
			prevBudgets.filter((budget) => budget.id !== id)
		)

	const deleteExpense = ({ id }) =>
		setExpenses((prevExpenses) => {
			prevExpenses.map((expense) => {
				if (expense.budgetId !== id) return expense
				return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
			})
		})

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	)
}
