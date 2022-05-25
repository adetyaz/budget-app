import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BudgetsProvider } from '../contexts/BudgetContexts'

function MyApp({ Component, pageProps }) {
	return (
		<BudgetsProvider>
			<Component {...pageProps} />
		</BudgetsProvider>
	)
}

export default MyApp
