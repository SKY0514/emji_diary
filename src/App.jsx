import './App.css';
import { Outlet } from 'react-router-dom';
import Button from '@/components/Button';
import Header from '@/layouts/Header';
import { useReducer, useRef } from 'react';
let mockData = [
    { id: 1, createAt: new Date().getTime(), emotionId: 1, content: '콘텐츠 내용' },
    { id: 2, createAt: new Date().getTime(), emotionId: 5, content: '콘텐츠 내용' },
    { id: 3, createAt: new Date().getTime(), emotionId: 3, content: '콘텐츠 내용' },
    { id: 4, createAt: new Date().getTime(), emotionId: 1, content: '콘텐츠 내용' },
];
function reducer(state, actions) {
    switch (actions.type) {
        case 'CREATE':
            return [actions.data, ...state];
        case 'UPDATE':
            return [state.map((list) => (list.id === actions.data.id ? { ...actions.data, ...list } : list))];
        default:
            break;
    }
    return state;
}
function App() {
    const idRef = useRef(5);
    const [data, dispatch] = useReducer(reducer, mockData);

    //ADD Fun
    const onCreate = (createAt, emotionId, content) => {
        dispatch({ type: 'CREATE', data: { id: idRef.current++, createAt, emotionId, content } });
    };
    //Edit Fun
    const onUpdate = (id, emotionId, content) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id,
                emotionId,
                content,
            },
        });
    };
    return (
        <>
            <Button
                text={'추가'}
                onClick={() => {
                    onCreate(new Date().getTime(), 3, '2323');
                }}
            />{' '}
            <Button
                text={'수정'}
                onClick={() => {
                    onUpdate(4, 2, '2323');
                }}
            />
            <Header
                leftChild={<Button text={'Left'} />}
                title={<Button text={'Header'} />}
                rightChild={<Button text={'Right'} />}
            />
            <Outlet />
        </>
    );
}

export default App;
