import React from 'react';
import {useAppSelector} from "../../store/hooks.ts";
import {Navigate} from "react-router-dom";
import {selectUser} from "../../store/slices/userSlice/userSlice.ts";


interface Props {
    children: React.ReactNode;
}

export const PrivateRouter: React.FC<Props> = ({children}) => {

    const  isAuthenticated = useAppSelector(selectUser);

    if (!isAuthenticated){
        return  <Navigate to="/login"></Navigate>
    }
    return (
        <>
            {children}
        </>
    );
};

