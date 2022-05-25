import { budgets } from '../../../data'

export default function handler(req, res) {
	const httpMethod = req.method
	const budgetId = req.query.id
	const filtered = budgets.filter((budget) => budget.id === budgetId)

	switch (httpMethod) {
		case 'GET':
			filtered.length > 0
				? res.status(200).json(filtered[0])
				: res
						.status(404)
						.json({ message: `Budget with ${budgetId} is not found` })

		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${httpMethod} is not Allowed`)
	}
}
