import React, { useReducer } from "react";

export const LocaleContext = React.createContext({});

const LocaleProvider = ({children}) => {
    const initialState = { lang: "bg" };

    const reducer = (state, action) => {
        console.log('Calling reducer', state, action)
        switch (action.type) {
            case "change-language": {
                return { ...state, lang: action.payload }
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    console.log('Value of provider is:', value);

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
};

export default LocaleProvider;