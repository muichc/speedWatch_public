import {useState, useEffect, React} from 'react'
import { Header,Container , Button } from 'semantic-ui-react'
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
const { ipcRenderer } = window.require("electron");


const Graph = () => {
    const [graphData, setGraphData] = useState([])
    const [option, setOption] = useState("download");
    const [axisValues, setAxisValues] = useState([]);
    const [shouldRender, setShouldRender] = useState(false);

    const getData = () => {
        ipcRenderer.send('get all data', 'ping')
        ipcRenderer.on('data-reply', (event, arg) => {
            console.log("data-reply", arg)
            if (arg) {
                setGraphData(arg[option]);
                console.log("got data!", arg[option])
            }
        } )
    }

    const getXAxis = () => {
        const xValues = [];
        for (let i = 0; i < graphData.length; i++) {
            xValues.push(graphData[i].x);
        }
        setAxisValues(xValues);
        console.log("set x axis!")
    }
    

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getXAxis()
        setShouldRender(!shouldRender);
    }, [])
    
    if(shouldRender) {
        return (
            <div>  
                <XYPlot xType="time" height={400} width={400}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Date" />
                    <YAxis title="Download/Upload/Ping" />
                    <XAxis />
                    <YAxis />
                    <LineSeries data={graphData} />
                </XYPlot>
            </div>
        );
    } else {
        return (
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam non nobis, id repellat veniam dolores nihil numquam doloremque accusamus delectus tempore quas illum consequuntur voluptate quia omnis. Esse, obcaecati.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptas enim laborum molestias at nostrum eligendi maxime minus, consequatur labore quae repellat laudantium doloribus excepturi recusandae possimus, exercitationem assumenda iste?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis natus blanditiis alias nam, quis consequatur possimus veritatis nesciunt molestias voluptatum suscipit aut eaque quia sapiente eum temporibus, odio incidunt.
                Loading...
            </div>
        )
    }
    
}

export default Graph;
