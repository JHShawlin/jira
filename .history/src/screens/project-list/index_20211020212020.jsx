import React from "react"
import { useState, useEffect } from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from "utils"
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param, 2000)

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {//name=${param.name}&personId=${param.personId}
            if (response.ok) {
                setList(await response.json())            
            }
        })
    }, [debounceParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())            
            }
        })
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}