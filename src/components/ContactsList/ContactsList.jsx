import { ContactListStyle, ContactItemStyle } from "./ContactsList.styled"
import { ButtonStyle } from 'components/App.styled';

import { useDispatch, useSelector } from "react-redux";

import { deleteContact , fetchContacts } from "services/fetchContacts";
import { useEffect } from "react";
import { selectVisibleContacts } from "redux/phoneBookSlice";
export const ContactsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch]);



    
    const visibleContacts = useSelector(selectVisibleContacts)
  
    const deletedContact = (contactId) => {
        dispatch(deleteContact (contactId))
    };
    
    return (
        <ContactListStyle>
            {visibleContacts.map(({ name, number, id }) => (
                <ContactItemStyle key={id}>
                    <p>{name}: {number}</p>
                    <ButtonStyle type="button" onClick={() => deletedContact(id)}>Delete</ButtonStyle>
                </ContactItemStyle>))}
        </ContactListStyle>
    );
};