import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { useSelector, useDispatch } from 'react-redux'


import { Field, Form } from "react-final-form"
import Button from '@material-ui/core/Button';


const validate = values => {
    const errors = {};
    if (!values.surname) {
      errors.surname = 'Поле должно быть заполнено';
    }
    return errors;
};

function ChangeItem({ match }){ 
    
    const dispatch = useDispatch();

    const user = useSelector(state => state.items.items.find(item => item.id === match.params.id));
    const inputs = useSelector(state => state.fields.inputs);

    const [item] = useState(user);
    
    if(user === undefined){
        return <Redirect to="/" />
    }

    return (

        <div>
            <h1>Изменить информацию о сотруднике</h1>
            <Form
                validate={validate}
                //чтобы поля были заполнены текущими значениями (до изменения)
                initialValues={item}

                onSubmit={(formData) => {

                    const payload = {
                        // взят из локального стейта
                        id: item.id,
                        // пришло из формы
                        ...formData 
                    }; 

                    dispatch({type: "CHANGE_ITEM", payload});

                }}
                render = {({ handleSubmit }) => (
                    <form onSubmit={ handleSubmit }>
                        { 
                            inputs.map(input => (

                                <div style={{margin:"10px"}} key={input.nameField}>
                                    <label>{input.labelField}
                                        {input.typeField === "select" 
                                            ? <Field
                                                type={input.typeField}
                                                name={input.nameField}
                                                component="select"
                                                                                    
                                              >
                                                    {input.labels.map(option => <option key={option} value={option}>{option}</option>)}
                                              </Field>
                                            : <Field
                                                type={input.typeField}
                                                name={input.nameField}
                                                component="input" 
                                                                               
                                              />
                                        } 
                                    </label>
                                </div>
                                    
                            ))             
                        }
                        <Button type="submit" variant="contained" color="primary">
                            Сохранить
                        </Button>
                        <Button  component={ Link } to="/list/" variant="contained" color="primary">
                            Выйти
                        </Button>
                    </form>
                )}
            /> 
        </div>
    )
}

export default connect()(ChangeItem);