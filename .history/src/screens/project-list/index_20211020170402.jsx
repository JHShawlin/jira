import React from "react"
import { useState, useEffect } from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async response => {
            if (response.ok) {
                setList(await response.json())            
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())            
            }
        })
    }, [])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}