import { Button, Container, Stack } from 'react-bootstrap'
import AddBudgetModal from '../components/AddBudgetModal'
import BudgetCard from '../components/BudgetCard'
import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContexts'
import AddExpenseModal from '../components/AddExpenseModal'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import TotalBudgetCard from '../components/TotalBudgetCard'
import ViewExpenseModal from '../components/ViewExpenseModal'

export default function Home() {
	const [showModal, setShowModal] = useState(false)
	const [showExpenseModal, setShowExpenseModal] = useState(false)
	const [showViewModal, setShowViewModal] = useState()
	const [addBudgetId, setAddBudgetId] = useState()

	const { budgets, getBudgetExpenses } = useBudgets()

	console.log(budgets)

	const openAddExpenseModal = (budgetId) => {
		setShowExpenseModal(true)
		setAddBudgetId(budgetId)
	}

	return (
		<>
			<Container>
				<Stack direction='horizontal' gap='2' className='mb-4'>
					<h1 className='me-auto'>Budgets</h1>
					<Button variant='primary' onClick={() => setShowModal(true)}>
						Add Budget
					</Button>
					<Button variant='outline-primary' onClick={openAddExpenseModal}>
						Add Expense
					</Button>
				</Stack>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
						gap: '1rem',
						alignItems: 'flex-start ',
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						)
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
								onViewExpenseClick={() => setShowViewModal(budget.id)}
							/>
						)
					})}
					<UncategorizedBudgetCard
						onAddExpenseClick={openAddExpenseModal}
						onViewExpenseClick={() => setShowViewModal(UNCATEGORIZED_BUDGET_ID)}
					/>
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal
				show={showModal}
				handleClose={() => setShowModal(false)}
			/>
			<AddExpenseModal
				show={showExpenseModal}
				defaultBudgetId={addBudgetId}
				handleClose={() => setShowExpenseModal(false)}
			/>
			<ViewExpenseModal
				budgetId={showViewModal}
				handleClose={() => setShowViewModal()}
			/>
		</>
	)
}
