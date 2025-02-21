import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import ListItem from "./ListItem";
import Info from "./Info";
import ChangeItem from "./ChangeItem";

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";


export default function Items({sidebarSwitch, sidebarShow}){
    // если sidebarShow = true - список отображается на всю страницу
    // если sidebarShow = false - размер списка уменьшается и сбоку отображается меню

    
    const items = useSelector(state => state.items.items);

    // на основе этого будет производиться фильтрация скрытых полей
    const activeFields = useSelector(state => state.fields.inputs.filter(field => field.hidden === false));
    
    
    if(!items.length){
        return  <Typography component="h1" variant="h5" color="inherit" gutterBottom >
                    Сотрудников нет
                </Typography>;
    }

    return (
        <Grid container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
            spacing={5}
        >
            <Grid item
                // 8 - размер с боковым меню
                // 12 - без бокового меню
                lg={ sidebarShow ? 8 : 12 }
            >          
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                {
                                    activeFields.map( field =>
                                        <TableCell key={field.nameField}>
                                            {field.labelField}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.map( (item, index) => 
                                    <ListItem 
                                        sidebarSwitch={sidebarSwitch} 
                                        activeFields={activeFields} 
                                        item={item} key={index} index={index} 
                                    />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item
                lg={4}
            >
                <Switch>
                    <Route exact path="/list/info/:id" render={(props)=><Info sidebarSwitch={sidebarSwitch} {...props}/>} />
                    <Route exact path="/list/edit/:id" render={(props)=><ChangeItem sidebarSwitch={sidebarSwitch} {...props}/>}/>
                </Switch>
            </Grid>
        </Grid>
    );
}