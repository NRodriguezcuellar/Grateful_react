import {IonContent, IonPage} from '@ionic/react';
import './Tab1.css';
import TheHeader from "../components/TheHeader";
import '../assets/styles/calendar.css'
import {useState, useEffect} from 'react'


interface ApiData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}


const Tab1: React.FC = () => {
    const list: any[] = [1, 2, 3, 4, 5, 6, 3, 3, 3, 3, 3, 3,]
    const [inputValue, setInputValue] = useState('')


    const [apiData, setApiData] = useState<ApiData | null>(null)

    const fetchApi = (id?: number) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => response.json())
            .then(json => setApiData(json))
    }



    useEffect(() => {

        fetchApi(1)

    }, [])


    return (
        <IonPage>
            <TheHeader/>
            <IonContent fullscreen>

                <form>
                    {
                        list.map((item, index) => <input type="text" defaultValue={item}
                                                         onChange={e => setInputValue(e.target.value)} key={index}/>)
                    }
                </form>

                <div>
                    {inputValue}
                </div>

                <div>
                    {apiData?.title}!
                </div>

                <button onClick={() => fetchApi(Math.round(Math.random() * 100))}> Fetch data</button>

            </IonContent>
        </IonPage>
    );
};

export default Tab1;
