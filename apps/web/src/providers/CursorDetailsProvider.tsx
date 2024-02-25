import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

const CursorContext = createContext<{
    cursorStatus: boolean;
    setCursorStatus: Dispatch<SetStateAction<boolean>>;
    isDragActive: boolean;
    setIsDragActive: Dispatch<SetStateAction<boolean>>;
}>({
    cursorStatus: false,
    setCursorStatus: () => {},
    isDragActive: false,
    setIsDragActive: () => {},
});

export const useCursorStatus = () => {
    // to check whether cursor is inside the current tab or not
    const { cursorStatus, isDragActive } = useContext(CursorContext);
    return { cursorStatus, isDragActive };
};

export const useSetCursorStatus = () => {
    const { setCursorStatus } = useContext(CursorContext);
    return setCursorStatus;
};

export const useSetDragActive = () => {
    const { setIsDragActive } = useContext(CursorContext);
    return setIsDragActive;
};

export const CursorDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [cursorStatus, setCursorStatus] = useState<boolean>(false);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);

    return (
        <CursorContext.Provider
            value={{
                cursorStatus,
                setCursorStatus,
                isDragActive,
                setIsDragActive,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
};
