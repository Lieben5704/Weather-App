import React from "react"
import Table from 'react-bootstrap/Table';

let Weather = (props) => {
    return (
        <div>
            <div>
            <Table striped bordered hover>
        <thead>
        <tr>
          <th>Area</th>
          <th>Discription</th>
          <th>Temperature</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.data.name}</td>
          <td>{props.data.weather[0].description}</td>
          <td>{props.data.main.temp}</td>
          <td>{props.data.main.humidity}%</td>
        </tr>
      </tbody>
            </Table>
            </div>
        </div>
    );
} 
export default Weather