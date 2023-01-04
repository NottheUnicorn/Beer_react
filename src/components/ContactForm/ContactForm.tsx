import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseEmail, chooseFavorite_Beer} from '../../redux/slices/RootSlice';
import { Input } from '../sharedcomponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';


interface ContactFormProps {
    id?:string;
    data?:{}
}

interface ContactState {
    name: string;
    email: string;
    favorite_beer: string;
}

export const ContactForm = (props:ContactFormProps) => {

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const name = useSelector<ContactState>(state => state.name);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseName(data.name));
            dispatch(chooseEmail(data.email));
            dispatch(chooseFavorite_Beer(data.favorite_beer));
            
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Contact Name</label>
                    <Input {...register('name')} name="name" placeholder='Name'/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input {...register('email')} name="email" placeholder='Email'/>
                </div>
                <div>
                    <label htmlFor="favoritebeer">Favorite Beer</label>
                    <Input {...register('favorite_beer')} name="favorite_beer" placeholder='Favorite Beer'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )}
