import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";


const Dashboard=()=>{
    const [employee,setEmployee]=useState([]);
    const navigate= useNavigate(); 
    useEffect(()=>{
        const fetchEmployees=async()=>{
            try{
                const response =await fetch ("http://localhost:8080/api/employees");
                const data = await response.json();

                setEmployee(data);
            }catch(error){
                console.error("Error fetching employee:",error.message);
            }
        }

        fetchEmployees();

    },[]);

    const handleDelete = async (employeeId) =>{
        try{
            const response = await fetch (`http://localhost:8080/api/employee/${employeeId}`,{
                method: "DELETE",

            });

            if(response.ok){
                setEmployee((prevEmployees)=>
                    prevEmployees.filter((employee)=> employee.id !== employeeId)
                )
            }

            console.log(`Employee with ID ${employeeId} deleted successfully`);
        }catch(error){
            console.error("Error deleting employee:" ,error.message);
        }
        
    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }
    
    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                <h1 className="text-center">Employees</h1>
                <Table striped borderd hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map ((employee) =>(
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)}>Update</Button>
                                    <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
                
            </Row>

        </Container>
        </>
    )
}
export default Dashboard;