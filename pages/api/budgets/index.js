// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { budgets } from '../../../data'

export default function handler(req, res) {
	const httpMethod = req.method

	switch (httpMethod) {
		case 'GET':
			res.status(200).json(budgets)
			break

		default:
			req.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${httpMethod} Not Allowed`)
	}
}
