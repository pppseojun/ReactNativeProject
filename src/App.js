import React,{ useState, Component } from "react";
import { Dimensions, StatusBar,Image, View, StyleSheet } from "react-native";
import styled,{ThemeProvider} from "styled-components/native";
import { theme } from "./theme";
import Input from "./components/Input";
// import IconButton from "./components/IconButton";
// import { images } from "./images";
import Task from "./components/Task";
import Trip from '../assets/images/trip.png'


const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme})=>theme.background};
    align-items: center;
    justify-content: flex-start;
`;
const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color:${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({width})=>width-40}px;
`;

const tripImg = styled.Image`
    width: 10px;
    height: 10px;
    margin: 100px;
`;


export default function App(){
    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        '1':{id:'1', text: '두부네모 가평여행1', completed: false},
        '2':{id:'2', text: '두부네모 가평여행2', completed: true},
        '3':{id:'3', text: '두부네모 가평여행3', completed: false},
        '4':{id:'4', text: '두부네모 가평여행4', completed: false},
    });

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id:ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks,...newTaskObject});
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({},tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({},tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };


    return(
        <ThemeProvider theme={theme}>
            <Container>
                <View>
                <Trip source={Trip} style={tripImg}/>
                </View>
                <List width={width}>
                    {Object.values(tasks)
                    .reverse()
                    .map(item=>(
                        <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask}/>
                    ))}
                </List>
                <Input placeholder="+해야할 일을 추가하세요"
                value={newTask}
                onChangeText={_handleTextChange}
                onSubmitEditing={_addTask}
                />
            </Container>
        </ThemeProvider>
    );
}