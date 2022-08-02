import React, { useState } from 'react'
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atom/user.atom';


const useInitialRecoilState = <T>(atom: RecoilState<T>,  initial= {} as T) => {
    const [initialState, setInitialState] = useState<T>(initial)

    const recoilValue = useRecoilValue(atom);

    React.useEffect(() => {
      setInitialState(recoilValue);
    }, []); // eslint-disable-line


    return [initialState === initial ? initial : recoilValue]
    
}

export default useInitialRecoilState;