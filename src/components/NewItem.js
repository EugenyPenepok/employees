import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { Field, Form } from "react-final-form";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";


const required = value => (value ? undefined : 'Поле должно быть заполнено');


export default function NewItem(props) {

    const dispatch = useDispatch();

    const inputs = useSelector(state => state.fields.inputs);

    return (
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >            
            <Typography
                component="h1"
                variant="h5"
                color="inherit"
                gutterBottom
            >
                Добавить сотрудника
            </Typography>            
            <Form 
                validate={required}
                onSubmit={(formData) => {
                    console.log(required())
                    const payload = {
                        id: Date.now().toString(),
                        ...formData
                    }; 
                    
                    dispatch({type: "CREATE_ITEM", payload});

                }}
                render = {({ handleSubmit, values, form, submitting }) => (
                    <form onSubmit={ 
                        //необходимо для очистки полей после записи в redux
                        async (event) => {
                            await handleSubmit(event);
                            
                            event.nativeEvent.submitter.name === "back"
                                // при нажатии на кнопку "Сохранить и вернуться в список "                
                                ? props.history.push('/list/')
                                // при нажатии на кнопку "Сохранить и добавить еще"
                                : form.reset() ;                        
                        }
                    }>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            
                            spacing={3}
                        >
                            { 
                                inputs.map(input => (
                                    <Grid item
                                        key={input.nameField}
                                    >
                                        <InputLabel htmlFor={input.nameField}>
                                            {input.labelField}
                                        </InputLabel>        
                                        {
                                            input.typeField === "select" 
                                                ? <Field
                                                    type={input.typeField}
                                                    name={input.nameField}
                                                    component="select"
                                                    id={input.nameField}                                                                                        
                                                >
                                                    {input.labels.map(option => <option key={option} value={option}>{option}</option>)}
                                                </Field>
                                                : input.typeField === "surname"
                                                    ? <Field
                                                        type={input.typeField}
                                                        name={input.nameField}
                                                        component="input"
                                                        id={input.nameField}
                                                        validate={required}                                     
                                                      >
                                                          {({ input, meta }) => (
                                                            <div>
                                                              <input {...input} />                                                              
                                                              {meta.error && meta.touched && <span>{meta.error}</span>}
                                                            </div>
                                                          )}
                                                      </Field>
                                                    : <Field
                                                        type={input.typeField}
                                                        name={input.nameField}
                                                        component="input"
                                                        id={input.nameField}                                                    
                                                      />
                                        }
                                    </Grid>                                    
                                ))             
                            }
                        
                            <Grid container
                                item 

                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                spacing={1}
                            > 
                                <Grid item>
                                    <Button name="back" type="submit" disabled={submitting} variant="contained" color="primary">
                                        Сохранить и вернуться в список
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button name="more" type="submit" disabled={submitting} variant="contained" color="primary">
                                        Сохранить и добавить еще
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button component={ Link } to="/" variant="contained" color="primary">
                                        Закрыть
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </Grid>        
    )
}