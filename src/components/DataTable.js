import {useState, useEffect, React} from 'react'
import { Icon, Label, Menu, Table, Container, Segment } from 'semantic-ui-react'
const { ipcRenderer } = window.require("electron");

const DataTable = () => {
  const [tableData, setTableData] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [expectedDl, setExpectedDl] = useState(0)
  const [expectedUl, setExpectedUl] = useState(0)

  const getData = () => {
    ipcRenderer.send('get all data', 'ping')
    ipcRenderer.on('data-reply', (event, arg) => {
        console.log("data-reply", arg)
        if (arg) {
            setTableData(arg["allData"]);
        }
    } )
    
  }
  const getUser = () => {
    ipcRenderer.send('get user', 'ping')
    ipcRenderer.on('async-reply', (event, arg) => {
      setCurrentUser(arg)
      setExpectedDl(parseInt(arg.download))
      setExpectedUl(parseInt(arg.upload))
      console.log(arg)
      ipcRenderer.removeAllListeners('async-reply');
    } )
    
  }

  let tableCells = tableData.map((test, index) => {
    return (<Table.Row key={index}>
              <Table.Cell>
              <Label ribbon>{index + 1}</Label>
              </Table.Cell>
              <Table.Cell>{test.createdAt}</Table.Cell>
              {test.download > expectedDl ? 
                <Table.Cell positive={true}>{test.download} </Table.Cell> :
                <Table.Cell negative={true}>{test.download}</Table.Cell>
              }
              {test.upload > expectedUl ?
                <Table.Cell positive={true}>{test.upload}</Table.Cell> :
                <Table.Cell negative={true}>{test.upload}</Table.Cell> 
              }
              
              <Table.Cell>{test.ping}</Table.Cell>
            </Table.Row>
    )
  })

  useEffect(()=> {
    getData()
    getUser()
  }, [])

  return(
    <Container id="tableContainer">
      <Table celled sortable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='1'></Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Download Mb/s </Table.HeaderCell>
            <Table.HeaderCell>Upload Mb/s</Table.HeaderCell>
            <Table.HeaderCell>Ping</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableCells}
        </Table.Body>

        <Table.Footer>
          
        </Table.Footer>
      </Table>
    </Container>
    
    )
}
  

export default DataTable
