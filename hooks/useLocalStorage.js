import { useEffect, useState } from 'react'

export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		if (typeof window !== 'undefined') {
			const jsonValue = localStorage.getItem(key)
			if (jsonValue !== null) return JSON.parse(jsonValue)

			if (typeof defaultValue === 'function') {
				return defaultValue()
			} else {
				return defaultValue
			}
		}
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}, [key, value])

	return [value, setValue]
}
