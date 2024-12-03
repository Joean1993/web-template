import React from 'react'
import useStore from './store'

const Home = () => {
	const { data, handleChangeData } = useStore()

	return <div onClick={handleChangeData}>{data}</div>
}

export default Home
