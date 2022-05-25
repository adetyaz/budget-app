//a code that we are going to use everywhere in the app

export const currencyFormatter = new Intl.NumberFormat(undefined, {
	currency: 'usd',
	style: 'currency',
	minimumFractionDigits: 0,
	//if not sett to 0, it'll add a set of decimals like :00
})
