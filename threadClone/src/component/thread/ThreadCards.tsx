import { useSelector } from 'react-redux';
import { selectThread } from '../../slices/threadSlice';
import CardItems from '../CardItems';

const ThreadCards = () => {
    const datas = useSelector(selectThread)
    // console.log("selectThread :", datas);
    
    return (
        datas.map((thread: any, index: number) => {
            return (
                <CardItems
                    thread={thread}
                    index={index}
                    type='threads'
                />
            )
        })
     );
}
 
export default ThreadCards;