import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CSS/DisplayAF.module.css';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DisplayAF() {
    const [list, setList] = useState([]);
    const [cityFilterInput, setCityFilterInput] = useState("");
    const [stateFilterInput, setStateFilterInput] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:5050/fields`)
            .then((res) => {
                setList(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const filteredList = list.filter((listItem) => {
        if (cityFilterInput === '' && stateFilterInput === '') {
            return true;
        } else if (cityFilterInput === '') {
            return listItem.state.toLowerCase().includes(stateFilterInput.toLowerCase());
        } else if (stateFilterInput === '') {
            return listItem.city.toLowerCase().includes(cityFilterInput.toLowerCase());
        } else {
            return listItem.state.toLowerCase().includes(stateFilterInput.toLowerCase()) || listItem.city.toLowerCase().includes(cityFilterInput.toLowerCase());
        }
    })

    return (
        <div className={styles.page}>
            <Table style={{ 'border-color': '#d8ceb3' }}>
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Address</th>
                        <th>
                            <DropdownButton variant="outline-dark" title="City">
                                <input
                                    placeholder="City"
                                    value={cityFilterInput}
                                    onChange={(e) => setCityFilterInput(e.target.value)}
                                />
                            </DropdownButton>
                        </th>

                        <th>
                            <Dropdown>
                                <DropdownButton variant="outline-dark" title="State">
                                    <input
                                        placeholder="State"
                                        value={stateFilterInput}
                                        onChange={(e) => setStateFilterInput(e.target.value)}
                                    />
                                </DropdownButton>
                            </Dropdown>
                        </th>
                    </tr>
                </thead>
                {filteredList.map((field) => {
                    return (
                        <tbody style={{ border: 'none' }}>
                            <tr style={{ border: '1px solid black' }}>
                                <td className={styles.name}>{field.name}</td>
                                <td className={styles.address}>{field.address}</td>
                                <td className={styles.city}>{field.city}</td>
                                <td className={styles.state}>{field.state}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    )
}
